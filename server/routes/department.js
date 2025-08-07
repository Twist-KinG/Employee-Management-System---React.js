import express from 'express'
import verifyUser from '../middleware/authMiddleware.js';
import { addDepartment, getDepartment, updateDepartment, getDepartmentById, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', verifyUser, getDepartment);                    // GET /api/department
router.post('/', verifyUser, addDepartment);                   // POST /api/department
router.get('/:id', verifyUser, getDepartmentById);             // GET /api/department/:id
router.put('/:id', verifyUser, updateDepartment);              // PUT /api/department/:id
router.delete('/:id', verifyUser, deleteDepartment);           // DELETE /api/department/:id


export default router
