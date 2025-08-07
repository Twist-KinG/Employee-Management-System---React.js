
import { useState } from "react";
import axios from "axios";

export const columns = [
    { name: "S.N.", selector: (row) => row.sno, width: "80px" },
    { name: "Emp ID", selector: (row) => row.employeeId, width: "160px" },
    { name: "Name", selector: (row) => row.name, width: "230px" },
    { name: "Department", selector: (row) => row.department, width: "190px" },
    { name: "Leave Type", selector: (row) => row.leaveType, width: "120px" },
    { name: "Reason", selector: (row) => row.reason, width: "150px" },
    { name: "Days", selector: (row) => row.days, width: "80px" },
    { name: "Status", selector: (row) => row.status, width: "130px" },
    { name: "Action", selector: (row) => row.action },
];



export const Leavebuttons = ({ Id, currentStatus }) => {  // receive currentStatus as prop
    const [popup, setPopup] = useState(null);
    const [popupColor, setPopupColor] = useState("");

    const disabled = currentStatus === "Approved" || currentStatus === "Rejected"; // disable condition

    const handleStatusChange = async (status) => {
        if (disabled) return;  // prevent action if disabled

        try {
            const response = await axios.put(
                `http://localhost:5000/api/leave/${Id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                const color = status === "Approved" ? "bg-green-500" : "bg-red-500";
                setPopup(`Leave ${status} successfully`);
                setPopupColor(color);

                setTimeout(() => {
                    setPopup(null);
                    setPopupColor("");
                    window.location.reload();
                }, 2000);
            } else {
                setPopup("Update failed");
                setPopupColor("bg-red-500");
                setTimeout(() => {
                    setPopup(null);
                    setPopupColor("");
                }, 2000);
            }
        } catch (error) {
            setPopup("Error occurred");
            setPopupColor("bg-red-500");
            setTimeout(() => {
                setPopup(null);
                setPopupColor("");
            }, 2000);
        }
    };

    return (
        <div className="relative">
            <div className="flex gap-2">
                <button
                    disabled={disabled}
                    className={`px-3 py-1 rounded text-white ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`}
                    onClick={() => handleStatusChange("Approved")}
                >
                    Approve
                </button>
                <button
                    disabled={disabled}
                    className={`px-3 py-1 rounded text-white ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                        }`}
                    onClick={() => handleStatusChange("Rejected")}
                >
                    Reject
                </button>
            </div>

            {popup && (
                <div
                    className={`fixed top-1/2 left-1/2 ml-64 transform -translate-x-1/2 -translate-y-1/2 
                     text-white px-6 py-3 rounded shadow-md z-50 opacity-90 
                     animate-fade-in-out text-base ${popupColor}`}
                    style={{ minWidth: "200px", textAlign: "center" }}
                >
                    {popup}
                </div>
            )}
        </div>
    );
};
