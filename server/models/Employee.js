import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Assuming there's a User model
            required: true,
        },
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        maritalStatus: {
            type: String,
            required: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department", // Assuming there's a Department model
            required: false,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
        },
        salary: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// const Employee = mongoose.model("Employee", employeeSchema);
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;
