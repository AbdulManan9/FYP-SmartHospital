import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react';
import {NavLink} from 'react-router-dom'
const DashboardData = () => {
    const dutyWard = localStorage.getItem('dutyWard');
    const [admitList, setAdmitList] = useState([]);
    const [cnic,setcnic]=useState("");
    const onSubmit=async()=>{
        try{
            const response=await axios.post("http://localhost:4000/api/ward/findPatientInWard",{cnic})
            if(response.data.success==true){
                setAdmitList(response.data.data);
                alert("ok")
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/ward/totalPatientinWard/${dutyWard}`);
            if (response.data.success == true) {
                setAdmitList(response.data.data);
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchList()
    }, [])
    useEffect(() => {
        console.log("Updated List is ")
        console.log(admitList)
        }, [admitList]);
    return (
        <Box sx={{ padding: '10px' ,width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            
            <Box sx={{width:'90%',backgroundColor:'white',padding:'10px'}}>

                <Box sx={{ display: 'grid', gridTemplateColumns: '0.7fr 0.7fr 0.7fr 0.5fr 0.5fr' }}>
                    <b>PatientName</b>
                    <b>DoctorName</b>
                    <b>WardNumber</b>
                    <b>RoomNumber</b>
                    <b>BedNumber</b>
                </Box>
                <Box sx={{ height: '60vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                    {
                        Array.isArray(admitList) && admitList.length > 0 ? (
                            admitList.map((item, index) => (
                                <NavLink to='/PatientDetails' style={{textDecoration:'none',color:'black'}} state={{patient_id:item.patient_id._id}}>
                                <Box key={index}
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '0.7fr 0.7fr 0.7fr 0.5fr 0.5fr',
                                        margin: '5px',
                                        padding: '5px',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        "&:hover": { border: '1px solid gray', borderRadius: '5px' }
                                    }}
                                >
                                    <Typography>{item.patient_id?.name}</Typography>
                                    <Typography>{item.doctor_id?.doctorName}</Typography>
                                    <Typography>{item.ward_id?.wardNumber}</Typography>
                                    <Typography>{item.room_id?.roomNumber}</Typography>
                                    <Typography>{item.bed_id?.bed_no}</Typography>


                                </Box>
                                </NavLink>

                            ))

                        ) : (
                            <Typography>There is no admitted patient</Typography>
                        )
                    }
                </Box>
            </Box>

        </Box>
    )
}

export default DashboardData