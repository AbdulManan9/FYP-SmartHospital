import React, { useEffect, useState } from 'react'
import './WardList.css'
import axios from 'axios'
const WardList = (props) => {
    // const nurseState=props.nurseState;
    const wardState = props.wardstate;
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);


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
        <div className={wardState==="List" ? "ward-list-display"  : "none"}>
            <div className="ward-list-table-format">
                <b>Ward id</b>
                <b>Ward Name</b>
                <b>Ward Number</b>
                
            </div>
            {Array.isArray(list) && list.length > 0 ? (
                list.map((item, index) => (
                    <div key={index} className='ward-list-table-format'>
                        <p>{item._id}</p>
                        <p>{item.wardName}</p>
                        <p>{item.wardNumber}</p>

                    </div>
                ))
            ) : (
                <p>No ward found.</p>
            )}
        </div>
    )
}

export default WardList
