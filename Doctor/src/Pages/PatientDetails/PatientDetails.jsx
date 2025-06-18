import { Box, Button,Typography } from '@mui/material';
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
import TestRecord from '../../Componend/TestRecord';
import MenuIcon from '@mui/icons-material/Menu';
const PatientDetails = () => {
    const location = useLocation();
    const [detailStatus, setdetailStatus] = useState("Persnol");
    const { doctor_id, patient_id, Satate } = location.state;
    const [AddMedicalRecordStatus, setAddMedicalRecordStatus] = useState(false);
    const [prescriptionState, setPrescriptionState] = useState(false);
    const [medicalRecord_id, setmedicalId] = useState();
    const [menu,setMenu]=useState(false);

    const handleonclose = () => {
        setAddMedicalRecordStatus(false);
        setPrescriptionState(false);
    }
    const handleStatus = (statuss) => {
        setdetailStatus(statuss);
    }
    const handleonopen = () => {
        setAddMedicalRecordStatus(true);
    }

    const openPrescription = (id) => {
        setPrescriptionState(true);
        setmedicalId(id);
    }

    return (
        <Box>
            <Box >
                <Navbar />
                <hr />
            </Box>
            <AddMedicalRecord status={AddMedicalRecordStatus} onclose={handleonclose} patient_id={patient_id} doctor_id={doctor_id} />
            <PrescriptionRecord status={prescriptionState} onclose={handleonclose} medicalRecord_id={medicalRecord_id} />



            <Box sx={{ display: 'flex', mt: '10px' }}>
                <Box sx={{ width: '18%', borderRight: '1px solid #EEEE', display: { xs: 'none', sm: 'block' } }}>
                    <Sidebar2 handleStatus={handleStatus} />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '82%' }, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box sx={{ display: Satate === "Ward" ? {xs:"none",sm:'flex'} : "none", justifyContent: 'end', width: '98%' }}>
                        <NavLink state={doctor_id} to='/wardMonitoring'>

                            <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>WardList</Button>

                        </NavLink>

                    </Box>
                    <Box sx={{ display: Satate === "Admit" ? "flex" : "none", justifyContent: 'end', width: '98%' }}>
                        <NavLink state={doctor_id} to='/admitPatients'>

                            <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Admit Patient List</Button>

                        </NavLink>

                    </Box>

                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                        <Box  sx={{width:{xs:'95%',sm:'100%'},display:{xs:'flex',sm:'none'},justifyContent:'space-between',backgroundColor:'#e5e5e5',border:'1px solid gray'}} >
                            <Typography sx={{    color: '#016483'}}>Patient Menu Bar</Typography>
                            <Box sx={{position:'relative'}}>
                                <MenuIcon onClick={()=>setMenu(!menu)}/>
                                <Box  sx={{display:menu?"flex":"none",position:'absolute',left: '-90px',flexDirection:'column',gap:'10px',backgroundColor: '#f9f9f9',width: '110px',border: '1.5px solid gray',zIndex:'1'}}>
                                    <Typography sx={{borderBottom:'1px solid black',textAlign:'end',cursor:'pointer'}} onClick={()=>setMenu(false)}>X</Typography>
                                    <Typography onClick={()=>setdetailStatus('Persnol')} sx={{borderBottom:'1px solid black'}}>PersnolRecord</Typography>
                                    <Typography onClick={()=>setdetailStatus('Medical')} sx={{borderBottom:'1px solid black'}}>MedicalRecord</Typography>
                                    <Typography onClick={()=>setdetailStatus('Vital')} sx={{borderBottom:'1px solid black'}}>VitalProgress</Typography>
                                    <Typography onClick={()=>setdetailStatus('Test')} sx={{borderBottom:'1px solid black'}}>TestRecord</Typography>
                                </Box>

                            </Box>
                        </Box>
                        <Box sx={{width:{xs:'95%',sm:'90%'}}}>

                            <MedicalRecord status={detailStatus} patient_id={patient_id} onopen={handleonopen} openPrescription={openPrescription} />
                            <ProgressMonitoring status={detailStatus} patient_id={patient_id} />
                            <PersnolRecord status={detailStatus} patient_id={patient_id} />
                            <TestRecord status={detailStatus} patient_id={patient_id} />
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}

export default PatientDetails;
