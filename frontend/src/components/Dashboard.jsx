// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = (id) => {
    navigate(`/checkup/${id}`);
  };

  const dentists = [
    { id: 1, name: 'Dr. Priya Sharma', specialization: 'Orthodontist', experience: '8 years' },
    { id: 2, name: 'Dr. Rahul Mehta', specialization: 'Pediatric Dentist', experience: '5 years' },
    { id:3, name: 'Dr. Ayesha Khan', specialization: 'Endodontist', experience: '7 years' },
    {id:4, name: 'Dr. Amit Patel', specialization: 'Periodontist', experience: '10 years' },
    // Add more if needed...
  ];

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold mb-6">Select a Dentist</h2>
      <ul className="flex flex-wrap justify-center gap-6">
        {dentists.map((dentist) => (
          <li
            key={dentist.id}
            className="bg-white p-4 rounded-lg shadow-md w-64 transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">{dentist.name}</h3>
            <p className="text-gray-700">Specialization: {dentist.specialization}</p>
            <p className="text-gray-700 mb-4">Experience: {dentist.experience}</p>
            <button
              onClick={() => handleAppointmentClick(dentist.id)}
              className="mt-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Book Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
