import mongoose from "mongoose";
const { Schema } = mongoose;

const leaveSchema = new Schema(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        leaveType: {
            type: String,
            enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Other"],
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },

        appliedAt: {
            type: Date,
            default: Date.now,
        },

        updatedAt: {
            type: Date,
            default: Date.now,
        },

    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// Update 'updatedAt' manually before save (optional redundancy)
leaveSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
