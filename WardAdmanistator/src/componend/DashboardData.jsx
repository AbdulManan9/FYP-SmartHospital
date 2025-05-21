import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const DashboardData = (props) => {
    const wardAdmin_id = localStorage.getItem("wardAdmin_id");
    const ward_id = "67b3e654cb6d069230abda45";
    const [totaladmit, setTotalAdmit] = useState("");
    const [pendingadmit, setPending] = useState("");
    const [totalbedsAvailable, settotalavailableBeds] = useState("");
    const [assighnWard, setAssighnWard] = useState("");
    const [admitList, setAdmitList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/wardAdmin/admitedList', { wardAdmin_id });
            if (response.data.success == true) {
                setTotalAdmit(response.data.total);
            }
            const response2 = await axios.post('http://localhost:4000/api/wardAdmin/admitList', { wardAdmin_id });
            if (response2.data.success == true) {
                setPending(response2.data.total);
            }
            const response3 = await axios.get(`http://localhost:4000/api/ward/totalAvailableBeds/${ward_id}`);
            if (response3.data.success === true) {
                settotalavailableBeds(response3.data.total);
                setAssighnWard(response3.data.wardName);
            }
            const response4 = await axios.post('http://localhost:4000/api/wardAdmin/admitedList', { wardAdmin_id })
            if (response4.data.success == true) {
                setAdmitList(response.data.data);
            }
        }
        catch (error) {
            alert("Error in api integration");
            console.log(error);
        }

    }
    useEffect(() => {
        fetchList();
    }, [])
    return (
        <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', pt: "20px" }}>
                <NavLink to='/totalAdmitedPatient' style={{ textDecoration: 'none' }}>
                    <Box sx={{ border: "1px solid gray", padding: '10px', cursor: 'pointer', borderRadius: '10px', boxShadow: ' 0px 4px 8px rgba(128, 128, 128, 0.5)' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: "18px", color: 'black' }}>Total Patient Admit</Typography>
                        <Typography sx={{ color: '#016281', fontWeight: "600", fontSize: '18px' }}>{totaladmit}</Typography>
                    </Box>
                </NavLink>
                <NavLink to='/pandingAdmission' style={{ textDecoration: 'none' }}>
                    <Box sx={{ border: "1px solid gray", padding: '10px', cursor: 'pointer', borderRadius: '10px', boxShadow: ' 0px 4px 8px rgba(128, 128, 128, 0.5)' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: "18px", color: 'black' }}>Pending Admission</Typography>
                        <Typography sx={{ color: '#016281', fontWeight: "600", fontSize: '18px' }}>{pendingadmit}</Typography>

                    </Box>
                </NavLink>

                <Box sx={{ border: "1px solid gray", padding: '10px', cursor: 'pointer', borderRadius: '10px', boxShadow: ' 0px 4px 8px rgba(128, 128, 128, 0.5)' }}>
                    <Typography sx={{ fontWeight: '600', fontSize: "18px" }}>Total Available Beds</Typography>
                    <Typography sx={{ color: '#016281', fontWeight: "600", fontSize: '18px' }}>{totalbedsAvailable}</Typography>

                </Box>
                <Box sx={{ border: "1px solid gray", padding: '10px', cursor: 'pointer', borderRadius: '10px', boxShadow: ' 0px 4px 8px rgba(128, 128, 128, 0.5)' }}>
                    <Typography sx={{ fontWeight: '600', fontSize: "18px", color: 'black' }}>Assighn Ward</Typography>
                    <Typography sx={{ color: '#016281', fontWeight: "600", fontSize: '18px' }}>{assighnWard}</Typography>
                </Box>
            </Box>
            <Box sx={{ my: '20px', display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ textAlign: "center", width: '35%',boxShadow: ' 0px 4px 8px rgba(128, 128, 128, 0.5)'}}>
                    <Calendar style={{ width: '100%' }} />
                </Box>
                <Box sx={{ width: '50%',border:'1px solid gray',padding:'10px',boxShadow: ' 0px 4px 8px rgba(128, 128, 128, 0.5)' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr 0.5fr' }}>
                        <b>PatientName</b>
                        <b>DoctorName</b>
                        <b>RoomNo</b>
                        <b>BedNo</b>
                    </Box>
                    <Box sx={{ height: '40vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                        {
                            Array.isArray(admitList) && admitList.length > 0 ? (
                                admitList.map((item, index) => {
                                    return (  // ✅ Now it correctly returns JSX
                                        <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr 0.5fr ', height: '35px', alignItems: 'center' }}>

                                            <p>{item.patient_id?.name}</p>
                                            <p>{item.doctor_id?.doctorName}</p>
                                            <p>{item.room_id?.roomNumber}</p>
                                            <p>{item.bed_id?.bed_no}</p>
                                        
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
    )
}

export default DashboardData
