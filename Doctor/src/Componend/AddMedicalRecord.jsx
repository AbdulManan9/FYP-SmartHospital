import React, { useState } from 'react'
import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import axios from 'axios';
const AddMedicalRecord = (props) => {
    const status = props.status;
    const patient_id=props.patient_id;
    const doctor_id=props.doctor_id;

    const [medicalRecord, setMedicalRecord] = useState({
        doctor_id: doctor_id,
        patient_id: patient_id,
        dignosis: "",
        treatmentPlan: "",
        History: ""
    })

    const handleChange = async (e) => {
        setMedicalRecord({ ...medicalRecord, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/MedicalRecord/addMedicalRecord", medicalRecord);
            if (response.data.success == true) {
                alert("Medical Record Added");
                props.onclose();
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in Api integration");
        }
    }
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
                        <Typography sx={{ color: '#016483', fontWeight: '600', fontSize: '18px', cursor: "pointer" }} onClick={props.onclose}>X</Typography>
                    </Box>
                    <form onSubmit={handleSubmit} style={{ padding: '10px 0px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <Grid2 sx={{ display: 'grid' }}>
                            <label style={{ fontWeight: "500", fontSize: '18px', fontFamily: 'sans-serif' }}>Enter Dignosis Name:</label>
                            <input name="dignosis" onChange={handleChange} style={{ height: '30px', border: "1px solid #ccc", }} type='text' />
                        </Grid2>
                        <Grid2 sx={{ display: 'grid' }}>
                            <label style={{ fontWeight: "500", fontSize: '18px', fontFamily: 'sans-serif' }}>Enter Medical History:</label>
                            <textarea
                                name="History"
                                onChange={handleChange}
                                rows="4"
                                style={{

                                    marginBottom: "10px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                }}
                            />
                        </Grid2>
                        <Grid2 sx={{ display: 'grid' }}>
                            <label style={{ fontWeight: "500", fontSize: '18px', fontFamily: 'sans-serif' }}>Enter Tratment Plan:</label>
                            <textarea
                                name="treatmentPlan"
                                onChange={handleChange}
                                rows="5"
                                style={{

                                    marginBottom: "10px",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                }}
                            />
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

export default AddMedicalRecord
