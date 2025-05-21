import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Navbar from '../../Componend/Navbar'
import Sidebar from '../../Componend/Sidebar'
import RoomList from '../../Componend/RoomsList'
import axios from 'axios'
const MonitorWard = () => {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);
    const[id,setWardId]=useState('');
    const [status,setRoomStatus]=useState(false);
    const onclose=()=>{
        setRoomStatus(false);
    }
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/ward/listWard`);
            if (response.data.success) {
                setList(response.data.data);
                console.log(response.data);
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
        <Box>
            <RoomList id={id} status={status} onclose={onclose}/>
            <Navbar />
            <hr />

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ borderRight: '1px solid gray', width: '18%' }}>
                    <Sidebar />
                </Box>
                <Box sx={{ width: '82%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Box sx={{ width: '90%',backgroundColor:'white',padding:'20px'}}>
                        <Box  sx={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr'}}>
                            <b>Ward id</b>
                            <b>Ward Name</b>
                            <b>Ward Number</b>
                        </Box>
                        <Box sx={{height:'60vh',overflow:'scroll',scrollbarWidth:'none'}}>
                        {Array.isArray(list) && list.length > 0 ? (
                            list.map((item, index) => (
                                <Box onClick={()=>{setRoomStatus(true);setWardId(item._id)}} key={index} sx={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',cursor:'pointer','&:hover':{border:'1px solid gray',borderRadius:'10px'}}}>
                                    <p>{item._id}</p>
                                    <p>{item.wardName}</p>
                                    <p>{item.wardNumber}</p>

                                </Box>
                            ))
                        ) : (
                            <p>No ward found.</p>
                        )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MonitorWard
