import React from 'react'
import { useState } from 'react'
import axios from 'axios'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { saveToken } from '../usertoken/userToken'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'


const login = () => {
    // useState hooks to manage email and password state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();  // Use this hook once here


    // function to handle form submission
    const submitHandler = async (e) => {
        // prevent default form submission behavior
        e.preventDefault();

        // // check if email and password are provided
        // if (!email || !password) {

        //     // Log the error to console and set error state
        //     console.error('Email and password are required');

        //     // Set error to display error message
        //     setError('Email and password are required*');

        //     // Reset the form fields after getting the error
        //     e.target.reset(); 
        //     setEmail('');
        //     setPassword('');

        //     return;
        // }


        try {
            // using axios to send email and password
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            if (response.data.success) {
                // Call the login function from authContext to set user state
                login(response.data.user, response.data.token);
                // save the token in local storage or state management
                saveToken(response.data.token);

                // Redirect based on user role
                if (response.data.user.role === 'admin') {
                    // // Use Navigate from react-router-dom to change the route
                    navigate('/admin-dashboard');

                } else {
                    // // Use Navigate from react-router-dom to change the route
                    navigate('/employee-dashboard');
                }

            }

        } catch (error) {
            // handle error
            console.error('Login failed:', error);
            // Set error to display error message
            setError(error.response?.data?.message || 'Login failed, please try again.');
        }

    }

    return (
        //   wrapper for the login page
        <div className='flex items-center justify-center h-screen bg-linear-to-r from-cyan-500 to-blue-500'>
            {/* container of the login */}
            <div className='bg-white p-8 rounded-lg shadow-xl/30 md:w-108 h-120'>

                <span className='text-4xl text-gray-800 font-semibold text-center mb-6'>Hi,</span> <br />
                <span className='text-4xl text-gray-800 font-semibold text-center mb-8'>Welcome back</span>

                {/* error message if login fails */}
                {error && <p className='text-red-500 text-center fixed '>{error}</p>}

                {/* form for the login */}
                <form onSubmit={submitHandler} className='w-full max-w-sm mt-2'>

                    {/* input fields for username */}
                    <div className='mt-8 mb-4'>
                        <label className='block text-gray-700 text-md font-bold mb-2' htmlFor='email'>Email</label>

                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[20px]' id='email' type='text' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    {/* input fields for password */}
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-md font-bold mb-2' htmlFor='password'>Password</label>

                        <input className='shadow appearance-none text-[20px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {/* submit button for the login */}
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-[18px] w-full' type='submit'>Login</button>

                    {/* link to the forgot password page */}
                    <p className='text-center text-gray-500 text-s mt-4'>Forgot your password?
                        <a href='/reset-password' className='text-blue-500 hover:text-blue-800'>Reset it</a>
                    </p>

                    {/* link to the register page */}
                    <p className='text-center text-gray-500 text-s mt-4'>Don't have an account?
                        <a href='/register' className='text-blue-500 hover:text-blue-800'>Register</a>
                    </p>

                </form>

            </div>

        </div>
    )
}

export default login

