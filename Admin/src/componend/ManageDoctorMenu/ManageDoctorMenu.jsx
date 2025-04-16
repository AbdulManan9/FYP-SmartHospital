import React, { useState } from 'react'
import './ManageDoctorMenu.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom';
import DoctorList from '../DoctorList/DoctorList';
import AddDoctor from '../AddDoctor/AddDoctor';
import UpdateDoctor from '../UpdateDo/UpdateDoctor';
// import UpdateDoctor from '../UpdateDoctor/UpdateDoctor';

function ManageDoctorMenu() {
    const [manageMenu,setmanageMenu]=useState('List')
    const [menu,setMenu]=useState(false);
  return (
    <div className='main-div'>
    
    <div className='manage-doctor-menu'>
    <p className='doctor-info-txt'>Doctor Information</p>
    <div className='menu-icon-div'>
    <img src={assets.menu} onClick={()=>setMenu("true")} className='menu-img'/> 
    <div className={menu=="true" ? "menu-list" : "menu-none"}>
      <p className='cross-txt' onClick={()=>setMenu("false")}>X</p>
      <p onClick={()=>setmanageMenu('Add')}>Add Doctor</p>
      <p onClick={()=>setmanageMenu('List')}>List Doctor</p>
      {/* <p onClick={()=>setmanageMenu('Add')}>Delete Doctor</p> */}
      <p onClick={()=>setmanageMenu('Update')}>Search Doctor</p>
    </div>
    </div>
    </div>
    <div className='chucchuck-divk-div'>
        <DoctorList manageMenu={manageMenu}/>
        <AddDoctor manageMenu={manageMenu}/>
        <UpdateDoctor manageMenu={manageMenu}/>
        
    </div>
    </div>
    
    
  )
}

export default ManageDoctorMenu
