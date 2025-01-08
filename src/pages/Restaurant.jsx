import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import Container from "../components/layout/Container";
import RestaurantProfile from "../components/shared/RestaurantProfile";
import FoodItem from "../components/shared/FoodItem";
import axiosInstance from "@/api/axiosInstance";
import Loader from "@/components/layout/Loader";
import socket from "@/socket";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card"; // Import Card components
import { useSelector } from "react-redux";
import { selectItems } from "@/redux/cart";

const CustomToggle = ({ label, checked, onChange, disabled, color }) => {
    // Map color to the correct Tailwind class
    const colorClassMap = {
        green: "bg-green-800",
        red: "bg-red-700",
    };

    // Use the mapped class based on the color prop
    const bgColorClass = checked ? colorClassMap[color] : "bg-gray-500";

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${bgColorClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                onClick={() => !disabled && onChange(!checked)}
            // disabled={disabled}
            >
                <motion.div
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: checked ? 24 : 0 }}
                />
            </button>
            <Label
                className="cursor-pointer"
                onClick={() => !disabled && onChange(!checked)}
            >
                {label}
            </Label>
        </div>
    );
};

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <Input
                type="text"
                placeholder="Search cuisine..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg px-2 py-5 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
};

const CategoryDropdown = ({ categories, value, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen]);
    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                className="w-full px-4 py-2 text-left bg-white rounded-md flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            // disabled={disabled}
            >
                <span>{value || "All Categories"}</span>
            </button>
            {isOpen && (
                <div className="absolute max-h-[15rem] overflow-auto z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                        className="w-full px-4 py-1 text-left hover:bg-gray-100"
                        onClick={() => {
                            onChange("");
                            setIsOpen(false);
                        }}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="w-full px-4 py-1 text-left hover:bg-gray-100"
                            onClick={() => {
                                onChange(cat.toLowerCase());
                                setIsOpen(false);
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const Restaurant = () => {
    const params = useParams();
    const restaurantId = params.id;
    const [restaurant, setRestaurant] = useState(null);
    const [cuisines, setCuisines] = useState([]);
    const [filteredCuisines, setFilteredCuisines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [vegOnly, setVegOnly] = useState(false);
    const [nonVegOnly, setNonVegOnly] = useState(false);
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const cartItems = useSelector(selectItems);
    const navigate = useNavigate()
    const totalCartItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleShowCart = () => {
        navigate("/cart"); // Navigate to cart page
    };
    useEffect(() => {
        fetchRestaurant();
        socket.emit("joinRestaurant", restaurantId);
        socket.on("restaurantStatusUpdated", ({ restaurantId, isOpen }) => {
            setOpen(isOpen);
        });

        const handleCuisineUpdated = ({ cuisineId, isAvailable }) => {
            setCuisines((prevCuisines) =>
                prevCuisines.map((cuisine) =>
                    cuisine.cuisine._id === cuisineId
                        ? {
                            ...cuisine,
                            cuisine: { ...cuisine.cuisine, isAvailable },
                        }
                        : cuisine
                )
            );
        };

        socket.on("cuisineUpdated", handleCuisineUpdated);
        return () => {
            socket.off("cuisineUpdated");
        };
    }, []);

    const handleVegToggle = () => {
        setVegOnly(!vegOnly);
        setNonVegOnly(false);
        setSearchQuery("")
    }
    const handleNonVegToggle = () => {
        setVegOnly(false);
        setNonVegOnly(!nonVegOnly);
        setSearchQuery("")
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setNonVegOnly(false);
        setVegOnly(false);
        setCategory("");
    }

    useEffect(() => {
        filterCuisines();
    }, [vegOnly, nonVegOnly, category, searchQuery, cuisines]);

    const fetchRestaurant = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(
                `/restaurants/${restaurantId}`
            );
            setRestaurant(data.restaurant);
            // console.log(data.restaurant);
            setCuisines(data?.restaurant?.cuisines || []);
            setFilteredCuisines(data?.restaurant?.cuisines || []);
            setCategories(extractCategories(data?.restaurant?.cuisines || []));
            setOpen(data?.restaurant?.isOpen);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const extractCategories = (cuisines) => {
        const uniqueCategories = new Set(
            cuisines.map((cuisine) => cuisine.cuisine.category)
        );
        return Array.from(uniqueCategories);
    };

    const filterCuisines = () => {
        let updatedCuisines = [...cuisines];

        if (searchQuery) {
            updatedCuisines = updatedCuisines.filter(
                (cuisine) =>
                    cuisine.cuisine.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    cuisine.cuisine.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
            // setVegOnly(false);
            // setNonVegOnly(false);
            // setCategory("");
        } else {
            if (vegOnly) {
                updatedCuisines = updatedCuisines.filter(
                    (cuisine) => cuisine.cuisine.type.toLowerCase() === "veg"
                );
            }
            if (nonVegOnly) {
                updatedCuisines = updatedCuisines.filter(
                    (cuisine) =>
                        cuisine.cuisine.type.toLowerCase() === "non-veg"
                );
            }

            if (category) {
                updatedCuisines = updatedCuisines.filter(
                    (cuisine) =>
                        cuisine.cuisine.category.toLowerCase() ===
                        category.toLowerCase()
                );
            }
        }

        setFilteredCuisines(updatedCuisines);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <AppLayout>
                    <Container>
                        <div className={`md:px-16 relative ${totalCartItems > 0 ? "pb-16" : ""}`}>
                            <div className="flex flex-col gap-6">
                                <RestaurantProfile
                                    restaurant={restaurant}
                                    open={open}
                                />
                                <Card className="rounded-lg">
                                    <CardContent className="flex flex-col gap-6 !p-0">
                                        {/* Toggles */}
                                        <div className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <span>Veg</span>
                                                <CustomToggle
                                                    label=""
                                                    onChange={handleVegToggle}
                                                    checked={vegOnly}
                                                    // disabled={!!searchQuery}
                                                    color="green"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>Non-Veg</span>
                                                <CustomToggle
                                                    label=""
                                                    onChange={handleNonVegToggle}
                                                    checked={nonVegOnly}
                                                    // disabled={!!searchQuery}
                                                    color="red"
                                                />
                                            </div>
                                        </div>

                                        {/* Dropdown and search bar */}
                                        <div className="flex gap-4">
                                            <CategoryDropdown
                                                categories={categories}
                                                value={category}
                                                onChange={(value) =>
                                                    setCategory(value)
                                                }
                                            // disabled={!!searchQuery}
                                            />
                                            <SearchBar
                                                value={searchQuery}
                                                onChange={(value) => handleSearchChange(value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <AnimatePresence>
                                    {filteredCuisines?.length > 0 ? (
                                        <div className="flex flex-col gap-6">
                                            {filteredCuisines.map((cuisine) => (
                                                <FoodItem
                                                    key={cuisine?._id}
                                                    cuisine={cuisine?.cuisine}
                                                    isAvailable={
                                                        cuisine?.cuisine
                                                            ?.isAvailable
                                                    }
                                                    open={open}
                                                    restaurant={restaurant}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            className="text-center text-gray-500"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            No cuisines available
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {totalCartItems > 0 && (
                                <div className="mb-14 md:mb-0 fixed bottom-0 left-0 right-0 mt-6 bg-green-600 text-white py-4 px-8 flex justify-between items-center">
                                    <div className="w-full max-w-[calc(100%-2rem)] mx-auto flex justify-between items-center">
                                        <span className="font-semibold">
                                            {totalCartItems} item(s) in cart
                                        </span>
                                        <button
                                            onClick={handleShowCart}
                                            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                                        >
                                            Show Cart
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Container>
                </AppLayout>
            )}
        </>
    );
};

export default Restaurant;
