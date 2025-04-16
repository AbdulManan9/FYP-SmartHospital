import React, { useEffect, useState } from 'react'
import './NurseList.css'
import axios from 'axios'
const NurseList = (props) => {
    const nurseState=props.nurseState;
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/nurse/allNurses`);
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
        <div className={nurseState==='List'?"nurse-list-main-div":"none"}>
                        <div className="nurse-list-table-format tittle">
                            <b>Name</b>
                            <b>Contact:</b>
                            <b>Department</b>
                            <b>Designation</b>
                            <b>Shift</b>
                        </div>
                        {Array.isArray(list) && list.length > 0 ? (
                            list.map((item, index) => (
                                <div key={index} className='nurse-list-table-format'>
                                    <p>{item.name}</p>
                                    <p>{item.contactNo}</p>
                                    <p>{item.Department}</p>
                                    <p>{item.Designation}</p>
                                    <p>{item.Shift}</p>
                                </div>
                            ))
                        ) : (
                            <p>No nurses found.</p>
                        )}
        </div>
    )
}

export default NurseList
