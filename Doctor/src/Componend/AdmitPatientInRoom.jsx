import { Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const AdmitPatientInRoom = (props) => {

    const [ward, setListWard] = useState([]);
    const status = props.status;
    const room_id = props.id;
    const Satate="Ward";

    const fetchList = async () => {
        try {

            const response = await axios.get(`http://localhost:4000/api/admitRecord/PatientInRoom/${room_id}`);
            if (response.data.success == true) {

                setListWard(response.data.data)
                console.log("Ward List is");
                console.log(ward);
            }
            else {
                alert("Unable to fetch ward List");
            }
        }
        catch (error) {
            console.log("Error in api integration");
            console.log(error);
            alert("Error in integ")
        }
    }
    useEffect(() => {
        if (room_id) {
            fetchList();
        }
    }, [room_id]);

    useEffect(() => {
        console.log("Updated RoomList:", ward);
    }, [ward]);

    useEffect(() => {
        console.log("Updated RoomList:", ward);
    }, [ward]);
    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1', display: status ? "block" : "none" }}>
                <Box sx={{ width: { md: "70%", xs: '90%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>

                    <Box sx={{ textAlign: 'end', paddingRight: '10px', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                        <Typography sx={{ fontSize: '18px', color: '#016483', fontWeight: '600' }}>Please select Patient  </Typography>
                        <Typography onClick={props.onclose} sx={{ color: '#016483', fontWeight: '600', fontSize: '18px', cursor: "pointer" }}>X</Typography>
                    </Box>
                    <Box sx={{ display: 'grid',gridTemplateColumns:{xs:'1fr 1.2fr 0.3fr',sm:'1fr 1fr 0.7fr 0.5fr 1fr '}, padding: '10px' }}>
                        <Typography fontWeight='bold'>PatientName</Typography>
                        <Typography fontWeight='bold'>AdmitedDoctor</Typography>
                        <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>WardNumber</Typography>
                        <Typography fontWeight='bold'>BedNo</Typography>
                        <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>AdmissionDate</Typography>

                    </Box>
                    <Box sx={{ height: '70vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                        {
                            Array.isArray(ward) && ward.length > 0 ? (
                                ward.map((item, index) => {
                                    return (
                                        <NavLink
                                            key={item._id || index} // Preferably use a unique ID like item._id
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            to='/PatientDetails'
                                            state={{ patient_id: item.patient_id?._id,Satate:Satate }}
                                            >
                                        <Box  key={index} sx={{display:'grid',gridTemplateColumns:{xs:'1fr 1.2fr 0.3fr',sm:'1fr 1fr 0.7fr 0.5fr 1fr '},margin:'5px',padding:'5px',cursor:"pointer","&:hover":{border:'1px solid gray',borderRadius:'5px'}}}>
                                        <Typography>{item.patient_id?.name}</Typography>
                                        <Typography>{item.doctor_id?.doctorName}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.ward_id?.wardNumber}</Typography>
                                        <Typography>{item.bed_id?.bed_no}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.admissionDate}</Typography>
                                        
                                       </Box>
                                       </NavLink>
                                    )
                                })

                            )

                                : (
                                    <Typography> No Patient Found</Typography>
                                )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default AdmitPatientInRoom
