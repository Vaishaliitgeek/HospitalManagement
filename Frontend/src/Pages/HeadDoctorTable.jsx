import React, { useState, useEffect } from 'react';
import { getToken, setAdminaccessToken, removeAdminaccessToken, getAdminaccessToken } from '../utils/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HeadDoctorTable = ({ props }) => {
  const BASE_URL = 'http://localhost:5000/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = getToken();
  const navigate = useNavigate();
  const { id, firstName, email, specialization, image } = props;

  // Check if this doctor is logged in
  useEffect(() => {
    const loggedInDoctor = localStorage.getItem('loggedInDoctor');
    if (loggedInDoctor && parseInt(loggedInDoctor, 10) === id) {
      setIsLoggedIn(true);
    }
  }, [id]);
  const handleDelete = async (doctorId) => {
    let text = "ARe you sure you want to delete doctor";
  if (confirm(text) == true) {
    try {
      const response = await axios.delete(
        `${BASE_URL}head/deleteDoctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // alert('Doctor deleted successfully');
        location.reload();
        // Optionally, you can also update the UI or trigger a refresh
      }
    } catch (error) {
      console.error('Error during delete:', error);
      // Optionally, show an error message to the user
      alert('Failed to delete doctor');
    }
  }
  };


  const handleLogin = async (doctorId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}head/impersonateDoctor/${doctorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.doctorData, 'Logged-in Doctor Data');
      await setAdminaccessToken(response.data.token);

      // Store logged-in doctor ID in localStorage
      localStorage.setItem('loggedInDoctor', doctorId);
      setIsLoggedIn(true);

      navigate('/myAppoitment', { state: { doctor: response.data.doctorData } });
    } catch (error) {
      console.error('Error during impersonation:', error);
    }
  };

  const handleLogout = () => {
    // Remove logged-in doctor ID from localStorage
    localStorage.removeItem('loggedInDoctor');
    removeAdminaccessToken();
    setIsLoggedIn(false);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{email}</td>
      <td>{specialization}</td>
      <td>
        {image ? (
          <img
            src={`${BASE_URL}${image}`}
            alt={`${firstName}'s profile`}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        ) : (
          <span>No Image</span>
        )}
      </td>
      <td>
        {isLoggedIn ? (
          <button className="edit-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="edit-btn" onClick={() => handleLogin(id)}>
            Login
          </button>
        )}
      </td>
      <td><button onClick={()=>handleDelete(id)}>Delete</button></td>
    </tr>
  );
};

export default HeadDoctorTable;
