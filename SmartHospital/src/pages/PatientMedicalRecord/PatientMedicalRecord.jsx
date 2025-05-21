import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Box, Typography, Button } from '@mui/material';
import PrescriptionRecord from '../../componend/PrescriptionRecord/PrescriptionRecord';
import MedicalRecordPDF from '../../componend/MedicalRecordpdf/MedicalRecordpdf';
import axios from 'axios';

const PatientMedicalRecord = () => {
    const location = useLocation();
    const { cnic } = location.state || {};
    const [medicalRecordList, setMedicalRecordList] = useState([]);
    const [medicalRecord_id, setmedicalRecord_id] = useState('');
    const [prescriptionState, setPrescriptionState] = useState(false);
    const openPrescription = (id) => {
        setPrescriptionState(true);
        setmedicalRecord_id(id);
    }
    const handleonclose = () => {
        setPrescriptionState(false);
    }
    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/MedicalRecord/PatientMedicalRecord/${cnic}`);
            if (response.data.success === true) {
                setMedicalRecordList(response.data.data);
                console.log("Data is ");
                console.log(response.data.data);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error in API integration");
        }
    };

    useEffect(() => {
        if (cnic) {
            fetchList();
        }
    }, [cnic]);

    return (
        <>
            <Box>
                <PrescriptionRecord status={prescriptionState} onclose={handleonclose} medicalRecord_id={medicalRecord_id} />

                <Box sx={{ paddingTop: '30px', paddingLeft: '30px' }}>
                    <Typography variant='h5' sx={{ color: '#005E7D' }}>Patient Medical Record Overview</Typography>
                    <Typography>Welcome! Here you can view your complete medical history as recorded by your healthcare provider</Typography>
                    <Typography variant='h5' sx={{ color: '#005E7D' }}>Your Medical Records</Typography>
                    <Typography>Below you can see the complete medical record of patient that doctor add and also see the prescription of each medical record</Typography>
                    <Typography>{medicalRecord_id}</Typography>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '90%' }}>
                        <Box sx={{ height: '60vh', display: 'flex', gap: '10px', overflowX: 'scroll', scrollbarWidth: 'none', padding: '20px', flexWrap: 'wrap' }}>
                            {
                                Array.isArray(medicalRecordList) && medicalRecordList.length > 0 ? (
                                    medicalRecordList.map((item, index) => (

                                        <Box key={index}

                                            sx={{
                                                width: '330px',
                                                padding: '10px',
                                                border: '1px solid #CECECE',
                                                borderRadius: '10px',
                                                flexShrink: 0,
                                                overflow: 'scroll',
                                                scrollbarWidth: 'none',
                                                height: '50vh',

                                                '&:hover': { boxShadow: '0px 4px 10px rgba(0,0,0,0.25)' }
                                            }}>

                                            <Typography><b>Diagnosis:</b> {item.dignosis}</Typography>
                                            <Typography><b>Treatment Plan:</b> {item.treatmentPlan}</Typography>
                                            <Typography><b>Medical History:</b> {item.History}</Typography>
                                            <Typography><b>Created At:</b> {item.date}</Typography>
                                            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                                <PDFDownloadLink
                                                    document={<MedicalRecordPDF record={item} />}
                                                    fileName={`MedicalRecord-${item._id}.pdf`}
                                                    style={{
                                                        textDecoration: "none",
                                                        padding: "6px 12px",
                                                        fontSize: "14px",
                                                        color: "white",
                                                        backgroundColor: "#015170",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    {({ loading }) => loading ? "Preparing..." : "Download PDF"}
                                                </PDFDownloadLink>
                                                <button onClick={() => openPrescription(item._id)} style={{
                                                    textDecoration: "none",
                                                    padding: "6px 12px",
                                                    fontSize: "14px",
                                                    color: "white",
                                                    backgroundColor: "#015170",
                                                    borderRadius: "4px",
                                                }}>Prescription Record</button>

                                            </Box>

                                        </Box>

                                    ))
                                ) : (
                                    <Typography>There is no Medical Record available</Typography>
                                )
                            }

                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export default PatientMedicalRecord;
