import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorSchedule.css';

const DoctorSchedule = ({ scheduleState, doctorId, name, onClose }) => {
  const [scheduleList, setScheduleList] = useState([]);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/Schedule/findSchedule/${doctorId}`);
      if (response.data.success === true && response.data.data.length > 0) {
        setScheduleList(response.data.data[0].schedules);
      } else {
        alert(response.data.message);
        setScheduleList([]); // Clear if not found
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      alert('Something went wrong while fetching schedule');
    }
  };

  useEffect(() => {
    if (scheduleState && doctorId) {
      fetchSchedule();
    }
  }, [scheduleState, doctorId]);

  return (
    <Box sx={{position:'fixed',width:'100%'}}>
      {scheduleState && (
        <Box sx={{ width: "70%",border:'1px solid gray',borderRadius:'10px',backgroundColor:'#e2e2e2', margin: 'auto', marginTop: '20px'}}className="display">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: '20px', alignItems: 'center' }}>
            <Typography variant="h6">Schedule of {name}</Typography>
            <Typography sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={onClose}>X</Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', px: '20px', fontWeight: 'bold', my: 1 }}>
            <Typography>Day</Typography>
            <Typography>Time Slot</Typography>
          </Box>

          <Box sx={{ px: '20px' }}>
            {Array.isArray(scheduleList) && scheduleList.length > 0 ? (
              scheduleList.map((item, index) => (
                <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', mb: 1 }}>
                  <Typography>{item.day}</Typography>
                  <Typography>{item.timeSlots}</Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ mt: 2 }}>There is no schedule available.</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DoctorSchedule;
