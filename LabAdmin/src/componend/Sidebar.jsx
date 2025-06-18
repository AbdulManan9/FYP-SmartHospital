import { Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    
    return (
        <Box sx={{ height: '90vh', borderRight: '1px solid #EEEE', width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '30px', marginLeft: '20px' }}>
                <NavLink to='/' style={{textDecoration:'none'}}>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        
                        <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Test Information</Typography>
                    </Box>
                </NavLink>
               
                <NavLink to='/pending-tests' style={{textDecoration:'none'}}>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}> 
                        <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Pending Tests</Typography>
                    </Box>
                </NavLink>
                

            </Box>
        </Box>
    )
}

export default Sidebar
