import { Box, Button, Grid2, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
const SetPassword = () => {
  const { token } = useParams();
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const handleSubmit=async()=>{
    try{
      const resp=await axios.post('http://localhost:4000/api/doctor/setPassword',{token,password,confirmPassword});
    if (resp.success==true){
      alert("Password set successfully");

    }
    else{
      alert(resp.data.message);
    }
    }
    catch(error){
      alert("Error in api integration");
      console.log(error);
    }
  }
  return (
    <Box sx={{ height: '100vh', display: "flex", justifyContent: "center", alignItems: 'center' }}>
      <Grid2 sx={{ backgroundColor: 'white', width: { xs: '90%', md: "35%" }, padding: '1%', display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: "15px" }}>

        <Typography sx={{ color: '#005E7D' }} variant='h4'> Set Password</Typography>
        <Grid2 sx={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='password'>Enter Password:</label>

          <TextField value={password} onChange={(e) => SetPassword(e.target.value)}></TextField>
        </Grid2>
        <Grid2 sx={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='password'>Enter Password:</label>

          <TextField value={confirmPassword} onChange={(e) => SetconfirmPassword(e.target.value)}></TextField>
        </Grid2>
        <Grid2 sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button onClick={handleSubmit} sx={{ backgroundColor: '#005E7D', width: "200px", margin: 'auto', color: 'white', borderRadius: "7px" }} type='submit'>Submit</Button>
        </Grid2>
        {confirmPassword}
      </Grid2>
    </Box>
  )
}

export default SetPassword;