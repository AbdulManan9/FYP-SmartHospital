import { useState,React } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls

const AppointmentForm = () => {
  const location = useLocation();
  const { id } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    Gender: "",
    contactNo: "",
    cnic: "",
    doctor_id:id,
    Email: "",
    appointmentDate: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:4000/api/appointment/takeAppointment", formData);
      alert(response.data.message);
      console.log("Respose is");
     
      if (response.success==='true') {
        alert("Appointment request submitted successfully!");
        setFormData({ 
          name: "", dateOfBirth: "", Gender: "", contactNo: "",
          cnic: "", Email: "", appointmentDate: "", doctorName: "", reason: ""
        });
      }
      else{
        alert(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#005E7D", marginTop: "50px", marginLeft: "60px" }}>
        Request an Appointment for Clinics and Other Outpatient Services
      </Typography>
      <Typography variant="h6" sx={{ color: "#777777", marginTop: "10px", marginLeft: "60px" }}>
        Emergency and Urgent Care Services are walk-in only.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Box sx={{ width: "90%" }}>
          <form onSubmit={handleSubmit}>
            <Typography sx={{ fontFamily: "sans-serif", fontSize: "21px" }}>Patient Information</Typography>

            {/* Patient Name */}
            <Box sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", marginTop: "20px" }}>
              <Box sx={{ width: { xs: "90%", md: "45%" } }}>
                <label>Patient Name</label><br />
                
                <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box>

              {/* Date of Birth */}
              <Box sx={{ width: { xs: "90%", md: "45%" } }}>
                <label>Date of Birth</label><br />
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box>
            </Box>

            {/* Gender & Contact No */}
            <Box sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", marginTop: "20px" }}>
              <Box sx={{ width: "45%" }}>
                <label>Gender</label><br />
                <select name="Gender" value={formData.Gender} onChange={handleChange} style={{ width: "100%", height: "30px" }}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Box>

              <Box sx={{ width: { xs: "90%", md: "45%" } }}>
                <label>Contact No</label><br />
                <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box>
            </Box>

            {/* CNIC & Email */}
            <Box sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", marginTop: "20px" }}>
              <Box sx={{ width: "45%" }}>
                <label>CNIC</label><br />
                <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box>
              <Box sx={{ width: { xs: "90%", md: "45%" } }}>
                <label>Email (optional)</label><br />
                <input type="Email" name="Email" value={formData.Email} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box>
            </Box>

            <Typography sx={{ fontFamily: "sans-serif", fontSize: "21px", marginTop: "30px" }}>
              Appointment Information
            </Typography>

            {/* Appointment Date & Doctor Name */}
            <Box sx={{ display: { xs: "block", md: "flex" }, justifyContent: "space-between", marginTop: "20px" }}>
              <Box sx={{ width: { xs: "90%", md: "45%" } }}>
                <label>Appointment Date</label><br />
                <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box>

              {/* <Box sx={{ width: { xs: "90%", md: "45%" } }}>
                <label>Doctor Name</label><br />
                <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} style={{ width: "100%", height: "25px" }} />
              </Box> */}
            </Box>

            {/* Reason for Appointment */}
            

            {/* Submit Button */}
            <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
              <button type="submit" style={{ backgroundColor: "#005E7D", color: "white", padding: 8, border: "none", borderRadius: "7px" }}>
                Request Appointment
              </button>
            </Box>

            {/* Error Message */}
            {error && <Typography sx={{ color: "red", fontSize: "14px" }}>{error}</Typography>}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentForm;
