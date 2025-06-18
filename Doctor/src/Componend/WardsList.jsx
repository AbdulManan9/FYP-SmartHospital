import { Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WardsList = (props) => {

    const [ward, setListWard] = useState([]);
    const status=props.status;

    const fetchList = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/ward/listWard");
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
        }
    }
    useEffect(()=>{
        fetchList();
    },[])

    useEffect(() => {
        console.log("Updated medicalRecordList:", ward);
      }, [ward]);
    return (
        <>
            <Box sx={{ width: '100%', height: '100vh', position: 'fixed',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'1',display: status?"block":"none"}}>
                <Box sx={{ width: { md: "70%", xs: '90%' }, borderRadius: '10px', backgroundColor: "#e5e5e5", backdropFilter: 'blur(5px)', zIndex: '1000', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', margin: 'auto' }}>

                    <Box sx={{textAlign:'end',borderBottom:'1px solid gray',paddingRight:'10px',display:'flex',justifyContent:{xs:'end',sm:'space-between'},padding:'10px'}}>
                        <Typography sx={{fontSize:'18px',color: '#016483',fontWeight:'600',display:{xs:'none',sm:'block'}}}>Please select Ward before Admit the patient</Typography>
                        <Typography onClick={props.onclose} sx={{ color: '#016483', fontWeight: '600', fontSize: '18px', cursor: "pointer" }}>X</Typography>
                        </Box>
                    <Box sx={{display:'grid',gridTemplateColumns:{xs:'1fr 1fr 1fr',sm:'2fr 1fr 1fr 1fr'},padding:'10px'}}>
                    <Typography sx={{display:{xs:'none',sm:'block'}}} fontWeight='bold'>WardId</Typography>
                    <Typography fontWeight='bold'>Name</Typography>
                    <Typography fontWeight='bold'>Number</Typography>
                    <Typography fontWeight='bold'>Department</Typography>
                    </Box>
                    <Box sx={{height:'70vh',overflow:'scroll',scrollbarWidth:'none'}}>
                        {
                            Array.isArray(ward) && ward.length>0 ?(
                                ward.map((item,index)=>{
                                    return(
                                        <Box onClick={() => props.setWard(item._id)} key={index} sx={{display:'grid',gridTemplateColumns:{xs:'1fr 1fr 1fr',sm:'2fr 1fr 1fr 1fr'},margin:'5px',padding:'5px',cursor:"pointer","&:hover":{border:'1px solid gray',borderRadius:'5px'}}}>
                                        <Typography sx={{display:{xs:'none',sm:'block'}}}>{item._id}</Typography>
                                        <Typography>{item.wardName}</Typography>
                                        <Typography>{item.wardNumber}</Typography>
                                        <Typography>{item.Department}</Typography>
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

export default WardsList
