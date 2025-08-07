
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/employeeHelper";
import SalaryList from "./salaryList";
import axios from "axios";

const addSalary = () => {

    const navigate = useNavigate();

    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deduction: 0,
        payDate: null
    });

    const [departments, setDepartments] = useState([]);

    const [employees, setEmployees] = useState([]);
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

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        const parsedValue =
            name === "basicSalary" || name === "allowances" || name === "deduction"
                ? parseFloat(value)
                : value;

        setSalary({ ...salary, [name]: parsedValue });

        // setSalary({ ...salary, [name]: value });
        // // setSalary((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:5000/api/salary/add", salary, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Salary has been successfully added!");


            // navigate("/admin-dashboard/employees");
            navigate("/admin-dashboard/salary");

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    };


    return (
        <>
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md'>

                <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>


                        {/* department */}
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Department</label>

                            <select required
                                name="department"
                                onChange={handleDepartment}
                                className="mt-1 p-2 w-full border border-gray-300 rounded bg-white shadow-sm">
                                <option value="">Select</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.department_name}</option>
                                ))}
                            </select>

                        </div>


                        {/* employee by department */}
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Employee</label>
                            <select required
                                name="employeeId"
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded bg-white shadow-sm">
                                <option value="">Select</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.userId.username}</option>
                                ))}
                            </select>
                        </div>

                        {/* basic salary */}
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Basic Salary</label>
                            <input type="number" name="basicSalary" onChange={handleChange} placeholder="Basic Salary" className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                        </div>

                        {/* allowances */}
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Allowances</label>
                            <input type="number" name="allowances" onChange={handleChange} placeholder="Allowances" className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                        </div>

                        {/* deduction */}
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Deduction</label>
                            <input type="number" name="deduction" onChange={handleChange} placeholder="deduction" className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                        </div>

                        {/* pay date */}
                        <div>
                            <label className='text-sm font-medium text-gray-700'>Pay Date</label>
                            <input type="date" name="payDate" onChange={handleChange} className='mt-1 p-2 w-full border border-gray-300 rounded' required />
                        </div>

                    </div>

                    {/* cancel button when adding the salary */}
                    <button className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition">
                        <Link
                            to="/admin-dashboard/salary"
                            className="inline-block px-5 py-2 w-full">
                            Cancel Add Salary </Link>
                    </button>

                    {/* Add employee button to comfirm and add the salary */}
                    <button type="submit" className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Add Salary
                    </button>

                </form>

            </div>

        </>
    );
};

export default addSalary;
