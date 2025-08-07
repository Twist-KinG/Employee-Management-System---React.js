import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';

// importing admin requirements
import AdminDashboard from './pages/adminDashboard';
import EmployeeDashboard from './pages/employeeDashboard';
import PrivateRoute from './utils/privateRoute'; // Adjust path
import AdminSummary from './components/dashboard/adminSummary';
import AdminSetting from './components/dashboard/adminSetting';

// importing employee requirements
import EmployeeList from './components/employee/employeeList';
import AddEmpolyee from './components/employee/addEmployee';
import ViewEmployee from './components/employee/viewEmployee';
import EditEmployee from './components/employee/editEmployee';


// importing department requirements
import DepartmentList from './components/department/departmentList';
import AddDepartment from './components/department/addDepartment';
import EditDepartment from './components/department/editDepartment';


// importing salary requirements
import AddSalary from './components/salary/addSalary';
import ViewSalary from './components/salary/viewSalary';
import SalaryList from "./components/salary/salaryList";


// importing leaves requirements
import LeaveTable from './components/leave/leaveTable';
import LeaveList from './components/leave/leaveList';
import AddLeave from './components/leave/addLeave';
import ViewLeave from './components/leave/viewLeave';

// employee dashboard requirements
import EmployeeSummary from './components/employeeDashboard/employeeSummary';
import Profile from './components/employeeDashboard/profile';
import Salary from './components/employeeDashboard/salary';
import Setting from './components/employeeDashboard/setting';
import ForgotPassword from './components/employeeDashboard/ForgotPassword'; // Adjust the path accordingly



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />


        {/* Protect admin dashboard route, require admin role */}
        <Route path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }>

          <Route index element={<AdminSummary />} />

          {/* employee routes */}
          <Route path="/admin-dashboard/employees" element={<EmployeeList />} />
          <Route path="/admin-dashboard/add-new-employee" element={<AddEmpolyee />} />
          <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee />} />
          <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />

          {/* department routes */}
          <Route path="/admin-dashboard/department" element={<DepartmentList />} />
          <Route path="/admin-dashboard/add-new-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />

          {/* salary routes */}
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
          <Route path="/admin-dashboard/salary" element={<SalaryList />} />

          {/* leaves routes */}
          <Route path="/admin-dashboard/leaves" element={<LeaveTable />} />
          <Route path="/admin-dashboard/leave/:id" element={<ViewLeave />} />

          {/* setting routes */}
          <Route path="/admin-dashboard/setting" element={<AdminSetting />} />

        </Route>

        {/* Protect employee dashboard route, require employee role */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute requiredRole="employee">
              <EmployeeDashboard />
            </PrivateRoute>
          } >

          <Route index element={<EmployeeSummary />} />
          {/* employee-dashboard profile section */}
          <Route path="/employee-dashboard/profile" element={<Profile />} />

          {/* employee-dashboard leave section */}
          <Route path="/employee-dashboard/leaves" element={<LeaveList />} />
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />

          {/* employee-dashboard salary section */}
          <Route path="/employee-dashboard/salary" element={<Salary />} />


          {/* employee-dashboard setting section */}
          <Route path="/employee-dashboard/setting" element={<Setting />} />
          <Route path="/employee-dashboard/forgot-password" element={<ForgotPassword />} />

        </Route>




      </Routes>

    </BrowserRouter>
  );
};

export default App;

