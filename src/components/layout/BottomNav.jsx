import React from "react";
import { FiHome, FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center p-2 md:hidden">
      <Link to={"/"}>
      <div className="flex flex-col items-center text-gray-600">
        <FiHome size={24} />
        <span className="text-xs">Bitezy</span>
      </div>
      </Link>
      <Link to={"/search"}>
      <div className="flex flex-col items-center text-gray-600">
        <FiSearch size={24} />
        <span className="text-xs">Search</span>
      </div>
      </Link>
      <Link to={"/cart"}>
        <div className="flex flex-col items-center text-gray-600">
          <FiShoppingCart size={24} />
          <span className="text-xs">Cart</span>
        </div>
      </Link>
      <Link to={"/orders"}>
      <div className="flex flex-col items-center text-gray-600">
        <FaHistory size={24} />
        <span className="text-xs">Orders</span>
      </div>
      </Link>
    </div>
  );
};

export default BottomNav;
