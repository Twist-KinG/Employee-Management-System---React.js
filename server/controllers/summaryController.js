
// // // import Employee from '../models/Employee.js';
// // // import Department from '../models/department.js';
// // // import Salary from '../models/salary.js';
// // // import Leave from '../models/leave.js';

// // // export const getAdminSummary = async (req, res) => {
// // //     try {
// // //         const totalEmployees = await Employee.countDocuments();
// // //         const departments = await Department.countDocuments();
// // //         const totalSalaryRecords = await Salary.countDocuments();
// // //         const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
// // //         const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
// // //         const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });
// // //         const appliedLeaves = await Leave.countDocuments();

// // //         res.json({
// // //             totalEmployees,
// // //             departments,
// // //             totalSalaryRecords,
// // //             approvedLeaves,
// // //             pendingLeaves,
// // //             rejectedLeaves,
// // //             appliedLeaves
// // //         });
// // //     } catch (err) {
// // //         res.status(500).json({ message: 'Error fetching admin summary' });
// // //     }
// // // };

// // import Employee from '../models/Employee.js';
// // import Department from '../models/department.js';
// // import Salary from '../models/salary.js';
// // import Leave from '../models/leave.js';

// // export const getAdminSummary = async (req, res) => {
// //     try {
// //         const totalEmployees = await Employee.countDocuments();
// //         const departments = await Department.countDocuments();

// //         const totalSalaryRecords = await Salary.countDocuments();

// //         // 💰 Get total salaries paid
// //         const salaryData = await Salary.find();
// //         const totalSalariesPaid = salaryData.reduce((acc, curr) => acc + curr.amount, 0);

// //         const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
// //         const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
// //         const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });
// //         const appliedLeaves = await Leave.countDocuments();

// //         res.json({
// //             totalEmployees,
// //             departments,
// //             totalSalaryRecords,
// //             totalSalariesPaid,         // 👈 Include in response
// //             approvedLeaves,
// //             pendingLeaves,
// //             rejectedLeaves,
// //             appliedLeaves
// //         });
// //     } catch (err) {
// //         res.status(500).json({ message: 'Error fetching admin summary' });
// //     }
// // };


// import Employee from '../models/Employee.js';
// import Department from '../models/department.js';
// import Salary from '../models/salary.js';
// import Leave from '../models/leave.js';

// export const getAdminSummary = async (req, res) => {
//     try {
//         const totalEmployees = await Employee.countDocuments();
//         const departments = await Department.countDocuments();
//         const totalSalaryRecords = await Salary.countDocuments();
//         const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
//         const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
//         const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });
//         const appliedLeaves = await Leave.countDocuments();

//         // Calculate total amount of all salaries
//         const salaryData = await Salary.find();
//         const totalSalariesPaid = salaryData.reduce((sum, salary) => sum + (salary.amount || 0), 0);

//         res.json({
//             totalEmployees,
//             departments,
//             totalSalaryRecords,
//             totalSalariesPaid,
//             approvedLeaves,
//             pendingLeaves,
//             rejectedLeaves,
//             appliedLeaves
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching admin summary' });
//     }
// };


import Employee from '../models/Employee.js';
import Department from '../models/department.js';
import Salary from '../models/salary.js';
import Leave from '../models/leave.js';

export const getAdminSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const departments = await Department.countDocuments();
        const totalSalaryRecords = await Salary.countDocuments();

        // ✅ Sum netSalary instead of non-existing 'amount'
        const salaryData = await Salary.find();
        const totalSalariesPaid = salaryData.reduce((sum, salary) => sum + (salary.netSalary || 0), 0);

        const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
        const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
        const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });
        const appliedLeaves = await Leave.countDocuments();

        res.json({
            totalEmployees,
            departments,
            totalSalaryRecords,
            totalSalariesPaid,
            approvedLeaves,
            pendingLeaves,
            rejectedLeaves,
            appliedLeaves
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching admin summary' });
    }
};
