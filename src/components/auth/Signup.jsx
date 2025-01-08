import { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import OTPVerification from "./OTPVerification";
import axiosInstance from "@/api/axiosInstance";
import { useDispatch } from "react-redux";
import { setCustomerInformation } from "@/redux/user";

const Signup = () => {
    const [formData, setFormData] = useState({
        mobileNumber: '',
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const dispatch = useDispatch();

    const handlePhoneChange = (phone) => {
        setFormData({
            ...formData,
            mobileNumber: phone,
        });
    };

    const onSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axiosInstance.post(`/auth/register`,
                { ...formData, mobileNumber: formData.mobileNumber.slice(-10) },
            );
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

    const onOTPVerify = async (otp) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post(`/auth/verify-otp-register`,
                { mobileNumber: formData.mobileNumber.slice(-10), otp },
            );
            if (data.success) {
                toast.success(data.message);
                dispatch(setCustomerInformation(data?.user))
                navigate('/');
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
                    <div className="mt-5 mb-5 flex justify-center items-center min-h-screen bg-gray-100">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-bold text-center text-orange-500">Sign Up</h2>
                            <form className="mt-6 space-y-4" onSubmit={onSignup}>

                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter Name"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Mobile Number
                                    </label>
                                    <PhoneInput
                                        country={"in"}
                                        value={formData.mobileNumber}
                                        onChange={handlePhoneChange}
                                        inputProps={{
                                            name: "mobileNumber",
                                            required: true,
                                            autoFocus: false,
                                            placeholder: "Enter your Mobile Number",
                                        }}
                                        inputClass="!w-full !py-5 !text-md"
                                    />
                                </div>

                                {/* Email */}
                                <div className="">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    {/* <FiMail className="absolute left-3 top-8 text-gray-400" /> */}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        className="w-full flex gap-1 items-center justify-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <p className="mt-4 text-center text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-orange-500 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Signup;
