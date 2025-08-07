
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LeaveList = () => {
    // State to store all leave records
    const [leaves, setLeaves] = useState([]);

    // State for loading indicator
    const [loading, setLoading] = useState(true);

    // State for search input (used for filtering by type or status)
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const leavesPerPage = 5; // change as needed

    // Fetch leave records for the logged-in user
    useEffect(() => {
        const fetchLeaves = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) {
                console.error("User ID or token missing");
                setLoading(false);
                return;
            }

            try {
                console.log("Fetching leaves for userId:", userId);

                const response = await axios.get(
                    `http://localhost:5000/api/leave/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Leave API response:", response.data);

                if (response.data.success) {
                    setLeaves(response.data.leaves); // Set the fetched leaves
                } else {
                    console.warn("Failed to fetch leaves", response.data);
                }
            } catch (error) {
                console.error("Error fetching leave data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    // Filter leaves based on search input (match leave type or status)
    const filteredLeaves = leaves.filter((leave) => {
        const query = searchQuery.toLowerCase();
        return (
            leave.leaveType.toLowerCase().includes(query) ||
            leave.status.toLowerCase().includes(query)
        );
    });

    // Pagination calculations
    const indexOfLastLeave = currentPage * leavesPerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
    const currentLeaves = filteredLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
    const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

    // Delete leave handler (only for pending leaves)
    const handleDelete = async (leaveId) => {
        if (!window.confirm("Are you sure you want to delete this leave request?")) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication token missing. Please login again.");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:5000/api/leave/${leaveId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                // Remove deleted leave from state to update UI
                setLeaves((prev) => prev.filter((leave) => leave._id !== leaveId));
            } else {
                alert("Failed to delete leave. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting leave:", error);
            alert("An error occurred while deleting the leave.");
        }
    };

    // Total leaves taken (approved leaves count)
    const totalApprovedLeaves = leaves.filter(
        (leave) => leave.status === "Approved"
    ).length;

    // Pagination controls component
    const PaginationControls = () => (
        <div className="flex justify-center gap-3 mt-4">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"
                    }`}
            >
                Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded ${pageNum === currentPage
                                ? "bg-blue-600 text-white"
                                : "hover:bg-blue-100"
                            }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-100"
                    }`}
            >
                Next
            </button>
        </div>
    );

    return (
        <div className="p-5 mt-4">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-center mb-4 text-blue-600">
                Manage Leaves
            </h3>

            {/* Total leaves taken */}
            <p className="text-center mb-4 font-semibold">
                Total Leaves Taken (Approved): {totalApprovedLeaves}
            </p>

            {/* Top Section: Search bar + Add Leave button */}
            <div className="flex justify-between mb-8 flex-col md:flex-row gap-2">
                {/* Search input to filter by leave type or status */}
                <input
                    className="px-4 py-1 border rounded outline-none"
                    type="text"
                    placeholder="Search by Type or Status"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on new search
                    }}
                />

                {/* Add Leave button */}
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                    Add New Leave
                </Link>
            </div>

            {/* Conditional Rendering: Loader, No records, or Table */}
            {loading ? (
                <p className="text-center">Loading leave data...</p>
            ) : filteredLeaves.length === 0 ? (
                <p className="text-center">No leave records found.</p>
            ) : (
                <>
                    <table className="min-w-full border border-black rounded-lg">
                        {/* Table Header */}
                        <thead className="bg-blue-600 text-white text-center">
                            <tr>
                                <th className="px-4 border-black border py-3">S.N.</th>
                                <th className="px-4 border-black border py-3">Leave Type</th>
                                <th className="px-4 border-black border py-3">From</th>
                                <th className="px-4 border-black border py-3">To</th>
                                <th className="px-4 border-black border py-3">Reason</th>
                                <th className="px-4 border-black border py-3">Status</th>
                                <th className="px-4 border-black border py-3">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-left">
                            {currentLeaves.map((leave, idx) => (
                                <tr
                                    key={leave._id}
                                    className={`text-gray-800 text-center hover:bg-blue-50 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"
                                        }`}
                                >
                                    <td className="border border-black px-4 py-2 font-semibold">
                                        {indexOfFirstLeave + idx + 1}
                                    </td>
                                    <td className="border border-black px-4 py-2">{leave.leaveType}</td>
                                    <td className="border border-black px-4 py-2">
                                        {new Date(leave.startDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-black px-4 py-2">
                                        {new Date(leave.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-black px-4 py-2">{leave.reason}</td>
                                    <td
                                        className={`border border-black px-4 py-2 font-semibold ${leave.status === "Pending"
                                                ? "text-yellow-600"
                                                : leave.status === "Approved"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {leave.status}
                                    </td>

                                    {/* Show delete button only if status is Pending */}
                                    <td className="border border-black px-4 py-2">
                                        {leave.status === "Pending" && (
                                            <button
                                                onClick={() => handleDelete(leave._id)}
                                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <PaginationControls />
                </>
            )}
        </div>
    );
};

export default LeaveList;
