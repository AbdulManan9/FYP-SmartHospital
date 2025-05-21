import React, { useState } from 'react';
import axios from 'axios';
import './AddWard.css';
import { assets } from '../../assets/assets';

const AddWard = (props) => {
    const wardState = props.wardstate;

    // State to store form input values
    const [wardData, setWardData] = useState({
        wardName: '',
        Department: '',
        wardNumber: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        setWardData({ ...wardData, [e.target.name]: e.target.value });
    };

    // Function to submit the form and send data to backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        
        try {
            const response = await axios.post("http://localhost:4000/api/ward/addWard",wardData);

            if (response.data.success === "true") {
                console.log('Ward Added Successfully:', response.data);
                alert('Ward added successfully!');
                
                // Clear form after submission
                setWardData({ wardName: '', department: '', wardNo: '' });
            }
            else{
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error adding ward:', error);
            alert('Failed to add ward. Please try again.');
        }
    };

    return (
        <div className={wardState === 'Add' ? 'Add-ward-main-div' : "none"}>
            <form className='add-ward-form' onSubmit={handleSubmit}>
                <div className='add-ward-left'>
                    <input
                        type='text'
                        name='wardName'
                        placeholder='Enter Ward Name'
                        value={wardData.wardName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='Department'
                        placeholder='Enter Department'
                        value={wardData.Department}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='wardNumber'
                        placeholder='Enter Ward No'
                        value={wardData.wardNumber}
                        onChange={handleChange}
                        required
                    />
                    <div className='add-ward-btn'>
                        <button type="submit">Add Ward</button>
                    </div>
                </div>
                <div className='add-ward-right'>
                    <img src={assets.add_form_img} alt="Add Ward" />
                </div>
            </form>
        </div>
    );
};

export default AddWard;
