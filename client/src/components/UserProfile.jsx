import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { user } = useContext(UserContext)
  

  useEffect(() => {
    const userId = user.id;
    
    // Fetch user data from the server
    axios.get(`http://localhost:8080/api/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleEditClick = () => {
    navigate('/edit/profile');  // Redirect to the EditUser page
  };

  if (!userData) return <div>Loading...</div>;  // Display loading state until data is fetched

  return (
    <div className="container bg-white rounded-lg shadow-lg p-8 ">
      <h2 className="text-2xl font-semibold mb-4 w-96 h-16">Profile</h2>
      <div className="mb-4 w-96 h-14">
        <label className="block text-sm font-medium mb-2">Username:</label>
        <p>{userData.user_name}</p>
      </div>
      <div className="mb-4 w-96 h-14">
        <label className="block text-sm font-medium mb-2">Email:</label>
        <p>{userData.email}</p>
      </div>
      <div className="mb-4 w-96 h-14">
        <label className="block text-sm font-medium mb-2">Password:</label>
        <p>********</p>
      </div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleEditClick}
      >
        Edit
      </button>
    </div>
  );
}

export default UserProfile;
