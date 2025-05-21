import React from 'react';
import { Routes, BrowserRouter, Route, Navigate, useLocation } from 'react-router-dom';
import SetPassword from './Pages/SetPassword';
import Dashboard from './Pages/Dashboard/Dashboard';
import PatientDetails from './Pages/PatientDetails/PatientDetails';
import Login from './Pages/Login/Login';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for auth token
  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  // Set dutyWard only if it doesn't exist
  if (!localStorage.getItem('dutyWard')) {
    const dutyWard = '67b3e654cb6d069230abda45';
    localStorage.setItem('dutyWard', dutyWard);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/set-Nursepassword/:token" element={<SetPassword />} />

        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/PatientDetails" element={<PrivateRoute element={<PatientDetails />} />} />

        {/* Redirect to login for any unknown routes if not authenticated */}
        <Route path="*" element={
          localStorage.getItem('token') ? (
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