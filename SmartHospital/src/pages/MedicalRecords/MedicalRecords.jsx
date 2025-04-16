import { Box, Typography } from '@mui/material'
import React from 'react'
import MedicalRecordsData from './MedicalRecords'
const MedicalRecords = () => {
    return (
        <>
         <Box>
            <Typography variant='h5' sx={{color: '#005E7D',marginLeft:'50px',marginTop:'50px'}}> The complete medical Record of Ali is </Typography>
            <Box sx={{display:'flex',justifyContent:'center',margin:'50px 0px'}}>
                <Box sx={{width:'80%',display:'flex',flexDirection:'column'}}>
                    <Box sx={{ display: 'grid',gridTemplateColumns: '0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr',alignItems:'center',gap: '10px',padding: '12px 15px', border:'1px solid #cacaca',fontSize: '13px'}}>
                        <b>RecordId</b>
                        <b>DoctorName</b>
                        <b>PatientName</b>
                        <b>DignoseName</b>
                        <b>Date</b>
                        <b> Details</b>
                    </Box>
                    <Box>
                        {MedicalRecordsData.map((card) => (
                            <Box key={card.id} sx={{ display: 'grid',gridTemplateColumns: '0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr',alignItems:'center',gap: '10px',padding: '12px 15px', border:'1px solid #cacaca',fontSize: '13px'}} >
                                <Typography>{card.id}</Typography>
                                <Typography sx={{ color: '#005E7D' }}>{card.doctorName}</Typography>
                                <Typography sx={{ color: '#005E7D' }}>{card.patientName}</Typography>
                                <Typography sx={{ color: '#005E7D' }}>{card.dignoseName}</Typography>
                                <Typography sx={{ color: '#005E7D' }}>{card.date}</Typography>
                                <button>View Detail</button>
                                


                            </Box>
                        ))}

                </Box>
                </Box>
            </Box>
            </Box>
        </>
    )
            
}

export default MedicalRecords;
