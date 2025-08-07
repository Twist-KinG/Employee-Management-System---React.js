
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js'; // You'll create this
import otpStore from '../utils/otpStore.js'; // Temporary OTP memory store


const login = async (req, res) => {
    console.log('Login endpoint hit');

    try {
        const { email, password } = req.body;

        // Ensure trimmed input for email and password
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        console.log("Received Email:", trimmedEmail);
        console.log("Received Password:", trimmedPassword);

        // Find user by email
        const user = await User.findOne({ email: trimmedEmail });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log("Stored hashed password:", user.password);

        // Compare hashed password with entered one
        const isMatch = await bcrypt.compare(trimmedPassword, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        console.log("Login successful");

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * Used to verify if JWT-authenticated user is valid
 */
const verify = (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'User verified successfully',
        user: req.user
    });
};


/**
 * Change password using old password validation
 */
 const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id; // from authMiddleware


        console.log("Userid:", userId);


        const user = await User.findById(userId);

        console.log("user:", user);
        

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) return res.status(400).json({ success: false, message: 'Old password incorrect' });

        const salt = await bcrypt.genSalt(10);


        const hashedPassword = await bcrypt.hash(newPassword, salt);


        user.password = hashedPassword;

        
        user.updatedAt = Date.now();
        await user.save();

        res.status(200).json({ success: true, message: 'Password changed successfully' });

    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * Send OTP to email for forgot password
 */
 const sendOTP = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiry

    try {
        await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`);
        res.status(200).json({ success: true, message: 'OTP sent to email' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

/**
 * Reset password after OTP validation
 */
 const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const stored = otpStore[email];
    if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    user.password = hashed;
    user.updatedAt = Date.now();
    await user.save();

    delete otpStore[email]; // Remove OTP after successful reset

    res.status(200).json({ success: true, message: 'Password reset successful' });
};


export { login, verify, resetPassword, sendOTP, changePassword };