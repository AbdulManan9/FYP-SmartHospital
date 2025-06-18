import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../../componend/Navbar'
import Sidebar from '../../componend/Sidebar'
import PendingTestlist from '../../componend/PendingTestlist'

const PendingTests = () => {
  return (
    <Box>
        <Navbar/>
        <hr/>
        <Box sx={{display:'flex'}}>
            <Box sx={{width:'18%'}}>
                <Sidebar/>
            </Box>
            <Box sx={{width:'82%'}}>
                <PendingTestlist/>
            </Box>
        </Box>
    </Box>
  )
}

export default PendingTests
