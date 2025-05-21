import React, { useState } from 'react'
import { useEffect } from 'react';
import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import axios from 'axios';
const AddPrescription = (props) => {
    const status = props.status;
    const medicalRecord_id = props.medicalRecord_id;
    const doctor_id = localStorage.getItem('doctorId');

    const [prescriptionRecord, setprescriptionRecord] = useState({
        medicalRecord_id: medicalRecord_id,
        doctor_id: doctor_id,
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instruction: ""
    })
    useEffect(() => {
        if (medicalRecord_id) {
            setprescriptionRecord(prev => ({
                ...prev,
                medicalRecord_id: medicalRecord_id
            }));
        }
    }, [medicalRecord_id]);
    const handleChange = async (e) => {
        setprescriptionRecord({ ...prescriptionRecord, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/prescription/addPrescription", prescriptionRecord);
            if (response.data.success == true) {
                alert("Prescription Record Added");
                
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in Api integration");
        }
    }
    useEffect(() => {
        
    }, [medicalRecord_id]);
    return (
        <Box sx={{
            height: '100vh',
            width: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            display: status ? "block" : "none",

        }}>
            <Box sx={{ width: { md: "70%", xs: '100%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>
                <Box sx={{ padding: '10px 20px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h5' sx={{ color: '#016483' }}>Add Patient Medical Record</Typography>
                        
                        <Typography></Typography>
                        <Typography sx={{ color: '#016483', fontWeight: '600', fontSize: '18px', cursor: "pointer" }} onClick={props.onclose}>X</Typography>
                    </Box>
                    <form onSubmit={handleSubmit} style={{ padding: '10px 0px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <Grid2 sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <input style={{ width: '45%', height: '30px' }} name='medicineName' onChange={handleChange} type='text' placeholder='Enter Medicine Name' />
                            <input style={{ width: '45%', height: '30px' }} name='dosage' onChange={handleChange} type='text' placeholder='Enter Dosage' />
                        </Grid2>
                        <Grid2 sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <input style={{ width: '45%', height: '30px' }} name='frequency' onChange={handleChange} type='text' placeholder='Enter Frequency' />
                            <input style={{ width: '45%', height: '30px' }} name='duration' onChange={handleChange} type='text' placeholder='Enter Duration' />
                        </Grid2>
                        <Grid2 sx={{ display: 'flex', justifyContent: 'center' }}>
                            <input style={{ width: '95%', height: '30px' }} name='instruction' onChange={handleChange} type='text' placeholder='Enter Instruction' />
                            
                        </Grid2>
                        <Grid2 sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type='submit' sx={{ backgroundColor: '#015170', color: 'white' }}> Add Record</Button>
                        </Grid2>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default AddPrescription
