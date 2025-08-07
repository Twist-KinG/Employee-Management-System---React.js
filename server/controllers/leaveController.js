import mongoose from "mongoose";
import Leave from "../models/leave.js";
import Employee from "../models/Employee.js"

export const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;

        console.log("Leave request body:", req.body.reason);

        // Basic validation
        if (!userId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        console.log("requested leave as:", newLeave);


        await newLeave.save();

        res.status(201).json({ success: true, message: "Leave added successfully", leave: newLeave });
    } catch (error) {
        console.error("Failed to add leave:", error);
        res.status(500).json({ success: false, message: "Failed to add leave", error: error.message });
    }
};


export const getLeavesByUserId = async (req, res) => {
    const userId = req.params.id;

    console.log("Fetching leaves for userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    try {
        // ✅ Fix here
        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 });

        console.log("Leaves found:", leaves.length);
        res.status(200).json({ success: true, leaves });

    } catch (error) {
        console.error("Error in getLeavesByUserId:", error);
        res.status(500).json({ success: false, message: "Failed to fetch leaves", error: error.message });
    }
};



export const deleteLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const userId = req.user.id; // Logged-in user's id from auth middleware

        // Find the leave request by ID
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave not found' });
        }

        // Find employee document for logged-in user
        const employee = await Employee.findOne({ userId });

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Check if the leave belongs to this employee
        if (leave.employeeId.toString() !== employee._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        // Only allow delete if status is "Pending"
        if (leave.status !== 'Pending') {
            return res.status(400).json({ success: false, message: 'Cannot delete approved or rejected leave' });
        }

        // Delete the leave
        await Leave.findByIdAndDelete(leaveId);

        return res.json({ success: true, message: 'Leave deleted successfully' });
    } catch (error) {
        console.error('Error deleting leave:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const getLeaves = async (req, res) => {

    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'department_name'
                },

                {
                    path: 'userId',
                    select: 'username'
                },
            ]
        })

    return res.status(200).json({success: true, leaves})
    } catch(error) {
        console.log(error);
        return res.status(500).json({success: false, error: "leave fetch server error"})
    }


}


export const updateLeaveStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
    }

    try {
        const leave = await Leave.findById(id);

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        leave.status = status;
        await leave.save();

        return res.status(200).json({ success: true, message: `Leave ${status} successfully.` });

    } catch (error) {
        console.error("Error updating leave status:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};



export const getLeavesByEmployeeId = async (req, res) => {
    try {
        const employeeId = req.params.id;
        console.log("Employee ID param:", employeeId);

        const leaves = await Leave.find({ employeeId });

        if (!leaves || leaves.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No leave history found for this employee",
            });
        }

        res.status(200).json({
            success: true,
            leaves,
        });
    } catch (error) {
        console.error("Error fetching leave:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
