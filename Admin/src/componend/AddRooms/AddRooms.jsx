import React, { useState } from 'react';
import axios from 'axios';
// import './AddRoom.css';
import './AddRooms.css'
const AddRoom = (props) => {
    const roomState = props.roomState;
    const ward_id=props.wardId;
    // State to store form input values
    const [roomData, setRoomData] = useState({
        roomNumber: '',
        ward: ward_id,
        totalBeds: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    // Function to submit the form and send data to backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        
        try {
            const response = await axios.post("http://localhost:4000/api/room/addRoom", roomData);

            if (response.data.success) { 
                console.log('Room Added Successfully:', response.data);
                alert('Room added successfully!');
                
                // Clear form after submission
                setRoomData({ roomNumber: '', ward: '', totalBeds: '' });
            }
        } catch (error) {
            console.error('Error adding room:', error);
            alert('Failed to add room. Please try again.');
        }
    };

    return (
        <div className= 'add-room-main-div'>
            <form className='add-room-form' onSubmit={handleSubmit}>
                <div className='add-room-left'>
                    <input
                        type='text'
                        name='roomNumber'
                        placeholder='Enter Room Number'
                        value={roomData.roomNumber}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type='number'
                        name='totalBeds'
                        placeholder='Enter Total Beds'
                        value={roomData.totalBeds}
                        onChange={handleChange}
                        required
                    />
                    <div className='add-room-btn'>
                        <button type='submit'>Add Room</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;