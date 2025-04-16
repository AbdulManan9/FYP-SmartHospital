import React from 'react'
import {Box, Typography} from '@mui/material';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
   <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0px 10px'}}>
    <img style={{width:'80px'}} src={assets.Logo}/>
    <Typography sx={{cursor:'pointer',color:'white',fontWeight:'700',fontSize:'18px'}}>Logout</Typography>
   </Box>
  )
}

export default Navbar
