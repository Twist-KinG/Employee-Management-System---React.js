import mongoose from "mongoose";
const { Schema } = mongoose;

const salarySchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },

    basicSalary: {
        type: Number,
        required: true,
    },

    allowances: {
        type: Number,
        default: 0,
    },

    deduction: {
        type: Number,
        default: 0,
    },

    netSalary: {
        type: Number,
        required: true,
    },

    payDate: {
        type: Date,
        required: true,
    },

}, {
    timestamps: true, // adds createdAt and updatedAt
});
const Salary = mongoose.model("Salary", salarySchema);
export default Salary
