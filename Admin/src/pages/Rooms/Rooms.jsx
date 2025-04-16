import React from 'react';
import './Rooms.css';
import { useLocation } from 'react-router-dom';
import RoomList from '../../componend/RoomList/RoomList';
import AddRoom from '../../componend/AddRooms/AddRooms';
import { useState } from 'react';
const Rooms = () => {
    const location = useLocation();
    const [roomState,setRoomState]=useState("Search");
    const { wardId } = location.state || {}; // Safely destructure wardId from state

    return (
        <>
        <div className='room-page-main-div'>
            <div className={roomState==="Search"?"display-room-list":"none"}>
            <RoomList  wardId={wardId}/>
            <button onClick={()=>setRoomState('Add')}>Add Room</button>
            </div>
            <div className={roomState==="Add"?"display-add-room":"none"}>
            <AddRoom/>
            </div>
         
       
        </div>
        </>
    );
};

export default Rooms;
