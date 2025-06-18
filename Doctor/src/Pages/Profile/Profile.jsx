import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import Navbar from '../../Componend/Navbar'
import Sidebar from '../../Componend/Sidebar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import UpdateDoctor from '../../Componend/UpdateDoctor'

import UpdateSchedule from '../../Componend/UpdateSchedule'
const Profile = () => {
    const id = localStorage.getItem('doctorId');
    const doctorId = localStorage.getItem('doctorId');
    const [timeTable, setTimeTable] = useState([]);
    const [doctor, setDoctor] = useState("");
    const [updateSatus,setUpdateStatus]=useState(false);
    const [timeTableStatus,setTimeTableStatus]=useState(false);
    const onClose=()=>{
        setUpdateStatus(false);
        setTimeTableStatus(false);
    }
    const fetchdetail = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/doctor/findDoctor/${id}`);
            if (response.data.success == true) {
                setDoctor(response.data.data);
            }
            else {
                alert(response.data.message);
            }
            const response2 = await axios.get(`http://localhost:4000/api/Schedule/findSchedule/${doctorId}`);
            if (response2.data.success == true) {
                setTimeTable(response2.data.data[0].schedules)


            }
            else {
                alert("Error in time table api integration")
            }
        }
        catch (error) {
            console.log("Error in api integration");
            console.log(error);
        }
    }

    const onSubmit=()=>{
        fetchdetail();
    }
    useEffect(() => {
        fetchdetail();
    }, [])

    return (
        <>
            <Box>
                <Navbar />
                <hr />
                <UpdateSchedule doctorId={doctorId} status={timeTableStatus} onclose={onClose}/>
                <Box sx={{ display: 'flex' }}>
                    
                    <Box sx={{ width: "18%",display: {xs:'none',md:'block'} }}>
                        <Sidebar />
                    </Box>
                    <Box sx={{ width:{xs:'100%',md:'82%'}, display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                        <UpdateDoctor doctor={doctor} status={updateSatus} onClose={onClose} onSubmit={onSubmit}/>
                        
                        <Box sx={{ width: "90%", backgroundColor: 'white',borderRadius:'20px',py:'10px' }}>
                            <Box sx={{ padding: '10px' }}>
                                <Typography variant='h5' sx={{ color: '#01607F' }}>Persnol detail of Doctor</Typography>
                            </Box>

                            <Box sx={{ padding: '0px 20px' }}>
                                <Grid container spacing={2} sx={{ border: '1px solid #cecece', borderRadius: '10px', marginTop: '0px' }}>
                                    {/* Left Column */}
                                    <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Doctor Name:
                                        </Typography>
                                        <Typography>{doctor.doctorName}</Typography>

                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Qualification
                                        </Typography>
                                        <Typography>{doctor.Qualification}</Typography>

                                        <Typography variant="subtitle1" fontWeight="bold">
                                            HospitalDepartment
                                        </Typography>
                                        <Typography>{doctor.HospitalDepartment}</Typography>
                                    </Grid>

                                    {/* Middle Column */}
                                    <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Gender
                                        </Typography>
                                        <Typography>{doctor.Gender}</Typography>

                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Email
                                        </Typography>
                                        <Typography>{doctor.Email}</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            WorkingDays
                                        </Typography>
                                        <Typography>{doctor.WorkingDays}</Typography>
                                    </Grid>

                                    {/* Right Column */}
                                    <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Date of birth
                                        </Typography>
                                        <Typography>{doctor.DateOfBirth}</Typography>

                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Specialization
                                        </Typography>
                                        <Typography>{doctor.Specialization}</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Shift
                                        </Typography>
                                        <Typography>{doctor.Shift}</Typography>
                                    </Grid>

                                    {/* Email & Optional Phone */}


                                </Grid>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'end', paddingRight: '20px', mt: "10px" }}>
                                <button onClick={()=>setUpdateStatus(true)} style={{ backgroundColor: "#016281", color: "white", width: '100px', height: '30px', border: 'none', borderRadius: '10px' }}>Update</button>
                            </Box>
                            <Box sx={{ padding: '10px' }}>
                                <Typography variant='h5' sx={{ color: '#01607F' }}>Schedule of Doctor</Typography>
                            </Box>
                            <Box sx={{ padding: '0px 20px' }}>
                                <Box sx={{ border: '1px solid #cecece', borderRadius: '10px' }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', px: '20px', fontWeight: 'bold', my: 1 }}>
                                        <b style={{ fontFamily: 'sans-serif' }}>Day</b>
                                        <b style={{ fontFamily: 'sans-serif' }}>Time Slot</b>
                                    </Box>
                                    <Box sx={{ px: '20px' }}>
                                        {Array.isArray(timeTable) && timeTable.length > 0 ? (
                                            timeTable.map((item, index) => (
                                                <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', mb: 1 }}>
                                                    <Typography>{item.day}</Typography>
                                                    <Typography>{item.timeSlots}</Typography>
                                                </Box>
                                            ))
                                        ) : (
                                            <Typography sx={{ mt: 2 }}>There is no schedule available.</Typography>
                                        )}
                                    </Box>
                                    
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'end', paddingRight: '20px', mt: "10px" }}>
                                        <button onClick={()=>setTimeTableStatus(true)} style={{ backgroundColor: "#016281", color: "white", width: '100px', height: '30px', border: 'none', borderRadius: '10px' }}>AddTimeTable</button>
                                    </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile
