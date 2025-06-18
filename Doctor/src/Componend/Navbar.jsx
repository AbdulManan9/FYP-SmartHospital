import React from 'react'
import { useState } from 'react';
import {Box, Typography} from '@mui/material';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
  const [menustatus, setmenuStatus] = useState(false);
  const logout = () => {
    localStorage.removeItem('token');
  }
  return (
   <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0px 10px'}}>
    <Box sx={{ display: { xs: "block", md: 'none' } }}>
            <MenuIcon onClick={() => setmenuStatus(!menustatus)} sx={{ color: 'white', cursor: 'pointer' }} />
          </Box>
    
          {/* Mobile Menu */}
          {menustatus && (
            <Box sx={{ 
              position: 'absolute', 
              top: '50px',  // Adjust as needed
              left: '0', 
              width: '120px', 
              backgroundColor: '#f9f9f9', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px', 
              padding: '3px', 
              border: '1.5px solid gray', 
              zIndex: 1000, // Ensures it appears on top
            }}>
              <NavLink style={{ textDecoration: 'none' }} to='/'>
                <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Dashboard</Typography>
              </NavLink>
              <NavLink style={{ textDecoration: 'none' }} to='/Appointment'>
                <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Appointment</Typography>
              </NavLink>
              <NavLink style={{ textDecoration: 'none' }} to='/wardMonitoring'>
                <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Monitor Ward</Typography>
              </NavLink>
              <NavLink style={{ textDecoration: 'none' }} to='/admitPatients'>
                <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>admit Patients</Typography>
              </NavLink>
              {/* <NavLink style={{ textDecoration: 'none' }} to='/Profile'>
                <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Profile</Typography>
              </NavLink> */}
            </Box>
          )}
    <img style={{width:'80px'}} src={assets.Logo}/>
    
    <NavLink to='/login' onClick={logout}>
    
    <Typography sx={{cursor:'pointer',color:'white',fontWeight:'700',fontSize:'18px'}}>Logout</Typography>
    </NavLink>
   </Box>
  )
}

export default Navbar
