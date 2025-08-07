import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                } else {
                    setError("Failed to load employee data");
                }
            } catch (err) {
                setError("Error fetching employee data");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <div className="text-center text-blue-600 py-6">Loading employee data...</div>;
    if (error) return <div className="text-center text-red-600 py-6">{error}</div>;
    if (!employee) return <div className="text-center text-gray-600 py-6">No employee data found.</div>;

    const {
        userId: { name, email, profileImage, role },
        employeeId,
        dob,
        gender,
        maritalStatus,
        department,
        designation,
        salary,
    } = employee;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600 border-b pb-2">Employee Profile</h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 mb-8">
                <img
                    src={`http://localhost:5000/${profileImage}`}
                    className="w-32 h-32 rounded-full object-cover border border-blue-600 shadow"
                />
                <div className="mt-4 sm:mt-0">
                    <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-600">{email}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-1 capitalize">{role}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-sm">
                <div>
                    <span className="font-semibold">Employee ID:</span> {employeeId}
                </div>
                <div>
                    <span className="font-semibold">Department:</span> {department?.department_name || "N/A"}
                </div>
                <div>
                    <span className="font-semibold">Designation:</span> {designation}
                </div>
                <div>
                    <span className="font-semibold">DOB:</span> {new Date(dob).toDateString()}
                </div>
                <div>
                    <span className="font-semibold">Gender:</span> {gender}
                </div>
                <div>
                    <span className="font-semibold">Marital Status:</span> {maritalStatus}
                </div>
                <div className="sm:col-span-2">
                    <span className="font-semibold">Salary:</span> ₹{salary.toLocaleString()}
                </div>
            </div>

            <div className="mt-8">
                <Link
                    to="/admin-dashboard/employees"
                    className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    ← Back to Employee List
                </Link>
            </div>
            
        </div>
    );
};

export default ViewEmployee;
