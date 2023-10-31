import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

const PropCard = ({ property }) => {
  const { id, imageUrl, address, sqft, bedrooms, baths, expenses, isRented, rentIncome } = property;

  // Calculate total income if the property is rented
  const totalIncome = isRented ? rentIncome - expenses : null;

  return (
    // Wrap the card with Link to make it navigable
    <Link to={`/property/update/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg my-2 hover:bg-gray-200 cursor-pointer">
        <img className="w-full" src={imageUrl} alt="Property" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-black">Property Details</div>
          <p className="text-black">{address}</p>
          <p className="text-black">{sqft} Sqft</p>
          <p className="text-black"v>{bedrooms} Bedrooms</p>
          <p className="text-black">{baths} Baths</p>
          <p className="text-red-500">${expenses} Expenses</p> 
          {isRented && (
            <>
              <p className="text-green-500">${rentIncome} Rent Income</p> 
              <p className="text-blue-500">Total Income: ${totalIncome} (rent income - expenses)</p> {/* Adjust styling for total income calculation */}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropCard;
