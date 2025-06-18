import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import axios from 'axios';
import Appointment from '../Pages/Appointments/Appointment';
import AddPrescription from './AddPrescription';
import DeleteIcon from '@mui/icons-material/Delete';

const PrescriptionRecord = (props) => {

    let medicalRecord_id = props.medicalRecord_id;
    const [prescriptionList, setPrescriptionList] = useState([]);
    const status = props.status;
    const [addPrescriptionStatus,setAddPrescriptionStatus]=useState(false)
    const handleonclose=()=>{
        
        setAddPrescriptionStatus(false);
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
    const deletePres=async(id)=>{
        try{
            const resp=await axios.delete(`http://localhost:4000/api/prescription/deletePrescription/${id}`);
            if(resp.data.success==true){
                alert("Prescription delete sucessfully");

            }
            else{
                alert(resp.data.message)
            }
        }
        catch(error){
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
            width: {xs:'90%',sm:'100%'},
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            display: status ? "flex" : "none"

        }}>
            <AddPrescription status={addPrescriptionStatus} onclose={handleonclose} medicalRecord_id={medicalRecord_id}/>
            <Box sx={{ width: { md: "70%", xs: '100%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>
                <Box sx={{ textAlign: 'end', paddingRight: '10px' }}>
                    <Typography onClick={props.onclose} sx={{ fontSize: '18px', fontWeight: '600', color: '#736d6d', cursor: 'pointer' }}>X</Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns:{xs:'0.7fr 0.5fr 0.5fr 0.1fr',sm:'0.7fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.1fr'}, margin:{xs:'0px',sm:'5px'}, padding: '5px', borderBottom: '1px solid gray' }}>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize: '17px' }}> MedicineName</Typography>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize: '17px' }}> Dosage</Typography>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize: '17px',display:{xs:'none',sm:'block'} }}> Frequency</Typography>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize: '17px'}} > Duration</Typography>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize: '17px',display:{xs:'none',sm:'block'} }}> PrescribeBy</Typography>
                    <Typography sx={{fontWeight:'bold', fontFamily: 'sans-serif', fontSize: '17px',display:{xs:'none',sm:'block'} }}> PrescribeDate</Typography>

                </Box>
                <Box sx={{ height: '50vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                    {
                        Array.isArray(prescriptionList) && prescriptionList.length > 0 ? (
                            prescriptionList.map((item, index) => {
                                return (
                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns:{xs:'0.7fr 0.5fr 0.5fr 0.1fr',sm:'0.7fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.1fr'}, margin: '5px', padding: '5px' }}>
                                        <Typography>{item.medicineName}</Typography>
                                        <Typography>{item.dosage}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.frequency}</Typography>
                                        <Typography >{item.duration}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.doctor_id?.doctorName}</Typography>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.prescriptionDate}</Typography>
                                        <DeleteIcon onClick={() => deletePres(item._id)}/>
                                    </Box>
                                )
                            })
                        ) : (
                            <p> There is no prescription record exist</p>
                        )
                    }
                </Box>
                <Box sx={{display:'flex',justifyContent:'center',paddingBottom:'10px'}}>
                    <Button onClick={()=>setAddPrescriptionStatus(true)} sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", marginRight: '20px', "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Add Prescription</Button>

                </Box>
            </Box>
        </Box>
    )
}

export default PrescriptionRecord
