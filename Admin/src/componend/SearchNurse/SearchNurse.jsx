import React, { useState } from 'react'
import axios from 'axios';
import './SearchNurse.css'
import { NavLink } from 'react-router-dom';
const SearchWard = (props) => {
    const nurseState=props.nurseState;
    const [nurseid,setNurseId]=useState('');
    const [ward, setWard] = useState(null); // Store Ward data
    const [error, setError] = useState(null); // Store any error messages
    const handleSearch = async () => {
        try {
             
            const response = await axios.get(`http://localhost:4000/api/ward/SearchWard/${nurseid}`);
            if(response.data.success===true){
                setWard(response.data.data); // Update state with the Ward data
                alert(response.data.message);
            }
            else{
                
                alert(response.data.message+`with this ${nurseid} id`);
            }
           
        } catch (error) {
            setError("Ward not found or an error occurred.");
            setWard(null); // Reset Ward data
            console.log(response.data.message);
            alert("not found");

        }
    };
  return (
    <div className={nurseState==='Serch'?'search-ward-main-div':"none"}>
        <div className="search-div">
      <input value={nurseid} onChange={(e)=>setNurseId(e.target.value)} type='text' placeholder='Enter Ward id'/>
      <button onClick={handleSearch}>Search</button>
      </div>
      <div className='serch-response-data'>
      <div className="searh-ward-list-table-format">
                        <b>Ward id</b>
                        <b>Ward Name</b>
                        <b>Ward Number</b>
                        <b>Rooms</b>
                        </div>
        {ward?<div className='searh-ward-list-table-format'>
          <p>{ward._id}</p>
          <p>{ward.wardName}</p>
          <p>{ward.wardNumber}</p>
          
        </div>
        :
        <div></div>
        }
      </div>
      
    </div>
  )
}

export default SearchWard
