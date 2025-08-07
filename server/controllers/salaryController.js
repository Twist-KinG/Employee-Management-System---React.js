import Salary from '../models/salary.js';
import Employee from '../models/employee.js'; // Add this import


    // Add new salary
    export const addSalary = async (req, res) => {
        try {
            const { employeeId, basicSalary, allowances, deduction, payDate } = req.body;

            const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deduction);

            const newSalary = new Salary({
                employeeId,
                basicSalary,
                allowances,
                deduction,
                netSalary: totalSalary,
                payDate
            });

            await newSalary.save();
            
            res.status(201).json({ success: true, message: "Salary added successfully" });

        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to add salary", error: error.message });
        }
    };


    // Get all salaries
// Get all salaries
export const getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate("employeeId", "employeeId email");
        res.status(200).json({ success: true, salaries }); // ✅ wrap in object
    } catch (error) {
        res.status(500).json({ message: "Error fetching salaries", error: error.message });
    }
};


    
    // Get salary by ID
    export const getSalaryById = async (req, res) => {
        try {
            const salary = await Salary.findById(req.params.id).populate("employeeId");
            if (!salary) {
                return res.status(404).json({ message: "Salary not found" });
            }
            res.status(200).json(salary);
        } catch (error) {
            res.status(500).json({ message: "Error fetching salary", error: error.message });
        }
    };


    // Update salary
    export const updateSalary = async (req, res) => {
        try {
            const { basicSalary, allowances, deduction, payDate } = req.body;
            const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deduction);

            const updatedSalary = await Salary.findByIdAndUpdate(
                req.params.id,
                {
                    basicSalary,
                    allowances,
                    deduction,
                    netSalary: totalSalary,
                    payDate
                },
                { new: true }
            );

            if (!updatedSalary) {
                return res.status(404).json({ message: "Salary not found" });
            }

            res.status(200).json({ success: true, message: "Salary updated", salary: updatedSalary });
        } catch (error) {
            res.status(500).json({ message: "Error updating salary", error: error.message });
        }
    };

    // Delete salary
    export const deleteSalary = async (req, res) => {
        try {
            const deleted = await Salary.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "Salary not found" });
            }
            res.status(200).json({ success: true, message: "Salary deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting salary", error: error.message });
        }
};
    


export const getSalaryByEmployeeId = async (req, res) => {
    try {
        console.log("Fetching salaries for employeeId:", req.params.id);

        const salaries = await Salary.find({ employeeId: req.params.id }).populate("employeeId");
        res.status(200).json({ success: true, salary: salaries });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// In salaryController.js
export const getSalaryByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the employee document by userId
        const employee = await Employee.findOne({ userId: userId });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found for user" });
        }

        // Find salaries for that employee
        const salaries = await Salary.find({ employeeId: employee._id }).populate("employeeId");

        res.status(200).json({ success: true, salary: salaries });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
