import React from 'react'
import Navbar from '../../componend/Navbar'
import { Box } from '@mui/material'
import Sidebar from '../../componend/Sidebar'
import DashboardData from '../../componend/DashboardData'
const Dashboard = (props) => {
    const wardAdmin_id=localStorage.getItem('wardAdmin_id');   
    // alert(wardAdmin_id);
  return (
    <Box>
      <Navbar/>
      <hr/>
      <Box sx={{display:'flex'}}>
        <Box sx={{width:'18%',display:{xs:'none',sm:'block'}}}>
            <Sidebar/>
        </Box>
        <Box sx={{width:{xs:'100%',sm:'82%'},display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{width:"90%",backgroundColor:'white',borderRadius:'20px',mt:{xs:"50px",sm:'0px'}}}>
                <DashboardData wardAdmin_id={wardAdmin_id}/>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
