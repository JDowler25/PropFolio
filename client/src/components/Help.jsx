import React from 'react';
import accountIcon from '../assets/accountCircle.svg?w=500&format=webp';

const Help = () => {
    return (
        <div className="container bg-white rounded-lg shadow-lg p-8 ">
            <h2 className='text-2xl font-semibold mb-4 w-96 h-16'>Help & Information</h2>
            <div className="mb-4">
                <h3 className="text-xl mb-2">Create New Button</h3>
                <p>Click the "Create New" button to redirect to the page where you can create a new property.</p>
                <button onClick={() => navigate('/create-property')} className="py-2 px-4 my-4 w-1/4 rounded-3xl shadow-lg bg-button-green text-white text-sm">
                    + Create New
                </button>
            </div>

            <div className="mb-4">
                <h3 className="text-xl mb-2">Search Bar</h3>
                <p>Use the search bar to search for specific pages within the web application.</p>
                <input type="text" placeholder="Search..." className="border rounded p-2 w-full" />
            </div>

            <div className="mb-4">
                <h3 className="text-xl mb-2 flex">Profile Icon <img src={accountIcon} alt="account icon" className='px-2' />
                </h3>
                <p>Click on the profile icon to navigate to settings, profile-exclusive pages, or to log out.</p>
            </div>

            <div className="mb-4">
                <h3 className="text-xl mb-2">Side Navigation</h3>
                <p>Use the side navigation bar to navigate between Properties, Overview, or Settings pages.</p>
                <ul className="list-disc pl-5">
                    <li>Properties: View and manage your properties.</li>
                    <li>Overview: Get a quick overview of your account and properties.</li>
                    <li>Settings: Adjust your account and application settings.</li>
                </ul>
            </div>
            <div className="mb-4">
                <h3 className="text-xl mb-2">Overview Page</h3>
                <ul className="list-disc pl-5">
                    <li>
                        <strong>Profit / Loss Margin:</strong> Displays the current profit or loss margin of your property portfolio. This helps you understand how well your investments are performing.
                    </li>
                    <li>
                        <strong>Rented / Vacant Properties:</strong> Shows a count of how many properties are currently rented out and how many are vacant. This allows you to quickly gauge the occupancy rate of your properties and make informed decisions.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Help