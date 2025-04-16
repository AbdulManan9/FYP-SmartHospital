import { React, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
  const [state, setState] = useState(false)
  const logout = () => {
    localStorage.removeItem('token');
  }
  return (
    <div className='navbar'>
      <div className="menu-div">
        <MenuIcon onClick={() => setState(!state)} />
        <div className={state ? 'menu-div-innner' : 'None'}>
        <NavLink to='/'>
            <p>Dashboard</p>
          </NavLink>
          <NavLink to='/manageDoctor'>
          <p>Manage Doctor</p>
          </NavLink>
          <NavLink to='/manageWard'>
          <p>Manage Ward</p>
          </NavLink>
          <NavLink to='/'>
          <p>Manage Ward Admin</p>
          </NavLink>
          <NavLink to='/manageNurse'>
          <p>Manage Nurse</p>
          </NavLink>

        </div>
      </div>
      <div className="navbar-log">
        <img src={assets.logo} />

      </div>

      <NavLink to='/login'>

        <div onClick={logout}>
          <Typography sx={{ fontWeight: 600 }}>Logout</Typography>
          <LogoutIcon />
        </div>
      </NavLink>

    </div>
  )
}

export default Navbar
