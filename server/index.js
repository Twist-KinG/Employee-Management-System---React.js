import dotenv from 'dotenv';

dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import departmentRoutes from "./routes/department.js"
import employeeRoutes from "./routes/employee.js"
import salaryRoutes from "./routes/salary.js"
import leaveRoutes from "./routes/leave.js"
import connectToDatabase from "./db/db.js";
import adminRoutes from "./routes/summary.js";


// import { deleteDepartment } from "./controllers/departmentController.js";

// Set the port for the server
const PORT = process.env.PORT || 5000;

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
// Use the auth routes
app.use("/api/auth", authRoutes);
// Use the admin summary routes
app.use("/api/admin", adminRoutes);
// use the department router
app.use("/api/department", departmentRoutes);

app.use("/api/auth", authRoutes);
// use the employee router
app.use("/api/employee", employeeRoutes);
// use the salary router
app.use("/api/salary", salaryRoutes);
// use the leave router
app.use("/api/leave", leaveRoutes);


// Serve static files from 'public' folder (including uploads)
app.use(express.static('public/uploads'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// It checks the user's credentials, generates a JWT token, and responds with user information.
