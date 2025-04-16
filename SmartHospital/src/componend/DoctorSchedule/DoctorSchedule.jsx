import { Box, Typography } from '@mui/material';
import React from 'react';
import './DoctorSchedule.css';

const DoctorSchedule = ({ scheduleState, doctorId, name, onClose }) => {
  console.log("Schedule Component Rendered");
  console.log("Props - scheduleState:", scheduleState, "Doctor Name:", name, "Doctor ID:", doctorId);

  return (
    <Box>
      {scheduleState && (
        <Box className="display">
          <Typography>Schedule of {name}</Typography>
          <Typography sx={{ cursor: 'pointer' }} onClick={onClose}>X</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DoctorSchedule;
