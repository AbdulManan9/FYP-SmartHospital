import { Box,Button } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import DischargePatient from '../../componend/DischargePatient';
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
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:'20px'}}>
            <Box sx={{ width: '84%', display: 'flex', justifyContent: 'end', mt: '10px', }}>
                <NavLink to='/'>
                    <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Back to Dashboard</Button>
                </NavLink>
            </Box>
            <Box  sx={{ width: '80%', backgroundColor: 'white', padding: '20px',boxShadow:'0 8px 24px rgba(0, 128, 255, 0.3)',border: '1px solid rgba(0, 128, 255, 0.2)',borderRadius:"20px" }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr 0.5fr 1fr 0.7fr' }}>
                    <b>PatientName</b>
                    <b>DoctorName</b>
                    <b>RoomNo</b>
                    <b>BedNo</b>
                    <b>AdmissionDate</b>
                    <b>Discharge</b>
                    <b>{id}</b>
                    
                </Box>
                <Box sx={{ height: '70vh', overflow: 'scroll', scrollbarWidth: 'none'}}>
                    {
                        Array.isArray(admitList) && admitList.length > 0 ? (
                            admitList.map((item, index) => {
                                return (  // ✅ Now it correctly returns JSX
                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr 0.5fr 1fr 0.7fr', height: '35px', alignItems: 'center' }}>

                                        <p>{item.patient_id?.name}</p>
                                        <p>{item.doctor_id?.doctorName}</p>
                                        <p>{item.room_id?.roomNumber}</p>
                                        <p>{item.bed_id?.bed_no}</p>
                                        <p>{item.admissionDate}</p>
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
        </>
    )
}

export default AdmitedPatientList
