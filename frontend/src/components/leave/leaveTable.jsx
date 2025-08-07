

// import React, { useEffect, useState } from 'react'
// import DataTable from "react-data-table-component";
// import { columns } from '../../utils/leaveHelper';
// import { Leavebuttons } from '../../utils/leaveHelper';
// import axios from "axios";

// const LeaveTable = () => {

//     const [searchText, setSearchText] = useState("");  // search input state
//     const [leaves, setLeaves] = useState([]);
//     const [filteredLeaves, setFilteredLeaves] = useState([]); // filtered leaves to show

//     const fetchLeaves = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/leave`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });

//             if (response.data.success) {
//                 const data = response.data.leaves.map((leave, index) => ({
//                     _id: leave._id,
//                     sno: index + 1,
//                     employeeId: leave.employeeId.employeeId,
//                     name:
//                         leave.employeeId.userId.name ||
//                         leave.employeeId.userId.username ||
//                         leave.employeeId.userId.email,
//                     department: leave.employeeId.department.department_name,
//                     leaveType: leave.leaveType,
//                     reason: leave.reason,
//                     days:
//                         (new Date(leave.endDate) - new Date(leave.startDate)) /
//                         (1000 * 60 * 60 * 24) +
//                         1,
//                     status: leave.status,
//                     action: <Leavebuttons Id={leave._id} currentStatus={leave.status} />, // pass currentStatus here
//                 }));

//                 setLeaves(data);
//                 setFilteredLeaves(data);
//             }
//         } catch (error) {
//             console.error("Error fetching leaves", error);
//         }
//     };



//     useEffect(() => {
//         fetchLeaves();
//     }, []);

//     // Search input handler
//     const handleSearchChange = (event) => {
//         const value = event.target.value.toLowerCase();
//         setSearchText(value);

//         // Filter leaves by employeeId or leaveType (case-insensitive)
//         const filtered = leaves.filter(
//             (leave) =>
//                 leave.employeeId.toLowerCase().includes(value) ||
//                 leave.leaveType.toLowerCase().includes(value)
//         );
//         setFilteredLeaves(filtered);
//     };

//     return (
//         <>
//             {leaves ? (
//                 <div className="p-5 overflow-x-auto">
//                     <h3 className="text-2xl font-bold text-center mb-4">Manage Leaves</h3>

//                     <div className="flex justify-between mb-4">
//                         <input
//                             className="px-4 py-1 border rounded outline-none w-60"
//                             type="text"
//                             placeholder="Employee ID or Leave Type"
//                             value={searchText}
//                             onChange={handleSearchChange}
//                         />

//                         <div className="flex gap-3">
//                             <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Pending</button>
//                             <button className="bg-blue-600 text-white px-3 p1 rounded hover:bg-blue-700">Approved</button>
//                             <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Rejected</button>
//                         </div>
//                     </div>

//                     <DataTable columns={columns} data={filteredLeaves} pagination />
//                 </div>
//             ) : (
//                 <div>Loading </div>
//             )}
//         </>
//     );
// };

// export default LeaveTable;


import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { columns } from '../../utils/leaveHelper';
import { Leavebuttons } from '../../utils/leaveHelper';
import axios from "axios";

const LeaveTable = () => {

    const [searchText, setSearchText] = useState("");  // search input state
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]); // filtered leaves to show
    const [activeStatusFilter, setActiveStatusFilter] = useState(""); // "", "Pending", "Approved", or "Rejected"

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.leaves.map((leave, index) => ({
                    _id: leave._id,
                    sno: index + 1,
                    employeeId: leave.employeeId.employeeId,
                    name:
                        leave.employeeId.userId.name ||
                        leave.employeeId.userId.username ||
                        leave.employeeId.userId.email,
                    department: leave.employeeId.department.department_name,
                    leaveType: leave.leaveType,
                    reason: leave.reason,
                    days:
                        (new Date(leave.endDate) - new Date(leave.startDate)) /
                        (1000 * 60 * 60 * 24) +
                        1,
                    status: leave.status,
                    action: <Leavebuttons Id={leave._id} currentStatus={leave.status} />, // pass currentStatus here
                }));

                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            console.error("Error fetching leaves", error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    // Filter leaves based on search text and active status filter
    useEffect(() => {
        let filtered = leaves;

        if (activeStatusFilter) {
            filtered = filtered.filter(leave => leave.status === activeStatusFilter);
        }

        if (searchText) {
            filtered = filtered.filter(
                leave =>
                    leave.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
                    leave.leaveType.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        setFilteredLeaves(filtered);
    }, [searchText, activeStatusFilter, leaves]);

    // Search input handler
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    // Status filter button click handler
    const handleStatusFilterClick = (status) => {
        if (activeStatusFilter === status) {
            setActiveStatusFilter(""); // toggle off if already active
        } else {
            setActiveStatusFilter(status);
        }
    };

    // Helper to check if button is active
    const isActive = (status) => activeStatusFilter === status;

    return (
        <>
            {leaves ? (
                <div className="p-5 overflow-x-auto">
                    <h3 className="text-2xl font-bold text-center mb-4">Manage Leaves</h3>

                    <div className="flex justify-between mb-4">
                        <input
                            className="px-4 py-1 border rounded outline-none w-60"
                            type="text"
                            placeholder="Employee ID or Leave Type"
                            value={searchText}
                            onChange={handleSearchChange}
                        />

                        <div className="flex gap-3">
                            <button
                                className={`px-3 py-1 rounded hover:bg-blue-700 ${isActive("Pending") ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
                                    }`}
                                onClick={() => handleStatusFilterClick("Pending")}
                            >
                                Pending
                            </button>
                            <button
                                className={`px-3 py-1 rounded hover:bg-blue-700 ${isActive("Approved") ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
                                    }`}
                                onClick={() => handleStatusFilterClick("Approved")}
                            >
                                Approved
                            </button>
                            <button
                                className={`px-3 py-1 rounded hover:bg-blue-700 ${isActive("Rejected") ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
                                    }`}
                                onClick={() => handleStatusFilterClick("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>

                    <DataTable columns={columns} data={filteredLeaves} pagination />
                </div>
            ) : (
                <div>Loading </div>
            )}
        </>
    );
};

export default LeaveTable;
