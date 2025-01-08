import React, { useEffect, useState } from "react";
import SwipeToSlide from "./SwipeToSlide";
import VegNonVegToggle from "../specific/VegNonVegToggle";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cuisines } from "../constants/cuisines";

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

const CuisineCarousel = () => {
    const [vegOnly, setVegOnly] = useState(false)
    const [nonVegOnly, setNonVegOnly] = useState(false)

    const [filteredCuisines, setFilteredCuisines] = useState(cuisines)

    useEffect(() =>{
        filterCuisines();
    },[vegOnly, nonVegOnly])

    const handleVegToggle = () => {
        setVegOnly(!vegOnly);
        setNonVegOnly(false);
    }
    const handleNonVegToggle = () => {
        setVegOnly(false);
        setNonVegOnly(!nonVegOnly);
    }

    const filterCuisines = () => {
        if (vegOnly && nonVegOnly) {
            setFilteredCuisines(cuisines);
        } else if (vegOnly) {
            setFilteredCuisines(cuisines.filter((cuisine) => cuisine.type === "veg"));
        } else if (nonVegOnly) {
            setFilteredCuisines(cuisines.filter((cuisine) => cuisine.type === "non-veg"));
        } else {
            setFilteredCuisines(cuisines);
        }
    }

    return (
        <div className="mt-14">
            <div className="flex justify-between items-center mb-4">
                <h3 className="sm:text-xl text-md font-bold text-gray-800 mb-4">Popular Cuisines</h3>
                {/* <VegNonVegToggle /> */}
                <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <span>Veg</span>
                        <CustomToggle
                            label=""
                            onChange={handleVegToggle}
                            checked={vegOnly}
                            color="green"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>Non-Veg</span>
                        <CustomToggle
                            label=""
                            onChange={handleNonVegToggle}
                            checked={nonVegOnly}
                            color="red"
                        />
                    </div>
                </div>
            </div>
            <SwipeToSlide cuisines={filteredCuisines} />
        </div>
    );
};

export default CuisineCarousel;
