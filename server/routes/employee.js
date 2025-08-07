import express from 'express'
import verifyUser from '../middleware/authMiddleware.js';
import { addEmployee, upload, getEmployees, getEmployeeById, updateEmployee, fetchEmployeesById, getUserProfile, updateEmployeeProfile } from '../controllers/employeeController.js';
// import { addDepartment, getDepartment, updateDepartment, getDepartmentById, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', verifyUser, getEmployees);                
router.get("/:id", verifyUser, getEmployeeById);
router.post('/add', verifyUser, upload.single('image'), addEmployee);                   
router.get('/department/:id', verifyUser, fetchEmployeesById);             
router.put('/:id', verifyUser, updateEmployee);      
// router.get('/profile/:userId', verifyUser, getUserProfile);
router.get('/profile/:userId', verifyUser, getUserProfile);
// routes/employee.js or wherever appropriate
router.put('/profile/:userId', verifyUser, updateEmployeeProfile);


router.get('/test-auth', verifyUser, (req, res) => {
    console.log('User from middleware:', req.user);
    res.json({ success: true, user: req.user });
});






export default router
