import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeButtons = ({ _id, onEmployeeDelete }) => {

    const navigate = useNavigate();

    const handleDelete = async () => {
        const isConfirm = window.confirm("Are you sure, you want to delete?");

        if (isConfirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/employees/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {

                    console.log("Deleted:", _id);

                    oEmployeeDelete();
                    // onDepartmentDelete(_id);

                    //just to make sure
                    console.log("Deleting ID:", _id);
                    console.log("Token:", localStorage.getItem("token"));

                }
            } catch (error) {
                alert("Failed to delete employee");
            }
        }
    };

    return (
        <div className="text-sm flex space-x-3 text-white">
            {/* this  button edits the department */}
            <button
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
                className="cursor-pointer px-3 py-1 bg-blue-600 rounded">Edit</button>

            {/* this  button deletes the department */}
            <button
                onClick={handleDelete}
                className="cursor-pointer px-3 py-1 bg-red-600 rounded">Delete</button>
        </div>
    );
};

export default EmployeeButtons;

