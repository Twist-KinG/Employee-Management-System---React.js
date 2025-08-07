import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewLeave = () => {
    const { id } = useParams();

    console.log("id from params", id);

    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    let sno = 1;

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/leave/employee/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                setLeaves(response.data.leaves);
                setFilteredLeaves(response.data.leaves);
            } else {
                setLeaves([]);
                setFilteredLeaves([]);
            }
        } catch (error) {
            console.error("Error fetching leave history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchLeaves();
        }
    }, [id]);

    const filterLeaves = (e) => {
        const q = e.target.value;
        const filtered = leaves.filter((l) =>
            l.leaveType.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredLeaves(filtered);
    };

    if (loading) return <div>Loading leave history...</div>;

    return (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Leave History</h2>
            </div>

            <div className="flex justify-end my-3">
                <input
                    type="text"
                    placeholder="Search by leave type"
                    className="border px-2 rounded-md py-0.5 border-gray-300"
                    onChange={filterLeaves}
                />
            </div>

            {filteredLeaves.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                            <th className="px-6 py-3">Leave Type</th>
                            <th className="px-6 py-3">Days</th>
                            <th className="px-6 py-3">Start Date</th>
                            <th className="px-6 py-3">End Date</th>
                            <th className="px-6 py-3">Reason</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.map((leave) => {
                            const startDate = new Date(leave.startDate);
                            const endDate = new Date(leave.endDate);

                            // Calculate days inclusive of start and end date
                            const days =
                                Math.ceil(
                                    (endDate - startDate) / (1000 * 60 * 60 * 24)
                                ) + 1;

                            return (
                                <tr key={leave._id} className="bg-white border-b">
                                    <td className="px-6 py-3">{sno++}</td>
                                    <td className="px-6 py-3">{leave.leaveType}</td>
                                    <td className="px-6 py-3">{days}</td>
                                    <td className="px-6 py-3">
                                        {startDate.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3">{endDate.toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{leave.reason}</td>
                                    <td className="px-6 py-3">{leave.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div>No leave history found.</div>
            )}

            <div className="w-full flex items-center justify-center mt-8">
                <Link
                    to="/admin-dashboard/employees"
                    className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Back to Employee List
                </Link>
            </div>
        </div>
    );
};

export default ViewLeave;
