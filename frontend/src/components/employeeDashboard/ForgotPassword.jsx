import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleSendOTP = async () => {
        try {
            const res = await axios.post('/api/auth/send-otp', { email });
            setMessage(res.data.message);
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error');
        }
    };

    const handleResetPassword = async () => {
        try {
            const res = await axios.post('/api/auth/reset-password', {
                email,
                otp,
                newPassword
            });
            setMessage(res.data.message);
            setStep(1);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Forgot Password</h2>

            {step === 1 ? (
                <>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button
                        onClick={handleSendOTP}
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                        Send OTP
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                    >
                        Reset Password
                    </button>
                </>
            )}

            {message && (
                <p className="mt-4 text-center text-gray-700">{message}</p>
            )}

            <div className="mt-6 text-center">

            </div>

            <div className="w-full text-center">

                <Link to="/employee-dashboard/setting" className=' text-blue-600 hover:text-blue-700 hover:underline transition'>
                    Cancel reset password 
                </Link>
                
            </div>

        </div>
    );
};

export default ForgotPassword;
