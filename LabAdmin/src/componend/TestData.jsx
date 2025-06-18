import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import TestFieldList from './TestFieldList'
const TestData = (props) => {
    const[testList,setTestList]=useState([]);
    const [testFieldStatus,setTestFieldStatus]=useState(false)
    const[Testid,setTestId]=useState('');
    const oncloseTestField=()=>{
        setTestFieldStatus(false);
    }
    const selectTest=(id)=>{
        setTestFieldStatus(true);
        setTestId(id);
    }
    const fetchList=async()=>{
        try{
            const response=await axios.get('http://localhost:4000/api/test/ListTest');
            if(response.data.success==true){
                setTestList(response.data.data);
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            console.log("Error in api integration")
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchList();
    },[])
    return (
        <>
        
        <Box sx={{ width: '100%',height:'90vh'}}>
            <TestFieldList id={Testid} status={testFieldStatus} onclose={oncloseTestField}/>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            
            <Box sx={{ width: '90%', backgroundColor: 'white',borderRadius:'20px' }}>
                <Box sx={{ p: '20px' }}>
                    <Typography sx={{color:'#016180'}} variant='h5'>Complete test Information List that is added</Typography>
                </Box>
                <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                    <Box sx={{width:'90%',border:'1px solid gray',borderRadius:'10px'}}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr',borderBottom:'1px solid gray',padding:'10px' }}>
                            <b>TestName</b>
                            <b>Description</b>
                            
                        </Box>
                        <Box sx={{height:'50vh',overflow:'scroll',scrollbarWidth:'none'}}>
                            {
                                Array.isArray(testList)&& testList.length>0?(
                                    testList.map((item,index)=>{
                                        return(
                                            <Box onClick={()=>selectTest(item._id)} key={index} sx={{display:'grid',gridTemplateColumns:'1fr 4fr ',padding:'10px',cursor:'pointer',"&:hover":{border:'2px solid black'}}}>
                                                <Typography>{item.Testname}</Typography>
                                                <Typography>{item.description}</Typography>
                                                
                                            </Box>
                                        )
                                    })
                                ):(
                                    <Typography> There is no test found</Typography>
                                )
                            }
                        </Box>
                    </Box>
                    <Box >
                        <Button  onClick={props.addTest} sx={{backgroundColor:'#016180',color:'white',my:'10px'}}>
                            Add Test
                        </Button>
                    </Box>
                </Box>

            </Box>
            </Box>
        </Box>
        </>
    )
}

export default TestData
