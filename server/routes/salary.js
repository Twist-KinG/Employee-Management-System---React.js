import express from 'express'
import verifyUser from '../middleware/authMiddleware.js';

import {
    addSalary,
    getAllSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
    getSalaryByEmployeeId,
    getSalaryByUserId
} from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add', verifyUser, addSalary);
// router.get('/employee/:id', verifyUser, getSalaryById);
router.get('/employee/:id', verifyUser, getSalaryByEmployeeId);
router.get('/', verifyUser, getAllSalaries)
// router.get('/user/:userId', verifyUser, getSalaryByUserId);
router.get('/user/:userId', verifyUser, getSalaryByUserId);





export default router;

