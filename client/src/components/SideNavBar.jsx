import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import logo from '../assets/logo.svg?w=500&format=webp'; 

const SideNavBar = () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate(); // initialize useNavigate


  // Add this useEffect hook
  useEffect(() => {
    if (activeTab === 'Properties') {
      console.log("Navigating to /properties");
      navigate('/properties'); // Navigate when activeTab changes to 'Properties'
      setActiveTab('Properties')
    }
    if (activeTab === 'Overview') {
      console.log("Navigating to /overview");
      navigate('/dashboard');
      setActiveTab('Overview')
    }
    if (activeTab === 'Settings') {
      console.log("Navigating to /settings");
      navigate('/settings');
      setActiveTab('Settings')
    }
    // Add more navigation logic for other tabs if needed
  }, [activeTab, navigate]); // Depend on activeTab and navigate

  return (
    <div className="min-w-fit flex-none overflow-y-auto h-screen bg-sidebar-bg">
      <div className="flex flex-col items-center py-4">
        {/* Logo */}
        <img src={logo} alt="Company Logo" className="w-28 h-28 mx-auto mb-4" />

        {/* Separator Line */}
        <hr className="border-t border-hr-color w-full mb-4" />

        {/* Create New Button */}
        <button
          onClick={() => navigate('/property/new')} 
          className="py-2 px-4 mb-4 w-3/4 rounded-3xl shadow-lg bg-button-green text-white text-sm"
        >
          + Create New
        </button>


        {/* Separator Line */}
        <hr className="border-t border-hr-color w-full mb-4" />

        {/* Navigation Tabs */}
        <nav className="mt-4 w-full">
          <ul className="list-none">
            {['Overview', 'Properties', 'Settings'].map((item) => (
              <li
                key={item}
                className={`mb-2 py-2 px-4 cursor-pointer rounded-3xl text-center transition-colors duration-200 w-3/4 mx-auto ${activeTab === item ? 'bg-white text-sidebar-bg' : 'text-text-color hover:bg-white hover:text-sidebar-bg'
                  }`}
                onClick={() => setActiveTab(item)} // update the activeTab state here
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNavBar;
