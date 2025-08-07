
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log('Authorization header:', authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];

        console.log('Token extracted:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;

        console.log(req.user);
        
        next();

    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(401).json({ success: false, message: 'Invalid token or server error' });
    }
};

export default verifyUser;
