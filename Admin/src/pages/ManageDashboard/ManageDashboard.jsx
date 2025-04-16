import React from 'react'
import './ManageDashboar.css'
import DashboardData from '../../componend/DashboardData/DashboardData.jsx'
import Navbar from '../../componend/Navbar/Navbar.jsx'
import Sidebar from '../../componend/Sidebar/Sidebar.jsx'

const ManageDashboard = () => {
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="manage-dashboard-main">
        <div className="dashboard-sidebar">
        <Sidebar/>
        </div>
        <div className="dashboard-data-main">
          <div className='dasboard'>
          <DashboardData/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageDashboard
