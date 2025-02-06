import React, { useEffect, useState } from 'react';
// import './Allpatient.css';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import {jwtDecode} from 'jwt-decode'
const PatientAppointment = () => {
  const token = getToken();
  const [data, setData] = useState({});
  // console.log(first)
  if (token) {
      try {
        var decodedHeader = jwtDecode(token);
        // role = decodedHeader.id;
        var id=decodedHeader.id
        console.log(decodedHeader,'decodedtoekkk')
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/patient/getappointment/${id}`);
      setData(response.data); // Update state with fetched data
      console.log(response.data, "patients");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className='allpatient'>
        
      <h1>Patient Appointment Me</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Appointement STatus</th>
            <th>Doctor  Name</th>
            <th>Doctor  SPecialization</th>

            {/* <th>gender</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.appointmentDate}</td>
                <td>{item.appointmentTime}</td>
                <td>{item.status}</td>

                <td>{item.Doctor.firstName}</td>
                <td>{item.Doctor.specialization}</td>


                {/* <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td> */}
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

    </div>
  )
}
  









export default PatientAppointment