import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [menustatus, setmenuStatus] = useState(false);

  return (
    <Box className='navbar-main-Box' sx={{ backgroundColor: '#005E7D', display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', md: 'none' }, position: 'relative', zIndex: 10 }}>
      
      {/* Mobile Menu Button */}
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
            <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Home</Typography>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to='/AboutUs'>
            <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>About Us</Typography>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to='/doctor'>
            <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>List Doctor</Typography>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to='/MedicalRecord'>
            <Typography sx={{ color: 'black', cursor: 'pointer', borderBottom: '1.5px solid gray' }}>Medical Record</Typography>
          </NavLink>
        </Box>
      )}

      {/* Navbar Logo */}
      <Box className="navbar-logo" sx={{ '& img': { width: '60px', marginLeft: '18px' }, width: { md: '25%' }, display: 'flex', alignItems: 'center' }}>
        <img src={assets.Logo} alt="Logo" />
      </Box>

      {/* Desktop Menu */}
      <Box className="navbar-content" sx={{ display: { xs: "none", md: 'flex' }, width: '55%', justifyContent: 'space-around' }}>
        <NavLink to='/'>
          <Typography sx={{ color: 'white', cursor: 'pointer' }}> Home</Typography>
        </NavLink>
        <NavLink to='/AboutUs'>
          <Typography sx={{ color: 'white', cursor: 'pointer' }}>About Us</Typography>
        </NavLink>
        <NavLink to='/doctor'>
          <Typography sx={{ color: 'white', cursor: 'pointer' }}>List Doctor</Typography>
        </NavLink>
        <NavLink to='/MedicalRecord'>
          <Typography sx={{ color: 'white', cursor: 'pointer' }}>Medical Record</Typography>
        </NavLink>
      </Box>

      {/* Login Button */}
      <Box sx={{ width: '20%' }}>
        <Typography sx={{ textAlign: 'end', color: 'white', marginRight: '18px' }}></Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
