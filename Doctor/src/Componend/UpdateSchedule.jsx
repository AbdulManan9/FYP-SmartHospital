import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

const UpdateSchedule = (props) => {
  const doctorId=props.doctorId;
  const [schedules, setSchedules] = useState([]);
  const status=props.status;
  // 1. Fetch existing timetable on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/Schedule/findSchedule/${doctorId}`);
        if (res.data.success) {
          // res.data.data is an array of timetables; we take the first one
          setSchedules(res.data.data[0]?.schedules || []);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [doctorId]);

  // 2. Handlers to edit the form
  const handleChange = (idx, field, value) => {
    setSchedules(prev =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setSchedules(prev => [...prev, { day: '', timeSlots: '' }]);
  };

  const removeRow = idx => {
    setSchedules(prev => prev.filter((_, i) => i !== idx));
  };

  // 3. Submit updated timetable
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { doctor_id: doctorId, schedules };
      console.log('Submitting', payload);
      const res = await axios.post(
        'http://localhost:4000/api/Schedule/addSchedule',
        payload
      );
      if (res.data.success) {
        alert('Timetable updated');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating timetable');
    }
  };

  return (
     <Box
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            zIndex: 1000,
            display:status?"flex":"none"
            
          }}
        >
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4,bgcolor: '#f5f5f5',borderRadius: 2,boxShadow: 3,p: 4, }}>
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Typography variant="h6" gutterBottom>
        Edit Timetable
      </Typography>
      <Typography onClick={props.onclose} sx={{color:'#01607F',fontWeight:'bold',cursor:'pointer'}}>
        X
      </Typography>
      </Box>

      {schedules.map((row, idx) => (
        <Grid container spacing={2} key={idx} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Day"
              value={row.day}
              onChange={e => handleChange(idx, 'day', e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Time Slots"
              value={row.timeSlots}
              onChange={e => handleChange(idx, 'timeSlots', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              color="error"
              onClick={() => removeRow(idx)}
              disabled={schedules.length === 1}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={addRow}>
          + Add Row
        </Button>
        <Button type="submit" variant="contained">
          Save Timetable
        </Button>
      </Box>
    </Box>
    </Box>
  );
};

export default UpdateSchedule;
