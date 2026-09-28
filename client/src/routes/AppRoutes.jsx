import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Diagnosis from '../pages/Diagnosis';
import History from '../pages/History';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Emergency from '../pages/Emergency';
import DoctorDesk from '../pages/DoctorDesk';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/doctor-desk" element={<DoctorDesk />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/register" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
