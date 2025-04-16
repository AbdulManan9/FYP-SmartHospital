import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const MedicalRecord = (props) => {
    const patient_id = props.patient_id;
    const [medicalRecordList, setMedicalRecordList] = useState([]);

    const fetchMedicalRecord = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/MedicalRecord/PatientRecord/${patient_id}`);
            if (response.data.success === true) {
                console.log(response.data.message);
                setMedicalRecordList(response.data.data);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Error in API integration", error);
        }
    };

    useEffect(() => {
        if (patient_id) {
            fetchMedicalRecord();
        }
    }, [patient_id]);

    if (!patient_id) {
        return <Typography>No patient selected</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={{ backgroundColor: 'white', width: '95%', py: '10px' }}>
                <Box sx={{ height: '60vh', display: 'flex', gap: '10px', overflow: 'scroll', scrollbarWidth: 'none', padding: '20px' }}>
                    {
                        Array.isArray(medicalRecordList) && medicalRecordList.length > 0 ? (
                            medicalRecordList.map((item, index) => (
                                
                                    <Box key={index}
                                    onClick={() => props.openPrescription(item._id)}
                                    sx={{
                                        width: '330px',
                                        padding: '10px',
                                        border: '1px solid #CECECE',
                                        borderRadius: '10px',
                                        flexShrink: 0,
                                        overflow: 'scroll',
                                        scrollbarWidth: 'none',
                                        
                                        '&:hover': { boxShadow: '0px 4px 10px rgba(0,0,0,0.25)' }
                                    }}>
                                       
                                        <Typography><b>Diagnosis:</b> {item.dignosis}</Typography>
                                        <Typography><b>Treatment Plan:</b> {item.treatmentPlan}</Typography>
                                        <Typography><b>Medical History:</b> {item.History}</Typography>
                                        <Typography><b>Created At:</b> {item.date}</Typography>
                                        

                                    </Box>
                                
                            ))
                        ) : (
                            <Typography>There is no Medical Record available</Typography>
                        )
                    }

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }} onClick={props.onopen}>
                        Add Medical Record
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MedicalRecord;
