
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        department_name: '',
        description: ''
    });
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/department', department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                setSuccess(true); // Show popup
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    const handleOkayClick = () => {
        navigate("/admin-dashboard/department");
    };

    return (
        <div className='relative flex items-center justify-center'>
            {/* Popup Message */}
            {success && (
                <div className="absolute w-96 flex-col flex items-center justify-center left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded shadow-md top-86 z-10">
                    <p className='font-semibold'>Department added successfully!</p>
                    <button onClick={handleOkayClick}
                        className='mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700'> OK</button>
                </div>
            )}

            {/* Main Form */}
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6'>Add Department</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='text-sm font-medium text-gray-700' htmlFor="department_name">Department Name</label>
                        <input onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required type="text" placeholder='Enter Department Name' name='department_name' id="department_name" />
                    </div>

                    <div className='mt-3'>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="description">Description</label>
                        <textarea onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' rows="4" id="description" name='description' placeholder='Add Description' required></textarea>
                    </div>

                                   {/* cancel button when adding the employee */}
                                    <button className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition">
                                        <Link
                                            to="/admin-dashboard/department"
                                            className="inline-block px-5 py-2 w-full">
                                            Cancel Add Department </Link>
                                    </button>
                    
                    <button type='submit' className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
