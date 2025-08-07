
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchDepartments } from "../../utils/employeeHelper";
import axios from "axios";

const AddEmployee = () => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const fetchedDepartments = await fetchDepartments();
                setDepartments(fetchedDepartments || []);
            } catch {
                setError("Failed to load departments");
            } finally {
                setLoading(false);
            }
        };
        getDepartments();
    }, []);

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        employeeId: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        department: "",
        designation: "",
        salary: "",
        password: "",
        role: "employee",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setEmployee({ ...employee, image: files[0] });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const formData = new FormData();
            Object.keys(employee).forEach((key) => {
                if (key === "image") {
                    if (employee.image) {
                        formData.append("image", employee.image);
                    }
                } else {
                    formData.append(key, employee[key]);
                }
            });

            const res = await axios.post("http://localhost:5000/api/employee/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Employee added successfully!");
            navigate("/admin-dashboard/employees");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Failed to add employee.");
            }
        }
    };


    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add Employee</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='text-sm font-medium text-gray-700'>Full Name</label>
                        <input type="text" name="name" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <input type="email" name="email" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Employee ID</label>
                        <input type="text" name="employeeId" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Date of Birth</label>
                        <input type="date" name="dob" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Gender</label>
                        <select name="gender" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Marital Status</label>
                        <select name="maritalStatus" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required>
                            <option value="">Select</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Department</label>
                        <select required
                            name="department"
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded bg-white shadow-sm"
                        >
                            <option value="">Select</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.department_name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Designation</label>
                        <input type="text" name="designation" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Salary</label>
                        <input type="number" name="salary" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Password</label>
                        <input type="password" name="password" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Upload Image</label>
                        <input type="file" name="image" accept="image/*" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' />
                    </div>

                    <div>
                        <label className='text-sm font-medium text-gray-700'>Role</label>
                        <input type="text" name="role" value="employee" disabled className='mt-1 p-2 w-full border border-gray-300 rounded bg-gray-100 text-gray-500' />
                    </div>
                    
                </div>

                {/* cancel button when adding the employee */}
                <button className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition">
                    <Link
                        to="/admin-dashboard/employees"
                        className="inline-block px-5 py-2 w-full">
                        Cancel Add Employee </Link>
                </button>

                {/* Add employee button to comfirm and add the employee */}
                <button type="submit" className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
