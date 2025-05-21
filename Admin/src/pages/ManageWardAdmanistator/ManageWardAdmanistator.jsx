import React from 'react'
import { useState } from 'react'
import './ManageWardAdmanistator.css'
import Navbar from '../../componend/Navbar/Navbar'
import Sidebar from '../../componend/Sidebar/Sidebar'
import { assets } from '../../assets/assets'
import './ManageWardAdmanistator.css'
import WardAdminList from '../../componend/WardAdminList/WardAdminList'
import AddWardAdmin from '../../componend/AddWardAdmin/AddWardAdmin'
const ManageWardAdmanistator = () => {
  const [nursemenu,setNursemenu]=useState(false);
      const [nurseState,setNurseState]=useState('List')
  return (
    <>
      <Navbar />
      <hr />
      <div className="ward-admin-main-div">
        <div className="ward-admin-sidebar">
          <Sidebar />
        </div>
        <div className="ward-admin-main-dashboard">
        <div className="wardAdmin-dashboard">
          <div className="wardAdmin-menu-bar">
            <p className='wardAdmin-info-txt'>Ward Administator Information</p>
            <div style={{ position: 'relative' }}>
              <img src={assets.menu} onClick={() => setNursemenu(true)} />
              <div className={nursemenu ? "display-nurse-menu" : "none"}>
                <p onClick={() => setNursemenu(false)} className='cross-txt'>X</p>
                <p onClick={() => setNurseState('Add')}>Add </p>
                <p onClick={() => setNurseState('List')}>View </p>
                <p onClick={() => setNurseState('Serch')}>Search </p>
              </div>
            </div>
            </div>
          
          <div>
            <WardAdminList nurseState={nurseState} />
            <AddWardAdmin nurseState={nurseState} />
            {/* <SerchNurse nurseState={nurseState}></SerchNurse> */}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageWardAdmanistator
