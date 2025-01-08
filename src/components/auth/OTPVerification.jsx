import React, { useState } from "react";
import OTPInput from "react-otp-input";
import OtpInput from "otp-input-react";

const OTPVerification = ({ onOTPVerify }) => {
    const [otp, setOtp] = useState("");

    const handleSubmit = () => {
        onOTPVerify(otp);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-orange-500">OTP Verification</h2>
                <div className="mt-6">
                    <div className="flex justify-center mb-6">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            otpType="number"
                            OTPLength={6}
                            separator={<span className="mx-2">-</span>}
                            inputClassName="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors"
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
