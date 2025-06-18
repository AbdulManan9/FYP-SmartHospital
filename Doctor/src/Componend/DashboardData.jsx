import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from 'react';
import { assets } from '../assets/assets.js';
import axios from 'axios'
import { NavLink } from 'react-router-dom';

const DashboardData = () => {
    const [date, setDate] = useState(new Date());
    // let doctor_id = "67b36e2d1f3a6b7e70481bfb";
    const doctor_id = localStorage.getItem("doctorId");

    const [appointmentList, setAppointmentList] = useState([]);
    const [totalAppointment, setTotalAppointment] = useState("");
    const [totalAdmit, setTotalAdmit] = useState("");
    const [totalTodayAppointment,setTotalTodayAppointment]=useState('')
    const fetchList = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/appointment/totalAppointment", { doctor_id });
            const res = await axios.get(`http://localhost:4000/api/admitRecord/totaladmit/${doctor_id}`)
            const response3=await axios.get(`http://localhost:4000/api/appointment/todayAppointment/${doctor_id}`);
            if (response.data.success === true) {
                setAppointmentList(response.data.data);
                setTotalAppointment(response.data.totalData);

            }
            else {
                console.log("There is no online Appointment exist");
            }
            if (res.data.success == true) {
                console.log("Total is");
                setTotalAdmit(res.data.total);
                console.log(res.data.total);

            }
            else {
                console.log(res.data.message)
            }
            if(response3.data.success==true){
                setTotalTodayAppointment(response3.data.total);
            }
            else{
                console.log(response3.data.data);
            }
        }
        catch (error) {
            console.log("Error");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    useEffect(() => {
        console.log("Updated Appointment List:", appointmentList);
        console.log("Updated Total Appointment:", totalAppointment);
        console.log("Updated Total Admited:", totalAdmit);

    }, [appointmentList, totalAppointment, totalAdmit]); // ✅ Logs when state updates
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center',alignItems:{xs:"center",sm:'normal'} }}>
                <Box sx={{ width: '90%', backgroundColor: 'white', borderRadius: '8px' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', mt: '10px', marginBottom: '5px',flexDirection:{xs:'column',sm:'row'},alignItems:{xs:'center',sm:'none'},gap:{xs:'20px',sm:'0px'},my:{xs:"40px",sm:"10px"} }}>
                        <Box sx={{width:{xs:'90%',sm:'28%'}}}>
            
                        <NavLink to='/Appointment' state={doctor_id} style={{textDecoration:'none',width:{xs:'90%',sm:'normal'}}}>
                        <Box sx={{ border: '1px solid gray', borderRadius: '11px' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: '600', padding: '2px 13px',color:'black' }}>Total Appointment</Typography>
                            <Typography sx={{ padding: '2px 13px', color: '#016281', fontWeight: '700', fontSize: '18px' }}>{totalAppointment}</Typography>
                        </Box>
                        </NavLink>
                        </Box>
                        <Box sx={{width:{xs:'90%',sm:'28%'}}}>
                        <NavLink to='/todayAppointment' state={doctor_id} style={{textDecoration:'none',width:{xs:'90%',sm:'normal'}}}>
                        <Box sx={{ border: '1px solid gray', borderRadius: '11px' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: '600', padding: '2px 13px',color:'black' }}>Today Appointment</Typography>
                            <Typography sx={{ padding: '2px 13px', color: '#016281', fontWeight: '700', fontSize: '18px' }}>{totalTodayAppointment}</Typography>
                        </Box>
                        </NavLink>
                        </Box>
                        <Box sx={{width:{xs:'90%',sm:'28%'}}}>
                        <NavLink to='/admitPatients' state={doctor_id} style={{textDecoration:'none',width:{xs:'90%',sm:'normal'}}}>
                            <Box sx={{ border: '1px solid gray', borderRadius: '11px'}}>
                                <Typography sx={{ fontSize: '18px', fontWeight: '600', padding: '2px 13px',color:'black' }}>Total Admited Patient</Typography>
                                <Typography sx={{ padding: '2px 13px', color: '#016281', fontWeight: '700', fontSize: '18px' }}>{totalAdmit}</Typography>
                            </Box>
                        </NavLink>
                        </Box>

                    </Box>
                    <Box sx={{ marginTop: "10px", display: {xs:'none',sm:'flex'}, justifyContent: 'space-around', alignItems: 'center' }}>
                        <Box sx={{ textAlign: "center", width: '35%' }}>
                            <Calendar onChange={setDate} value={date} style={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <img style={{ width: '100%' }} src={assets.DashbordImg} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', pb: '2px',my:{xs:'20px',sm:'none'} }}>
                        <Box sx={{ width: "90%", borderRadius: "10px", border: '1px solid gray', padding: '2px 10px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#007D9D', fontWeight: '600' }}>Appointment Details</Typography>
                                <NavLink to='/Appointment' state={doctor_id}>
                                    <button style={{ backgroundColor: '#007D9D', color: 'white', height: '27px', borderRadius: '8px', border: 'none' }}> View ALl</button>

                                </NavLink>
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns:{xs:'0.7fr 1fr',sm:'1fr 1fr 1fr 1fr'}, mt: '5px' }}>
                                <Typography style={{ fontFamily: 'sans-serif',fontWeight:"bold" }}>PatientName</Typography>
                                <Typography sx={{ fontFamily: 'sans-serif',fontWeight:"bold",display:{xs:"none",sm:"block"} }}>DoctorName</Typography>
                                <Typography style={{ fontFamily: 'sans-serif',fontWeight:"bold" }}>Appointment Date</Typography>
                                <Typography sx={{ fontFamily: 'sans-serif',fontWeight:"bold",display:{xs:"none",sm:"block"} }}>AppointmentStatue</Typography>
                            </Box>
                            <Box sx={{ height: '15vh', overflowX: 'scroll', scrollbarWidth: 'none' }}>
                                {
                                    Array.isArray(appointmentList) && appointmentList.length > 0 ? (
                                        appointmentList.map((item, index) => {
                                            return (  // ✅ Now it correctly returns JSX
                                                <Box key={index} sx={{ display: 'grid', gridTemplateColumns:{xs:'1fr 1fr ',sm:'1fr 1fr 1fr 1fr'}, }}>
                                                    <Typography >{item.patient_id.name}</Typography >
                                                    <Typography sx={{display:{xs:"none",sm:"block"}}}>{item.doctor_id.doctorName}</Typography >
                                                    <Typography >{item.appointmentDate}</Typography >
                                                    <Typography sx={{display:{xs:"none",sm:"block"}}}>{item.status}</Typography >
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
                </Box>
            </Box>
        </>
    )
}

export default DashboardData
