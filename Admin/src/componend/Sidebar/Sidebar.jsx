import React from 'react'
import './Sidebar.css'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { FaUserDoctor,FaHospital,FaUserNurse } from "react-icons/fa6";
import { FaProcedures,FaUserCog } from "react-icons/fa";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Sidebar = () => {
  return (
    
    <Box className='sidebar-main-div'>
      <Box className='sidebar-options'>
      <NavLink to='/'>
      <Box className='sidebar-option'>
        <DashboardIcon/>
        <p className='sidebar-txt'>Dashboard</p>
        </Box>
      </NavLink>
        <NavLink to='/manageDoctor'>
        <Box className='sidebar-option'>
          <FaUserDoctor/>
          <p className='sidebar-txt'>Doctor</p>
              
        </Box>
        </NavLink>
        <NavLink to='/manageWard'>
        <Box className='sidebar-option'>
          <FaProcedures/>
          <p className='sidebar-txt'>Ward</p>
            
        </Box>
        </NavLink>
        {/* <Box className='sidebar-option'>
          <FaUserCog/>
          <p className='sidebar-txt'>Admanistator</p>
            
        </Box> */}
        <NavLink to='/manageNurse'>
        <Box className='sidebar-option'>
          <FaUserNurse/>
          <p className='sidebar-txt'>Nurse</p>
            
        </Box>
        </NavLink>

        <NavLink to='/WardAdmanistator'>
        <Box className='sidebar-option'>
          <AccountCircleIcon/>
          <p className='sidebar-txt'>WardAdmin</p>
            
        </Box>
        </NavLink>
      </Box>
    </Box>
  )
}

export default Sidebar
