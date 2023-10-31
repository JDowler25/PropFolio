import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const PropForm = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const { user } = useContext(UserContext)
    const [formData, setFormData] = useState({
        address: '',
        sqft: '',
        bedrooms: '',
        baths: '',
        expenses: '',
        isRented: false,
        rentIncome: '',
        imageUrl: '',
        user: {id: user.id},
    });

    console.log(user); console.log("Current User State:", user);
    console.log("User from Local Storage:", localStorage.getItem("user_id"));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            isRented: !prevFormData.isRented,
            rentIncome: !prevFormData.isRented ? prevFormData.rentIncome : 0 // or null
        }));
    };

    const isValid = () => {
        let valid = true;
        const errors = {}; // Create an empty object to store errors

        if (formData.address.length < 3) {
            valid = false;
            errors.address = "Address must be more than 3 character";
        }
        if (formData.sqft < 100 || formData.sqft > 10000) {
            valid = false;
            errors.sqft = "Square footage must be between 100 and 10,000";
        }
        if (formData.bedrooms < 1 || formData.bedrooms > 10) {
            valid = false;
            errors.bedrooms = "Number of bedrooms must be between 1 and 10";
        }
        if (formData.baths < 1 || formData.baths > 10) {
            valid = false;
            errors.baths = "Number of baths must be between 1 and 10";
        }
        if (formData.expenses <= 0 || isNaN(formData.expenses)) {
            valid = false;
            errors.expenses = "Expenses must be a positive number";
        }
        if (formData.isRented) {
            if (formData.rentIncome <= 0 || isNaN(formData.rentIncome)) {
                valid = false;
                errors.rentIncome = "Rent Income must be a positive number when property is rented";
            }
        }

        setFormErrors(errors); // Set the form errors object

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.log("User is not logged in.");
            // Handle this case: show an error message or redirect to login page
            return;
        }
        if (isValid()) {
            try {
                console.log("Sending formData:", formData);
                const response = await axios.post('http://localhost:8080/api/properties/create', formData);
                console.log(response.data);
                navigate('/properties');
            } catch (errors) {
                console.log(errors); // Log the entire error object
                // Check if response.data.errors exists before trying to log it
                console.log(errors.response?.data?.errors); 
            }
        } else {
            // Handle form validation errors
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Property Address
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Property Address"
                />
            </div>
            {/* ... Repeat similar div structure for other inputs ... */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqft">
                    Property Sqft
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleChange}
                    placeholder="Property Sqft"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqft">
                    Property Bedrooms
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="Property Bedrooms"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqft">
                    Property Baths
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    placeholder="Property Baths"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sqft">
                    Property Expenses
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="expenses"
                    value={formData.expenses}
                    onChange={handleChange}
                    placeholder="Property expenses"
                />
            </div>
            <div className="mb-4">
                <input
                    type="checkbox"
                    checked={formData.isRented}
                    onChange={handleCheckboxChange}
                    className="mr-2 leading-tight"
                />
                <label className="text-sm">
                    Rented
                </label>
            </div>
            {formData.isRented && (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rentIncome">
                        Rent Income
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="rentIncome"
                        value={formData.rentIncome}
                        onChange={handleChange}
                        placeholder="Rent Income"
                    />
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Property Image
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Property Image Url"
                />
                {Object.values(formErrors).map((error, index) => (
                    <p key={index} className="text-red-500">{error}</p>
                ))}
            </div>
            <input type="hidden" name='user_id' value={user} />
            {/* ... (other input fields) ... */}
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default PropForm;
