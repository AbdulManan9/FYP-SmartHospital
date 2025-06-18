import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
// import RoomsList from '../../componend/RoomsList';
import RoomsList from '../../componend/RoomsList';
import BedList from '../../componend/BedList';
import Navbar from '../../componend/Navbar';
import Sidebar from '../../componend/Sidebar';
const PandingAdmission = () => {
    const [patientList, setPatientList] = useState([]);
    const wardAdmin_id = localStorage.getItem("wardAdmin_id");
    const [wardStatus, setWardStatus] = useState(false);
    const [bedStatus, setBedStatus] = useState(false);
    const [room_id, setroom_id] = useState('');
    const [bed_id, setbed_id] = useState('');
    const [patient_id, setPatient_id] = useState('')

    const onSelectRoom = (id) => {
        setroom_id(id);
        setBedStatus(true);
    }

    const onSelectBed = (id) => {
        setbed_id(id); // still update state if needed later
        console.log("Selected bed id:");
        console.log(id); // ✅ shows the current selected ID
        console.log("bed_id (old):", bed_id); // ❌ will still be outdated
    
        setBedStatus(false);
        handleSubmit(id); // ✅ pass correct value directly
    }
    
    const oncloseroom = () => {
        setWardStatus(false);
    }
    const onclosebed = () => {
        setBedStatus(false);
    }

    const handleSubmit = async (selectedBedId) => {
        console.log("Submitting:", { patient_id, room_id, bed_id: selectedBedId }); // ✅ clear debug
        try {
            const response = await axios.post(
                "http://localhost:4000/api/wardAdmin/admitPendingPatient",
                {
                    patient_id,
                    room_id,
                    bed_id: selectedBedId, // ✅ use passed value
                }
            );
            if (response.data.success === true) {
                alert("Patient has been admitted");
            } else {
                
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error in API integration");
            console.log(error);
        }
    };
    
    const fetchList = async () => {
        try {

            const response2 = await axios.post('http://localhost:4000/api/wardAdmin/admitList', { wardAdmin_id });
            if (response2.data.success == true) {
                setPatientList(response2.data.data);
            }
        }
        catch (error) {
            alert("Error in api integration");
        }

    }

    useEffect(() => {
        fetchList();
    }, [])
    return (
        <>
            <RoomsList status={wardStatus} onSelectRoom={onSelectRoom} oncloseroom={oncloseroom} />
            <BedList status={bedStatus} onSelectBed={onSelectBed} onclosebed={onclosebed} id={room_id} />
            <Navbar/>
            <hr/>
            <Box sx={{display:'flex'}}>
            <Box sx={{width:'18%'}}>
                <Sidebar/>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: "20px",width:'82%' }}>
                
                <Box sx={{ width: '90%', backgroundColor: 'white', padding: '20px',boxShadow:'0 8px 24px rgba(0, 128, 255, 0.3)',border: '1px solid rgba(0, 128, 255, 0.2)',borderRadius:"20px" }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 0.5fr ', fontFamily: 'sans-serif' }}>
                        <b>PatientName</b>
                        <b>DoctorName</b>
                        <b>WardNumber</b>
                        <b>AdmissionStatus</b>
                        <b>Admit</b>
                       
                       
                    </Box>
                    <Box sx={{ height: '70vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                        {
                            Array.isArray(patientList) && patientList.length > 0 ? (
                                patientList.map((item, index) => {
                                    return (  // ✅ Now it correctly returns JSX
                                        <Box key={index} sx={{ display: 'grid', gridTemplateColumns: ' 1fr 1fr 1fr 1fr 0.5fr', height: '35px', alignItems: 'center' }}>
                                            
                                            <p>{item.patient_id?.name}</p>
                                            <p>{item.doctor_id?.doctorName}</p>
                                            <p>{item.ward_id?.wardNumber}</p>
                                            <p>{item.status}</p>
                                            <button onClick={() => {
                                                setWardStatus(true);
                                                setPatient_id(item.patient_id._id);
                                            }} style={{ width: '100px', height: '30px' }}>Admit Patient</button>
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

export default PandingAdmission
