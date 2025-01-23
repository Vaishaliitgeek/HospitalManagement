import React, { useEffect, useState } from 'react';
import './Allpatient.css';
import axios from 'axios';

const Allpatient = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/patient/getallpatients');
      setData(response.data); // Update state with fetched data
      console.log(response.data.patients, "patients");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='allpatient'>
      <h1>ALll PAtient Record</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>firstname</th>
            <th>email</th>
            <th>dob</th>
            <th>gender</th>
          </tr>
        </thead>
        <tbody>
          {data?.patients?.length > 0 ? (
            data.patients.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
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

export default Allpatient;
