import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField,Grid } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateDoctor = ({ doctor,status,onClose,onSubmit }) => {
  // Local state for form
  
  const [formData, setFormData] = useState({
    doctorName: '',
    Qualification: '',
    HospitalDepartment: '',
    Email: '',
    WorkingDays: '',
    DateOfBirth: '',
    Specialization: '',
    Shift: '',
    
  });

  // Initialize formData when doctor prop changes
  useEffect(() => {
    if (doctor) {
      setFormData({
        doctorName: doctor.doctorName || '',
        Qualification: doctor.Qualification || '',
        HospitalDepartment: doctor.HospitalDepartment || '',
        Email: doctor.Email || '',
        WorkingDays: doctor.WorkingDays || '',
        DateOfBirth: doctor.DateOfBirth || '',
        Specialization: doctor.Specialization || '',
        Shift: doctor.Shift || '',
      });
    }
  }, [doctor]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const id = doctor._id; // or doctor.id depending on your data
      const response = await axios.put(
        `http://localhost:4000/api/doctor/updateDoctors/${id}`,
        formData
      );

      if (response.data.success) {
        // Notify parent that update succeeded
        // onUpdated(response.data.data);
        alert("Update successfully")
        onClose();
        onSubmit();
        
      } else {
        alert(response.data.message || 'Failed to update doctor');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('An error occurred while updating.');
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
        
      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{
          width: '80%',
          maxWidth: 800,
          bgcolor: '#f5f5f5',      // light grey background
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        
            <Typography variant="h6" mb={3}>
          Update Doctor Details
        </Typography>

        

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="doctorName"
              label="Doctor Name"
              value={formData.doctorName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="Qualification"
              label="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
            />
          </Grid>

          {/* Next row */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="HospitalDepartment"
              label="Hospital Department"
              value={formData.HospitalDepartment}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="Email"
              label="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="WorkingDays"
              label="Working Days"
              value={formData.WorkingDays}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="Specialization"
              label="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
            />
          </Grid>

          

          
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// UpdateDoctor.propTypes = {
//   doctor: PropTypes.object.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onUpdated: PropTypes.func.isRequired,
// };

export default UpdateDoctor;
