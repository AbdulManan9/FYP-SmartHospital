import React from 'react'
import './SerchNurse.css'
import axios from 'axios';
import { useState } from 'react';
const SerchNurse = (props) => {
  const state = props.nurseState;
  const [nurseList, setNurseList] = useState([]);
  const [name, setName] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/nurse/find", { name });
      if (response.data.success === true) {
        setNurseList(response.data.data);
      }
      else {
        alert(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
      alert("Error in api integration");
    }
  }
  return (
    <div className={state === 'Serch' ? "serch-main-div" : "none"}>
      <div className='serch-nurse-input-div'>
        <input
          type='text'
          placeholder='Enter Nurse Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="nurse-list-table-format tittle">
                            <b>Name</b>
                            <b>Contact:</b>
                            <b>Department</b>
                            <b>Designation</b>
                            <b>Shift</b>
                            <b>Assighn Ward</b>
                        </div>
                        {Array.isArray(nurseList) && nurseList.length > 0 ? (
                            nurseList.map((item, index) => (
                                <div key={index} className='nurse-list-table-format'>
                                    <p>{item.name}</p>
                                    <p>{item.contactNo}</p>
                                    <p>{item.Department}</p>
                                    <p>{item.Designation}</p>
                                    <p>{item.Shift}</p>
                                    <p>{item.dutyWard?.wardNumber}</p>
                                </div>
                            ))
                        ) : (
                            <p>No nurses found.</p>
                        )}
    </div>
  )
}

export default SerchNurse
