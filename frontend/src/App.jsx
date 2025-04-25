import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DentistList from './components/DentistList';
import CheckupForm from './components/CheckupForm';
import UploadForm from './components/UploadForm';
import Results from './components/Results';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<DentistList />} />
        <Route path="/checkup/:id" element={<CheckupForm />} />
        <Route path="/results/:checkupId" element={<Results />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}
