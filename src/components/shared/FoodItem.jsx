import { FaRegCircleDot, FaRegCirclePlay, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addItem,
    selectItems,
    selectRestaurant,
    setRestaurant,
    incrementQuantity,
    decrementQuantity,
} from "@/redux/cart";
import { useEffect, useState } from "react";

const FoodItem = ({ cuisine, isAvailable, restaurant, open }) => {
    // console.log(isAvailable, open)
    const dispatch = useDispatch();
    const currentRestaurant = useSelector(selectRestaurant);
    const cartItems = useSelector(selectItems);
    const itemInCart = cartItems.find((item) => item._id === cuisine._id);
    const [showCartBox, setShowCartBox] = useState(false);
    const navigate = useNavigate();

    // Calculate total items in cart (sum of quantities)
    const totalCartItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleClick = () => {
        if (!isAvailable) return;

        if (
            currentRestaurant &&
            currentRestaurant._id !== cuisine.restaurantId
        ) {
            alert("You can only order from one restaurant at a time.");
            return;
        }

        if (!currentRestaurant) {
            console.log(restaurant)
            dispatch(setRestaurant(restaurant));
        }

        dispatch(addItem(cuisine));
        setShowCartBox(true); // Show cart box on item addition
    };


    useEffect(() => {
        if (cartItems.length > 0) {
            setShowCartBox(true);
        }
    }, [cartItems]);

    return (
        <>
            <div
                className={`flex items-center border-b-2 py-4 border-slate-200 p-4 shadow-md bg-white rounded-lg`}
            >
                {/* Details Section */}
                <div className="flex-1 pr-6">
                    {cuisine?.type === "Veg" ? (
                        <FaRegCircleDot size={24} color="green" />
                    ) : (
                        <FaRegCirclePlay
                            size={24}
                            style={{ color: "#cc0000" }}
                            className="transform -rotate-90"
                        />
                    )}
                    <h2 className="mt-1 text-lg font-semibold text-gray-800">
                        {cuisine?.name}
                    </h2>
                    <p className="text-gray-600 font-semibold">
                        ₹{cuisine?.price}
                    </p>
                    <div className="flex items-center mt-1">
                        <FaStar size={18} color="green" />
                        <span className="ml-1 text-green-600 font-semibold">
                            {cuisine?.rating || 4.2}
                        </span>
                        <span className="ml-2 text-gray-600 text-sm">(29)</span>
                    </div>
                    <p className="text-gray-500 mt-1">{cuisine?.description}</p>
                </div>

                {/* Image and Action Section */}
                <div className="flex flex-col space-y-1">
                    <div className="h-36 w-36">
                        <img
                            src={(!cuisine?.imageUrl || cuisine?.imageUrl === "https://res.cloudinary.com/didsernha/image/upload/v1728458954/cuisine images/db5afc54-e82f-4a2b-b819-6fcfad778812.jpg") ? "https://img.freepik.com/premium-photo/ai-generated-photo-selection-healthy-diet-nutritionist-food-illustration_999340-2284.jpg" : cuisine.imageUrl}
                            alt={cuisine?.name}
                            className={`w-full h-full object-cover rounded-lg ${
                                isAvailable && open ? "" : "filter grayscale"
                            }`} // Apply grayscale filter if not available
                        />
                    </div>

                    {/* Add Button */}
                    {itemInCart ? (
                        isAvailable && (
                            <div className="flex items-center justify-between border px-2 py-1">
                                <button
                                    onClick={() =>
                                        dispatch(
                                            decrementQuantity(itemInCart._id)
                                        )
                                    }
                                    className="text-gray-400 text-4xl"
                                >
                                    -
                                </button>
                                <span className="mx-2 text-xl">
                                    {itemInCart?.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            incrementQuantity(itemInCart._id)
                                        )
                                    }
                                    className="text-green-700 text-3xl"
                                >
                                    +
                                </button>
                            </div>
                        )
                    ) : (
                        <button
                            disabled={!isAvailable || !open}
                            onClick={handleClick}
                            className={`w-full p-1 rounded-lg text-center text-white cursor-pointer ${
                                !isAvailable || !open
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                            Add
                        </button>
                    )}
                </div>
            </div>

            {/* Cart Box (Sticky at the bottom) */}
        
        </>
    );
};

export default FoodItem;
