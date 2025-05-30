import { Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BedList = (props) => {
    const wardAdmin_id = localStorage.getItem("wardAdmin_id");
    const [ward, setListWard] = useState([]);
    const status=props.status;
    const room_id=props.id;
    
    const fetchList = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/room/beds",{room_id});
            if (response.data.success == true) {
                setListWard(response.data.data)
                console.log("Ward List is");
                console.log(ward);
            }
            else{
                console.log("Unable to Bed ward List");
            }
        }
        catch(error){
            console.log("Error in api integration");
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchList();
    },[room_id])

    useEffect(() => {
        console.log("Updated medicalRecordList:", ward);
      }, [ward]);
    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', position: 'fixed',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'1',display: status?"block":"none"}}>
                <Box sx={{ width: { md: "50%", xs: '100%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>

                    <Box sx={{textAlign:'end',paddingRight:'10px',display:'flex',justifyContent:'space-between',padding:'10px'}}>
                        <Typography sx={{fontSize:'18px',color: '#016483',fontWeight:'600'}}>Please select Bed in which Patient Admit</Typography>
                        <Typography onClick={props.onclosebed} sx={{ color: '#016483', fontWeight: '600', fontSize: '18px', cursor: "pointer" }}>X</Typography>
                        </Box>
                    <Box sx={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',padding:'10px'}}>
                    <b>Bed Number</b>
                    <b>Status</b>
                    <b>Admit</b>
                    
                    </Box>
                    <Box sx={{height:'60vh',overflow:'scroll',scrollbarWidth:'none'}}>
                        {
                            Array.isArray(ward) && ward.length>0 ?(
                                ward.map((item,index)=>{
                                    return(
                                        <Box onClick={() => props.onSelectBed(item._id)} key={index} sx={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr ',margin:'5px',padding:'5px',cursor:"pointer","&:hover":{border:'1px solid gray',borderRadius:'5px'}}}>
                                        <Typography>{item.bed_no}</Typography>
                                        <Typography>{item.bed_status}</Typography>
                                        <button onClick={()=>props.onSelectBed(item._id)} style={{width:'100px'}}>Admit</button>
                                       </Box> 
                                    )
                                })
                                
                            )

                            :(
                            <Typography> No Bed Found</Typography>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BedList
