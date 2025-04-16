import React, { useEffect, useState } from 'react'
import { Box, Typography,Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AdmitPatientList = () => {
    const location = useLocation();
    const doctor_id = location.state;
    const [admitPatientList, setAdmitPatientList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/admitRecord/totaladmit/${doctor_id}`);
            if (response.data.success === true) {
                setAdmitPatientList(response.data.data);
            } else {
                console.log(response.data.data);
            }
        } catch (error) {
            console.error("Error in API integration:", error);
        }
    }

    useEffect(() => {
        if (doctor_id) {
            fetchList();
        }
    }, [doctor_id]);

    return (
        <Box >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', mt: '10px'}}>
                <NavLink to='/'>
                    <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black",marginRight:'20px', "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Back to Dashboard</Button>
                </NavLink>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center',mt:'20px' }}>
                <Box sx={{ width: { xs: "100%", md: "80%" }, backgroundColor: 'white', alignSelf: 'center' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 2fr 0.5fr', padding: '10px', textAlign: 'center' }}>
                        <b>PatientId</b>
                        <b>wardId</b>
                        <b>RoomId</b>
                        <b>BedId</b>
                        <b>AdmitedDate</b>
                    </Box>
                    <Box sx={{ height: '70vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                        {
                            Array.isArray(admitPatientList) && admitPatientList.length > 0 ? (
                                admitPatientList.map((item, index) => (
                                    <NavLink to='/PatientDetails' state={{doctor_id:doctor_id,patient_id:item.patient_id}}>
                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 2fr 0.5fr',margin:'5px', padding: '5px',cursor:'pointer',textDecoration:'none',"&:hover":{border:'1px solid gray',borderRadius:'5px'} }}>
                                        <Typography>{item.patient_id}</Typography>
                                        <Typography>{item.ward_id}</Typography>
                                        <Typography>{item.doctor_id}</Typography>
                                    </Box>
                                    </NavLink>
                                ))
                            ) : (
                                <Typography>There is no admitted patient</Typography>
                            )
                        }
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default AdmitPatientList;
