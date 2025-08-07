
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/departmentHelper";
import DepartmentButtons from "./departmentButtons";
import axios from "axios";

const DepartmentList = () => {
    const location = useLocation();

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("")

    // Delete popup states
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deletePopupVisible, setDeletePopupVisible] = useState(false);

    // Update popup states
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [updatePopupVisible, setUpdatePopupVisible] = useState(false);

    // Handle department delete with popup fade
    const onDepartmentDelete = async (id) => {
        setDepartments((prev) => prev.filter((dep) => dep._id !== id));

        await fetchDepartments(); // Refresh the list

        setShowDeletePopup(true);
        setTimeout(() => setDeletePopupVisible(true), 50);

        setTimeout(() => {
            setDeletePopupVisible(false);
            setTimeout(() => setShowDeletePopup(false), 300);
        }, 2000);
    };

    // Fetch departments
    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/department`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.department.map((dep, index) => ({
                    _id: dep._id,
                    sno: index + 1,
                    department_name: dep.department_name,
                    description: dep.description,
                    action: (
                        <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
                    ),
                }));
                setDepartments(data);
            }
        } catch (error) {
            alert("Error fetching departments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Show update popup if location.state.updated === true (after navigating from EditDepartment)
    useEffect(() => {
        if (location.state?.updated) {
            setShowUpdatePopup(true);
            setTimeout(() => setUpdatePopupVisible(true), 50);

            setTimeout(() => {
                setUpdatePopupVisible(false);
                setTimeout(() => setShowUpdatePopup(false), 300);
                // Clear location state so popup won't show again on refresh
                window.history.replaceState({}, document.title);
            }, 2000);
        }
    }, [location.state]);

    // Search input handler
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    // Filter departments by search text
    const filteredDepartments = departments.filter((dep) =>
        dep.department_name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            {/* Delete Success Popup */}
            {showDeletePopup && (
                <div
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            px-6 py-3 rounded-2xl shadow-xl z-50 text-white text-lg font-semibold
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${deletePopupVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            bg-blue-600`}
                >
                    ✅ Department deleted successfully!
                </div>
            )}

            {/* Update Success Popup */}
            {showUpdatePopup && (
                <div
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            px-6 py-3 rounded-2xl shadow-xl z-50 text-white text-lg font-semibold
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${updatePopupVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            bg-blue-600`}
                >
                    ✅ Department updated successfully!
                </div>
            )}

            <div className="p-5">
                <h3 className="text-2xl font-bold text-center mb-4">Manage Departments</h3>
                <div className="flex justify-between mb-4">
                    <input
                        className="px-4 py-1 border rounded outline-none"
                        type="text"
                        placeholder="Search department"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <Link
                        to="/admin-dashboard/add-new-department"
                        className="px-4 py-1 bg-blue-600 text-white rounded"
                    >
                        Add New Department
                    </Link>
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <DataTable columns={columns} data={filteredDepartments} />
                )}
            </div>
        </>
    );
};

export default DepartmentList;
