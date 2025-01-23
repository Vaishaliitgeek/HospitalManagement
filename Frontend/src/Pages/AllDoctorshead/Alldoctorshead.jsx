import React, { useState, useEffect } from 'react';
import './Alldoctorshead.css';
import axios from 'axios';

const Alldoctorshead = () => {
  const [data, setData] = useState({});
  const BASE_URL = 'http://localhost:5000/'; 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}doctor/getAllDoctors`);
      setData(response.data); 
      console.log(response.data.doctors, "doctors");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          </tr>
        </thead>
        <tbody>
          {data?.doctors?.length > 0 ? (
            data.doctors.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.specialization}</td>
                <td>
                  {item.image ? (
                    <img 
                      src={`${BASE_URL}${item.image}`} 
                      alt={`${item.firstName}'s profile`} 
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
              </tr>
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

