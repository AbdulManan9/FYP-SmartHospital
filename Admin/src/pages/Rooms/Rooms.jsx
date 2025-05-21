import React from 'react';
import './Rooms.css';
import { useLocation } from 'react-router-dom';
import RoomList from '../../componend/RoomList/RoomList';
import AddRoom from '../../componend/AddRooms/AddRooms';
import { useState } from 'react';
import { NavLink} from 'react-router-dom'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Rooms = () => {
    const location = useLocation();
    const [roomState, setRoomState] = useState("Search");
    const { wardId } = location.state || {}; // Safely destructure wardId from state

    return (
        <>
            <div className='back-btn'>
                <NavLink to='/manageWard'>
                    <button >Back</button>
                </NavLink>

            </div>
            <div className='room-page-main-div'>

                <div className={roomState === "Search" ? "display-room-list" : "none"}>
                    <RoomList wardId={wardId} />
                    <button className='add-room-btn' onClick={() => setRoomState('Add')}>Add Room</button>
                </div>
                <div className={roomState === "Add" ? "display-add-room" : "none"}>
                    <div className='cross'>
                        <p onClick={() => setRoomState('Search')}>x</p>
                    </div>
                    <AddRoom wardId={wardId} />
                </div>


            </div>
        </>
    );
};

export default Rooms;
