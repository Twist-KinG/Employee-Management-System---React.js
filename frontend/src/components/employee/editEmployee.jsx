
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/employeeHelper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        username: '',
        email: '',
        maritalStatus: '',
        department: '',
        designation: '',
        salary: 0

    });

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
            }
        };
        getDepartments();
    }, []);


    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {

                    const employee = response.data.employee;

                    setEmployee({
                        username: employee.userId?.username || '',
                        email: employee.email || '',
                        maritalStatus: employee.maritalStatus || '',
                        designation: employee.designation || '',
                        salary: employee.salary || 0,
                        department: employee.department || ''// If you get role from API, else keep it here for completeness
                    });




                }

                // Format DOB for input type="date"
                // const formattedDob = emp.dob ? new Date(emp.dob).toISOString().split("T")[0] : "";
                // setEmployee({ ...emp, dob: formattedDob });


            } catch (err) {
                setError("Error fetching employee data");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {

            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Employee updated successfully!");
            navigate("/admin-dashboard/employees");
        } catch (error) {
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else {
                alert("Failed to update employee.");
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!employee) return <div>Invalid Employee Data</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={employee.username}
                            className="mt-1 p-2 w-full border border-gray-300 rounded" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded" />
                    </div>

                    {/* <div>
                        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={employee.dob}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div> */}

                    <div>
                        <label className="text-sm font-medium text-gray-700">Marital Status</label>
                        <select
                            name="maritalStatus"
                            value={employee.maritalStatus}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded bg-white shadow-sm"
                            required
                        >
                            <option value="">Select</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.department_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            value="employee"
                            className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-100 text-gray-500"
                            readOnly />
                    </div>

                </div>

                <button className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition">
                    <Link
                        to="/admin-dashboard/employees"
                        className="inline-block px-5 py-2 w-full">
                        Cancel Employee Update </Link>
                </button>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default EditEmployee;
