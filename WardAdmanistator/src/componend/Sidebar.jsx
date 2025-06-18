import React from 'react'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
        <>
            <Box sx={{height:'90vh',borderRight:'1px solid #ffff'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '30px', marginLeft: '20px'}}>
                    <NavLink style={{textDecoration:'none'}} to='/'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <Typography>Dashboard</Typography>
                    </Box>
                    </NavLink>
                    <NavLink style={{textDecoration:'none'}} to='/totalAdmitedPatient'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <Typography>Admited Patient</Typography>
                    </Box>
                    </NavLink>
                    <NavLink style={{textDecoration:'none'}} to='/pandingAdmission'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <Typography>Admit Patient</Typography>
                    </Box>
                    </NavLink>
                    <NavLink style={{textDecoration:'none'}} to='/dischargePatientList'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <Typography>Discharge Patient</Typography>
                    </Box>
                    </NavLink>
                    
                    {/* <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <Typography>Discharge Patient</Typography>
                    </Box>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <Typography>Patient List</Typography>
                    </Box> */}
                </Box>
            </Box>
        </>
    )
}

export default Sidebar
