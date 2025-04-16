import React from 'react'
import './Home.css'
import Header from '../../componend/Header/Header'
import OurMissions from '../../componend/OurMissions/OurMissions'
import Questions from '../../componend/Questions/Questions'
import OurMedicalServices from '../../componend/MedicalServices/MedicalServices.jsx'
// import Footer from '../../componend/Footer/Footer.jsx'

const Home = () => {
  return (
    <div>
      <Header/>
      <OurMissions/>
      <OurMedicalServices/>
      <Questions/>
      
      
    </div>
  )
}

export default Home
