import express from 'express'
import verifyUser from '../middleware/authMiddleware.js';
import { addLeave, getLeavesByUserId, deleteLeave, getLeaves, updateLeaveStatus, getLeavesByEmployeeId } from '../controllers/leaveController.js'

const router = express.Router();

router.post('/add', verifyUser, addLeave);
router.get('/user/:id', verifyUser, getLeavesByUserId);
router.delete('/:id', verifyUser, deleteLeave);
router.get('/', verifyUser, getLeaves);
router.put('/:id/status', verifyUser, updateLeaveStatus);
router.get('/employee/:id', getLeavesByEmployeeId);







export default router;

