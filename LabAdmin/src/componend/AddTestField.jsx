import React, { useState } from 'react'
import { Box,TextField, Typography,Button } from '@mui/material';
import axios from 'axios';
const AddTestField = (props) => {
    const status=props.status;
    const id=props.id;
    const [addField,setAddField]=useState({
        name:"",
        unit:"",
        normalMin:"",
        normalMax:""
    })

    const handleChange = (e) => {
    setAddField({ ...addField, [e.target.name]: e.target.value }); 
};
const payload = {
    name: addField.name,
    unit: addField.unit,
    normalMin: Number(addField.normalMin),
    normalMax: Number(addField.normalMax)
};
    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response =await axios.post(`http://localhost:4000/api/test/addField/${id}`,payload);
            if(response.data.success==true){
                alert("Test Field Added successfuly")
                props.correct();
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            alert("Error in api integration");
            console.log("Error in api integration");
            console.log(error);
        }

    }
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
                width: { md: "40%", xs: '100%' },
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: "#e5e5e5",
                backdropFilter: 'blur(5px)',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                margin: 'auto'
            }}>
                <Box>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Typography variant='h5'>Add Test Field</Typography>
                        <Typography onClick={props.onclose} sx={{ color: '#016180', cursor: 'pointer', fontWeight: '600' }}>X</Typography>
                    </Box>
                    <Box sx={{ my: '20px' }}>
                        <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                            <TextField
                                name='name'
                                value={addField.name}
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                                placeholder='Enter Name'
                            />
                            <TextField
                                name='unit'
                                value={addField.unit}
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                                placeholder='Enter Unit'
                            />
                            <TextField
                                name='normalMin'
                                value={addField.normalMin}
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                                placeholder='Enter Min Normal'
                            />
                            <TextField
                                name='normalMax'
                                value={addField.normalMax}
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                                placeholder='Enter Max Normal'
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type='submit' sx={{ backgroundColor: '#016180', color: 'white', my: '10px' }}>
                                    Add Field
                                </Button>
                            </Box>
                            
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddTestField
