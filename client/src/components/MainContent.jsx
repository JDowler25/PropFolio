import React from 'react';
import OccupancyRateCard from './OccupancyRateCard';
import TotalProfitCard from './TotalProfitCard';

const MainContent = () => {
  return (
    <div className="flex space-x-10 p-4">
      <OccupancyRateCard />
      <TotalProfitCard />
    </div>
  );
};

export default MainContent;
