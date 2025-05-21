import React, { useState } from 'react';
import axios from 'axios';
import './AddWardAdmin.css';

const AddWardAdmin = (props) => {
    const nurseState = props.nurseState;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        cnic: '',
        password: '',
        Email: '',
        wardNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/wardAdmin/addWardAdmin', formData);

            if (response.data.success) {
                alert('✅ WardAdmin added successfully!');
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
                    <input type='text' name='phone' placeholder='Enter Phone Number' onChange={handleChange} required />
                </div>
                <div>
                    <input type='text' name='cnic' placeholder='Enter cnic' onChange={handleChange} required />
                    <input type='email' name='Email' placeholder='Enter Email' onChange={handleChange} required />
                </div>
                <div>
                    <input type='text' name='password' placeholder='Enter Password' onChange={handleChange} required />
                    <input type='text' name='wardNumber' placeholder='Enter duty Ward' onChange={handleChange} required />
                </div>
                <div>
                    <input className='nurse-input-button' type='submit' value="Add WardAdmin" />
                </div>
            </form>
        </div>
    );
};

export default AddWardAdmin;
