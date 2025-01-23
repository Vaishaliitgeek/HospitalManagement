import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar-box'>
      <NavLink to='/admin/createDoctor'><li>Add Doctor</li></NavLink>
      <NavLink to='/admin/alldoctor'><li>All Doctors</li></NavLink>
      <NavLink to='/admin/allpatient'><li>All Patients</li></NavLink>
      <NavLink to='/admin/allappointments'><li>All Appointments</li></NavLink>

      {/* <li>All Appointments</li>
      <li>All Staff Memb.</li> */}

    </div>
  )
}

export default Sidebar