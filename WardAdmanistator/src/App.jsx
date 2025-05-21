import React from 'react';
import { Routes, BrowserRouter, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboar';
import PandingAdmission from './pages/PandingAdmission/PandingAdmission';
import AdmitedPatientList from './pages/AdmitedPatientList/AdmitedPatientList';
import Login from './pages/Login/Login';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();
  
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route - Only accessible when not logged in */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Require authentication */}
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/pandingAdmission" element={<PrivateRoute element={<PandingAdmission />} />} />
        <Route path="/totalAdmitedPatient" element={<PrivateRoute element={<AdmitedPatientList />} />} />

        {/* Redirect to login for any unknown routes if not authenticated */}
        <Route path="*" element={
          localStorage.getItem("token") ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;