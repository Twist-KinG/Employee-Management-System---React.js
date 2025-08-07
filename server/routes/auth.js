
import express from 'express';
import { login, verify, changePassword, sendOTP, resetPassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
// Route to handle user login
router.post('/login', (req, res) => {
    login(req, res);
});

// Route to verify user authentication
router.get('/verify', authMiddleware, verify);

router.post('/change-password', authMiddleware, changePassword);
router.post('/forgot-password/send-otp', sendOTP);
router.post('/forgot-password/reset', resetPassword);


export default router;



