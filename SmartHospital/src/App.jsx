import React from 'react';
import Navbar from './componend/Navbar/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import Footer from './componend/Footer/Footer.jsx';
import Doctor from './pages/Doctors/Doctor.jsx';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import AppointmentForm from './pages/AppointmentForm/AppointmentForm.jsx';
import MedicalRecord from './pages/MedicalRecord/MedicalRecord.jsx';
import MedicalRecords from './pages/MedicalRecords/MedicalRecords.jsx';
import PatientMedicalRecord from './pages/PatientMedicalRecord/PatientMedicalRecord.jsx';
import Login from './pages/Login/Login.jsx';
import { Routes, BrowserRouter, Route, Navigate, useLocation } from "react-router-dom";
import QuestionAnswer from './pages/QuestionAnswer/QuestionAnswer.jsx';

// ✅ Add PrivateRoute
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login';

  return (
    <div>
      {!hideNavAndFooter && <Navbar />}
      
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/profile' element={<DoctorProfile />} />
        <Route path='/AboutUs' element={<AboutUs />} />

        {/* ✅ Protected Routes */}
        <Route path='/Appointment' element={<PrivateRoute element={<AppointmentForm />} />} />
        <Route path='/PatientMedicalRecord' element={<PrivateRoute element={<PatientMedicalRecord />} />} />

        {/* Unprotected */}
        <Route path='/MedicalRecord' element={<MedicalRecord />} />
        <Route path='/FrequentlyQuestion' element={<QuestionAnswer />} />
        <Route path='/MedicalRecords' element={<MedicalRecords />} />
      </Routes>

      {!hideNavAndFooter && <Footer />} 
    </div>
  );
};

export default App;
