import Department from "../models/department.js";
import mongoose from 'mongoose';


// Get all departments
const getDepartment = async (req, res) => {
    try {
        const department = await Department.find();
        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while getting departments" });
    }
};

// Add new department
const addDepartment = async (req, res) => {
    try {
        const { department_name, description } = req.body;

        if (!department_name || !description) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const newDepartment = new Department({ department_name, description });
        await newDepartment.save();

        return res.status(201).json({ success: true, department: newDepartment });
    } catch (error) {
        console.error("Add department error:", error);
        return res.status(500).json({ success: false, error: "Server error while adding department" });
    }
};

// Update department by ID
const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { department_name, description } = req.body;

    if (!department_name || !description) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        const updated = await Department.findByIdAndUpdate(
            id,
            { department_name, description, updatedAt: Date.now() },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, department: updated });
    } catch (error) {
        console.error("Update department error:", error);
        return res.status(500).json({ success: false, error: "Server error while updating department" });
    }
};

const getDepartmentById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid department ID' });
    }

    try {
        const department = await Department.findById(id);
        if (!department) return res.status(404).json({ message: 'Not found' });
        res.json(department);
    } catch (error) {
        console.error('Get department by id error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        //making sure the id
        console.log("Delete request ID:", id);
        
        const deletedep = await Department.findByIdAndDelete(id); 
        if (!deletedep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        console.error("Delete department error:", error);
        return res.status(500).json({ success: false, error: "Server error while deleting department" });
    }
};


export {
    addDepartment,
    getDepartment,
    updateDepartment,
    getDepartmentById,
    deleteDepartment
};
