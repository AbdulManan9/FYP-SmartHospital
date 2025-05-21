import React, { useEffect, useState } from 'react'
import './WardAdminList.css'
import axios from 'axios'
const WardAdminList = (props) => {
    const nurseState=props.nurseState;
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/wardAdmin/listwardAdmin`);
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
        <div className={nurseState==='List'?"wardAdmin-list-main-div":"none"}>
                        <div className="wardAdmin-list-table-format tittle">
                            <b>Name</b>
                            <b>Phone</b>
                            <b>Email</b>
                            <b>cnic</b>
                            <b>Assighn Ward</b>
                        </div>
                        {Array.isArray(list) && list.length > 0 ? (
                            list.map((item, index) => (
                                <div key={index} className='wardAdmin-list-table-format'>
                                    <p>{item.name}</p>
                                    <p>{item.phone}</p>
                                    <p>{item.Email}</p>
                                    <p>{item.cnic}</p>
                                    <p>{item.dutyWard?.wardNumber}</p>
                                </div>
                            ))
                        ) : (
                            <p>No Ward Admin found.</p>
                        )}
        </div>
    )
}

export default WardAdminList
