import { Box, Typography, Grid, Paper, Button, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import AddMedicalRecord from "../../Componend/AddMedicalRecord";
import WardsList from "../../Componend/WardsList";
import PrescriptionRecord from "../../Componend/PrescriptionRecord";
const AppointmentDetails = () => {
  const location = useLocation();
  const { doctor_id, patient_id,appointment_id } = location.state || {};
  const [prescriptionStatus,setPrescriptionStatus]=useState(false);
  const [medicalRecord_id,setMedicalRecordId]=useState('');
  console.log("Patient id is");
  console.log(patient_id);
  
  // const [appointmentList, setAppointmentList] = useState([]);
  const [medicalRecordList, setMedicalRecordList] = useState([]);
  const [patientList, setPatientList] = useState(null); // Single patient object
  const [AddMedicalRecordStatus,setAddMedicalRecordStatus]=useState(false);
  const [wardstatus,setWardStatus]=useState(false);
  const [ward_id,setWardId]=useState("");
  const completeAppointment=async()=>{
    try{
      const response=await axios.put(`http://localhost:4000/api/appointment/completeAppointment/${appointment_id}`)
      if(response.data.success==true){
        alert("Appointment is complete");
      }
      else{
        alert(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      
    }
  }
  const fetchList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/appointment/PatientAppointnmentDetail",
        { doctor_id, patient_id }
      );

      if (response.data.success === true) {
        console.log("API integration successful");
        console.log("Patient Data from API:", response.data.patient);

        // setAppointmentList(response.data.appointment);
        setPatientList(response.data.patient); // Assuming it's a single patient object
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error in API integration", error);
    }
  };

  const handleonclose=()=>{
    setAddMedicalRecordStatus(false);
    setWardStatus(false);
  }


  const admitPatient = async () => {
    
  
    try {
      console.log("Sending to API:", { patient_id, doctor_id, ward_id });
  
      const response = await axios.post("http://localhost:4000/api/admitRecord/admitPatient", {
        patient_id,
        doctor_id,
        ward_id,
        appointment_id,
      });
  
      if (response.data.success === true) {
        alert("Patient has been admitted successfully");
        setWardStatus(false);
      } else {
        alert(response.data.message);
      }
  
    } catch (error) {
      console.error("❌ API call failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  

  const setWard=(id)=>{
    setWardId(id);
    admitPatient();
  }

  const fetchMedicalRecord = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/MedicalRecord/PatientRecord/${patient_id}`);
      if (response.data.success == true) {
        console.log(response.data.message)
        setMedicalRecordList(response.data.data);


      }
      else {
        console.log(response.data.message);
      }
    }
    catch (error) {
      console.log("Error in api integration", error);
    }
  }

  const handleonclosePres=()=>{
    setPrescriptionStatus(false);
  }

  
  useEffect(() => {
    console.log("Updated medicalRecordList:", medicalRecordList);
    console.log("Ward id is ");
    console.log(ward_id);
    if (ward_id !== "") {
      admitPatient();
    }
  }, [medicalRecordList,ward_id]);
  useEffect(() => {
    fetchList();
    fetchMedicalRecord();
  }, []);
  

  // Runs when medicalRecordList changes


  if (!patientList) return <Typography>Loading...</Typography>;

  return (

    <>
    <PrescriptionRecord medicalRecord_id={medicalRecord_id} status={prescriptionStatus} onclose={handleonclosePres}/>
    <AddMedicalRecord status={AddMedicalRecordStatus} onclose={handleonclose} patient_id={patient_id} doctor_id={doctor_id}/>
    <WardsList status={wardstatus} onclose={handleonclose} setWard={setWard}/>
      <Box sx={{ display: 'flex', justifyContent: 'end', width: '95%', mt: '10px' }}>
        <NavLink state={doctor_id} to='/Appointment'>
          <Button sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Back to Appointment</Button>

        </NavLink>

      </Box>
      <Box sx={{ width: "90%", mx: "auto", mt: '5px', backgroundColor: 'white', px: '10px', py: "10px", borderRadius: '10px' }}>
        <Typography variant="h6" sx={{ color: "#016483" }}>
          Personal Details of Patient
        </Typography>

        <Box sx={{ padding:'13px 18px' }}>
          <Grid container spacing={2} sx={{ border: '1px solid #cecece', borderRadius: '10px' }}>
            {/* Left Column */}
            <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Patient's Name
              </Typography>
              <Typography>{patientList.name}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Patient ID
              </Typography>
              <Typography>{patientList._id}</Typography>
            </Grid>

            {/* Middle Column */}
            <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Gender
              </Typography>
              <Typography>{patientList.Gender}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Phone Number
              </Typography>
              <Typography>{patientList.contactNo}</Typography>
            </Grid>

            {/* Right Column */}
            <Grid item xs={4} sx={{ borderRight: '1px solid #cecece' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Date of birth
              </Typography>
              <Typography>{patientList.dateOfBirth}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                cnic
              </Typography>
              <Typography>{patientList.cnic}</Typography>
            </Grid>

            {/* Email & Optional Phone */}


          </Grid>
        </Box>
        <Typography variant="h6" sx={{ color: "#016483" }}>
          Medical Record of Patient
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginRight: '20px' }}>
          <Button onClick={()=>setAddMedicalRecordStatus(true)} sx={{ backgroundColor: '#E5E5E5', color: 'black', border: "1px solid black", "&:hover": { color: 'white', backgroundColor: '#015170', border: '1px solid white' } }}>Add Medical Record</Button>
        </Box>
        <Box sx={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          marginTop:'10px',
          scrollbarWidth:'none'
        }}>

          {

            Array.isArray(medicalRecordList) && medicalRecordList.length > 0 ? (
              medicalRecordList.map((item, index) => {
                return (
                  <>
                    <Box onClick={()=>{setMedicalRecordId(item._id);setPrescriptionStatus(true)}} key={index} sx={{
                      width: '330px',  // Removed extra space
                      padding: '10px',
                      border: '1px solid #CECECE',
                      borderRadius: '10px',
                      flexShrink: 0,
                      cursor:'pointer'
                    }}>
                      <Typography>{<b>Dignose: </b>}{item.dignosis}</Typography>
                      <Typography>{<b>TreatmentPlan : </b>}{item.treatmentPlan}</Typography>
                      <Typography>{<b>Medical History : </b>}{item.History}</Typography>
                      <Typography>{<b>created At: </b>}{item.date}</Typography>

                    </Box>

                  </>

                );
              }
              )) :
              (
                <p>There is no medical Record Exist</p>
              )
          }
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: '10px', marginRight: '20px',marginTop:"10px" }}>
          <Button sx={{ color: 'white', backgroundColor: '#015170', border: "1px solid black" }} onClick={()=>setWardStatus(true)}>Admit </Button>
          <Button onClick={completeAppointment} sx={{ color: 'white', backgroundColor: '#015170', border: "1px solid black" }}>Not Admit</Button>

        </Box>
      </Box></>
  );
};

export default AppointmentDetails;
