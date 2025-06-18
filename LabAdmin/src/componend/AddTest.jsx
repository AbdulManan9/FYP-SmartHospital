import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';

const AddTest = (props) => {
    const status = props.status;
    const [addTest, setAddTest] = useState({
        Testname: "",
        description: ""
    });

    // 🛠 FIX 1: Accept event (e) parameter in function
    const onSubmit = async (e) => {
        e.preventDefault(); // 🛠 FIX 2: Prevent form from reloading the page
        try {
            const response = await axios.post('http://localhost:4000/api/test/addTest', addTest);
            if (response.data.success === true) {
                alert("Test Added Successfully");
                props.onclose(); // 🛠 FIX 3: Hide the form after successful submission
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log("Submit Error:", error);
        }
    };

    // 🛠 FIX 4: Use correct state variable name (`setAddTest`, not `setaddTest`)
    const handleChange = (e) => {
        setAddTest({ ...addTest, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{
            height: '100vh',
            width: '100%',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            display: status ? "flex" : 'none'
        }}>
            <Box sx={{
                width: { md: "70%", xs: '100%' },
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: "#e5e5e5",
                backdropFilter: 'blur(5px)',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                margin: 'auto'
            }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: '#016180' }} variant='h5'>Add Test Details</Typography>
                        <Typography onClick={props.onclose} sx={{ color: '#016180', cursor: 'pointer' }}>X</Typography>
                    </Box>
                    <Box sx={{ my: '20px' }}>
                        <form onSubmit={onSubmit}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ fontFamily: 'sans-serif', fontSize: '18px' }}>Enter Test Name:</label>
                                <TextField
                                    name='Testname'
                                    value={addTest.Testname}
                                    onChange={handleChange}
                                    sx={{ width: '100%' }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '10px' }}>
                                <label style={{ fontFamily: 'sans-serif', fontSize: '18px' }}>Enter Test Description:</label>
                                <TextField
                                    name='description'
                                    value={addTest.description}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type='submit' sx={{ backgroundColor: '#016180', color: 'white', my: '10px' }}>
                                    Add Test
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddTest;
