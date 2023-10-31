import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for getting ID from URL
import SideNavBar from '../components/SideNavBar';
import Header from '../components/Header';
import axios from 'axios';
import UpdatePropForm from '../components/UpdatePropForm';


const UpdateProp = () => {
    const { id } = useParams(); // Get ID from URL

    console.log("ID from params:", id); // Log the ID value

    const [property, setProperty] = useState(null); // State to hold property data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle error

    useEffect(() => {
        // Check if the ID is null or undefined before making the request
        if (id == null || isNaN(Number(id))) {
            console.error("Invalid ID:", id); // Log error if ID is not a valid number
            setError('Invalid ID received');
            setLoading(false);
        } else {
            // Fetch property data from API when component is mounted
            const fetchProperty = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/properties/${id}`); // Adjust API endpoint
                    setProperty(response.data); // Set fetched data to state
                    setLoading(false); // Set loading to false after data is fetched
                } catch (err) {
                    setError('Error fetching property data'); // Set error message
                    setLoading(false); // Set loading to false if there is an error
                }
            };

            fetchProperty(); // Call the fetch function
        }
    }, [id]); // Dependency array with id to re-run effect if id changes

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-sidebar-bg text-white w-52 flex-shrink-0">
                <SideNavBar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-f0f0f7">
                {/* Header */}
                <Header />
                {/* Main Content */}
                <main className="flex-grow flex flex-col items-center justify-center bg-f0f0f7 p-4 mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Update Property</h1>
                    {loading && <p>Loading property data...</p>} {/* Loading message */}
                    {error && <p className="text-red-500">{error}</p>} {/* Error message */}
                    {!loading && !error && property && (
                        // Pass fetched property data to UpdatePropForm (to be created)
                        <UpdatePropForm property={property} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default UpdateProp;
