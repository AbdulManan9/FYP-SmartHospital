import React, { useState } from 'react';
import axios from 'axios';
import './AddNurse.css';

const AddNurse = (props) => {
    const nurseState = props.nurseState;

    const [formData, setFormData] = useState({
        name: '',
        contactNo: '',
        dob: '',
        Department: '',
        Designation: '',
        Shift: '',
        Email: '',
        wardNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/nurse/addNurse', formData);

            if (response.data.success) {
                alert('✅ Nurse added successfully!');
            } else {
                alert('⚠️ ' + response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('❌ Error adding nurse: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className={nurseState === "Add" ? "add-nurse-main-div" : "none"}>
            <form className='nurse-input-form' onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='name' placeholder='Enter Name' onChange={handleChange} required />
                    <input type='text' name='contactNo' placeholder='Enter Phone Number' onChange={handleChange} required />
                </div>
                <div>
                    <input type='date' name='dob' placeholder='Enter DOB' onChange={handleChange} required />
                    <input type='text' name='Department' placeholder='Enter Department' onChange={handleChange} required />
                </div>
                <div>
                    <input type='text' name='Designation' placeholder='Enter Designation' onChange={handleChange} required />
                    <input type='text' name='Shift' placeholder='Enter Shift' onChange={handleChange} required />
                </div>
                <div>
                    <input type='email' name='Email' placeholder='Enter Email' onChange={handleChange} required />
                    <input type='text' name='wardNumber' placeholder='Enter duty Ward' onChange={handleChange} required />
                </div>
                <div>
                    <input className='nurse-input-button' type='submit' value="Add Nurse" />
                </div>
            </form>
        </div>
    );
};

export default AddNurse;
