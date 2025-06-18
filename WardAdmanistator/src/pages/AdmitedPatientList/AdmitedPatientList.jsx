import { Box,Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import DischargePatient from '../../componend/DischargePatient';
import Navbar from '../../componend/Navbar';
import Sidebar from '../../componend/Sidebar';
const AdmitedPatientList = () => {
    const [dischargeStatus,setDischargeStatus]=useState(false);
    const [admitList, setAdmitList] = useState([]);
    const wardAdmin_id = localStorage.getItem("wardAdmin_id");
    const [id,setRecordId]=useState('');
    const onclose=async()=>{
        setDischargeStatus(false);
    }
    const onSubmit=async()=>{
        try{
            const response=await axios.put(`http://localhost:4000/api/admitRecord/dischargePatient/${id}`)
            if(response.data.success==true){
                alert("Patient is discharge Sucessfully");
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
    const fetchList = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/wardAdmin/admitedList', { wardAdmin_id })
            if (response.data.success == true) {
                setAdmitList(response.data.data);
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            alert("Error in api integration");
        }
    }
    useEffect(() => {
        fetchList();
    }, [])
    return (
        <>
        <DischargePatient status={dischargeStatus} onclose={onclose} onSubmit={onSubmit}/>
        <Box >
            <Navbar/>
            <hr/>
        </Box>
        <Box sx={{display:'flex'}}>
        <Box sx={{width:'18%'}}>
            <Sidebar/>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:'20px',width:'82%'}}>

            <Box  sx={{ width: '95%', backgroundColor: 'white', padding: '20px',boxShadow:'0 8px 24px rgba(0, 128, 255, 0.3)',border: '1px solid rgba(0, 128, 255, 0.2)',borderRadius:"20px" }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: {xs:'1fr 0.7fr 0.7fr',sm:'1fr 1fr 0.7fr 0.5fr 1fr 0.7fr'} }}>
                    <Typography fontWeight='bold'>PatientName</Typography>
                    <Typography fontWeight='bold' sx={{display:{xs:'none',sm:'block'}}}>DoctorName</Typography>
                    <Typography fontWeight='bold'>RoomNo</Typography>
                    <Typography fontWeight='bold' sx={{display:{xs:'none',sm:'block'}}}>BedNo</Typography>
                    <Typography fontWeight='bold' sx={{display:{xs:'none',sm:'block'}}}>AdmissionDate</Typography>
                    <Typography fontWeight='bold'>Discharge</Typography>
                   
                    
                </Box>
                <Box sx={{ height: '70vh', overflow: 'scroll', scrollbarWidth: 'none'}}>
                    {
                        Array.isArray(admitList) && admitList.length > 0 ? (
                            admitList.map((item, index) => {
                                return (  // ✅ Now it correctly returns JSX
                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: {xs:'1fr 0.7fr 0.7fr',sm:'1fr 1fr 0.7fr 0.5fr 1fr 0.7fr'}, height: '35px', alignItems: 'center' }}>

                                        <Typography>{item.patient_id?.name}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.doctor_id?.doctorName}</Typography>
                                        <Typography>{item.room_id?.roomNumber}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.bed_id?.bed_no}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.admissionDate}</Typography>
                                        <button onClick={()=>{setDischargeStatus(true);setRecordId(item._id)}} style={{height:'30px'}}>Discharge</button>
                                    </Box>
                                );
                            })
                        ) : (
                            <p>No Patient found</p>  // ✅ Better than returning an empty object
                        )
                    }
                </Box>
            </Box>
        </Box>
        </Box>
        </>
    )
}

export default AdmitedPatientList
