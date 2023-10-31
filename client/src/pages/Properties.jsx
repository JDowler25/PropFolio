import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import PropCard from '../components/PropCard';
import SideNavBar from '../components/SideNavBar';
import { Link } from 'react-router-dom';

const Properties = () => {
    const [properties, setProperties] = useState([]); // state to hold properties data

    useEffect(() => {
        // function to fetch properties data
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/properties'); // adjust the endpoint as needed
                setProperties(response.data); // set the fetched data to state
            } catch (error) {
                console.error('Error fetching properties data: ', error);
            }
        };

        fetchProperties(); // call the function to fetch data
    }, []); // empty dependency array means this useEffect runs once when component mounts

    return (
        <div className="flex w-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-sidebar-bg text-white w-52 flex-shrink-0">
                <SideNavBar />
            </div>

            {/* Main Content Area */}
            <div className="container flex-1 flex flex-col overflow-hidden bg-f0f0f7">
                {/* Header */}
                <Header />
                {/* Main Content */}
                <main className="container flex-grow flex flex-col items-center justify-center bg-f0f0f7 p-4 mx-auto overflow-y-scroll">
                    <h1 className="text-2xl font-semibold mb-4">Properties</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties.map(property => (
              <Link key={property.id} to={`/properties/update/${property.id}`}>
                <PropCard property={property} /> {/* render PropCard for each property */}
              </Link>
            ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Properties