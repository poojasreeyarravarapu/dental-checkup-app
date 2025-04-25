import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dentistList = {
  1: 'Dr. Priya Sharma',
  2: 'Dr. Rahul Mehta',
  3: 'Dr. Ayesha Khan',
  4: 'Dr. Amit Patel',
};

const CheckupForm = () => {
  const { id } = useParams();  // Extract id from the URL
  const navigate = useNavigate();  // Used for navigation

  const [patientName, setPatientName] = useState('');
  const [dentist, setDentist] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    // Ensure that the dentist id exists and update the dentist name
    if (id && dentistList[id]) {
      setDentist(dentistList[id]);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      patientName,
      dentist,
      symptoms,
      appointmentDate,
      appointmentTime,
      additionalInfo
    };
    console.log(formData);
    alert("Appointment booked!");

    // Navigate to the results page, passing the checkupId
    if (id) {
      navigate(`/results/${id}`);
    } else {
      console.error('No dentist id found');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">Book Your Checkup</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="patientName" className="block text-lg font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label htmlFor="dentist" className="block text-lg font-medium text-gray-700">Select Dentist</label>
          <select
            id="dentist"
            value={dentist}
            onChange={(e) => setDentist(e.target.value)}
            required
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select a Dentist</option>
            {Object.entries(dentistList).map(([key, name]) => (
              <option key={key} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-lg font-medium text-gray-700">Symptoms</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
            rows="4"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="appointmentDate" className="block text-lg font-medium text-gray-700">Preferred Date</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="appointmentTime" className="block text-lg font-medium text-gray-700">Preferred Time</label>
            <input
              type="time"
              id="appointmentTime"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-lg font-medium text-gray-700">Additional Information</label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows="3"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckupForm;
