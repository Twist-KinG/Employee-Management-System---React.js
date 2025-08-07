
export const isStrongPassword = (password) => {
    // At least 8 characters, one lowercase, one uppercase, one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
};




