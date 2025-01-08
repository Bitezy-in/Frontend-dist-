import capitalizeWords from "@/utils/capitalizeWords";
import { getRandomNumber } from "@/utils/helperFunctions";
import React from "react";
import { FiStar } from "react-icons/fi";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className={`max-w-sm overflow-hidden bg-white h-full rounded-lg shadow-md ${restaurant.isOpen ? "cursor-pointer transform transition-transform duration-300 hover:scale-95" : " "}`}>
      <div className="relative overflow-hidden">
        <img
          src={restaurant?.imageUrl || "https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_1024%2Cc_limit/Prequel-lead.jpg"}
          alt="Restaurant"
          className={`w-full h-40 object-cover ${restaurant?.isOpen ? "" : "filter grayscale"
            }`}
        />
        {/* <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-2 rounded-b-lg">
          <span className="text-white font-bold">ITEMS AT ₹179</span>
        </div> */}
      </div>
      <div className="p-4 rounded-b-lg">
        <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>
        <div className="flex items-center text-slate-700 mt-2">
          <FiStar className="text-green-500 mr-1" />
          <span className="text-sm">{getRandomNumber()}</span>
          {/* <span className="mx-2 text-sm">•</span>
          <span className="text-sm">40-45 mins</span> */}
        </div>
        <p className="text-sm text-slate-700 mt-2">
        {capitalizeWords(restaurant?.categories.slice(0, 3).join(',') || "Indian, Italian")}
        </p>
        <p className="text-sm text-slate-700 mt-1">{restaurant.address.addressLine1}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
