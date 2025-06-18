import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TestResultForm from './TestResultForm';
const PendingTestlist = () => {
    const [pendingTestList,setPendingTestList]=useState([]);
    const [testFormStatus,setTestFormStatus]=useState(false);
    const [testTemplate,setTestTemplate]=useState([]);
    const [id,setId]=useState('')
    const onclose=()=>{
        setTestFormStatus(false);
    }
    const fetchList=async()=>{
        try{
            const response=await axios.get("http://localhost:4000/api/test/PendingTests");
            if(response.data.success==true){
                setPendingTestList(response.data.data)
            }
            else{
                alert(response.data.message)
            }
        }
        catch(error){
            console.log("Error in api integration")
            console.log(error)
        }
    }
    useEffect(() => {
    fetchList();
}, []);

  return (
    <Box>
        <TestResultForm status={testFormStatus} testTemplate={testTemplate} onclose={onclose} id={id}/>
        <Box sx={{height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Box sx={{width:'90%',backgroundColor:'white',fontFamily:'sans-serif'}}>
                <Box sx={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',padding:'10px',borderBottom:'1px solid gray'}}>
                    <b>PatientName</b>
                    <b>AssighnedDoctor</b>
                    <b>TestName</b>
                    <b>status</b>
                    <b>AddReport</b>
                </Box>
                <Box sx={{height:'50vh',overflow:'scroll',scrollbarWidth:'none'}}>
                    {
                        Array.isArray(pendingTestList)&&pendingTestList.length>0?(
                            pendingTestList.map((item,index)=>{
                                return(
                                    <Box  key={index} sx={{padding:'2px 10px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',alignItems:'center',"&:hover":{border:'1px solid black'}}}>
                                        <p>{item.patient_id?.name}</p>
                                        <p>{item.doctor_id?.doctorName}</p>
                                        <p>{item.testTemplate_id?.Testname}</p>
                                        <p>{item.status}</p>
                                        <Button onClick={()=>{setTestFormStatus(true);setTestTemplate(item.testTemplate_id);setId(item._id)}} sx={{backgroundColor:'#005F7E',width:'100px',height:'30px',color:'white'}}>Report</Button>
                                    </Box>
                                )
                            })
                        ):(
                            <p> There is no test exist</p>
                        )
                    }
                </Box>
           
        </Box>
    </Box>
    </Box>
  )
}

export default PendingTestlist
