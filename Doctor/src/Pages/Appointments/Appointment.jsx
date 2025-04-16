import { Box, Button, Typography,TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
const Appointment = () => {
    const location = useLocation();
    const doctor_id = location.state;
    const [appointmentList, setAppointmentList] = useState([]);
    const [cnic, setPatientcnic] = useState("");
    const fetchList = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/appointment/totalAppointment", { doctor_id });
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
    const handleSraech = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/appointment/findAppointment", { doctor_id, cnic });
            if (response.data.success === true) {
                setAppointmentList(response.data.data);
                alert("Find Appointment sucessfully")
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("The error is ");
            console.log(error);
            alert("Error in api integration");
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                    <Box><Typography variant='h6' sx={{ color: 'white' }}>You can also find Appointment using patient cnic</Typography></Box>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                        <input value={cnic} onChange={(e) => setPatientcnic(e.target.value)} style={{ width: '200px', borderRadius: '6px', border: 'none' }} type='text' placeholder='Enter Patient cnic' />
                        <Button onClick={handleSraech} sx={{  backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white',backgroundColor:'#015170',border:'1px solid white' } }}>Search</Button>
                    </Box>
                </Box>
                <Box sx={{ width: '90%', backgroundColor: 'white', height: '75vh', overflow: 'scroll', scrollbarWidth: 'none' }}>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr', p: '10px', borderBottom: "1px solid #b9b6b6" }}>
                        <b style={{ fontFamily: 'sans-serif' }}>Patient Id</b>
                        <b style={{ fontFamily: 'sans-serif' }}>Doctor Id</b>
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
                                            <p>{item.patient_id}</p>
                                            <p>{item.doctor_id}</p>
                                            <p>{item.appointmentDate}</p>
                                            <p>{item.status}</p>
                                            <NavLink to='/PatientAppointmentDetails'  state={{ doctor_id: item.doctor_id, patient_id: item.patient_id, appointment_id:item._id }}>
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

export default Appointment
