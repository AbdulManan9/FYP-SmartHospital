import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios';
import { Box, Typography } from '@mui/material';
const DoctorProfile = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [doctor, setDoctor] = useState(null); // Store doctor data
    const [error, setError] = useState(null); // Store any error messages
    const url = "http://localhost:4000";

    //function to search data

    const handleSearch = async () => {
        try {
            // Reset any previous errors

            // Send API request with the ID
            const response = await axios.get(`${url}/api/doctor/findDoctor/${id}`);
            if (response.data.success === true) {
                setDoctor(response.data.data); // Update state with the doctor data
                
            }
            else {

                alert(response.data.message + `with this ${doctorid} id`);
            }

        } catch (error) {
            setError("Doctor not found or an error occurred.");
            setDoctor(null); // Reset doctor data
            console.log(response.data.message);
            alert("not found");

        }
    };
    useEffect(() => {
        handleSearch();
    }, [])
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {doctor && (
                <Box sx={{ width: '80%',margin:'15px 0px',display:'flex',flexDirection:{xs:"column",sm:"row"},gap:'10px'}}>
                    <Box sx={{width:'40%'}}>
                        <img style={{width:'100%'}} src={`${url}/images/` + doctor.image} alt="Doctor Profile" />
                    </Box>
                    <Box>
                        <Typography sx={{color:'black',marginTop:'20px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Name: </span>{doctor.doctorName}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Speciality: </span>{doctor.Specialization}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Qualification: </span>{doctor.Qualification}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Email: </span>{doctor.Email}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>DateOfBirth: </span>{doctor.DateOfBirth}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Department: </span>{doctor.HospitalDepartment}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Warking Days: </span>{doctor.WorkingDays}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Hours: </span>{doctor.WorkingHours}</Typography>
                        <Typography sx={{color:'black',marginTop:'2px'}}><span style={{color:'#005E7D',fontWeight:'600'}}>Shift: </span>{doctor.Shift}</Typography>
                        <button style={{marginTop:20}}> Book Appointment</button>
                        
                    </Box>
                </Box>

            )}

        </Box>
    )
}

export default DoctorProfile
