
// import React, { useState } from 'react';
// import axios from 'axios';
// // import { Link } from 'react-router-dom';  // For navigation to Forgot Password page

// const ChangePassword = () => {
//     // State for form inputs and response message
//     // const [email, setEmail] = useState('');
//     const [oldPassword, setOldPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [message, setMessage] = useState('');

//     // Handle change password form submission
//     const handleChangePassword = async () => {
//         try {
//             // Retrieve token from local storage (assumes user is logged in)
//             const token = localStorage.getItem('token');

//             // Debug print to console
//             console.log("JWT token:", token);

//             // Send POST request to backend with authorization header
//             const res = await axios.post(
//                 'http://localhost:5000/api/auth/change-password',
//                 {
//                     oldPassword,
//                     newPassword
//                 },
//                 {
//                     headers: {
//                         // Attach token in Authorization header
//                         Authorization: `Bearer ${token}`,
//                     }
//                 }
//             );

//             // Show success message returned by backend
//             setMessage(res.data.message);

//             alert("password changed", res.data.message)

//         } catch (err) {
//             // Handle error response or unknown error
//             setMessage(err.response?.data?.message || 'Error occurred while changing password');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Change Password</h2>

//             {/* Email Input
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//             /> */}

//             {/* Old Password Input */}

//             <input
//                 type="password"
//                 placeholder="Old Password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//             />

//             {/* New Password Input */}
//             <input
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//             />

//             {/* Submit Button */}
//             <button
//                 onClick={handleChangePassword}
//                 className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
//             >
//                 Change
//             </button>

//             {/* Message Output */}
//             {message && (
//                 <p className="mt-4 text-center text-gray-700">{message}</p>
//             )}

//             {/* Forgot Password Redirect Link */}
//             {/* <div className="mt-6 text-center">
//                 <Link
//                     to="/employee-dashboard/forgot-password"
//                     className="text-blue-600 hover:underline"
//                 >
//                     Forgot Password? Reset
//                 </Link>
//             </div> */}

//         </div>
//     );
// };

// export default ChangePassword;


import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    // State for form inputs and response message
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Handle change password form submission
    const handleChangePassword = async () => {
        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }

        try {
            // Retrieve token from local storage (assumes user is logged in)
            const token = localStorage.getItem('token');

            // Debug print to console
            console.log("JWT token:", token);

            // Send POST request to backend with authorization header
            const res = await axios.post(
                'http://localhost:5000/api/auth/change-password',
                {
                    oldPassword,
                    newPassword
                },
                {
                    headers: {
                        // Attach token in Authorization header
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // Show success message returned by backend
            setMessage(res.data.message);
            
            alert(res.data.message);

            // Clear form inputs after successful change
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            // Handle error response or unknown error
            setMessage(err.response?.data?.message || 'Error occurred while changing password');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Change Password</h2>

            {/* Old Password Input */}
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* New Password Input */}
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* Confirm Password Input */}
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* Submit Button */}
            <button
                onClick={handleChangePassword}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
                Change
            </button>

            {/* Message Output */}
            {message && (
                <p className="mt-4 text-center text-gray-700">{message}</p>
            )}
        </div>
    );
};

export default ChangePassword;
