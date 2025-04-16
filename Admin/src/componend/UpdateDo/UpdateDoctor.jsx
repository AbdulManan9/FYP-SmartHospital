import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import './UpdateDoctor.css'
const UpdateDoctor = (props) => {
    const manageState=props.manageMenu;
    const[doctorid,setDoctorId]=useState();
    const [doctor, setDoctor] = useState(null); // Store doctor data
    const [error, setError] = useState(null); // Store any error messages

    //function to search data

    const handleSearch = async () => {
        try {
             // Reset any previous errors

            // Send API request with the ID
            const response = await axios.get(`http://localhost:4000/api/doctor/findDoctor/${doctorid}`);
            if(response.data.success===true){
                setDoctor(response.data.data); // Update state with the doctor data
                alert(response.data.message);
            }
            else{
                
                alert(response.data.message+`with this ${doctorid} id`);
            }
           
        } catch (error) {
            setError("Doctor not found or an error occurred.");
            setDoctor(null); // Reset doctor data
            console.log(response.data.message);
            alert("not found");

        }
    };
  return (

    <div className={manageState==="Update" ? "update-main-div" : "none"}>
      <div className='updae-inner-div'>
      <div className='serch-div'> 
        <input value={doctorid} onChange={(e)=>setDoctorId(e.target.value)} type='text' placeholder='Enter Doctor-id'/>
        <button onClick={handleSearch}> Search</button>
      </div>
      <div className='serch-response-data'>
        
        {doctor?<div className='serch-response'>
          {/* <img src={`${url}/images/`+doctor.image}/> */}
          <div style={{display:'flex',justifyContent:'end',paddingRight:'20px'}}>
            <DeleteIcon/>
            <BorderColorIcon/>
            </div>
          <p>{doctor.doctorName}</p>
          <p>{doctor.Gender}</p>
          <p>{doctor.DateOfBirth}</p>
          <p>{doctor.Email}</p>
          <p>{doctor.Specialization}</p>
          <p>{doctor.Qualification}</p>
          <p>{doctor.Experience}</p>
          <p>{doctor.HospitalDepartment}</p>
          <p>{doctor.WorkingHours}</p>
          <p>{doctor.WorkingDays}</p>
         
        </div>
        :
        <div></div>
        }
      </div>
      </div>
    </div>
  )
}

export default UpdateDoctor
