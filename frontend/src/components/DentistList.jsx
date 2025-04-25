// src/pages/DentistList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const dentists = [
  { name: 'Dr. Priya Sharma', specialization: 'Orthodontist', experience: '8 years' },
  { name: 'Dr. Rahul Mehta', specialization: 'Pediatric Dentist', experience: '5 years' },
  { name: 'Dr. Ayesha Khan', specialization: 'Endodontist', experience: '7 years' },
  { name: 'Dr. Amit Patel', specialization: 'Periodontist', experience: '10 years' },
];

const DentistList = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-6">Select a Dentist</h2>
      <ul className="flex flex-wrap justify-center gap-6">
        {dentists.map((dentist, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg w-64 shadow-md transform transition duration-200 hover:bg-teal-100 hover:translate-y-2">
            <h3 className="text-xl font-medium mb-2">{dentist.name}</h3>
            <p><span className="font-semibold">Specialization:</span> {dentist.specialization}</p>
            <p><span className="font-semibold">Experience:</span> {dentist.experience}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link to="/login" className="text-teal-600 hover:underline">Login</Link> | 
        <Link to="/register" className="text-teal-600 hover:underline"> Register</Link>
      </div>
    </div>
  );
};

export default DentistList;
