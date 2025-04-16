import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';
import DoctorSchedule from '../../componend/DoctorSchedule/DoctorSchedule';
import { NavLink } from 'react-router-dom';
import './Doctors.css';

const DoctorList = () => {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);
    const [doctorName, setDoctorName] = useState("");
    const [doctor, setDoctor] = useState(null);
    const [showList, setShowList] = useState(true);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [scheduleState, setScheduleState] = useState(false);
    const [doctorId, setDoctorId] = useState("");

    // Fetch All Doctors
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/doctor/getallDoctor`);
            if (response.data.success) {
                setList(response.data.data);
                console.log(response.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Search Doctor by Name
    const handleSearch = async () => {
        if (doctorName.trim() === "") {
            alert("Enter Doctor Name");
            return;
        }

        try {
            const response = await axios.get(`${url}/api/doctor/findDoctorbyNmae/${doctorName}`);
            if (response.data.success) {
                setDoctor(response.data.data);
                setShowSearchResult(true);
                setShowList(false);
            } else {
                alert(response.data.message);
                setDoctor(null);
            }
        } catch (error) {
            alert("Doctor not found");
            setDoctor(null);
        }
    };

    // Handle Scheduling
    const handleSchedule = (id, name) => {
        setDoctorId(id);
        setScheduleState(true);
        setDoctorName(name);
    };

    const handleCloseSchedule = () => {
        setScheduleState(false);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <Box>
                <Box sx={{ width: "70%", backgroundColor: 'red', margin: 'auto', marginTop: '20px' }}>
                    <DoctorSchedule 
                        scheduleState={scheduleState} 
                        doctorId={doctorId} 
                        name={doctorName} 
                        onClose={handleCloseSchedule} 
                    />
                </Box>
                
                <Container>
                    <Typography variant='h4' sx={{ color: '#005E7D', mt: 5 }}>Find a Doctor</Typography>
                    <hr />
                </Container>

                <Box sx={{ mt: 3, mb: 3 }}>
                    <Container sx={{ display: { sm: "block", md: 'flex' }, justifyContent: 'space-around' }}>
                        <Box>
                            <Typography sx={{ fontSize: '20px' }}>Doctor/Practitioner’s Name</Typography>
                            <input 
                                value={doctorName} 
                                onChange={(e) => setDoctorName(e.target.value)} 
                                style={{ width: '250px', height: '25px' }} 
                                type='text' 
                                placeholder='Enter Doctor Name' 
                            />
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <button onClick={handleSearch} style={{ width: '100px', height: '30px' }}>Search</button>
                            <button onClick={() => { setShowSearchResult(false); setShowList(true); fetchList(); }} style={{ width: '100px', marginLeft: 2, height: '30px' }}>View All</button>
                        </Box>
                    </Container>
                </Box>

                {/* Doctor List */}
                <Box sx={{ margin: '10px 0px' }} className={showList ? "display" : "none"}>
                    <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                        {list.length > 0 ? (
                            list.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #005E7D', p: 2, borderRadius: '10px' }}>
                                    <img style={{ width: '130px' }} src={`${url}/images/${item.image}`} alt="Doctor" />
                                    <Typography sx={{ color: '#005E7D' }}>{item.doctorName}</Typography>
                                    <Typography sx={{ color: '#005E7D' }}>{item.Specialization}</Typography>

                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                        <NavLink to='/profile' state={{ id: item._id }}>
                                            <button>Profile</button>
                                        </NavLink>
                                        <button onClick={() => handleSchedule(item._id, item.doctorName)}>Schedule</button>
                                    </Box>
                                    <NavLink to='/Appointment' state={{ id: item._id }}>
                                        <button>Appointment</button>
                                    </NavLink>
                                </Box>
                            ))
                        ) : (
                            <p>No doctors found.</p>
                        )}
                    </Container>
                </Box>

                {/* Search Result */}
                {showSearchResult && doctor && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #005E7D', p: 2, borderRadius: '10px' }}>
                        <img style={{ width: '130px' }} src={`${url}/images/${doctor.image}`} alt="Doctor" />
                        <Typography sx={{ color: '#005E7D' }}>{doctor.doctorName}</Typography>
                        <Typography sx={{ color: '#005E7D' }}>{doctor.Specialization}</Typography>

                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <NavLink to='/profile' state={{ id: doctor._id }}>
                                <button>Profile</button>
                            </NavLink>
                            <button onClick={() => handleSchedule(doctor._id, doctor.doctorName)}>Schedule</button>
                        </Box>
                        <NavLink to='/Appointment' state={{ id: doctor._id }}>
                            <button>Appointment</button>
                        </NavLink>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default DoctorList;
