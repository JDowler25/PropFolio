import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePropForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        address: '',
        sqft: '',
        bedrooms: '',
        baths: '',
        expenses: '',
        isRented: false,
        rentIncome: 0,
        imageUrl: ''
    });

    // Fetch initial data for the property
    useEffect(() => {
        axios.get(`http://localhost:8080/api/properties/${id}`)
            .then(response => setFormData(response.data)) // Set the initial data
            .catch(err => console.log(err));
    }, [id]); // Dependency array to re-run effect when `id` changes

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

    // Updated handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid()) {
            try {
                console.log(formData.address)
                const response = await axios.put(`http://localhost:8080/api/properties/update/${id}`, formData);
                console.log(response.data);
                navigate('/properties');
            }
            catch (errors) {
                console.log("here**************************")
                if (errors.response && errors.response.data && errors.response.data.errors) {
                    console.log(errors.response.data.errors);
                } else {
                    console.error('An unexpected error occurred:', errors.message || errors);
                }
            }
        }
    };


    const handleDelete = async () => {
        try {
            // Making a DELETE request to the server
            await axios.delete(`http://localhost:8080/api/properties/delete/${id}`);
            // Navigate to another page after successful deletion
            navigate('/properties');
        } catch (errors) {
            if (errors.response && errors.response.data && errors.response.data.errors) {
                console.log(errors.response.data.errors);
            } else {
                console.error('An unexpected error occurred:', errors.message || errors);
            }
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
            <div className="flex items-center justify-between">
                <div className='mx-4'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
                <div className='mx-4'>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleDelete}
                    >
                        Delete Property
                    </button>
                </div>
            </div>
        </form>
    );
}

export default UpdatePropForm;