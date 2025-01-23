import './DoctorAppointment.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import {jwtDecode} from 'jwt-decode';
import { NavLink } from 'react-router-dom';

const DoctorAppointment = () => {
  const token = getToken();
  const [data, setData] = useState([]);

  let doctorId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      doctorId = decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/doctor/getAppointByDoctor/${doctorId}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`, 
          // },
        }
      );

      const filteredData = response.data.filter((item) => item.status === 'Pending');
      setData(filteredData); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      console.log(`Calling API: http://localhost:5000/doctor/updatestatus/${id} with status: ${status}`);
      const response = await axios.put(
        `http://localhost:5000/doctor/updatestatus/${id}`,
        { status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log(response.data, 'Status updated successfully');
      fetchData(); 
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  

  const handleAccept = (id) => {
    alert('Appointment accepted');
    updateStatus(id, 'Accepted'); 
  };
  
  const handleReject = (id) => {
    alert('Appointment rejected');
    updateStatus(id, 'Cancelled');
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="allpatient">
        <h1>Patient Appointment Requests</h1>
        <button className="pre-btn">
          <NavLink to="/myPreviousAppoitment">Previous Appointments</NavLink>
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Patient Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.appointmentDate}</td>
                  <td>{item.appointmentTime}</td>
                  <td>{item.Patient?.firstName || 'N/A'}</td>
                  <td>{item.status}</td>
                  <td>
  <button
    className="text-green-400 me-3"
    onClick={() => handleAccept(item.id)}
  >
    Accept
  </button>
  <button
    className="text-red-500 me-3"
    onClick={() => handleReject(item.id)}
  >
    Reject
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No pending appointments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
