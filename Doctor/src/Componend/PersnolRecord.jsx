import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import axios from 'axios';

const PersnolRecord = (props) => {
    const status = props.status;
    const patient_id = props.patient_id;
    const doctor_id = localStorage.getItem("doctorId");
    console.log("Doctor id is");
    console.log(doctor_id)
    const [patientList, setPatientList] = useState(null); // Single patient object
    const [admitList, setAdmitList] = useState(null);

    const fetchList = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/appointment/PatientAppointnmentDetail",
                { doctor_id, patient_id }
            );

            if (response.data.success === true) {
                console.log("API integration successful");
                console.log("Patient Data from API:", response.data.patient);

                // setAppointmentList(response.data.appointment);
                setPatientList(response.data.patient); // Assuming it's a single patient object
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Error in API integration", error);
        }
    };
    const fetchAdmitList = async () => {

        try {
            const response = await axios.post('http://localhost:4000/api/admitRecord/PatientadmitRecord', { patient_id });
            if (response.data.success == true) {
                setAdmitList(response.data.data);
                
            }
            else {
                console.log(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            alert("Error in api integration");
        }
    }
    useEffect(() => {
        fetchList();
        fetchAdmitList();
    }, []);
    return (
        <Box sx={{ display: status == "Persnol" ? "flex" : "none", justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{ width: '95%', backgroundColor: 'white',padding:'30px 10px'}}>
                <Typography variant="h6" sx={{ color: "#016483" }}>
                    Personal Details of Patient
                </Typography>
                <Box sx={{ padding: '13px 18px' }}>
                    <Grid container spacing={2} sx={{ border: '1px solid #cecece', borderRadius: '10px' }}>
                        {/* Left Column */}
                        <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Patient's Name
                            </Typography>
                            <Typography>{patientList?.name}</Typography>

                            <Typography variant="subtitle1" fontWeight="bold">
                                Patient ID
                            </Typography>
                            <Typography>{patientList?._id}</Typography>
                        </Grid>

                        {/* Middle Column */}
                        <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Gender
                            </Typography>
                            <Typography>{patientList?.Gender}</Typography>

                            <Typography variant="subtitle1" fontWeight="bold">
                                Phone Number
                            </Typography>
                            <Typography>{patientList?.contactNo}</Typography>
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Date of birth
                            </Typography>
                            <Typography>{patientList?.dateOfBirth}</Typography>

                            <Typography variant="subtitle1" fontWeight="bold">
                                cnic
                            </Typography>
                            <Typography>{patientList?.cnic}</Typography>
                        </Grid>

                        {/* Email & Optional Phone */}


                    </Grid>
                </Box>
                <Typography variant="h6" sx={{ color: "#016483" }}>
                    Admit Record of Patient
                </Typography>
                <Box sx={{ padding: '13px 18px' }}>
                    <Grid container spacing={2} sx={{ border: '1px solid #cecece', borderRadius: '10px' }}>
                        {/* Left Column */}
                        <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Admited Ward
                            </Typography>
                            <Typography>{admitList?.ward_id.wardNumber}</Typography>

                            <Typography variant="subtitle1" fontWeight="bold">
                                AdmitedDate
                            </Typography>
                            <Typography>{admitList?.admissionDate}</Typography>
                        </Grid>

                        {/* Middle Column */}
                        <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                RoomNo
                            </Typography>
                            <Typography>{admitList?.room_id.roomNumber}</Typography>

                            
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                BedNumber
                            </Typography>
                            <Typography>{admitList?.bed_id.bed_no}</Typography>

                            
                        </Grid>

                        {/* Email & Optional Phone */}


                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default PersnolRecord
