import React from 'react'
import './AddNurse.css';
const AddNurse = (props) => {
    const nurseState=props.nurseState;
  return (
    <div className={nurseState==="Add"?"add-nurse-main-div":"none"}>
      <form className='nurse-input-form'>
        <div>
            <input type='text' placeholder='Enter Name'/>
            <input type='text' placeholder='Enter Phone Number'/>
        </div>
        <div>
            <input type='date' placeholder='Enter Name'/>
            <input type='text' placeholder='Enter Department'/>
        </div>
        <div>
            <input type='text' placeholder='Enter Designation'/>
            <input type='text' placeholder='Enter Shift'/>
        </div>
        <div>
            <input className='nurse-input-button' type='submit'/>
        </div>
      </form>
    </div>
  )
}

export default AddNurse
