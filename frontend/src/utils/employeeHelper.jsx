import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S.N",
        selector: row => row.sno,
        sortable: true,
        sortFunction: (a, b) => a.sno - b.sno,
        width: "70px"
    },

    {
        name: "Employee Name",
        selector: (row) => row.name,
        sortable: true,
        sortFunction: (a, b) => a.department_name.toLowerCase().localeCompare(b.department_name.toLowerCase()),
        width: "200px"

    },

    {
        name: 'Image',
        selector: row => row.profileImage,
        cell: row => (
            <img
                src={`http://localhost:5000/${row.profileImage}`}
                alt={row.name || "profile"}
                onError={(e) => {
                    e.target.src = "http://localhost:5000/default.png"; // fallback image
                }}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
        ),
        width: '100px',
    },

    {
        name: "Department",
        selector: row => row.department_name,
        sortable: true,
        sortFunction: (a, b) => a.department_name.toLowerCase().localeCompare(b.department_name.toLowerCase()),
        width: "250px"
    },

    {
        name: "DOB",
        selector: row => row.dob,
        width: "200px"
    },

    {
        name: "Action",
        selector: row => row.action,
    },
];


export const fetchDepartments = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/department", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        // Debugging: log the entire response
        console.log("Department API Response:", response);

        if (response.data.success) {
            return response.data.department;
        } else {
            console.error("Failed to fetch departments:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching departments:", error);
        return []; // Return empty array if error occurs
    }
};

// employees for salary 
export const getEmployees = async (id) => {
    let employees;
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.data.success) {
            employees = response.data.employees;
        } else {
            console.error("Failed to fetch employees:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        return []; // Return empty array if error occurs
    }
    return employees;
};

export const EmployeeButtons = ({ Id }) => {

    const navigate = useNavigate();

    return (
        <div className="text-sm flex space-x-3 text-white">

            {/* this  button views the employee */}
            <button
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
                className="cursor-pointer px-3 py-1 bg-yellow-600 rounded">View</button>

            {/* this  button edits the employee */}
            <button
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
                className="cursor-pointer px-3 py-1 bg-blue-600 rounded">Edit</button>

            {/* this  button salary the employee */}
            <button
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
                className="cursor-pointer px-3 py-1 bg-green-600 rounded">Salary</button>

            {/* this  button leave the employee */}
            <button
                onClick={() => navigate(`/admin-dashboard/leave/${Id}`)} 
                className="cursor-pointer px-3 py-1 bg-red-600 rounded">Leave</button>
        </div>
    );
};


