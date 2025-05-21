import React from 'react'
import { Box, Typography } from '@mui/material'
const Sidebar2 = (props) => {
  return (
    <Box sx={{height:'90vh'}}>
        <Box sx={{paddingTop:'20px',display:'flex',flexDirection:'column',alignItems:'center',gap:'40px',mt:'20px'}}>
        <Box onClick={()=>props.handleStatus('Persnol')} sx={{cursor:'pointer'}}>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            PersnolRecord
        </Typography>
        </Box>
        <Box onClick={()=>props.handleStatus('Medical')} sx={{cursor:'pointer'}}>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            MedicalRecord
        </Typography>
        </Box>
        <Box onClick={()=>props.handleStatus('Vital')} sx={{cursor:'pointer'}}>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            Vital Progress
        </Typography>
        </Box>
        {/* <Box onClick={()=>props.handleStatus('Test')} sx={{cursor:'pointer'}}>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            TestRecord
        </Typography>
        </Box> */}
        </Box>

    </Box>
  )
}

export default Sidebar2
