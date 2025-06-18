import React, { useState } from 'react'
import { useEffect } from 'react';
import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import axios from 'axios';
const AssighnTest = (props) => {
    const status = props.status;
    
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
            <Box sx={{ width:'320px', borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto',position:'absolute',top: '-120px',left:'300px' }}>
                <Box sx={{ padding:'10px'   }}>
                    <Typography variant='h6'> Do you want to assighn this test</Typography>
                    <Box sx={{display:'flex',justifyContent:'center',gap:'50px',marginTop:"5px"}}>
                        <button onClick={props.onSelect} style={{backgroundColor:'#015D7C',color:'white',border:'none',width:'80px',height:'30px'}}>Yes</button>
                        <button onClick={props.onclose} style={{backgroundColor:'#015D7C',color:'white',border:'none',width:'80px',height:'30px'}}>No</button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AssighnTest
