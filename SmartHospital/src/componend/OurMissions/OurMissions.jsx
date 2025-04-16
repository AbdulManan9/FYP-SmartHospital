import React from 'react'
// import './OurMissions.css'
import { Box, Typography } from '@mui/material'
import { SiComma } from "react-icons/si";
import Marquee from "react-fast-marquee";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import Mission from './Mission';
const OurMissions = () => {
  return (
    <Box sx={{backgroundColor:'#f5f5f5'}}>
      <Box sx={{ pt: 7, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
        <SiComma style={{ transform: "scaleX(-1)", color: '#005E7D', fontSize: '25px' }} />
        <Typography variant='h3' sx={{ fontFamily: 'sans-serif', color: '#005E7D' }}>Our Missions</Typography>
        <SiComma style={{ color: '#005E7D', fontSize: '25px' }} />
      </Box>
      <Box sx={{display:'flex',flexWrap:'wrap',m:8,gap:4,justifyContent:'center'}}>
      {Mission.map((card) => (
          <Box key={card.id} sx={{width:'320px',border:'2px solid #005E7D',pl:2,pr:2,pt:1,pb:1,borderRadius:'14px',"&:hover":{transform:'rotate(3deg)',transition: "transform 0.3s ease-in-out",boxShadow: "0px 4px 10px #005E7D",}}}>
            <Typography sx={{color:'#005E7D',fontWeight:'700',fontSize:'18px'}}>{card.tittle}</Typography>
            <Typography sx={{color:'#005E7D',fontSize:'15px',mt:2}}>{card.Mission}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{mb:3,rotate:'0deg'}}>
      <Marquee speed={50} pauseOnHover={true} gradient={false} style={{ backgroundColor: "#005E7D", color: "white",height:'30px', fontSize: "18px", fontWeight: "bold" }}>
      <Box sx={{display:'fex',gap:'4px'}}>
        <Typography>OnlineAppointment</Typography>
        <StarBorderPurple500Icon/>
        <Typography>DigitalizaMedicalRecord</Typography>
        <StarBorderPurple500Icon/>
        <Typography>ProgressMonitoring</Typography>
        <StarBorderPurple500Icon/>
        <Typography>DigitalizePrescriptionRecord</Typography>
        <StarBorderPurple500Icon/>
      </Box>
      <Box sx={{display:'fex',gap:'4px'}}>
        <Typography>OnlineAppointment</Typography>
        <StarBorderPurple500Icon/>
        <Typography>DigitalizaMedicalRecord</Typography>
        <StarBorderPurple500Icon/>
        <Typography>ProgressMonitoring</Typography>
        <StarBorderPurple500Icon/>
        <Typography>DigitalizePrescriptionRecord</Typography>
        <StarBorderPurple500Icon/>
      </Box>
    </Marquee>
      </Box>
    </Box>
  )
}

export default OurMissions
