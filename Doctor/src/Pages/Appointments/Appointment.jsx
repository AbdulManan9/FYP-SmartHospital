import { Box, Button, Typography,TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Componend/Navbar'
const Appointment = () => {
    const doctor_id = localStorage.getItem('doctorId');
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
        <Box sx={{display:{xs:'block',sm:'none'}}}>
            <Navbar/>
            <hr/>
        </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>

                <Box sx={{ width: '90%', display:{xs:'none',sm:'flex'}, justifyContent: 'end', mt: '10px' }}>
                    <NavLink to='/'>
                            <Button sx={{  backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white',backgroundColor:'#015170',border:'1px solid white' } }}>Back to Dashboard</Button>
                    </NavLink>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                    <Box><Typography variant='h6' sx={{ color: 'white',display:{xs:'none',sm:'block'} }}>You can also find Appointment using patient cnic</Typography></Box>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                        <input value={cnic} onChange={(e) => setPatientcnic(e.target.value)} style={{ width: '200px', borderRadius: '6px', border: 'none' }} type='text' placeholder='Enter Patient cnic' />
                        <Button onClick={handleSraech} sx={{  backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white',backgroundColor:'#015170',border:'1px solid white' } }}>Search</Button>
                    </Box>
                </Box>
                <Box sx={{ width: {xs:'95%',sm:'90%'}, backgroundColor: 'white', height: '75vh', overflow: 'scroll', scrollbarWidth: 'none' }}>

                    <Box sx={{ display: 'grid', gridTemplateColumns: {xs:' 1.3fr 1.2fr 0.5fr',sm:'1.5fr 1.5fr 1fr 1fr 1fr'}, p: '10px', borderBottom: "1px solid #b9b6b6" }}>
                        <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold' }}>PatientName</Typography>
                        <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold',display:{xs:'none',sm:'block'} }}>DoctorName</Typography>
                        <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold' }}>AppointmentDate</Typography>
                        <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold',display:{xs:'none',sm:'block'}  }}>AppointmentStatus</Typography>
                        <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold' }}>ChuckUp</Typography>
                        
                    </Box>
                    <Box sx={{ pl: '10px' }}>
                        {
                            Array.isArray(appointmentList) && appointmentList.length > 0 ? (
                                appointmentList.map((item, index) => {  
                                    return (  // ✅ Now it correctly returns JSX
                                        <Box key={index} sx={{ display: 'grid', gridTemplateColumns: {xs:' 1.4fr 1.2fr 0.5fr',sm:'1.5fr 1.5fr 1fr 1fr 1fr'}, height: '35px' }}>
                                            <Typography>{item.patient_id.name}</Typography>
                                            <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold',display:{xs:'none',sm:'block'} }}>{item.doctor_id.doctorName}</Typography>
                                            <Typography>{item.appointmentDate}</Typography>
                                            <Typography sx={{ fontFamily: 'sans-serif',fontWeight:'bold',display:{xs:'none',sm:'block'} }}>{item.status}</Typography>
                                            <NavLink to='/PatientAppointmentDetails'  state={{ doctor_id: item.doctor_id._id, patient_id: item.patient_id._id, appointment_id:item._id }}>
                                            <Button sx={{ width: {xs:'80px',sm:'118px'}, height: '29px', marginTop: '2px', backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black",  "&:hover": { color: 'white',backgroundColor:'#015170' } }}>Details</Button>
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
