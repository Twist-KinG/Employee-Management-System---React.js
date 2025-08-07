
import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../models/department.js";
import { isStrongPassword } from '../utils/validators.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// const addEmployee = async (req, res) => {

//     try {
//         console.log("Incoming form data:", req.body);
//         console.log("Uploaded file:", req.file);

//         const {
//             name,
//             email,
//             employeeId,
//             dob,
//             gender,
//             maritalStatus,
//             department,
//             designation,
//             salary,
//             password,
//             role,
//         } = req.body;


//         console.log(req.body);
        

//         // Validate presence of required fields (optional extra check)
//         if (
//             !name ||
//             !email ||
//             !employeeId ||
//             !dob ||
//             !gender ||
//             !maritalStatus ||
//             !department ||
//             !designation ||
//             !salary ||
//             !password ||
//             !role
//         ) {
//             return res.status(400).json({ success: false, error: "Missing required fields" });
//         }

//         const profileImage = req.file ? req.file.filename : "default.jpg";

//         // Check duplicate email
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, error: "Email already exists" });
//         }

//         // Check duplicate employeeId
//         const existingEmployee = await Employee.findOne({ employeeId });
//         if (existingEmployee) {
//             return res.status(400).json({ success: false, error: "Employee ID already exists" });
//         }

//         // Convert salary to number
//         const salaryNum = Number(salary);
//         if (isNaN(salaryNum)) {
//             return res.status(400).json({ success: false, error: "Invalid salary" });
//         }

//         // passsword strength validation
//         if (!isStrongPassword(password)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password must be at least 8 characters long and include uppercase, lowercase, and a special character.",
//             });
//         }

//         // Hash password
// console.log("plain password");

// console.log(req.body.password);

// const hashPassword = await bcrypt.hash(password, 10);

// console.log("hashed password");
//         console.log(hashPassword);
        
//         // Create User
//         const newUser = new User({
//             name,
//             username: email,
//             email,
//             password: hashPassword,
//             role,
//             profileImage: profileImage,
//         });

//         console.log("again saving hashed");

//         console.log(hashPassword);
        
        
//         await newUser.save();

//         console.log("saved hased");
//         console.log(password);
        

//         // Create Employee
//         const newEmployee = new Employee({
//             userId: newUser._id,
//             employeeId,
//             dob,
//             gender,
//             maritalStatus,
//             department,
//             designation,
//             salary: salaryNum,
//         });

//         await newEmployee.save();

//         return res.status(200).json({ success: true, message: "Employee created successfully!" });
//     } catch (error) {
//         console.error("Error in addEmployee:", error);
//         if (error.name === "ValidationError") {
//             const messages = Object.values(error.errors).map((val) => val.message);
//             return res.status(400).json({ success: false, error: messages.join(", ") });
//         }
//         return res.status(500).json({ success: false, error: "Server error adding employee" });
//     }
// };



// Inside employeeController.js



const addEmployee = async (req, res) => {
    try {
        console.log("Incoming form data:", req.body);

        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            department,
            designation,
            salary,
            password,
            role,
        } = req.body;

        // Check for missing fields
        if (!name || !email || !employeeId || !dob || !gender || !maritalStatus ||
            !department || !designation || !salary || !password || !role) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const profileImage = req.file ? req.file.filename : "default.jpg";

        // Check duplicate email
        const existingUser = await User.findOne({ email: email.trim() });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        // Check duplicate employee ID
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ success: false, error: "Employee ID already exists" });
        }

        // Convert salary to number
        const salaryNum = Number(salary);
        if (isNaN(salaryNum)) {
            return res.status(400).json({ success: false, error: "Invalid salary" });
        }

        // Validate password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and include uppercase, lowercase, and a special character.",
            });
        }

        // 👉 Ensure password is trimmed before hashing
        const cleanPassword = password.trim();

        console.log("Plain password:", cleanPassword);

        const hashPassword = await bcrypt.hash(cleanPassword, 10); // hash securely
        console.log("Hashed password:", hashPassword);

        // Create and save user
        const newUser = new User({
            name,
            username: email,
            email: email.trim(),
            password: hashPassword,
            role,
            profileImage
        });

        await newUser.save();
        console.log("User saved with hashed password.");

        // Create and save employee document
        const newEmployee = new Employee({
            userId: newUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            department,
            designation,
            salary: salaryNum,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully!" });

    } catch (error) {
        console.error("Error in addEmployee:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ success: false, error: messages.join(", ") });
        }
        return res.status(500).json({ success: false, error: "Server error adding employee" });
    }
};



const getEmployees = async (req, res) => {
    try {
        // const employees = await Employee.find().populate('userId', {password: 0}).populate("department");

        const employees = await Employee.find()
            .populate('userId', 'username email profileImage')   // populate only needed fields from User
            .populate('department', 'department_name');

        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while getting employees" });
    }
};


// In employeeController.js
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate("userId", "-password")  // exclude password
            .populate("department");

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.json({ success: true, employee });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const updateEmployee = async (req, res) => {
    try {

        const { id } = req.params;
        const {
            username,
            email,
            maritalStatus,
            department,
            designation,
            salary,
            role,
        } = req.body;

        const employee = await Employee.findById({ _id: id })
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const user = await User.findById({ _id: employee.userId })
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }


        const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { username });

        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
            email,
            maritalStatus,
            salary,
            designation,
            department
        });


        if (!updateEmployee || !updateUser) {
            return res.status(404).json({ success: false, message: "document not found" });
        }
        return res.status(200).json({ success: true, message: "Employee updated successfully" });


    } catch (error) {
        res.status(500).json({ success: false, message: "Update employee Server error" });

    }
}

const fetchEmployeesById = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const employees = await Employee.find({ department: departmentId }).populate("userId");
        res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error fetching employees by department:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

 const getEmployeeByEmployeeId = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findOne({ employeeId })
            .populate('userId', '-password') // Get user info without password
            .populate('department'); // Get department info

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


const getUserProfile = async (req, res) => {
    try {
        // req.params.userId will be the userId from the URL
        const userId = req.params.userId;

        // Find the employee by userId
        const employee = await Employee.findOne({ userId })
            .populate("userId", "-password")
            .populate("department");

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee profile not found" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ success: false, message: "Server error while fetching profile" });
    }
}

 const updateEmployeeProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, dob, maritalStatus } = req.body;

        // Update the User collection (username and email)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true }
        );

        // Update the Employee collection by matching userId
        const updatedEmployee = await Employee.findOneAndUpdate(
            { userId },
            { dob, maritalStatus },
            { new: true }
        ).populate('userId');

        res.status(200).json({ message: "Profile updated", employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export { addEmployee, upload, getEmployees, getEmployeeById, updateEmployee, fetchEmployeesById, getEmployeeByEmployeeId, getUserProfile, updateEmployeeProfile };
