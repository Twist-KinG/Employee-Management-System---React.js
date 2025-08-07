import React from 'react'
import { useAuth } from '../../context/authContext'

const navbar = () => {
    
    const { user, logout } = useAuth();
    

  return (

    <div className='flex items-center justify-between text-white w-full bg-blue-600 h-12 px-4 sticky top-0 z-50 shadow-md'>
      {/* welcome message */}
      <p className='font-medium text-xl'>Welcome, {user.role}</p>

      {/* logout button */}
      <button
        onClick={logout}
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold text-md px-4 py-1 rounded-xl border-1 border-white transition-all duration-200 shadow-md active:scale-95 focus:outline-none hover:border-blue-300">
        Logout</button>
    </div>

  )
}

export default navbar
