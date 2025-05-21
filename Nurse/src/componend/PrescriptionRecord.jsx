import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import axios from 'axios';



const PrescriptionRecord = (props) => {

    let medicalRecord_id = props.medicalRecord_id;
    const [prescriptionList, setPrescriptionList] = useState([]);
    const status = props.status;
    
    const handleonclose=()=>{
        
        
        fetchList();
      }
      

    // const [status,setStatus]=useState(props.sstatus);

    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/prescription/findPrescription/${medicalRecord_id}`);
            if (response.data.success == true) {
                setPrescriptionList(response.data.data);
            }
            else {
                setPrescriptionList([]);
                console.log(response.data.message);
                alert(response.data.message);


            }
        }
        catch (error) {
            console.log("Error in api integration");
            console.log(error);
        }
    }
    useEffect(() => {
        console.log("medicalRecord_id changed: ", medicalRecord_id);
        if (medicalRecord_id) {
            fetchList();
        }
    }, [medicalRecord_id]);

    return (
        <Box sx={{
            height: '90vh',
            width: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            display: status ? "block" : "none"

        }}>
            
            <Box sx={{ width: { md: "70%", xs: '100%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>
                <Box sx={{ textAlign: 'end', paddingRight: '10px' }}>
                    <Typography onClick={props.onclose} sx={{ fontSize: '18px', fontWeight: '600', color: '#736d6d', cursor: 'pointer' }}>X</Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '0.7fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr', margin: '5px', padding: '5px', borderBottom: '1px solid gray' }}>
                    <b style={{ fontFamily: 'sans-serif', fontSize: '17px' }}> MedicineName</b>
                    <b style={{ fontFamily: 'sans-serif', fontSize: '17px' }}> Dosage</b>
                    <b style={{ fontFamily: 'sans-serif', fontSize: '17px' }}> Frequency</b>
                    <b style={{ fontFamily: 'sans-serif', fontSize: '17px' }}> Duration</b>
                    <b style={{ fontFamily: 'sans-serif', fontSize: '17px' }}> PrescribeBy</b>
                    <b style={{ fontFamily: 'sans-serif', fontSize: '17px' }}> PrescribeDate</b>

                </Box>
                <Box sx={{ height: '50vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                    {
                        Array.isArray(prescriptionList) && prescriptionList.length > 0 ? (
                            prescriptionList.map((item, index) => {
                                return (
                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '0.7fr 0.5fr 0.5fr 0.5fr 0.7fr 1fr', margin: '5px', padding: '5px' }}>
                                        <Typography>{item.medicineName}</Typography>
                                        <Typography>{item.dosage}</Typography>
                                        <Typography>{item.frequency}</Typography>
                                        <Typography>{item.duration}</Typography>
                                        <Typography>{item.doctor_id?.doctorName}</Typography>
                                        <Typography>{item.prescriptionDate}</Typography>
                                    </Box>
                                )
                            })
                        ) : (
                            <p> There is no prescription record exist</p>
                        )
                    }
                </Box>
                
            </Box>
        </Box>
    )
}

export default PrescriptionRecord
