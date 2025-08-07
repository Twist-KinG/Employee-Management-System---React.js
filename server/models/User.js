// // import mongoose from 'mongoose';

// // const userSchema = new mongoose.Schema({
// //     username: { type: String, unique: true },
// //     password: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },

// //     // role: { type: String, enum: ['admin', 'employee'], default: 'user' },
// //     role: { type: String, enum: ['admin', 'employee'], required: 'true' },
// //     profileImage: { type: String, default: 'default.jpg' },
// //     createdAt: { type: Date, default: Date.now },
// //     updatedAt: { type: Date, default: Date.now }
// // });

// // const User = mongoose.model('User', userSchema);
// // export default User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//     username: { type: String, unique: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     role: { type: String, enum: ['admin', 'employee'], required: true },
//     profileImage: { type: String, default: 'default.jpg' },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);
// export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing

// Define the User schema with fields and validations
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true }, // Unique username
    password: { type: String, required: true }, // Password (hashed before saving)
    email: { type: String, required: true, unique: true }, // Unique email
    role: { type: String, enum: ['admin', 'employee'], required: true }, // User role
    profileImage: { type: String, default: 'default.jpg' }, // Profile image path
    createdAt: { type: Date, default: Date.now }, // Auto-set creation time
    updatedAt: { type: Date, default: Date.now }  // Auto-set last update time
});

// Create and export the User model
// Use existing model if already compiled to prevent overwrite errors
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
