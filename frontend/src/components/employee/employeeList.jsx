
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { EmployeeButtons } from "../../utils/employeeHelper";
import { columns } from "../../utils/employeeHelper";


const EmployeeList = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");  // 1. State for search input
  const [employees, setEmployees] = useState([]);


  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);



      if (response.data.success) {

        const data = response.data.employees.map((emp, index) => ({
          _id: emp._id,
          sno: index + 1,
          department_name: emp.department.department_name,
          // name: emp.userId.username,
          name: emp.userId.name || emp.userId.username || emp.userId.email, // fallback if name missing
          // dob: new Date(emp.dob).toLocaleDateString(),
          dob: new Date(emp.dob).toDateString(),

          // profileImage: emp.userId.profileImage,

          profileImage: emp.userId.profileImage,

          action: (<EmployeeButtons Id={emp._id} />),

        }));

        setEmployees(data);
      }
    } catch (error) {
      alert("Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchEmployees(employees);

  }, []);


  // 2. Handler to update search text as user types
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  // 3. Filter departments based on searchText
  const searchEmployee = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (

    <div className="p-5">

      <h3 className="text-2xl font-bold text-center mb-4">Manage Empolyee</h3>

      <div className="flex justify-between mb-4">

        <input
          className="px-4 py-1 border rounded outline-none"
          type="text"
          placeholder="Search Employee"
          value={searchText}
          onChange={handleSearchChange}  // attach handler here
        />

        <Link to="/admin-dashboard/add-new-employee" className="px-4 py-1 bg-blue-600 text-white rounded">
          Add New Empolyee
        </Link>
        
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        // <DataTable columns={columns} data={employees} />
        <DataTable columns={columns} data={searchEmployee} />
      )}
    </div>
    
  );
};

export default EmployeeList;

