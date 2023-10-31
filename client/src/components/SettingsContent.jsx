import React, { useState } from 'react';
import UserProfile from './UserProfile';
import Help from './Help';
import accountIcon  from '../assets/accountCircle.svg?w=500&format=webp';
import helpIcon from '../assets/helpIcon.svg?w=500&format=webp';

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className='p-4'>
            <UserProfile />
          </div>
        );
      case 'help':
        return (
          <div className='p-4 '>
            <Help />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 font-semibold">Settings</h2>
      <div className='container bg-white rounded-lg shadow-lg p-4 flex '>
        <div className="p-4">
          <ul className='flex-column'>
            <li onClick={() => setActiveTab('profile')} className='py-4 flex cursor-pointer'>
              <img src={accountIcon} alt="account icon" className='px-1' /> Profile
            </li>
            <li onClick={() => setActiveTab('help')} className='py-4 flex cursor-pointer'>
              <img src={helpIcon} alt="account icon" className='px-1' /> Help
            </li>
          </ul>
        </div>
        <div className='container'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default SettingsContent;
