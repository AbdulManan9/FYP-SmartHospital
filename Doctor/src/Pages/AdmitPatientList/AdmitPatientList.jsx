import React, { useEffect, useState } from 'react'
import { Box, Typography,Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AdmitPatientList = () => {
    const location = useLocation();
    const doctor_id = location.state;
    const [admitPatientList, setAdmitPatientList] = useState([]);
    const Satate="Admit";

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
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr 2fr 1fr', padding: '10px',  }}>
                        <b>PatientName</b>
                        <b>wardNumber</b>
                        <b>RoomNumber</b>
                        <b>BedNumber</b>
                        <b>AdmitedDate</b>
                        <b>AdmissionStatus</b>
                    </Box>
                    <Box sx={{ height: '70vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                        {
                            Array.isArray(admitPatientList) && admitPatientList.length > 0 ? (
                                admitPatientList.map((item, index) => (
                                    <NavLink
                                        key={item._id || index} // Preferably use a unique ID like item._id
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        to='/PatientDetails'
                                        state={{ doctor_id: doctor_id, patient_id: item.patient_id?._id,Satate:Satate }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: '1.3fr 1fr 1fr 1fr 2fr 1fr',
                                                margin: '5px',
                                                padding: '5px',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                "&:hover": { border: '1px solid gray', borderRadius: '5px' }
                                            }}
                                        >
                                            <Typography>{item.patient_id?.name}</Typography>
                                            <Typography>{item.ward_id?.wardNumber}</Typography>
                                            <Typography>{item.room_id?.roomNumber}</Typography>
                                            <Typography>{item.bed_id?.bed_no}</Typography>
                                            <Typography>{item.admissionDate}</Typography>
                                            <Typography>{item.status}</Typography>
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
