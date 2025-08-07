// server/userSeed.js
import User from './models/user.js';  // adjust path as needed
import dotenv from 'dotenv';
dotenv.config(); // loads environment variables from .env file
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js'; // ✅ works with default export


const userRegister = async () => {
    // Connect to the database
    await connectToDatabase();
    try {
        const hasshedPassword = await bcrypt.hash('admin', 10);

        // new user
        const newUser = new User({
            username: 'admin',
            password: hasshedPassword,
            email: 'admin@gmail.com',
            role: 'admin',
        })
        // Save the user to the database
        await newUser.save();
        console.log('User registered successfully:', user);
    }
    catch (error) {
        console.error('Error registering user:', error);
    }
}
userRegister();

