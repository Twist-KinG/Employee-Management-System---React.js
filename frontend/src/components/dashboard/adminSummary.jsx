
// import SummaryCard from './summaryCard'
// import { IoPeopleOutline } from "react-icons/io5";
// import { TbHomePlus } from "react-icons/tb";
// import { GiMoneyStack } from "react-icons/gi";
// import { IoMdDoneAll } from "react-icons/io";
// import { GiSandsOfTime } from "react-icons/gi";
// import { FaFileAlt } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";


// const adminSummary = () => {
//     return (
//         <div className='p-6'>
//             <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
//                 <SummaryCard icon={<IoPeopleOutline />} text="Total Employees" number={2} color="bg-blue-600" />

//                 <SummaryCard icon={<TbHomePlus />} text="Departments" number={2} color="bg-yellow-500" />

//                 <SummaryCard icon={<GiMoneyStack />} text="Salary" number={2} color="bg-green-600" />
//             </div>

//             <div className='mt-12'>
//                 <h3 className='text-center text-2xl font-bold'>Leave Details</h3>

//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

//                     <SummaryCard icon={<IoMdDoneAll />} text="Approved Leave" number={2} color="bg-green-600" />

//                     <SummaryCard icon={<GiSandsOfTime />} text="Pending Leave" number={2} color="bg-yellow-600" />

//                     <SummaryCard icon={<RxCross2 />} text="Rejected Leave" number={2} color="bg-red-600" />

//                     <SummaryCard icon={<FaFileAlt />} text="Applied Leave" number={2} color="bg-teal-600" />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default adminSummary


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCard from './summaryCard';
import { IoPeopleOutline } from "react-icons/io5";
import { TbHomePlus } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";
import { FaFileAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AdminSummary = () => {
    const [summary, setSummary] = useState({
        totalEmployees: 0,
        departments: 0,
        totalSalaryRecords: 0,
        totalSalariesPaid: 0,
        approvedLeaves: 0,
        pendingLeaves: 0,
        rejectedLeaves: 0,
        appliedLeaves: 0
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/summary');
                setSummary(res.data);
            } catch (err) {
                console.error("Error fetching summary:", err);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div className='p-6'>
            <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon={<IoPeopleOutline />} text="Total Employees" number={summary.totalEmployees} color="bg-blue-600" />
                <SummaryCard icon={<TbHomePlus />} text="Departments" number={summary.departments} color="bg-yellow-500" />

                {/* <SummaryCard icon={<GiMoneyStack />} text="Salary" number={summary.totalSalaryRecords} color="bg-green-600" /> */}
                <SummaryCard
                    icon={<GiMoneyStack />}
                    text="Total Salary Paid"
                    number={`Rs. ${summary.totalSalariesPaid}`}
                    color="bg-green-600"
                />


            </div>

            <div className='mt-12'>
                <h3 className='text-center text-2xl font-bold'>Leave Details</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <SummaryCard icon={<IoMdDoneAll />} text="Approved Leave" number={summary.approvedLeaves} color="bg-green-600" />
                    <SummaryCard icon={<GiSandsOfTime />} text="Pending Leave" number={summary.pendingLeaves} color="bg-yellow-600" />
                    <SummaryCard icon={<RxCross2 />} text="Rejected Leave" number={summary.rejectedLeaves} color="bg-red-600" />
                    <SummaryCard icon={<FaFileAlt />} text="Applied Leave" number={summary.appliedLeaves} color="bg-teal-600" />
                </div>
            </div>
        </div>
    );
};

export default AdminSummary;
