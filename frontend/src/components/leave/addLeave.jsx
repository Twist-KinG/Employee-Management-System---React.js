import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddLeave = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: user._id,
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting leave request:", formData);

        // API submission logic here
        try {
            const response = await axios.post(`http://localhost:5000/api/leave/add`,formData,  {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                navigate('/employee-dashboard/leaves')
            }

        } catch (error) {
            return ("Error fetching employee data");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">

            <div className="bg-white p-6 rounded-lg shadow-md">

                <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 border-b-2 border-blue-600 pb-2">
                    Apply for Leave
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Leave Type */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Leave Type
                        </label>
                        <select
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        >
                            <option value="">-- Select Leave Type --</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Paid Leave">Paid Leave</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className="flex flex-col sm:flex-row gap-4">

                        <div className="w-full sm:w-1/2">
                            <label className="block mb-2 font-medium text-gray-700">
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required />
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label className="block mb-2 font-medium text-gray-700">
                                End Date
                            </label>

                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required />
                        </div>

                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Reason
                        </label>

                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your reason for leave..."
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Submit Leave Request
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddLeave;
