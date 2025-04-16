import { Box, Typography } from '@mui/material'
import React from 'react'
import { FaHome, FaRegHospital } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    let doctor_id = "67b36e2d1f3a6b7e70481bfb";
    return (
        <Box sx={{ height: '100vh', borderRight: '1px solid #EEEE', width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '30px', marginLeft: '20px' }}>
                <NavLink to='/'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <FaHome style={{ fontSize: '18px' }} />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Dashbaord</Typography>
                    </Box>
                </NavLink>
                <NavLink to='/Appointment'>
                    <Box sx={{ color: 'white' }}>
                        <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Appoinment</Typography>
                    </Box >
                </NavLink>

                <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                    <FaRegHospital />
                    <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>MonitorWard</Typography>
                </Box>
                <NavLink to='/admitPatients' state={doctor_id}>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <RiComputerFill />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>AdmitedPatient</Typography>
                    </Box>
                </NavLink>
                <Box sx={{ color: 'white' }}>
                    <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>Prescription Record</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar
