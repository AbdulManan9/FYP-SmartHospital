import { Box,Typography } from '@mui/material'
import React from 'react'
import MedicalServices from './MedicalServices'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
const OurMedicalServices = () => {
  return (
    <Box >
        <Box sx={{textAlign:'center',marginTop:3}}>
            <Typography variant='h4'>
                Medical Services
            </Typography>
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',mt:5,mb:5}}>
        {MedicalServices.map((card) => (
          <Box key={card.id} sx={{width:'220px',border:'2px solid #005E7D',pl:2,pr:2,pt:1,pb:1,borderRadius:'10px',textAlign:'center'}}>
            
            <Typography sx={{color:'#005E7D',fontWeight:'700',fontSize:'18px'}}>{card.tittle}</Typography>
            <Typography sx={{color:'#005E7D',fontSize:'15px',mt:2}}>{card.Mission}</Typography>
            
          </Box>
        ))}
        </Box>
    </Box>
  )
}

export default OurMedicalServices
