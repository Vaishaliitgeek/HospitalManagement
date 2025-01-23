import React, { useEffect, useState } from 'react';
// import './Allappointment.css'
import './Allappointmenthead.css'
import axios from 'axios';

const Allappointment = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/head/getallappointments');
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
    <div className='allpatient'>
    <h1>ALll Appointments Record</h1>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>date</th>
          <th>time</th>
          <th>reason</th>
          <th>status</th>
          <th>patientId</th>

          <th>doctorId</th>

        </tr>
      </thead>
      <tbody>
        {data?.appointments?.length > 0 ? (
          data.appointments.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.
appointmentDate}</td>
              <td>{item.
appointmentTime
}</td>
              <td>{item.reason}</td>
              <td>{item.status}</td>
              <td>{item.patientId}</td>
              <td>{item.doctorId}</td>

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
  )
}

export default Allappointment