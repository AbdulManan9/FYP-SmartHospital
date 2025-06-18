import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../componend/Navbar'
import Sidebar from '../../componend/Sidebar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const DischargeList = () => {
    const[dischargePatient,setDischargePatient]=useState([]);
    const ward_id=localStorage.getItem('dutyWard');
    const fetchList=async()=>{
        try{
            const response=await axios.get(`http://localhost:4000/api/admitRecord/dischargePatient/${ward_id}`);
            if(response.data.success==true){
                setDischargePatient(response.data.data);
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            console.log("Error in api integration");
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchList();
    },[])
  return (
    <>
    <Box>
        <Navbar/>
        <hr/>
        <Box sx={{display:'flex'}}>
            <Box sx={{width:"18%",display:{xs:'none',sm:'block'}}}>
                <Sidebar/>
            </Box>
            <Box sx={{width:{sm:'82%',xs:'100%'},display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Box sx={{width:{xs:'90%',sm:'95%'},backgroundColor:'white',padding:'10px',borderRadius:'20px'}}>
                    <Box sx={{display:'grid',gridTemplateColumns:{xs:'1.2fr 0.9fr 0.7fr',sm:'1fr 1fr 0.6fr 0.6fr 1.5fr 0.7fr'},borderBottom:'1px solid gray',paddingBottom:'5px'}}>
                        <Typography fontWeight='bold'>PatientName</Typography>
                        <Typography fontWeight='bold'>WardName</Typography>
                        <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>RoomNo</Typography>
                        <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>BedNo</Typography>
                        <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>AdmissionDate</Typography>
                        <Typography fontWeight='bold'>Status</Typography>
                    </Box>
                    <Box sx={{height:'70vh',overflow:'scroll',scrollbarWidth:'none'}}>
                        {
                            Array.isArray(dischargePatient)&&dischargePatient.length>0?(
                                dischargePatient.map((item,index)=>{
                                    return(
                                        <Box key={index} sx={{display:'grid',gridTemplateColumns:{xs:'1.2fr 0.9fr 0.7fr',sm:'1fr 1fr 0.6fr 0.6fr 1.5fr 0.7fr'},marginTop:'10px'}}>
                                            <Typography>{item.patient_id.name}</Typography>
                                            <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.ward_id.wardName}</Typography>
                                            <Typography>{item.room_id.roomNumber}</Typography>
                                            <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.bed_id.bed_no}</Typography>
                                            <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.admissionDate}</Typography>
                                            <Typography>{item.status}</Typography>
                                        </Box>
                                    )
                                })
                            ):
                            (
                                <Typography>There is no Discharge Patient exist</Typography>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
    </>
  )
}

export default DischargeList
