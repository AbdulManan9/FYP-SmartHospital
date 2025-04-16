import React from 'react'
import { Box, Typography } from '@mui/material'
const Sidebar2 = () => {
  return (
    <Box sx={{height:'90vh'}}>
        <Box sx={{paddingTop:'20px',display:'flex',flexDirection:'column',alignItems:'center',gap:'20px'}}>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            PersonalRecord
        </Typography>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            MedicalRecord
        </Typography>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            MedicalRecord
        </Typography>
        <Typography sx={{color:'white',fontSize:'18px'}}>
            MedicalRecord
        </Typography>
        </Box>

    </Box>
  )
}

export default Sidebar2
