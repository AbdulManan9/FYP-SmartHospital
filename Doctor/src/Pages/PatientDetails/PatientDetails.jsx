import { Box, Button } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../Componend/Navbar';
import Sidebar2 from '../../Componend/Sidebar2';
import MedicalRecord from '../../Componend/MedicalRecord';
import AddMedicalRecord from '../../Componend/AddMedicalRecord';
import { NavLink } from 'react-router-dom';
import PrescriptionRecord from '../../Componend/PrescriptionRecord';
import ProgressMonitoring from '../../Componend/ProgressMonitoring';
import PersnolRecord from '../../Componend/PersnolRecord';
const PatientDetails = () => {
    const location = useLocation();
    const [detailStatus,setdetailStatus]=useState("Persnol");
    const { doctor_id, patient_id,Satate } = location.state;
    const [AddMedicalRecordStatus,setAddMedicalRecordStatus]=useState(false);
    const [prescriptionState,setPrescriptionState]=useState(false);
    const[medicalRecord_id,setmedicalId]=useState();
    
    
    const handleonclose=()=>{
        setAddMedicalRecordStatus(false);
        setPrescriptionState(false);
      }
      const handleStatus=(statuss)=>{
        setdetailStatus(statuss);
      }
      const handleonopen=()=>{
        setAddMedicalRecordStatus(true);
      }

      const openPrescription=(id)=>{
        setPrescriptionState(true);
        setmedicalId(id);
      }
      
    return (
        <Box>
            <Box >
                <Navbar />
                <hr />
            </Box>
            <AddMedicalRecord status={AddMedicalRecordStatus} onclose={handleonclose} patient_id={patient_id} doctor_id={doctor_id}/>
            <PrescriptionRecord status={prescriptionState} onclose={handleonclose} medicalRecord_id={medicalRecord_id}/>
            


            <Box sx={{ display: 'flex', mt: '10px' }}>
                <Box sx={{ width: '18%', borderRight: '1px solid #EEEE' }}>
                    <Sidebar2 handleStatus={handleStatus}/>
                </Box>
                <Box sx={{ width: '82%',display:'flex',flexDirection:'column',gap:'10px' }}>
                    <Box sx={{ display: Satate === "Ward" ? "flex" : "none", justifyContent: 'end', width: '98%'}}>
                        <NavLink state={doctor_id} to='/wardMonitoring'>
                        
                            <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>WardList</Button>

                        </NavLink>

                    </Box>
                    <Box sx={{ display: Satate === "Admit" ? "flex" : "none", justifyContent: 'end', width: '98%'}}>
                        <NavLink state={doctor_id} to='/admitPatients'>
                        
                            <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Admit Patient List</Button>

                        </NavLink>

                    </Box>
                    
                    <Box>
                        
                    <MedicalRecord status={detailStatus} patient_id={patient_id} onopen={handleonopen} openPrescription={openPrescription}/>
                    <ProgressMonitoring status={detailStatus} patient_id={patient_id}/>
                    <PersnolRecord status={detailStatus} patient_id={patient_id}/>
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}

export default PatientDetails;
