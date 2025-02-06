import React, { useState, useEffect } from 'react';
import './Appointmentform.css';
import Image from './img/signupimg.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import {jwtDecode} from 'jwt-decode';


const Appointmentform = () => {
   const token = getToken();
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [patientId, setPatientId] = useState();
  var patId;
  const navigate=useNavigate();
  if (token) {
      try {
        const decodedHeader = jwtDecode(token);
        patId = decodedHeader.id; 
        
        // setPatientId(decodedHeader.id)
        console.log(patId,"iddddddddddddddddd")
        // setPatientId(patId);
        // console.log(patientId,"ptienyyyy")
        console.log(decodedHeader, 'Decoded Token');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  const fetchDoctors = async (specialization) => {

    // http://localhost:5000/doctor/getDoctorBySpecialization?specialization=Neurologist
    try {
      const response = await fetch(`http://localhost:5000/doctor/getDoctorBySpecialization?specialization=${specialization}`);
      const data = await response.json();
      setDoctors(data.doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSpecializationChange = (event) => {
    const selectedSpecialization = event.target.value;
    setSpecialization(selectedSpecialization);
console.log(specialization)
    if (selectedSpecialization) {
      console.log('slecttt')
      fetchDoctors(selectedSpecialization);
    } else {
      console.log("niiiii")
      setDoctors([]); 
    }
  };
  const preAppointment=()=>{
    navigate('/patientAppointment');
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/patient/createAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentDate,
          appointmentTime,
          reason,
          patientId:patId,
          doctorId,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Appointment booked successfully!');
        navigate('/home')
        console.log('Appointment created:', data);
        // setDoctors('')
        // setDoctorId("")
        // setAppointmentDate("");
        // setAppointmentTime("");
        // setReason('');
      
        
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="continer">
      <h3 className="app-h3">Book An Appointment</h3>
      <div className="form-common">
        <div className="left-form">
          <img src={Image} alt="Signup" />
        </div>
        <div className="right-form">
        
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="date"
                placeholder="Select Date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
              <input
                type="time"
                placeholder="Select Time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
              <select
                name="specialist"
                value={specialization}
                onChange={handleSpecializationChange}
                className="role-select mt-2 select-style"
                required
              >
                <option value="">Select Specialist</option>
                <option value="Physician">Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Cardiology">Cardiology</option>

                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Patient ID"
                value={patId}
                
                // onChange={(e) => setPatientId(e.target.value)}
                required
              />
              <select
                name="doctor"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="role-select select-style"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <button className="submit-btn" type="submit">
                New Appointment
              </button>
            </div>
            <div className="row">
              <button className="submit-btn" onClick={preAppointment}>
                Previous Appointments
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointmentform;
