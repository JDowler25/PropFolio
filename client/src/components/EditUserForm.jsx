import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';



const EditUserForm = () => {
    const { user } = useContext(UserContext)
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        user_name: '',
        email: '',
        password: '',
        confirm: ''
    });

    // Fetch the user data from the backend when the component mounts
    useEffect(() => {
        const userId = user.id;

        axios.get(`http://localhost:8080/api/user/${userId}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const isValid = () => {
        let valid = true;
        const errors = {}; 

        if (userData.user_name.length < 3) {
            valid = false;
            errors.user_name = "Username must be more than 3 character";
        }
        if (!userData.email) {
            valid = false;
            errors.email = "Email is required!";
        }
        if (userData.password.length < 3) {
            valid = false;
            errors.password = "Password must be more than 3 character";
        }
        if (userData.confirm !== userData.password) {
            valid = false;
            errors.confirm = "Passwords do not match";
        }
        setFormErrors(errors); // Set the form errors object
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid()) {
            try {
                console.log(userData);
                const response = await axios.put(`http://localhost:8080/api/user/update/${user}`, userData);
                if (response && response.data) {
                    console.log(response.data);
                    navigate('/profile');
                } else {
                    console.log("Error updating user: No data returned");
                }
            } catch (errors) {
                console.log(errors.response.data.errors);
            }
        }
    };
    

    return (
        <div className="container bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 w-96 h-16">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 w-96 h-14">
                    <label className="block text-sm font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={userData.user_name}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                {formErrors.user_name && (
                    <div className="text-red-500 mt-1">{formErrors.user_name}</div>
                )}
                <div className="mb-4 w-96 h-14">
                    <label className="block text-sm font-medium mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                {formErrors.email && (
                    <div className="text-red-500 mt-1">{formErrors.email}</div>
                )}
                <div className="mb-4 w-96 h-14">
                    <label className="block text-sm font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                {formErrors.password && (
                    <div className="text-red-500 mt-1">{formErrors.password}</div>
                )}
                <div className="mb-4 w-96 h-14">
                    <label className="block text-sm font-medium mb-2">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        name="confirm"
                        value={userData.confirm}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                {formErrors.confirm && (
                    <div className="text-red-500 mt-1">{formErrors.confirm}</div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditUserForm;
