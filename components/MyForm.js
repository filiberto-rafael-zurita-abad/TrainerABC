'use client'
// pages/index.js

import { useState } from 'react';

const optionsA = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const optionsB = Array.from({ length: 16 }, (_, i) => (i + 1).toString());

const MyForm = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  const handleReset = () => {
    setSelectedA(null);
    setSelectedB(null);
  };

  const handleSubmit = () => {
    // Handle form submission here (e.g., send data to server)
    console.log('Selected A:', selectedA);
    console.log('Selected B:', selectedB);
    handleReset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white border p-4 rounded-lg shadow-lg max-w-full w-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <select
              value={selectedA || ''}
              onChange={(e) => setSelectedA(e.target.value)}
              className="border p-2"
            >
              <option value="">Select A</option>
              {optionsA.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={selectedB || ''}
              onChange={(e) => setSelectedB(e.target.value)}
              className="border p-2"
            >
              <option value="">Select B</option>
              {optionsB.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
          

          <div className="flex justify-center">
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyForm;


