import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import React from 'react'
import { assets } from '../../assets/assets'
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
const MedicalRecord = () => {
  const[cnic,setcnic]=useState("");
  
  return (
    <Box>
      <Typography variant='h4' sx={{ color: '#005E7D', marginLeft: '50px', marginTop: '40px' }}> Patient Medical Record</Typography>
      <Typography sx={{ marginLeft: '50px', marginTop: '20px', fontSize: '18px', marginRight: '60px' }}>At Smart Hospital System, our mission is to revolutionize healthcare by integrating advanced digital medical records into our system. We aim to provide seamless, accurate, and secure patient data management that enhances diagnosis, treatment, and patient care. Our commitment is to ensure efficiency, accessibility, and transparency in medical history tracking, making healthcare smarter and more patient-centric</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0px' }}>
        <Box sx={{ width: { xs: '100%', sm: '80%' }, display: { xs: 'block', md: 'flex' }, backgroundColor: '#d8f5ff', borderRadius: '46px' }}>
          <Box sx={{ width: { xs: '100%', md: '50%' }, paddingLeft: '10px' }}>
            <Typography variant='h5' sx={{ marginTop: '50px' }}>Medical Record</Typography>
            <Typography sx={{ marginTop: 3 }}>Only admitted patients can access their medical records. First, they must enter the correct CNIC number.
              If the patient is already registered, they will be able to view all their medical records digitally.</Typography>
            <Typography sx={{ marginTop: '10px' }}> In digital Medical Record patient can also see prescription record and treatment plan complete detail because our mission is to propvide patient the best physelity and using this our patient have complete plan of does and treatment.</Typography>
            
            <TextField
              value={cnic}
              onChange={(e)=>setcnic(e.target.value)}
              variant="outlined"
              placeholder="Enter patient CNIC"
              fullWidth
              sx={{
                marginTop: '20px',
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px", // Make border round like in the image
                  height: '40px',
                  width: '90%',
                  "& fieldset": {
                    borderColor: "black", // Default border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <NavLink to='/PatientMedicalRecord' state={{cnic}}>
                        <SearchIcon />
                      </NavLink>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <img style={{ width: '100%' }} src={assets.Record} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MedicalRecord
