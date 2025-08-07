import React from 'react';
import { useAuth } from '../../context/authContext';

const EmployeeSummary = () => {

    const { user } = useAuth();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-700">Welcome back, {user.username || 'Employee'}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details Card */}
                <div className="bg-white shadow-lg rounded-xl p-5">
                    <h2 className="text-xl font-semibold mb-3 text-blue-700">My Profile</h2>
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Department:</strong> {user.department}</p>
                </div>

                {/* Job Details Card */}
                <div className="bg-white shadow-lg rounded-xl p-5">
                    <h2 className="text-xl font-semibold mb-3 text-blue-700">Job Information</h2>
                    <p><strong>Join Date:</strong> {user.joinDate}</p>
                    <p><strong>Salary:</strong> Rs. {user.salary || 'N/A'}</p>
                    <p><strong>Status:</strong> Active</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSummary;
