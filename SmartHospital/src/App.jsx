import React from 'react'
import Navbar from './componend/Navbar/Navbar'
import './App.css'
import Home from './pages/Home/Home'
import Footer from './componend/Footer/Footer.jsx'
import Doctor from './pages/Doctors/Doctor.jsx'
import DoctorProfile from './pages/DoctorProfile/DoctorProfile.jsx'
import AboutUs from './pages/AboutUs/AboutUs.jsx'
import AppointmentForm from './pages/AppointmentForm/AppointmentForm.jsx'
import MedicalRecord from './pages/MedicalRecord/MedicalRecord.jsx'
import MedicalRecords from './pages/MedicalRecords/MedicalRecords.jsx'
import PatientMedicalRecord from './pages/PatientMedicalRecord/PatientMedicalRecord.jsx'
import { Routes, BrowserRouter, Route } from "react-router-dom";
import QuestionAnswer from './pages/QuestionAnswer/QuestionAnswer.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      
      
        <Routes>
          
        
          <Route path='/' element={<Home/>}/>
          <Route path='/doctor' element={<Doctor/>}/>
          <Route path='/profile' element={<DoctorProfile/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/Appointment' element={<AppointmentForm/>}/>
          <Route path='/MedicalRecord' element={<MedicalRecord/>}/>
          <Route path='/FrequentlyQuestion' element={<QuestionAnswer/>}/>
          <Route path='/MedicalRecords' element={<MedicalRecords/>}/>
          <Route path='/PatientMedicalRecord' element={<PatientMedicalRecord/>}/>
        </Routes>
    
    <Footer/>
    </div>
  )
}

export default App
