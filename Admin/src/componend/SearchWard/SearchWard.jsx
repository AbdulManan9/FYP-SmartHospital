import React, { useState } from 'react'
import axios from 'axios';
import './SearchWard.css'
import { NavLink } from 'react-router-dom';
const SearchWard = (props) => {
    const wardState=props.wardstate;
    const [wardid,setWardId]=useState('');
    const [ward, setWard] = useState(null); // Store Ward data
    const [error, setError] = useState(null); // Store any error messages
    const handleSearch = async () => {
        try {
             
            const response = await axios.get(`http://localhost:4000/api/ward/SearchWard/${wardid}`);
            if(response.data.success===true){
                setWard(response.data.data); // Update state with the Ward data
                alert(response.data.message);
            }
            else{
                
                alert(response.data.message+`with this ${wardid} id`);
            }
           
        } catch (error) {
            setError("Ward not found or an error occurred.");
            setWard(null); // Reset Ward data
            console.log(response.data.message);
            alert("not found");

        }
    };
  return (
    <div className={wardState==='Serch'?'search-ward-main-div':"none"}>
        <div className="search-div">
      <input value={wardid} onChange={(e)=>setWardId(e.target.value)} type='text' placeholder='Enter Ward Number'/>
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
          <NavLink to="/Rooms" state={{ wardId: ward._id }}>
    <button className="room-btn">Rooms</button>
</NavLink>
        </div>
        :
        <div></div>
        }
      </div>
      
    </div>
  )
}

export default SearchWard
