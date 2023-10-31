import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import axios from 'axios';
import { UserContext } from '../context/UserContext';


const COLORS = ['#ff4998', '#1665d8'];

const OccupancyRateCard = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState([
    { name: 'Vacant', value: 0 },
    { name: 'Occupied', value: 0 },
  ]);

  useEffect(() => {
    // Assume user id is stored in localStorage, adjust if stored differently
    const userId = user.id;

    axios.get(`http://localhost:8080/api/properties/user/${userId}`)
      .then(response => {
        const properties = response.data;

        // Calculate vacant and occupied properties
        let vacant = 0, occupied = 0;
        properties.forEach(property => property.isRented ? occupied++ : vacant++);

        setData([
          { name: 'Vacant', value: vacant },
          { name: 'Occupied', value: occupied }
        ]);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        // Handle error appropriately
      });
  }, []); // Empty dependency array means this useEffect runs once when component mounts
  
  const totalUnits = data.reduce((total, entry) => total + entry.value, 0);
  
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Occupancy Rate</h2>
      <hr className='mt-5'/>
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx={250}
          cy={250}
          innerRadius={125}
          outerRadius={150}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label value={`${((data[1].value / totalUnits) * 100).toFixed(2)}% Occupied`} position="center" />
        </Pie>
        <Tooltip />
        <Legend payload={data.map((entry, index) => ({ color: COLORS[index % COLORS.length], type: 'square', value: entry.name }))} />
      </PieChart>
    </div>
  );
};

export default OccupancyRateCard;
