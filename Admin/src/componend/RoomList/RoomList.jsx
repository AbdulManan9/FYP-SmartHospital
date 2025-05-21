import React, { useEffect, useState } from 'react'
import './RoomList.css'
import axios from 'axios'
const RoomList= (props) => {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);
    
    const wardId= props.wardId;
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/room/Rooms/${wardId}`);
            if (response.data.success) {
                
                setList(response.data.data);
                console.log("Rooms");
                console.log(response.data.data);
            } else {
                console.error(response.data.message);
            }

        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);
    return (
        <div className="room-list-main-div">
                        <div className="room-list-table-format">
                            <b>Room id</b>
                            <b>Room Number</b>
                            <b>Beds</b>
                            
                        </div>
                        {Array.isArray(list) && list.length > 0 ? (
                            list.map((item, index) => (
                                <div key={index} className='room-list-table-format'>
                                    <p>{item._id}</p>
                                    <p>{item.roomNumber}</p>
                                    
                                    <button className='beds-button'> Beds</button>
                                </div>
                            ))
                        ) : (
                            <p>No Rooms found.</p>
                        )}
        </div>
    )
}

export default RoomList

