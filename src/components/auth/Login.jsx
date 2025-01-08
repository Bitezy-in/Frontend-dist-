import { useState } from "react"
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import OTPVerification from "./OTPVerification";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import axiosInstance from "@/api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerInformation } from "@/redux/user";
import getOrders from "@/services/getOrders";
import { addOrders } from "@/redux/order";
const Login = () => {
    const dispatch = useDispatch();
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const orders = useSelector(state => state?.order?.orders);
    const navigate = useNavigate();

    const onSignup = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post(`/auth/login`, { mobileNumber: ph.slice(-10) });
            if (data.success) {
                toast.success(data.message);
                setShowOTP(true);
            }
            else {
                toast.error(data.error || "Something went wrong")
            }
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }
    const fetchOrders = async () => {
        try {
            const ordersData = await getOrders(orders);
            if (ordersData) {
                dispatch(addOrders(ordersData));
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const onOTPVerify = async (otp) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post(`/auth/verify-otp`, { mobileNumber: ph.slice(-10), otp });
            if (data.success) {
                toast.success(data?.message);
                dispatch(setCustomerInformation(data?.user))
                fetchOrders();
                navigate("/");
            }
            else {
                toast.error(data.error || "Something went wrong")
            }
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    return (
        <>
            {
                showOTP ? (
                    <OTPVerification onOTPVerify={onOTPVerify} />
                ) : (
                    <div className="flex justify-center items-center min-h-screen bg-gray-100">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-bold text-center text-orange-500">Login</h2>
                            <div className="mt-6">
                                <div className="mb-4 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-lg">
                                            Mobile Number
                                        </label>
                                        <PhoneInput
                                            country={"in"}
                                            value={ph}
                                            onChange={setPh}
                                            inputProps={{
                                                name: "mobileNumber",
                                                required: true,
                                                autoFocus: false,
                                                placeholder: "Enter your Mobile Number",
                                            }}
                                            inputClass="!w-full !py-6 !text-lg"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={onSignup}
                                    className="w-full flex gap-1 items-center justify-center bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin" />
                                    )}
                                    <span>Send OTP</span>
                                </button>
                            </div>
                            <p className="mt-4 text-center text-gray-600">
                                Don&apos;t have an account?{" "}
                                <Link to="/signup" className="text-orange-500 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Login;
