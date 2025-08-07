import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SalaryList = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    // Fetch all salaries
    const fetchSalaries = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/salary", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setSalaries(response.data.salaries);
                setFilteredSalaries(response.data.salaries);
            }
        } catch (error) {
            console.error("Error fetching salaries:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter salaries by employee ID or name
    const handleSearch = (e) => {
        const q = e.target.value.toLowerCase();
        setQuery(q);
        const filtered = salaries.filter(
            (s) =>
                s.employeeId?.employeeId?.toLowerCase().includes(q) ||
                s.employeeId?.fullName?.toLowerCase().includes(q)
        );
        setFilteredSalaries(filtered);
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    return (
        <div className="p-5 overflow-x-auto">

            <h2 className="text-xl font-bold text-center mb-4">All Salary Records</h2>

            <div className="flex justify-between mb-4">
                {/* search employee */}
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search by employee ID"
                    className="px-4 py-1 border rounded outline-none" />

                {/* add salary button */}
                <button
                    onClick={() => navigate("/admin-dashboard/salary/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Add Salary
                </button>

            </div>

            {loading ? (
                <div>Loading...</div>
            ) : filteredSalaries.length === 0 ? (
                <div>No salary records found.</div>) : (

                <table className="w-full text-base text-left text-gray-800 border">
                    <thead className="text-sm text-white uppercase bg-blue-600">
                        <tr>
                            <th className="border border-black px-4 py-3">S.N.</th>
                            <th className="border border-black px-4 py-3">Employee ID</th>
                            <th className="border border-black px-4 py-3">Basic Salary</th>
                            <th className="border border-black px-4 py-3">Allowance</th>
                            <th className="border border-black px-4 py-3">Deduction</th>
                            <th className="border border-black px-4 py-3">Net Salary</th>
                            <th className="border border-black px-4 py-3">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary, index) => (
                            <tr
                                key={salary._id}
                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } border-b hover:bg-gray-100`}
                            >
                                <td className="border px-4 py-3 font-medium">{index + 1}</td>
                                <td className="border px-4 py-3">{salary.employeeId?.employeeId}</td>
                                <td className="border px-4 py-3">Rs. {salary.basicSalary}</td>
                                <td className="border px-4 py-3">Rs. {salary.allowances}</td>
                                <td className="border border-black px-4 py-3 text-red-600">Rs. {salary.deduction}</td>
                                <td className="border border-black px-4 py-3 font-semibold text-green-600">
                                    Rs. {salary.netSalary}
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(salary.payDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                            </tbody>
                        
                        </table>
                    
            )}

        </div>
    );
};

export default SalaryList;
