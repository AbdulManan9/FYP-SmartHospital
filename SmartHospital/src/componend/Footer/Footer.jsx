import { Box, Typography } from '@mui/material'
import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
    return (
        <Box sx={{backgroundColor:'#464a4c',color:'white'}}>
            <Box sx={{display:{xs:'block',sm:'block',md:'flex'},gap:'30px',justifyContent:'space-around',pt:5,pb:3,marginLeft:{sm:'60px',xs:'40px',md:'none'}}}>
            <Box>
                <div><Typography sx={{fontWeight:700,textDecoration:'underline'}}>Resources and Information</Typography></div>
                <ul style={{listStyle:'none'}}>
                    <li>Health Records</li>
                    <li>Request Laboratory Reports</li>
                    <li>Diseases Encyclopedia</li>
                    <li>Patient Education Material</li>
                    <li>Patient Rights and Responsibilities</li>
                    <li>Quality and Patient Safety</li>
                </ul>
            </Box>
            <Box>
                <div><Typography sx={{fontWeight:700,textDecoration:'underline'}}>Quick Links</Typography></div>
                <ul style={{listStyle:'none'}}>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Appointments</li>
                    <li>Medical Record</li>
                    <li>FAQS</li>
                    <li>Doctors</li>
                </ul>
            </Box>
            <Box>
                <div><Typography sx={{fontWeight:700,textDecoration:'underline'}}> Legal & Policy Information</Typography></div>
                <ul style={{listStyle:'none'}}>
                    <li>Privacy Policy</li>
                    <li>Term and consetions</li>
                    <li>Patient Right and Responsebelity</li>
                    <li>Patient Education Material</li>
                    <li>Patient Rights and Responsibilities</li>
                    <li>Quality and Patient Safety</li>
                </ul>
            </Box>

            <Box>
                <div><Typography sx={{fontWeight:700,textDecoration:'underline'}}> Social Media</Typography>
                <ul style={{listStyle:'none',display:'flex',gap:'1px'}}>
                    <li><FacebookOutlinedIcon/></li>
                    <li><TwitterIcon/></li>
                    <li><InstagramIcon/></li>
                    <li><LinkedInIcon/></li>
                    <li><WhatsAppIcon/></li>
                </ul>
                </div>
            </Box>
            </Box>
            <Box sx={{backgroundColor:'#005E7D'}}>
                <Typography>Smart Hospital System</Typography>
            </Box>
        </Box>
    )
}

export default Footer
