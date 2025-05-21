import React from 'react'
import Navbar from '../../componend/Navbar'
import { Box } from '@mui/material'
import Sidebar from '../../componend/Sidebar'
import DashboardData from '../../componend/DashboardData'
const Dashboar = (props) => {
    const wardAdmin_id=props.wardAdmin_id;   
  return (
    <Box>
      <Navbar/>
      <hr/>
      <Box sx={{display:'flex'}}>
        <Box sx={{width:'18%'}}>
            <Sidebar/>
        </Box>
        <Box sx={{width:"82%",display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{width:"90%",backgroundColor:'white',borderRadius:'20px'}}>
                <DashboardData wardAdmin_id={wardAdmin_id}/>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboar
