import React from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../Componend/Navbar.jsx';
import Sidebar from '../../Componend/Sidebar';
import DashboardData from '../../Componend/DashboardData.jsx';

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <hr />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '18%', display: {xs:'none',md:'flex'}, justifyContent: 'center' }}>
          <Sidebar />
        </Box>
        <Box sx={{
          width:  {xs:'100%',md:'82%'}, display: 'flex', justifyContent: 'center', alignItems: 'center', "@media (min-height: 900px)": {
            alignItems:'start',marginTop:'100px'
          }
        }}>
          <DashboardData />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
