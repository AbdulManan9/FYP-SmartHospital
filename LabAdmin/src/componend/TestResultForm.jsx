import React from 'react'
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';

const TestResultForm = (props) => {
    const status = props.status;
    const testTemplate = props.testTemplate;
    const testOrderId = props.id;
    console.log("Id is");
    console.log(testOrderId);
    console.log("Test template is ");
    console.log(testTemplate);
    const [formData, setFormData] = useState({});

    const handleChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value
        });
    };
    const handleSubmit = async () => {
        // Prepare result array from formData
        const resultArray = Object.entries(formData).map(([name, value]) => ({
            name,
            value: parseFloat(value)

        }))
        try {
            const response = await axios.post('http://localhost:4000/api/test/testResult', {
                testOrderId,
                result: resultArray // ✅ send with correct key
            });

            if (response.data.success) {
                alert("Report result added successfully")
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.error('API Error:', error);
            alert('Error submitting test result');
        }
    };

    return (
        <Box sx={{
            height: '80vh',
            width: '82%',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            display: status ? "flex" : 'none'
        }}>
            <Box sx={{ backgroundColor: '#d0dbe6', width: { xs: "100%", md: '70%' }, padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Enter Test Result</Typography>
                    <Typography onClick={props.onclose} sx={{ cursor: 'pointer', fontWeight: '600' }}>X</Typography>
                </Box>
                <Box sx={{ my: '20px' }}>
                    {testTemplate && testTemplate.fields && testTemplate.fields.length > 0 ? (
                        testTemplate.fields.map((field, index) => (
                            <Box key={index} sx={{ marginTop: '10px', display: 'flex', gap: '15px' }}>
                                <label style={{ fontFamily: 'sans-serif', fontWeight: '600', fontSize: '19px' }}>{field.name}:</label>
                                <input
                                    style={{ width: '300px', height: '25px' }}
                                    type='number'
                                    onChange={(e) => handleChange(e, field.name)} // ✅ Pass fieldName
                                    name={field.name}
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography>There is no test exist</Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: '10px' }}>
                        <Button onClick={handleSubmit} type='submit' sx={{ backgroundColor: '#015E7D', color: 'white' }}>Submit</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TestResultForm
