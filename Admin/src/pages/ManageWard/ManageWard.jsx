import React, { useState } from 'react'
import './ManageWard.css'
import Navbar from '../../componend/Navbar/Navbar'
import Sidebar from '../../componend/Sidebar/Sidebar'
// import WardList from '../../componend/WardList/WardList'
import { assets } from '../../assets/assets'
import SearchWard from '../../componend/SearchWard/SearchWard'
import WardList from '../../componend/WardList/WardList'
import AddWard from '../../componend/AddWard/AddWard'
const ManageWard = () => {
    const [wardmenu,setWardMenu]=useState(false);
    const [wardstate,setWardstate]=useState('List');
    return (
        <>
            <Navbar />
            <hr />
            <div className='manage-ward-main-div'>
                <div className="manage-ward-sidebar">
                    <Sidebar />
                </div>
                <div className="manageWard-dashboard">
                    <div className="ward-menu-bar">
                        <p className='ward-info'>Ward Information</p>
                        <div style={{position:'relative'}}>
                            <img src={assets.menu} onClick={()=>setWardMenu(true)} />
                            <div className={wardmenu? "display-ward-menu":"none"}>
                                <p onClick={() => setWardMenu(false)} className='cross-txt'>X</p>
                                <p onClick={() => setWardstate('Add')}>Add Ward</p>
                                <p onClick={() => setWardstate('Serch')}>Search Ward</p>
                                <p onClick={() => setWardstate('List')}>List Ward</p>
                            </div>
                        </div>
                    </div>
                    <div className="ward-dashboard">
                        <SearchWard wardstate={wardstate}/>
                        <AddWard wardstate={wardstate} />
                        <WardList wardstate={wardstate}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageWard
