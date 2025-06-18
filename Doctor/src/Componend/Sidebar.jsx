import { Box, Typography } from '@mui/material'
import React from 'react'
import { FaHome, FaRegHospital } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Sidebar = () => {
    let doctor_id = localStorage.getItem("doctorId");
    return (
        <Box sx={{ height: '100vh', borderRight: '1px solid #EEEE', width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '30px', marginLeft: '20px',alignItems:'center' }}>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <FaHome style={{ fontSize: '18px' }} />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px",display:{sm:"none",md:'block',xs:'block'} }}>Dashbaord</Typography>
                    </Box>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to='/Appointment' state={doctor_id}>
                    <Box sx={{color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <RiComputerFill />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px",display:{sm:"none",md:'block',xs:'block'} }}>Appoinment</Typography>
                    </Box >
                </NavLink>
                <NavLink style={{textDecoration:"none"}} to='/wardMonitoring'>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <FaRegHospital />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px",display:{sm:"none",md:'block',xs:'block'} }}>MonitorWards</Typography>
                    </Box>
                </NavLink>

                <NavLink style={{ textDecoration: 'none' }} to='/admitPatients' state={doctor_id}>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <RiComputerFill />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px",display:{sm:"none",md:'block',xs:'block'} }}>AdmitedPatient</Typography>
                    </Box>
                </NavLink>

                <NavLink style={{ textDecoration: 'none' }} to='/Profile' state={doctor_id}>
                    <Box sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                        <AccountCircleIcon />
                        <Typography sx={{ fontWeight: "500", fontSize: "18px",display:{sm:"none",md:'block',xs:'block'} }}>Profile</Typography>
                    </Box>
                </NavLink>


            </Box>
        </Box>
    )
}

export default Sidebar
