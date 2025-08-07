
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate, Link } from "react-router-dom";
// // import axios from "axios";

// // const EditDepartment = () => {
// //     const { id } = useParams();
// //     const navigate = useNavigate();

// //     const [department, setDepartment] = useState({
// //         department_name: "",
// //         description: "",
// //     });

// //     const [success, setSuccess] = useState(false); // new state for popup

// //     useEffect(() => {
// //         const getDepartment = async () => {
// //             try {
// //                 const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
// //                     headers: {
// //                         Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                     },
// //                 });

// //                 if (response.data.success) {
// //                     setDepartment({
// //                         department_name: response.data.department.department_name,
// //                         description: response.data.department.description,
// //                     });
// //                 }
// //             } catch (error) {
// //                 alert("Error loading department data");
// //             }
// //         };

// //         getDepartment();
// //     }, [id]);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setDepartment({ ...department, [name]: value });
// //     };

// //     const handleUpdate = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                 },
// //             });

// //             if (response.data.success) {
// //                 // Instead of alert, show popup
// //                 setSuccess(true);
// //                 console.log(id);
                
// //             }
// //         } catch (error) {
// //             alert("Error updating department");
// //         }
// //     };

// //     // Close popup handler - redirect or hide popup
// //     const handleClosePopup = () => {
// //         setSuccess(false);
// //         navigate("/admin-dashboard/department"); // Redirect after success message
// //     };

// //     return (
// //         <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md relative">

// //             {/* Popup */}
// //             {success && (
// //                 <div className="absolute left-50 top-50 inset-0bg-white bg-opacity-40 flex flex-col items-center justify-center z-50">
// //                     <div className="bg-white p-6 rounded shadow-md w-80 text-center">
// //                         <p className="font-semibold text-green-600 text-lg mb-4">Department updated successfully!</p>
// //                         <button
// //                             onClick={handleClosePopup}
// //                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //                         >
// //                             OK
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}

// //             <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
// //             <form onSubmit={handleUpdate}>
// //                 <div>
// //                     <label className="text-sm font-medium text-gray-700" htmlFor="department_name">Department Name</label>
// //                     <input
// //                         className="mt-1 w-full p-2 border border-gray-300 rounded-md"
// //                         required
// //                         type="text"
// //                         placeholder="Enter Department Name"
// //                         name="department_name"
// //                         id="department_name"
// //                         value={department.department_name}
// //                         onChange={handleChange}
// //                     />
// //                 </div>

// //                 <div className="mt-3">
// //                     <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
// //                     <textarea
// //                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
// //                         rows="4"
// //                         id="description"
// //                         name="description"
// //                         placeholder="Add Description"
// //                         required
// //                         value={department.description}
// //                         onChange={handleChange}
// //                     />
// //                 </div>

// //                 <button className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition">
// //                     <Link
// //                         to="/admin-dashboard/department"
// //                         className="inline-block px-5 py-2 w-full">
// //                         Cancel Department Update </Link>
// //                 </button>
                
// //                 <button
// //                     type="submit"
// //                     className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //                 >
// //                     Update Department
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default EditDepartment;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const EditDepartment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [department, setDepartment] = useState({
//     department_name: "",
//     description: "",
//   });

//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const getDepartment = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/department/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setDepartment({
//             department_name: response.data.department.department_name,
//             description: response.data.department.description,
//           });
//         }
//       } catch (error) {
//         alert("Error loading department data");
//       }
//     };

//     getDepartment();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDepartment({ ...department, [name]: value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/department/${id}`,
//         department,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setSuccess(true);
//         setTimeout(() => {
//           setSuccess(false);
//           navigate("/admin-dashboard/department");
//         }, 2000);
//       }
//     } catch (error) {
//       alert("Error updating department");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md relative">
//       {/* Popup message inside the form container */}
//       <div
//         className={`absolute left-1/2 transform -translate-x-1/2 top-4 z-50
//           bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-md
//           transition-all duration-500
//           ${success ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
//         `}
//       >
//         Department updated successfully!
//       </div>

//       <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
//       <form onSubmit={handleUpdate}>
//         <div>
//           <label
//             className="text-sm font-medium text-gray-700"
//             htmlFor="department_name"
//           >
//             Department Name
//           </label>
//           <input
//             className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//             required
//             type="text"
//             placeholder="Enter Department Name"
//             name="department_name"
//             id="department_name"
//             value={department.department_name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mt-3">
//           <label
//             className="block text-sm font-medium text-gray-700"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             rows="4"
//             id="description"
//             name="description"
//             placeholder="Add Description"
//             required
//             value={department.description}
//             onChange={handleChange}
//           />
//         </div>

//         <button className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition">
//           <Link
//             to="/admin-dashboard/department"
//             className="inline-block px-5 py-2 w-full"
//           >
//             Cancel Department Update
//           </Link>
//         </button>

//         <button
//           type="submit"
//           className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Update Department
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditDepartment;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState({
        department_name: "",
        description: "",
    });

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setDepartment({
                        department_name: response.data.department.department_name,
                        description: response.data.department.description,
                    });
                }
            } catch (error) {
                alert("Error loading department data");
            }
        };

        getDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                // Navigate to department list with state flag for popup
                navigate("/admin-dashboard/department", { state: { updated: true } });
            }
        } catch (error) {
            alert("Error updating department");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-md relative">
            <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="department_name">
                        Department Name
                    </label>
                    <input
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        required
                        type="text"
                        placeholder="Enter Department Name"
                        name="department_name"
                        id="department_name"
                        value={department.department_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        rows="4"
                        id="description"
                        name="description"
                        placeholder="Add Description"
                        required
                        value={department.description}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="mt-6 w-full rounded-md bg-red-600 text-white hover:bg-red-700 font-bold transition"
                    type="button"
                >
                    <Link to="/admin-dashboard/department" className="inline-block px-5 py-2 w-full">
                        Cancel Department Update
                    </Link>
                </button>

                <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Department
                </button>
            </form>
        </div>
    );
};

export default EditDepartment;
