
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewSalary = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const { id } = useParams();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/salary/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to fetch salary data.");
        }
    };


    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (e) => {
        const q = e.target.value;
        const filteredRecords = salaries.filter((s) =>
            s.employeeId?.employeeId?.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Salary History</h2>
            </div>

            <div className="flex justify-end my-3">
                <input
                    type="text"
                    placeholder="Search employee"
                    className="border px-2 rounded-md py-0.5 border-gray-300"
                    onChange={filterSalaries}
                />
            </div>

            {filteredSalaries.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                            <th className="px-6 py-3">Employee ID</th>
                            <th className="px-6 py-3">Salary</th>
                            <th className="px-6 py-3">Allowance</th>
                            <th className="px-6 py-3">Deduction</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary) => (
                            <tr key={salary._id} className="bg-white border-b">
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">
                                    {salary.employeeId?.employeeId || salary.employeeId}
                                </td>
                                <td className="px-6 py-3">{salary.basicSalary}</td>
                                <td className="px-6 py-3">{salary.allowances}</td>
                                <td className="px-6 py-3">{salary.deduction}</td>
                                <td className="px-6 py-3">{salary.netSalary}</td>
                                <td className="px-6 py-3">
                                    {new Date(salary.payDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>

            ): (
                <div>No Records Found</div>
            )}

                        <div className="w-full flex items-center justify-center mt-8">
                            <Link
                                to="/admin-dashboard/employees"
                                className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                                Back to Employee List
                            </Link>
                        </div>
        </div>
    );
};

export default ViewSalary;
