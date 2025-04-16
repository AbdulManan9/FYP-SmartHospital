import React from 'react'
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Appointment from './Pages/Appointments/Appointment.jsx';
import AppointmentDetails from './Pages/AppointmentDetails/AppointmentDetails.jsx';
import AdmitPatientList from './Pages/AdmitPatientList/AdmitPatientList.jsx';
import PatientDetails from './Pages/PatientDetails/PatientDetails.jsx';
const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/Appointment' element={<Appointment/>}/>
    <Route path='/PatientAppointmentDetails' element={<AppointmentDetails/>}/>
    <Route path='/admitPatients' element={<AdmitPatientList/>}/>
    <Route path='/PatientDetails' element={<PatientDetails/>}/>
    
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
