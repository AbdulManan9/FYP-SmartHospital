import React from 'react'
import {Box, Typography} from '@mui/material';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
  }
  return (
   <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0px 10px'}}>
    <img style={{width:'80px'}} src={assets.Logo}/>
    <NavLink to='/login' onClick={logout}>
    
    <Typography sx={{cursor:'pointer',color:'white',fontWeight:'700',fontSize:'18px'}}>Logout</Typography>
    </NavLink>
   </Box>
  )
}

export default Navbar
