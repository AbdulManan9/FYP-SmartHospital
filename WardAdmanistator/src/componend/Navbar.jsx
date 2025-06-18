import React from 'react'

import {Box, Typography} from '@mui/material';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Navbar = () => {
const [menustatus, setmenuStatus] = useState(false);
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('wardAdmin_id');
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
                  <NavLink style={{ textDecoration: 'none' }} to='/pandingAdmission'>
                    <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Admit Patient</Typography>
                  </NavLink>
                  <NavLink style={{ textDecoration: 'none' }} to='/totalAdmitedPatient'>
                    <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Admited Patient</Typography>
                  </NavLink>
                  <NavLink style={{ textDecoration: 'none' }} to='/dischargePatientList'>
                    <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>DischargePatient</Typography>
                  </NavLink>
                  
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
