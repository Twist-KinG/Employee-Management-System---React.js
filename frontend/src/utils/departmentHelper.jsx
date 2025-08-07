
import axios from "axios";


const BASE_URL = "http://localhost:5000/api/department";


export const columns = [
    {
        name: "S.N",
        selector: row => row.sno,
        sortable: true,
        sortFunction: (a, b) => a.sno - b.sno
    },

    {
        name: "Department Name ",
        selector: row => row.department_name,
        sortable: true,
        sortFunction: (a, b) => a.department_name.toLowerCase().localeCompare(b.department_name.toLowerCase()),
    },

    {
        name: "Description",
        selector: row => row.description,
    },

    {
        name: "Action",
        selector: row => row.action,
    },
];


export const getAllDepartments = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log("Fetched departments:", response.data);
        
        return response.data;

    } catch (error) {
        console.error("Error fetching departments:", error);
        return { success: false, error: error.message };
    }
};




// Get department by ID
export const getDepartmentById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error getting department by id:", error);
        return { success: false, error: error.message };
    }
};

// Add a department
export const addDepartment = async (data) => {
    try {
        // const response = await axios.post(`${BASE_URL}/add`, data, { withCredentials: true });
        const response = await axios.post(`${BASE_URL}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error adding department:", error);
        return { success: false, error: error.message };
    }
};

// Update a department
export const updateDepartment = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error updating department:", error);
        return { success: false, error: error.message };
    }
};

