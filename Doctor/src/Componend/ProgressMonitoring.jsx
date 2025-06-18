import React, { useEffect, useState } from 'react';
import { Box,Typography} from '@mui/material';
import axios from 'axios';
import { Line } from "react-chartjs-2";


// ✅ REGISTER chart.js components to fix "category" scale error
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const getToday = () => {
    const today = new Date();

    // Convert to Pakistan timezone by offset (UTC+5)
    const pakistanTime = new Date(today.getTime() + (5.5 * 60 + today.getTimezoneOffset()) * 60 * 1000);

    const year = pakistanTime.getFullYear();
    const month = String(pakistanTime.getMonth() + 1).padStart(2, '0');
    const day = String(pakistanTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const ProgressMonitoring = (props) => {
    const status = props.status;
    const patient_id = props.patient_id;
    const [date, setDate] = useState(getToday());

    console.log("Date is ");
    console.log(date);
    const [record, setrecord] = useState([]);

    const fetchRecord = async () => {
        try {
            // Convert YYYY-MM-DD → M/D/YYYY format
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                timeZone: 'Asia/Karachi'
            });
    
            console.log("Sending formatted date:", formattedDate);
    
            const response = await axios.post('http://localhost:4000/api/vital/getVital', { patient_id, date: formattedDate });
    
            if (response.data.success === true) {
                setrecord(response.data.data);
            } else {
                // alert(response.data.message);
                console.log(response.data.message);

            }
        } catch (error) {
            alert("Error in API integration");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRecord();
    }, []);

    // ✅ Optional: console.log for debugging
    useEffect(() => {
        console.log(record);
    }, [record]);
    const graphData = {
        labels: record.map((r) => {
            return new Date(r.createdAt).toLocaleTimeString('en-US', {
                timeZone: 'Asia/Karachi',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        }),

        datasets: [
            {
                label: "Oxygen",
                data: record.map((r) => r.oxygenLevel),
                borderColor: "blue",
                fill: false,
            },
            {
                label: "Sugar",
                data: record.map((r) => r.sugarLevel),
                borderColor: "green",
                fill: false,
            },
            {
                label: "Blood Pressure (Top)",
                data: record.map((r) => r.bloodPressure),
                borderColor: "red",
                fill: false,
            },
        ],
    };


    return (
        <Box sx={{ display: status === "Vital" ? "flex" : "none", justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
            <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',padding:'10px 0px',backgroundColor:'white'}}>
                    <Typography sx={{display:{xs:'none',sm:'block'}}}>
                        Enter date in which you like to see Presscription
                    </Typography>
                    <Box sx={{display:'flex',gap:'10px'}}>
                        <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                        <button onClick={fetchRecord} style={{padding:'4px 20px'}}>Serch</button>
                    </Box>
                </Box>
            <Box sx={{ width: '100%', backgroundColor: 'white', height: '70vh' }}>
                
                {/* ✅ Fix canvas reuse issue with unique key */}
                <Line data={graphData} key={record.length} />
            </Box>
        </Box>
    );
};

export default ProgressMonitoring;
