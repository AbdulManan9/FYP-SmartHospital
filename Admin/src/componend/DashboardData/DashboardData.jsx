import React from 'react';
import './DashboardData.css';
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { FaRegHospital } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
const DashboardData = () => {
  return (
    <div>
      <div className='dashboard-items'>
       <div className='dashboard-item'>
        <p style={{color:'#006F8F',fontWeight:'600'}}> Doctor Deatails</p>
        <div style={{marginTop:"20px"}}>
          <FaUserDoctor style={{width:'80px',height:'80px',color:'#FFB800'}}></FaUserDoctor>

        </div>
       </div>
       <div className='dashboard-item'>
        <p style={{color:'#006F8F',fontWeight:'600'}}> Nurse Details</p>
        <div style={{marginTop:"20px"}}>
          <FaUserNurse style={{width:'80px',height:'80px',color:'#FFB800'}}></FaUserNurse>

        </div>
       </div>
       <div className='dashboard-item'>
        <p style={{color:'#006F8F',fontWeight:'600'}}>Ward Details</p>
        <div style={{marginTop:"20px"}}>
          <FaRegHospital style={{width:'80px',height:'80px',color:'#FFB800'}}></FaRegHospital>

        </div>
       </div>
       <div className='dashboard-item'>
        <p style={{color:'#006F8F',fontWeight:'600'}}> Ward Admanistator</p>
        <div style={{marginTop:"20px"}}>
          <RiAdminLine style={{width:'80px',height:'80px',color:'#FFB800'}}></RiAdminLine>

        </div>
       </div>
       <div className='dashboard-item'>
        <p style={{color:'#006F8F',fontWeight:'600'}}> Patient Details</p>
        <div style={{marginTop:"20px"}}>
          <CiUser style={{width:'80px',height:'80px',color:'#FFB800'}}></CiUser>

        </div>
       </div>
      </div>
    </div>
  );
};

export default DashboardData;
