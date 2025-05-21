import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Appointment from './Pages/Appointments/Appointment.jsx';
import AppointmentDetails from './Pages/AppointmentDetails/AppointmentDetails.jsx';
import AdmitPatientList from './Pages/AdmitPatientList/AdmitPatientList.jsx';
import PatientDetails from './Pages/PatientDetails/PatientDetails.jsx';
import SetPassword from './Componend/SetPassword.jsx';
import Login from './Pages/Login/Login.jsx';
import TodayAppointment from "./Pages/TodayAppointment/TodayAppointment.jsx";
import MonitorWard from "./Pages/MonitorWard/MonitorWard.jsx";

// Your previous project's PrivateRoute logic
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/set-password/:token" element={<SetPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/Appointment" element={<PrivateRoute element={<Appointment />} />} />
        <Route path="/PatientAppointmentDetails" element={<PrivateRoute element={<AppointmentDetails />} />} />
        <Route path="/admitPatients" element={<PrivateRoute element={<AdmitPatientList />} />} />
        <Route path="/PatientDetails" element={<PrivateRoute element={<PatientDetails />} />} />
        <Route path="/todayAppointment" element={<PrivateRoute element={<TodayAppointment />} />} />
        <Route path="/wardMonitoring" element={<PrivateRoute element={<MonitorWard />} />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
