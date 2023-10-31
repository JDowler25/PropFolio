import React from 'react'
import SideNavBar from './SideNavBar';
import Header from './Header';
import PropForm from './PropForm';

const CreateProp = () => {
    
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
                    <div className="w-full max-w-screen-lg mx-auto">
                        <h1 className='mb-6'>Create New Property</h1>
                        <PropForm />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CreateProp