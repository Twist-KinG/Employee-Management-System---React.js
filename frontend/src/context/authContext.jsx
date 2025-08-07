import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { getToken } from '../usertoken/userToken';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect to check if user is authenticated
    useEffect(() => {

        // Function to verify user authentication
        const verifyUser = async () => {
            // Here you would typically make an API call to verify the user
            try {
                const token = getToken(); // Get the token from local storage

                if (token) {

                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.data.success) {
                        // If the user is verified, set the user state
                        setUser(response.data.user);
                    } else {
                        // If not verified, clear the user state
                        setUser(null);
                        setLoading(false); // Set loading to false
                    }
                }

            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setUser(null);
                }
            } finally {
                setLoading(false); // Set loading to false after verification
            }
        }

        verifyUser();

    }, []);

    // Login function (set user and token)

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token); // Save token
        localStorage.setItem('user', JSON.stringify(userData)); // Save full user data as JSON string
        localStorage.setItem("userId", userData.id);  // Save userId string correctly

        console.log(userData.id);

    };


    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        // localStorage.removeItem("userId");
    };



    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
