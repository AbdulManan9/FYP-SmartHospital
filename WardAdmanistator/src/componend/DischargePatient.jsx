import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DischargePatient = (props) => {

    const status = props.status;
    return (
        <>
            <Box sx={{ width: '100%', position: 'fixed', display: 'flex', justifyContent: 'center', zIndex: '1', display: status ? "flex" : "none" }}>

                <Box sx={{ textAlign:'center',width: '30%', borderRadius: '10px', backgroundColor: '#e5e5e5', backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', marginTop: '10px',py:'20px' }}>
                    <Typography> Do you want to discharge this patient</Typography>
                    <Box sx={{display:'flex',justifyContent:'center',gap:'20px',marginTop:'20px'}}>
                        <Button onClick={props.onSubmit} sx={{backgroundColor:'#005F7E',color:'white'}}>Yes</Button>
                        <Button onClick={props.onclose} sx={{backgroundColor:'#005F7E',color:'white'}}>No</Button>
                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default DischargePatient
