import React from 'react';
import {jwtDecode} from 'jwt-decode';
import logo from './assets/logo.svg';
import './Navbar.css';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { getToken,removeToken,getAdminaccessToken} from '../../utils/auth';

const Navbar = () => {
  const token = getToken();
  const admin=getAdminaccessToken();
  const navigate=useNavigate();

  let role = '';
  if (token) {
    try {
      const decodedHeader = jwtDecode(token);
      role = decodedHeader.role;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  const handleLogout=()=>{
    localStorage.removeItem('loggedInDoctor');
    localStorage.removeItem('Admin')
    localStorage.removeItem('adminDoctorLoggedIn')
removeToken();
navigate('/login')
  }
  const handleLogin=()=>{
    navigate('/form')
  }

  return (
    <div className="continer">
      <div className="main-nav">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navlinks">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/alldoctor">All Doctors</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </div>
        {/* {admin? <NavLink to="/myAppoitment">My Appointment</NavLink>:""
              } */}
        <div className="create">
          {role === 'patient' ? (
            <NavLink to="/appointment">APpointment</NavLink>
          ) : role === 'doctor' ? (
            <NavLink to="/myAppoitment">My Appointment</NavLink>
          ) : role === 'head' ? (
            <>
            <NavLink to="/admin">My Admin</NavLink>
            {/* <NavLink to="/myAppoitment">My Appointment</NavLink> */}
            </>

          ) : null}
        </div>
        {/* {role==='patient'||'doctor'? <NavLink to="/myprofile">My Profile</NavLink>:""} */}
        {token ? (
  role !== 'head' ? (
    <NavLink to="/myprofile">My Profile</NavLink>
  ) : null
) : null}

        {token? <button onClick={handleLogout}>Logout</button>: <button onClick={handleLogin}>Register</button> }
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
