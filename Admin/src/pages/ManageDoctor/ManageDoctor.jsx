import React from 'react'
import './ManageDoctor.css'
import Sidebar from '../../componend/Sidebar/Sidebar'
import DoctorList from '../../componend/DoctorList/DoctorList'
import ManageDoctorMenu from '../../componend/ManageDoctorMenu/ManageDoctorMenu'
import Navbar from '../../componend/Navbar/Navbar'
// import UpdateDoctor from '../../componend/UpdateDo/UpdateDoctor'

const ManageDoctor = () => {
  return (
    <>
    <Navbar/>
    <hr/>
    <div className='ManageDoctor-main-div'>
      <div className='side-bar-div'>
        <Sidebar/>
      </div>
      <div className="manage-div">
        <ManageDoctorMenu/>
        {/* <UpdateDoctor/> */}
        
      </div>
    </div>
    </>
    
  )
}


export default ManageDoctor
