import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';

const data = [
  { name: 'Profit', value: 700 },
  { name: 'Loss', value: 300 },
];

const COLORS = ['#ff4998', '#1665d8'];

const TotalProfitCard = () => {
  const totalValue = data.reduce((total, entry) => total + entry.value, 0);
  
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Total Profit</h2>
      <hr className='mt-5' />
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
          <Label value={`${((data[0].value / totalValue) * 100).toFixed(2)}% Profit`} position="center" />
        </Pie>
        <Tooltip />
        <Legend payload={data.map((entry, index) => ({ color: COLORS[index % COLORS.length], type: 'square', value: entry.name }))} />
      </PieChart>
    </div>
  );
};

export default TotalProfitCard;
