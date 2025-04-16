import React, { useState, useEffect } from 'react';
import './AddDoctor.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const AddDoctor = (props) => {
  const manageState = props.manageMenu;
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image) {
      setImagePreview(URL.createObjectURL(image));
    }
  }, [image]);

  const [data, setData] = useState({
    doctorName: "",
    Gender: "",
    DateOfBirth: "",
    Email: "",
    Specialization: "",
    Qualification: "",
    Experience: "",
    HospitalDepartment: "",
    WorkingHours: "",
    WorkingDays: "",
    Shift: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formdata=new FormData();
    formdata.append("doctorName",data.doctorName);
    formdata.append("Email",data.Email);
    formdata.append("DateOfBirth",data.DateOfBirth);
    formdata.append("Specialization",data.Specialization);
    formdata.append("Qualification",data.Qualification);
    formdata.append("Shift",data.Shift);
    formdata.append("Gender",data.Gender);
    formdata.append("HospitalDepartment",data.HospitalDepartment);
    formdata.append("WorkingDays",data.WorkingDays);
    formdata.append("WorkingHours",data.WorkingHours);
    formdata.append("image",image);
    const response=await axios.post("http://localhost:4000/api/doctor/add",formdata)
    if(response.data.success=== true){
      alert("Doctor added successfully");
    }
    else{
      alert("Doctor not added");
    }
  };

  return (
    manageState === 'Add' && (
      <div className="add-doctor-main-div">
        <div className='form-div'>
          <form className='form-inner-div' onSubmit={onSubmitHandler}>
            <div className="image-upload-div">
              <label htmlFor='image'>
                <img style={{ width: '80px' }} src={imagePreview || assets.upload_area} alt="Doctor Profile" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
            </div>
            <div className='add-divs'>
              <input onChange={onChangeHandler} name="doctorName" value={data.doctorName} className='input-form' type='text' placeholder='Enter Name' />
              <input onChange={onChangeHandler} name="Email" value={data.Email} className='input-form' type='text' placeholder='Enter Email' />
            </div>
            <div className='add-divs'>
              <div className='date-of-div'>
                <label className='date-of-div-label' htmlFor='dob'>DOB</label>
                <input onChange={onChangeHandler} name="DateOfBirth" value={data.DateOfBirth} type='date' placeholder='Enter Date of Birth' />
              </div>
              <input onChange={onChangeHandler} name="HospitalDepartment" value={data.HospitalDepartment} className='input-form' type='text' placeholder='Enter Hospital Department' />
            </div>
            <div className='add-divs'>
              <input onChange={onChangeHandler} name="Specialization" value={data.Specialization} className='input-form-2' type='text' placeholder='Enter Specialization' />
              <input onChange={onChangeHandler} name="Qualification" value={data.Qualification} className='input-form-2' type='text' placeholder='Enter Qualification' />
              <input onChange={onChangeHandler} name="Gender" value={data.Gender} className='input-form-2' type='text' placeholder='Enter Gender' />
            </div>
            <div className='add-divs'>
              <input onChange={onChangeHandler} name="WorkingHours" value={data.WorkingHours} className='input-form-2' type='text' placeholder='Working Hours' />
              <input onChange={onChangeHandler} name="WorkingDays" value={data.WorkingDays} className='input-form-2' type='text' placeholder='Working days' />
              <input onChange={onChangeHandler} name="Shift" value={data.Shift} className='input-form-2' type='text' placeholder='Shift' />
            </div>
            <div className='button-div'>
              <input type='submit' />
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default AddDoctor;
