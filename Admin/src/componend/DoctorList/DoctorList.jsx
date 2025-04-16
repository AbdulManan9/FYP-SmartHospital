import React, { useEffect, useState } from 'react'
import './DoctorList.css'
import axios from 'axios'
import ManageDoctorMenu from '../ManageDoctorMenu/ManageDoctorMenu';
const DoctorList = (props) => {
    const manageState=props.manageMenu;
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/doctor/getallDoctor`);
            if (response.data.success) {
                setList(response.data.data);
                console.log(response.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);
  return (
    <div className={ manageState==="List" ?"main-div" :"none"}>
        
      <div className="list add flex-col">
      {/* <ManageDoctorMenu/> */}
      <div className='doctor-list-main'>
      <div className='doctor-list'>
                    {list.length > 0 ? (
                        list.map((item, index) => (
                            <div key={index} className="list-table-format">
                                
                                <img src={`${url}/images/`+item.image}/>
                                <p>{item.doctorName}</p>
                                <div className='days-div'>
                                <p className='righ-text'>{item.Specialization}</p>
                                <p className='left-text'>{item.WorkingDays}</p>
                                </div>
                                <div className='hours-div'>
                                <p className='righ-text-second'>{item.Qualification}</p>
                                <p className='left-text'>{item.WorkingHours}</p>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p>No doctors found.</p>
                    )}
                    </div>
                    </div>
                
            </div>
    </div>
  )
}

export default DoctorList
