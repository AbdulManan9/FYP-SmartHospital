import React, { useState } from 'react'
import './ManageNurse.css'
import Navbar from '../../componend/Navbar/Navbar'
import Sidebar from '../../componend/Sidebar/Sidebar'
import { assets } from '../../assets/assets'
import NurseList from '../../componend/NurseList/NurseList'
import AddNurse from '../../componend/AddNurses/AddNurse'
import SerchNurse from '../../componend/SerchNurse/SerchNurse'
const ManageNurses = () => {
    const [nursemenu,setNursemenu]=useState(false);
    const [nurseState,setNurseState]=useState('List')
  return (
    <>
    <Navbar/>
    <hr/>
    <div className='nurses-main-div'>
    <div className="nurse-sidebar">
        <Sidebar/>
    </div>
    <div className="nurse-main-dashboard">
        <div className="nurse-dashboard">
            <div className="nurse-menu-bar">
                <p className='nurse-info-txt'>Nurse Information</p>
                <div style={{position:'relative'}}>
                    <img src={assets.menu} onClick={()=>setNursemenu(true)}/>
                    <div className={nursemenu? "display-nurse-menu":"none"}>
                      <p onClick={()=>setNursemenu(false)} className='cross-txt'>X</p>
                      <p onClick={()=>setNurseState('Add')}>Add Nurse</p>
                      <p onClick={()=>setNurseState('List')}>View Nurse</p>
                      <p onClick={()=>setNurseState('Serch')}>Serch Nurse</p>
                    </div>
                </div>
            </div>
            <div>
                <NurseList nurseState={nurseState}/>
                <AddNurse nurseState={nurseState}/>
                <SerchNurse nurseState={nurseState}></SerchNurse>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default ManageNurses
