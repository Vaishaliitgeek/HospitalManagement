import React, { useState } from 'react';
import './login.css';
import Image from './img/signupimg.jpg';
// import {setToken} from './utils/auth';
import { setToken } from '../../utils/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert('Please select a role');
      return;
    }

    const formData = {
      email,
      password,
    };

    let apiUrl = '';

    // Determine API endpoint based on role
    if (role === 'doctor') {
      apiUrl = 'http://localhost:5000/doctor/loginDoctor';
    } else if (role === 'patient') {
      apiUrl = 'http://localhost:5000/patient/loginPatient';
    } else if (role === 'head') {
      apiUrl = 'http://localhost:5000/head/headLogin';
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully!`);
        console.log('Response Data:', data);
        setToken(data.token);
        navigate('/home');
        // Navigate('/home');
      } else {
        console.error('Error:', data);
        alert('Failed to log in. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="continer">
      <h1>Login</h1>
      <div className="form-common">
        <div className="left-form">
          <img src={Image} alt="Signup" />
        </div>
        <div className="right-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="row">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="head">Head</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
            <div className="row">
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
