import { Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdmitPatientInRoom from './AdmitPatientInRoom';

const RoomList = (props) => {

    const [ward, setListWard] = useState([]);
    const status=props.status;
    const id=props.id;
    const [room_id,setRoom_id]=useState('')
    const [patientStatus,setpatientStatus]=useState(false);

    const fetchList = async () => {
        try {
            
            const response = await axios.get(`http://localhost:4000/api/room/Rooms/${id}`);
            if (response.data.success == true) {
                
                setListWard(response.data.data)
                console.log("Ward List is");
                console.log(ward);
            }
            else{
                alert("Unable to fetch ward List");
            }
        }
        catch(error){
            console.log("Error in api integration");
            console.log(error);
            alert("Error in integ")
        }
    }
    useEffect(() => {
        if (id) {
            fetchList();
        }
    }, [id]);

    useEffect(() => {
        console.log("Updated RoomList:", ward);
    }, [ward]);

    useEffect(() => {
        console.log("Updated RoomList:", ward);
      }, [ward]);
    return (
        <>
            <Box sx={{ width: '100%', height: '90vh', position: 'fixed',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'1',display: status?"block":"none"}}>
                <AdmitPatientInRoom status={patientStatus} id={room_id}/>
                <Box sx={{ width: { md: "70%", xs: '90%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>

                    <Box sx={{textAlign:'end',paddingRight:'10px',display:'flex',justifyContent:'space-between',padding:'10px'}}>
                        <Typography sx={{fontSize:'18px',color: '#016483',fontWeight:'600'}}>Please select Room </Typography>
                        <Typography onClick={props.onclose} sx={{ color: '#016483', fontWeight: '600', fontSize: '18px', cursor: "pointer" }}>X</Typography>
                        </Box>
                    <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr 1fr',sm:'2fr 1fr 1fr'},padding:'10px'}}>
                    <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>RoomId</Typography >
                    <Typography fontWeight='bold'>RoomNumber</Typography >
                    <Typography fontWeight='bold'>TotalBeds</Typography>
                
                    </Box>
                    <Box sx={{height:'70vh',overflow:'scroll',scrollbarWidth:'none'}}>
                        {
                            Array.isArray(ward) && ward.length>0 ?(
                                ward.map((item,index)=>{
                                    return(
                                        <Box onClick={()=>{setRoom_id(item._id);setpatientStatus(true)}}  key={index} sx={{display:'grid',gridTemplateColumns:{xs:'1fr 1fr',sm:'2fr 1fr 1fr'},margin:'5px',padding:'5px',cursor:"pointer","&:hover":{border:'1px solid gray',borderRadius:'5px'}}}>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item._id}</Typography>
                                        <Typography>{item.roomNumber}</Typography>
                                        <Typography>{item.totalBeds}</Typography>
                                        
                                       </Box> 
                                    )
                                })
                                
                            )

                            :(
                            <Typography> No Ward Found</Typography>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RoomList
