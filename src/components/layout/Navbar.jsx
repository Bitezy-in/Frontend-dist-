import { useMemo, useState } from "react";
import {
    FiSearch,
    FiHome,
    FiPercent,
    FiHelpCircle,
    FiUser,
    FiShoppingCart,
    FiMapPin,
    FiMenu,
    FiLogOut,
    FiBell,
} from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearNewNotification } from "@/redux/notification";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { clearCustomerData } from "@/redux/user";

const Navbar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const user = useSelector((state) => state.customer.customerInformation);
    const notifications = useSelector((state) => state.notification.notifications);
    const isNewNotification = useSelector((state) => state.notification.newNotification);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleNotificationClick = () => {
        if (!isNotificationsOpen) {
            dispatch(clearNewNotification());
        }
        setNotificationsOpen(prev => !prev);
        console.log(isNotificationsOpen)
    }
    const items = useSelector(selectItems);
    const itemsInCart = useMemo(() => {
        return items?.length;
    }, [items]);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = async () => {
        try {
            const { data } = await axiosInstance.get('/auth/logout');
            if (data.success) {
                toast.success(data.message);
                dispatch(clearCustomerData())
                navigate("/login")
            }
        }
        catch (err) {
            console.error(err);
            toast.error(err.response.data.message)
        }
    };

    const handleHistory = () => {
        // Handle history functionality here
        console.log("History clicked");
    };

    const pathname = location.pathname;
    const isActive = (path) => pathname === path;
    return (
        <nav className="bg-white shadow-md text-lg fixed w-full z-20">
            <div className="w-full xl:w-[80%] mx-auto flex items-center justify-between py-4 md:py-0 px-4 md:px-2 lg:px-6">
                {/* Mobile Layout */}
                <div className="flex items-center justify-between w-full md:hidden">
                    {/* Logo and Location Selector */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img
                                src="/bitezy_logo.png"
                                alt="logo"
                                className="h-12 w-12"
                            />
                        </Link>
                        <div className="flex items-center space-x-1 font-semibold">
                            <FiMapPin className="text-orange-500 font-semibold" />
                            <select className="text-gray-700 focus:outline-none border-b border-gray-300 focus:border-orange-500 font-semibold text-sm">
                                <option>Sricity</option>
                                <option>Tada</option>
                            </select>
                        </div>
                    </div>

                    {/* Hamburger Menu */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-gray-700 hover:text-orange-500 focus:outline-none"
                            onClick={toggleDrawer}
                        >
                            <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s"} />
                        </button>
                    </div>
                </div>

                <div
                    className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out`}
                >
                    <div className="p-5 flex items-center justify-between border-b">
                        <span className="text-lg font-semibold">Menu</span>
                        <button onClick={toggleDrawer}>
                            <IoCloseSharp className="w-6 h-6 text-gray-700 hover:text-orange-500" />
                        </button>
                    </div>
                    <div className="px-6 py-4 space-y-4">
                        <Link to="/" className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/") ? "text-orange-500" : ""}`}>
                            <FiHome className="mr-2" /> Home
                        </Link>
                        <Link to="/search" className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/search") ? "text-orange-500" : ""}`}>
                            <FiSearch className="mr-2" /> Search
                        </Link>
                        {
                            user && (
                                <Link to="/orders" className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/orders") ? "text-orange-500" : ""}`}>
                                    <FiPercent className="mr-2" /> Orders
                                </Link>
                            )
                        }
                        {/* <Link to="/help" className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/help") ? "text-orange-500" : ""}`}>
                            <FiHelpCircle className="mr-2" /> Help
                        </Link> */}
                        <div onClick={() => { window.open("https://wa.me/" + "+918733936309" + "?text=" + "Hey team. I need help with...."); }} className={`flex cursor-pointer items-center text-gray-700 hover:text-orange-500 ${isActive("/help") ? "text-orange-500" : ""}`}>
                            <FiHelpCircle className="mr-2" /> Help
                        </div>
                        {
                            !user && (
                                <Link to="/login" className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/login") ? "text-orange-500" : ""}`}>
                                    <FiUser className="mr-2" /> Sign In
                                </Link>
                            )
                        }
                        <Link to="/cart" className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/cart") ? "text-orange-500" : ""}`}>
                            <FiShoppingCart className="mr-2" /> Cart
                        </Link>
                        {
                            user && (
                                <div onClick={handleSignOut} className={`flex items-center text-gray-700 hover:text-orange-500 ${isActive("/logout") ? "text-orange-500" : ""}`}>
                                    <FiUser className="mr-2" /> Sign Out
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center space-x-3">
                    <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-orange-500">
                            <Link to="/">
                                <img
                                    src="/bitezy_logo.png"
                                    alt="logo"
                                    className="h-20 w-20"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center space-x-2 font-semibold">
                            <FiMapPin className="text-orange-500 font-semibold" />
                            <select className="text-gray-700 focus:outline-none border-b border-gray-300 focus:border-orange-500 font-semibold">
                                <option>Sricity</option>
                                <option>Tada</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Nav Links (Desktop) */}
                <div className="hidden md:flex items-center space-x-3 xl:space-x-10">
                    <Link
                        to="/search"
                        className={`flex items-center font-semibold text-gray-700 hover:text-orange-500 ${isActive("/search") ? "text-orange-500" : ""}`}
                    >
                        <FiSearch className="mr-1 lg:mr-4 font-semibold" />{" "}
                        Search
                    </Link>
                    {user && <Link to="/orders" className={`flex items-center font-semibold text-gray-700 hover:text-orange-500 ${isActive("/orders") ? "text-orange-500" : ""}`}>
                        <FiPercent className="mr-1 lg:mr-4 font-semibold" /> Orders
                    </Link>}
                    {/* <Link
                        to="/help"
                        className={`flex items-center font-semibold text-gray-700 hover:text-orange-500 ${isActive("/help") ? "text-orange-500" : ""}`}
                    >
                        <FiHelpCircle className="mr-1 lg:mr-4 font-semibold" />{" "}
                        Help
                    </Link> */}
                    <div onClick={() => { window.open("https://wa.me/" + "+918733936309" + "?text=" + "Hey team. I need help with...."); }} className={`flex cursor-pointer font-bold items-center text-gray-700 hover:text-orange-500 ${isActive("/help") ? "text-orange-500" : ""}`}>
                        <FiHelpCircle className="mr-2" /> Help
                    </div>
                    {!user && (
                        <Link
                            to="/login"
                            className={`flex items-center font-semibold text-gray-700 hover:text-orange-500 ${isActive("/login") ? "text-orange-500" : ""}`}
                        >
                            <FiUser className="mr-1 lg:mr-4 font-semibold" />{" "}
                            Sign In
                        </Link>
                    )}
                    <Link
                        to="/cart"
                        className={`relative flex items-center font-semibold text-gray-700 hover:text-orange-500 ${isActive("/cart") ? "text-orange-500" : ""}`}
                    >
                        <FiShoppingCart className="mr-2 lg:mr-4 font-semibold" />{" "}
                        Cart
                        {itemsInCart !== 0 && (
                            <span className="absolute -top-2 -right-2 text-xs font-semibold bg-green-600 text-white rounded-full px-1">
                                {itemsInCart}
                            </span>
                        )}
                    </Link>

                    {/* Notifications Dropdown */}
                    {
                        user && (
                            <>
                                <div
                                    className="relative flex items-center font-semibold text-gray-700 hover:text-orange-500 hover:cursor-pointer"
                                    onClick={handleNotificationClick}
                                >
                                    <FiBell className="mr-2 lg:mr-4 font-semibold" />
                                    Notifications
                                    {/* Blinking Orange Dot for New Notification */}
                                    {isNewNotification && (
                                        <span className="absolute -top-2 -right-2 text-xs font-semibold bg-red-600 text-white rounded-full px-1">
                                            {1}
                                        </span>
                                    )}
                                    {isNotificationsOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-[30rem] bg-white border border-gray-300 shadow-xl rounded-lg p-4 max-h-60 overflow-y-auto z-50">
                                            {notifications?.length === 0 ? (
                                                <p className="text-gray-500 text-sm text-center">No new notifications</p>
                                            ) : (
                                                notifications?.map((notification, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start space-x-3 py-2 px-3 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150 rounded-lg"
                                                    >
                                                        <div className="flex-shrink-0 bg-blue-100 text-blue-500 rounded-full p-2">
                                                            {/* You can replace this with an icon */}
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m2 0h-1V9m0 0h.01M12 9v4m0-4h-.01M9.5 4.5A4.5 4.5 0 0114 9v5.586a1 1 0 01-.293.707l-1.5 1.5a1 1 0 01-.707.293h-3a1 1 0 01-.707-.293l-1.5-1.5A1 1 0 017 14.586V9a4.5 4.5 0 014.5-4.5z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1 overflow-hidden">
                                                            <p className="text-gray-800 text-sm font-semibold break-words whitespace-normal">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-gray-500 text-xs">Just now</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="hidden relative md:flex items-center">
                                    <button
                                        className="text-gray-700 hover:text-orange-500 focus:outline-none"
                                        onClick={toggleDropdown}
                                    >
                                        <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s"} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute border-2 border-slate-100 top-8 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                                            <button
                                                onClick={handleHistory}
                                                className="w-full flex items-center gap-2 px-2 py-2 font-semibold text-gray-700 hover:bg-orange-200"
                                            >
                                                <FaHistory size={20} /> History
                                            </button>
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center gap-2 w-full px-2 py-2 font-semibold text-gray-700 hover:bg-orange-200"
                                            >
                                                <FiLogOut size={20} /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
