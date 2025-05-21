import React from 'react'
import Navbar from '../../componend/Navbar'
import {Box, Typography} from '@mui/material';
import DashboardData from '../../componend/DashboardData';
const Dashboard = () => {
  return (
    <Box>
      <Navbar/>
      <hr/>
      <Box >
       
        <DashboardData/>
        
      </Box>
    </Box>
  )
}

export default Dashboard
