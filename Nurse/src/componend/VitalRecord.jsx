import React, { useEffect, useState } from 'react';
import { Box, Typography,TextField,Button } from '@mui/material';
import axios from 'axios';
const VitalRecord = (props) => {
    const status = props.status;
    const patient_id = props.patient_id;
    const nurse_id=localStorage.getItem('id')
    

    const [formData, setFormData] = useState({
        patient_id: patient_id,
        nurse_id: nurse_id,
        bloodPressure: '',
        oxygenLevel: '',
        sugarLevel: '',
        pulseRate: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/vital/addVital', formData);
            if (response.data.success) {
                alert("Vital Record Added");
                // Optionally reset form
                setFormData({
                    
                    bloodPressure: '',
                    oxygenLevel: '',
                    sugarLevel: '',
                    pulseRate: ''
                });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };
    return (
        <>
            <Box sx={{ display: status === "Vital" ? "flex" : "none", justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                <Box sx={{ padding: '20px', background: '#f4f4f4', maxWidth: 600, margin: 'auto' }}>
                <Typography variant="h6" gutterBottom>Add Vital Record</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Blood Pressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Oxygen Level" name="oxygenLevel" value={formData.oxygenLevel} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Sugar Level" name="sugarLevel" value={formData.sugarLevel} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Pulse Rate" name="pulseRate" value={formData.pulseRate} onChange={handleChange} margin="normal" required />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Submit</Button>
                </form>
            </Box>
            </Box>
        </>
    );
};

export default VitalRecord;
