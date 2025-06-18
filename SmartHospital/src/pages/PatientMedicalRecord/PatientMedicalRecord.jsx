import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Box, Typography } from '@mui/material';
import PrescriptionRecord from '../../componend/PrescriptionRecord/PrescriptionRecord';
import MedicalRecordPDF from '../../componend/MedicalRecordpdf/MedicalRecordpdf';
import TestRecordpdf from '../../componend/TestRecordpdf';
import axios from 'axios';

const PatientMedicalRecord = () => {
    const location = useLocation();
    const { cnic } = location.state || {};
    const [medicalRecordList, setMedicalRecordList] = useState([]);
    const [medicalRecord_id, setmedicalRecord_id] = useState('');
    const [prescriptionState, setPrescriptionState] = useState(false);
    const [testRecords, setTestRecords] = useState(null); // Changed to null for better state tracking

    const openPrescription = (id) => {
        setPrescriptionState(true);
        setmedicalRecord_id(id);
    };

    const handleonclose = () => {
        setPrescriptionState(false);
    };

    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/MedicalRecord/PatientMedicalRecord/${cnic}`);
            if (response.data.success === true) {
                setMedicalRecordList(response.data.data);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error fetching medical records");
        }
    };

    const fetchTestList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/test/PatientTestRec/${cnic}`);
            if (response.data.success === true) {
                setTestRecords(response.data.data);
            } else {
                console.log(response.data.message);
                setTestRecords([]); // Explicitly set empty array if no data
            }
        } catch (error) {
            console.log("Error fetching test records:", error);
            setTestRecords([]); // Set empty array on error
        }
    };

    useEffect(() => {
        if (cnic) {
            fetchList();
            fetchTestList();
        }
    }, [cnic]);

    return (
        <>
            <Box>
                <PrescriptionRecord 
                    status={prescriptionState} 
                    onclose={handleonclose} 
                    medicalRecord_id={medicalRecord_id} 
                />

                <Box sx={{ paddingTop: '30px', paddingLeft: '30px' }}>
                    <Typography variant='h5' sx={{ color: '#005E7D' }}>Patient Medical Record Overview</Typography>
                    <Typography>Welcome! Here you can view your complete medical history</Typography>
                    <Typography variant='h5' sx={{ color: '#005E7D' }}>Your Medical Records</Typography>
                    <Typography>Below you can see your complete medical records</Typography>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '90%' }}>
                        <Box sx={{
                            height: '60vh',
                            display: 'flex',
                            gap: '10px',
                            overflowX: 'scroll',
                            scrollbarWidth: 'none',
                            padding: '20px',
                            flexWrap: 'wrap'
                        }}>
                            {medicalRecordList.length > 0 ? (
                                medicalRecordList.map((item) => (
                                    <Box key={item._id}
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

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}>
                                                Prescription Record
                                            </button>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography>There are no medical records available</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ paddingLeft: '30px', mt: 4 }}>
                    <Typography variant='h5' sx={{ color: '#005E7D' }}>Your Test Records</Typography>
                    <Typography>Below you can see all test results</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ width: '90%', border: '1px solid #CECECE', borderRadius: '8px', padding: '10px' }}>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr 1fr 1fr', 
                            padding: '10px 0',
                            borderBottom: '1px solid #CECECE',
                            fontWeight: 'bold'
                        }}>
                            <Typography>Prescribed By</Typography>
                            <Typography>Test Name</Typography>
                            <Typography>Status</Typography>
                            <Typography>Download</Typography>
                        </Box>
                        <Box sx={{ height: '30vh', overflow: 'auto' }}>
                            {testRecords === null ? (
                                <Typography sx={{ p: 2 }}>Loading test records...</Typography>
                            ) : testRecords.length > 0 ? (
                                testRecords.map((item) => (
                                    <Box key={item._id} sx={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: '1fr 1fr 1fr 1fr', 
                                        padding: '12px 0',
                                        alignItems: 'center',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <Typography>{item.doctor_id?.doctorName || "N/A"}</Typography>
                                        <Typography>{item.testTemplate_id?.Testname || "N/A"}</Typography>
                                        <Typography>{item.status || "N/A"}</Typography>
                                        <PDFDownloadLink
                                            document={<TestRecordpdf record={item} />}
                                            fileName={`TestRecord-${item._id}.pdf`}
                                            style={{
                                                textDecoration: "none",
                                                padding: "6px 12px",
                                                fontSize: "14px",
                                                color: "white",
                                                backgroundColor: "#015170",
                                                borderRadius: "4px",
                                                width: 'fit-content'
                                            }}
                                        >
                                            {({ loading }) => loading ? "Preparing..." : "Download PDF"}
                                        </PDFDownloadLink>
                                    </Box>
                                ))
                            ) : (
                                <Typography sx={{ p: 2 }}>There are no test records</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default PatientMedicalRecord;