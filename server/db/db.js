
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // loads environment variables from .env file

const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGO_URI not found in environment variables');
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export default connectToDatabase;
