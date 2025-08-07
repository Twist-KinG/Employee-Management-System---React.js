
import React, { useEffect, useState } from "react";
import axios from "axios";

const Salary = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalaries = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) {
                console.error("User ID or token missing");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching salary for userId:", userId);

                const response = await axios.get(
                    `http://localhost:5000/api/salary/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Salary API response:", response.data);

                if (response.data.success) {
                    setSalaries(response.data.salary);
                } else {
                    console.warn("Failed to fetch salaries", response.data);
                }
            } catch (error) {
                console.error("Error fetching salary data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalaries();
    }, []);

    if (loading) return <div className="text-center mt-10 text-blue-600 font-semibold">Loading salary data...</div>;

    if (salaries.length === 0)
        return (
            <div className="text-center mt-10 text-red-500 font-semibold">
                No salary records found.
            </div>
        );

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-10">
            <h3 className="text-3xl font-bold mb-6 text-blue-600 border-b-4 border-blue-600 pb-2">
                My Salary Details
            </h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-black rounded-lg">
                    <thead className="bg-blue-600 text-white text-left">
                        <tr>
                            <th className="px-4 border-black border py-3">S.N.</th>
                            <th className="px-4 border-black border py-3">Basic Salary</th>
                            <th className="px-4 border-black border py-3">Allowances</th>
                            <th className="px-4 border-black border py-3">Deduction</th>
                            <th className="px-4 border-black border py-3">Net Salary</th>
                            <th className="px-4 border-black border py-3">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map((salary, idx) => (
                            <tr
                                key={salary._id}
                                className={`text-gray-800 text-center hover:bg-blue-50 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"
                                    }`}
                            >
                                <td className="border border-black px-4 py-2 font-semibold">{idx + 1}</td>
                                <td className="border border-black px-4 py-2">{salary.basicSalary}</td>
                                <td className="border border-black px-4 py-2">{salary.allowances}</td>
                                <td className="border border-black px-4 py-2 text-red-600 font-semibold">
                                    {salary.deduction}
                                </td>
                                <td className="border border-black px-4 py-2 text-green-600 font-semibold">
                                    {salary.netSalary}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {new Date(salary.payDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Salary;
