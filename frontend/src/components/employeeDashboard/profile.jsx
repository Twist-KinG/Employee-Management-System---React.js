
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    maritalStatus: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
          console.error("No token found");
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/employee/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.employee);

        const { userId: user, dob, maritalStatus } = res.data.employee;
        setFormData({
          username: user.username || '',
          email: user.email || '',
          dob: dob ? new Date(dob).toISOString().substring(0, 10) : '',
          maritalStatus: maritalStatus || '',
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  const { userId, dob, gender, maritalStatus, department, designation, salary, role } = profile;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('token');
  //     const userIdLocal = localStorage.getItem('userId');

  //     const updatedData = {
  //       username: formData.username,
  //       email: formData.email,
  //       dob: formData.dob,
  //       maritalStatus: formData.maritalStatus,
  //     };

  //     const res = await axios.put(
  //       `http://localhost:5000/api/employee/profile/${userIdLocal}`,
  //       updatedData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     );

  //     setProfile(res.data.employee);
  //     setIsEditing(false);
  //   } catch (err) {
  //     console.error("Error updating profile:", err);
  //     alert("Failed to update profile. Please try again.");
  //   }
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('token');

  //     // Fix: parse userId from localStorage correctly
  //     let userIdLocal = localStorage.getItem('userId');
  //     try {
  //       userIdLocal = JSON.parse(userIdLocal);
  //       if (typeof userIdLocal === 'object') {
  //         userIdLocal = userIdLocal._id || userIdLocal.id || '';
  //       }
  //     } catch {
  //       // userIdLocal is already a string, no action needed
  //     }

  //     if (!userIdLocal) {
  //       throw new Error('User ID is invalid');
  //     }

  //     const updatedData = {
  //       username: formData.username,
  //       email: formData.email,
  //       dob: formData.dob,
  //       maritalStatus: formData.maritalStatus,
  //     };

  //     const res = await axios.put(
  //       `http://localhost:5000/api/employee/profile/${userIdLocal}`,
  //       updatedData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     );

  //     setProfile(res.data.employee);
  //     setIsEditing(false);
  //   } catch (err) {
  //     console.error("Error updating profile:", err);
  //     alert("Failed to update profile. Please try again.");
  //   }
  // };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Use as in fetchProfile

      if (!userId || !token) {
        throw new Error('Missing user ID or token');
      }

      const updatedData = {
        username: formData.username,
        email: formData.email,
        dob: formData.dob,
        maritalStatus: formData.maritalStatus,
      };

      const res = await axios.put(
        `http://localhost:5000/api/employee/profile/${userId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(res.data.employee);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };



  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-8 border-b border-blue-500 pb-4 text-blue-700">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-12">
        {/* Left side: Image + Username */}
        <div className="flex flex-col items-center mb-8 md:mb-0 md:w-1/3">
          <img
            src={`http://localhost:5000/${userId.profileImage}`}
            alt="Profile"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-blue-600 object-cover shadow-lg"
          />
          <h3 className="mt-4 text-2xl font-bold text-gray-800">{userId.username}</h3>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Right side: either details or edit form */}
        <div className="md:w-2/3 space-y-4 text-gray-700 text-lg">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Editable Fields */}
              <div>
                <label className="font-semibold text-gray-900" htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-900" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-900" htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-900" htmlFor="maritalStatus">Marital Status:</label>
                <input
                  type="text"
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>

              {/* Non-editable Fields (display only) */}

              <div>
                <strong className="font-semibold text-gray-900">Role:</strong> {role}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Designation:</strong> {designation}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Gender:</strong> {gender}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Department:</strong> {department?.department_name || 'N/A'}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Salary:</strong> ₹{salary.toLocaleString()}
              </div>

              <div className="flex space-x-4">

                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Save</button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition">
                  Cancel</button>

              </div>
            </form>
          ) : (
            <>
              <div>
                <strong className="font-semibold text-gray-900">Email:</strong> {userId.email}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Role:</strong> {role}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Designation:</strong> {designation}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Date of Birth:</strong> {new Date(dob).toLocaleDateString()}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Gender:</strong> {gender}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Marital Status:</strong> {maritalStatus}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Department:</strong> {department?.department_name || 'N/A'}
              </div>
              <div>
                <strong className="font-semibold text-gray-900">Salary:</strong> ₹{salary.toLocaleString()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
