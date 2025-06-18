import React from 'react'
import Navbar from '../../componend/Navbar'
import { Box } from '@mui/material'
import Sidebar from '../../componend/Sidebar'
import TestData from '../../componend/TestData'
import AddTest from '../../componend/AddTest'
import { useState } from 'react'
const Tests = () => {
    const [addTestStatus,setAddStatus]=useState(false);

    const oncloseaddTest=()=>{
        setAddStatus(false);
    }
    const addTest=()=>{
        setAddStatus(true);
    }
    return (
        <Box>
            <AddTest status={addTestStatus} onclose={oncloseaddTest}/>
            <Navbar />
            <hr />
            
            <Box sx={{display:'flex'}}>
                <Box sx={{width:'18%'}}>
                    <Sidebar/>
                </Box>
                <Box sx={{width:'82%'}}>
                    <TestData addTest={addTest}/>
                </Box>
            </Box>
        </Box>
    )
}

export default Tests
