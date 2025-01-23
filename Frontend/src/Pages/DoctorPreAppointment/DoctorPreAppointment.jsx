import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import {jwtDecode} from 'jwt-decode'; // Fixed import

const DoctorPreAppointment = () => {
  const token = getToken(); // Get token from auth utility
  const [data, setData] = useState([]);

  let doctorId = null;
  if (token) {
    try {
      const decodedHeader = jwtDecode(token);
      doctorId = decodedHeader.id; // Extract the doctor's ID from the token
      console.log(decodedHeader, 'Decoded Token');
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // Fetch appointments where the status is "Accepted"
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/doctor/getAppointByDoctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filteredData = response.data.filter(
        (appointment) => appointment.status === 'Accepted'
      ); // Show only "Accepted" appointments
      setData(filteredData); // Update state with filtered data
      console.log(filteredData, 'Filtered Appointments');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Update patient's status to "Recovered"
  // http://localhost:5000/doctor/updatePatientStatus/3
  const updatePatientStatus = async (patientId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/doctor/updatePatientStatus/${patientId}`,
        { status: 'Recovered' }, // Pass the updated status
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, 'Patient status updated');
      fetchData(); // Refresh the data after updating the status
    } catch (error) {
      console.error('Error updating patient status:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="allpatient">
      <h1>Patients Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Patient Name</th>
            <th>Patient Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.appointmentDate}</td>
                <td>{item.appointmentTime}</td>
                <td>{item.Patient.firstName}</td>
                <td>{item.Patient.status}</td>
                <td>
                  <button
                    className="text-green-400 me-3"
                    onClick={() => updatePatientStatus(item.Patient.id)}
                  >
                    Recovered
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPreAppointment;
