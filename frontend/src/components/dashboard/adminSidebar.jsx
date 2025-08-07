import React from 'react'
import { NavLink } from 'react-router-dom'
//importing the required icons from react-icons
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { TbHomePlus } from "react-icons/tb";
import { FcLeave } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";

const adminSidebar = () => {
    return (
        // container of sidebar
        <div className='bg-gray-700 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>

            <div className='bg-blue-600 h-12 flex items-center justify-center'>
                <h2 className='text-xl text-center font-bold'>Employee Management</h2>
            </div>

            <div>

                <NavLink to="/admin-dashboard" end
                    className={({ isActive }) => `flex text-xl items-center space-x-4 rounded px-4 py-3 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`}>
                    <MdOutlineDashboardCustomize />
                    <span>Overview</span>
                </NavLink>

                
                <NavLink
                    to="/admin-dashboard/employees"
                    className={({ isActive }) => `flex text-xl items-center space-x-4 rounded px-4 py-3 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`}>
                    <IoPeopleOutline />
                    <span>Employee</span>
                </NavLink>

                
                <NavLink
                    to="/admin-dashboard/department"
                    className={({ isActive }) => `flex text-xl items-center space-x-4 rounded px-4 py-3 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`}>
                    <TbHomePlus />
                    <span>Department</span>
                </NavLink>


                <NavLink
                    to="/admin-dashboard/salary"
                    className={({ isActive }) => `flex text-xl items-center space-x-4 rounded px-4 py-3 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`}>
                    <GiMoneyStack />
                    <span>Salary</span>
                </NavLink>

                
                <NavLink
                    to="/admin-dashboard/leaves"
                    className={({ isActive }) => `flex text-xl items-center space-x-4 rounded px-4 py-3 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`}>
                    <FcLeave />
                    <span>Leave</span>
                </NavLink>

                
                <NavLink
                    to="/admin-dashboard/setting"
                    className={({ isActive }) => `flex text-xl items-center space-x-4 rounded px-4 py-3 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"}`}>
                    <IoSettingsOutline />
                    <span>Setting</span>
                </NavLink>

            </div>
        </div>
    )
}

export default adminSidebar
