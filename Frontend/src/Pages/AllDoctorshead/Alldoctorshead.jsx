import React, { useState, useEffect } from 'react';
import './Alldoctorshead.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken,setAdminaccessToken } from '../../utils/auth';
import HeadDoctorTable from '../HeadDoctorTable';

const Alldoctorshead = () => {
  const token=getToken()
  const [data, setData] = useState({});
  const BASE_URL = 'http://localhost:5000/'; 
  const navigate=useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}doctor/getAllDoctors`);
      setData(response.data); 
      console.log(response.data.doctors, "doctors");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const handleLogin = async (doctorId) => {
  //   setIslogin(!islogin);
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}head/impersonateDoctor/${doctorId}`, 
  //       {}, 
  //       {
  //         headers: {
  //           Authorization:`Bearer ${token}`
  //           // Authorization: `Bearer ${localStorage.getItem('token')}`, 
  //         },
  //       }
  //     );
  //     console.log(response);
  //   // setAdminaccessToken(response.data.token);

  
  //     // Save the admin token to local storage or state if needed
  //     // localStorage.setItem('impersonation_token', response.data.token);
  
  //     // Redirect to doctor dashboard or home page
  //     // navigate('/doctor/dashboard');
  //   } catch (error) {
  //     console.error('Error during impersonation:', error);
  //     // Handle error message or redirect to a fallback page
  //   }
  // };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='allpatient'>
      <h1>All Doctor Records</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Image</th>
            <th>Login</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.doctors?.length > 0 ? (
            data.doctors.map((item) => (
              <HeadDoctorTable props={item} key={item.id}/>
              // <tr key={item.id}>
              //   <td>{item.id}</td>
              //   <td>{item.firstName}</td>
              //   <td>{item.email}</td>
              //   <td>{item.specialization}</td>
              //   <td>
              //     {item.image ? (
              //       <img 
              //         src={`${BASE_URL}${item.image}`} 
              //         alt={`${item.firstName}'s profile`} 
              //         style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
              //       />
              //     ) : (
              //       <span>No Image</span>
              //     )}
              //   </td>
              //   <td>{islogin?<button className='edit-btn' onClick={() => handleLogin(item.id)}>Login</button>:<button className='edit-btn' onClick={() => handleLogin(item.id)}>Logout</button>}</td>
              // </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Alldoctorshead;

