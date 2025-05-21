import { Box, Button, Typography,TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
const TodayAppointment = () => {
    const location = useLocation();
    const doctor_id = location.state;
    const [appointmentList, setAppointmentList] = useState([]);
    const [cnic, setPatientcnic] = useState("");
    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/appointment/todayAppointment/${doctor_id}`);
            if (response.data.success === true) {
                setAppointmentList(response.data.data);
                console.log("Appointment List is ");
                console.log(appointmentList);
            }
            else {
                console.log("There is no online Appointment exist");
            }
        }
        catch (error) {
            console.log("Error");
            console.log(error);
        }
    }
    
    useEffect(() => {

    }, [appointmentList]);
    useEffect(() => {
        fetchList();
    }, [])


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>

                <Box sx={{ width: '90%', display: 'flex', justifyContent: 'end', mt: '10px' }}>
                    <NavLink to='/'>
                            <Button sx={{  backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white',backgroundColor:'#015170',border:'1px solid white' } }}>Back to Dashboard</Button>
                    </NavLink>
                </Box>

                
                <Box sx={{ width: '90%', backgroundColor: 'white', height: '75vh', overflow: 'scroll', scrollbarWidth: 'none' }}>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr', p: '10px', borderBottom: "1px solid #b9b6b6" }}>
                        <b style={{ fontFamily: 'sans-serif' }}>PatientName</b>
                        <b style={{ fontFamily: 'sans-serif' }}>DoctorName</b>
                        <b style={{ fontFamily: 'sans-serif' }}>Appointment Date</b>
                        <b style={{ fontFamily: 'sans-serif' }}>AppointmentStatus</b>
                        <b style={{ fontFamily: 'sans-serif' }}>ChuckUp</b>
                        
                    </Box>
                    <Box sx={{ pl: '10px' }}>
                        {
                            Array.isArray(appointmentList) && appointmentList.length > 0 ? (
                                appointmentList.map((item, index) => {  
                                    return (  // ✅ Now it correctly returns JSX
                                        <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr', height: '35px' }}>
                                            <p>{item.patient_id.name}</p>
                                            <p>{item.doctor_id.doctorName}</p>
                                            <p>{item.appointmentDate}</p>
                                            <p>{item.status}</p>
                                            <NavLink to='/PatientAppointmentDetails'  state={{ doctor_id: item.doctor_id._id, patient_id: item.patient_id._id, appointment_id:item._id }}>
                                            <Button sx={{ width: '118px', height: '29px', marginTop: '2px', backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black",  "&:hover": { color: 'white',backgroundColor:'#015170' } }}>Details</Button>
                                            </NavLink>
                                        </Box>
                                    );
                                })
                            ) : (
                                <p>No appointments found.</p>  // ✅ Better than returning an empty object
                            )
                        }
                    </Box>

                </Box>

            </Box>
        </>
    )
}

export default TodayAppointment
