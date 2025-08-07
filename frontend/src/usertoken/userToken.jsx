// src/utils/userToken.jsx

// Save token
export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Get token
export const getToken = (token) => {
    return localStorage.getItem('authToken', token);
};

// Remove token
export const removeToken = () => {
    localStorage.removeItem('authToken');
};
