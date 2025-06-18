import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AssighnTest from './AssighnTest';
import TestRecordpd from './TestRecordpdf';
const TestRecord = (props) => {
    const status = props.status;
    const patient_id = props.patient_id;
    const [testOption, setTestOption] = useState([]);
    const [Testname, setTestname] = useState('');
    const [assighnTestStatus, setassighnTestStatus] = useState(false);
    const doctor_id = localStorage.getItem('doctorId');
    const [testResult, setTestResult] = useState([]);
    const onclose = () => {
        setassighnTestStatus(false);
    }
    const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/test/assighnTest', { doctor_id, patient_id, Testname });
            if (response.data.success == true) {
                alert("Test assighn to pateint");
                setassighnTestStatus(false);
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in api integration");
            console.log(error);
        }
    }
    const onSelect = () => {
        onSubmit();
    }
    const fetchTestName = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/test/ListTest");
            if (response.data.success == true) {
                setTestOption(response.data.data);
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in api integration")
            console.log(error);
        }
    }
    const fetchTestList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/test/PatientTest/${patient_id}`);
            if (response.data.success == true) {
                setTestResult(response.data.data)
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in api integration test list");
            alert("Error in api integration test list")
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTestName();
        fetchTestList();
    }, [])
    return (
        <Box>
            <AssighnTest status={assighnTestStatus} onclose={onclose} onSelect={onSelect} />
            <Box sx={{ display: status == "Test" ? "flex" : "none", justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '95%', backgroundColor: 'white', padding: "10px" }}>
                    <Box >
                        <Typography variant='h5' sx={{ color: '#006180' }}> Assighn Test to this Pateient</Typography>
                        <Box sx={{ display: 'flex', gap: '40px' }}>
                            <select
                                value={Testname}
                                onChange={(e) => setTestname(e.target.value)}
                                style={{ width: '300px', height: '30px', marginTop: '10px' }}
                            >
                                <option value="">-- Select Test --</option>
                                {testOption.map((test) => (
                                    <option key={test.Testname} value={test.Testname}>
                                        {test.Testname}
                                    </option>
                                ))}
                            </select>
                            <Button onClick={() => setassighnTestStatus(true)} sx={{ backgroundColor: '#016180', color: 'white', height: '30px', marginTop: '10px' }}>AssighnTest</Button>
                        </Box>
                    </Box>
                    <Box sx={{ my: "20px" }}>
                        <Typography variant='h5' sx={{ color: '#006180' }}>Test Record of the Patient </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ width: '90%', my: '20px', border: '1px solid gray', padding: '10px', borderRadius: '10px' }}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: {xs:'1fr 1fr 1fr',sm:'1.2fr 1fr 1fr 1.5fr 1fr'} }}>

                                    <Typography sx={{display:{xs:'none',sm:'block'},fontWeight:'bold'}}>Assighned Doctor</Typography>
                                    <Typography sx={{fontWeight:'bold'}}>TestName</Typography>
                                    <Typography sx={{fontWeight:'bold'}}>Status</Typography>
                                    <Typography sx={{display:{xs:'none',sm:'block'},fontWeight:'bold'}}>Date</Typography>
                                    <Typography sx={{fontWeight:'bold'}}>DownloadPdf</Typography>
                                </Box>
                                <Box sx={{ height: '30vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                                    {
                                        testResult.length > 0 ? (
                                            testResult.map((item, index) => {
                                                return (
                                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: {xs:'1fr 1fr 1fr',sm:'1.2fr 1fr 1fr 1.5fr 1fr'},alignItems:'center' ,marginTop:{xs:'10px',sm:'none'}}}>

                                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item.doctor_id?.doctorName}</Typography>
                                                        <Typography>{item.testTemplate_id?.Testname}</Typography>
                                                        <Typography>{item.status}</Typography>

                                                        {item.status === 'completed' && (
                                                            <>
                                                                <Typography  sx={{display:{xs:'none',sm:'block'}}}>{item.createdAt}</Typography>
                                                                <PDFDownloadLink
                                                                    document={<TestRecordpd record={item} />}
                                                                    fileName={`MedicalRecord-${item._id}.pdf`}
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        padding: "6px 12px",
                                                                        fontSize: "14px",
                                                                        color: "white",
                                                                        backgroundColor: "#015170",
                                                                        borderRadius: "4px",
                                                                        height:'19px',
                                                                        width:'89px'
                                                                    }}
                                                                >
                                                                    {({ loading }) => loading ? "Preparing..." : "Download PDF"}
                                                                </PDFDownloadLink>
                                                            </>
                                                        )}
                                                    </Box>
                                                );
                                            })
                                        ) : (
                                            <Typography>There is no test exist</Typography>
                                        )
                                    }

                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TestRecord
