import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import AddTestField from './AddTestField'
const TestFieldList = (props) => {
    const [testFieldList, settestFieldList] = useState([]);
    const id = props.id;
    console.log("id is");
    console.log(id)
    const status = props.status;
    const [AddFieldStatus,setAddFielsStatus]=useState(false);
    const oncloseAddTestField=()=> {
        setAddFielsStatus(false);
    }
    const oncorrectAdd=()=>{
        setAddFielsStatus(false);
        fetchList();
    }
    const fetchList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/test/listField/${id}`);
            if (response.data.success == true) {
                settestFieldList(response.data.data);
            }
            else {
                alert(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in api integration")
            console.log(error);
        }
    }
    useEffect(() => {
        if (status && id) {
            fetchList();
        }
    }, [id, status]);
    return (
        <Box sx={{ position: 'fixed', width: '70%', display: status ? "flex" : "none", justifyContent: 'center', alignItems: 'center', height: '90vh', zIndex: '1000' }}>
            <AddTestField onclose={oncloseAddTestField} status={AddFieldStatus} id={id} correct={oncorrectAdd}/>
            <Box sx={{ width: '90%', backgroundColor: '#eeeeee', borderRadius: '20px', marginLeft: '200px' }}>
                <Box sx={{ p: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#016180' }} variant='h5'>Complete test Field Information List that is added</Typography>
                    <Typography onClick={props.onclose} sx={{ color: '#016180', cursor: 'pointer', fontWeight: '600' }}>X</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: '90%', border: '1px solid gray', borderRadius: '10px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', borderBottom: '1px solid gray', padding: '10px' }}>
                            <b>Name</b>
                            <b>Unit</b>
                            <b>Normal Min</b>
                            <b>Normal Max</b>

                        </Box>
                        <Box sx={{ height: '40vh', overflow: 'scroll', scrollbarWidth: 'none' }}>
                            {
                                Array.isArray(testFieldList) && testFieldList.length > 0 ? (
                                    testFieldList.map((item, index) => {
                                        return (
                                            <Box key='index' sx={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', padding: '10px', cursor: 'pointer', "&:hover": { border: '2px solid black' } }}>
                                                <Typography>{item.name}</Typography>
                                                <Typography>{item.unit}</Typography>
                                                <Typography>{item.normalMin}</Typography>
                                                <Typography>{item.normalMax}</Typography>

                                            </Box>
                                        )
                                    })
                                ) : (
                                    <Typography> There is no test Field found</Typography>
                                )
                            }
                        </Box>

                    </Box>
                    <Box>
                        <Button onClick={()=>setAddFielsStatus(true)} sx={{ backgroundColor: '#016180', color: 'white', my: '10px' }}>
                            Add Field
                        </Button>
                    </Box>
                </Box>


            </Box>
        </Box>
    )
}

export default TestFieldList
