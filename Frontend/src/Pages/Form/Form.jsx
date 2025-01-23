import React,  { useState }from 'react';
import './Form.css';
import Image from './img/signupimg.jpg';
import { NavLink } from 'react-router-dom';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender,
    };

    try {
      const response = await fetch('http://localhost:5000/patient/createPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Patient registered successfully!');
        console.log('Response Data:', data);
      } else {
        console.error('Error:', data);
        alert('Failed to register patient. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="continer">
      <h1>Register PAtient</h1>
      <div className="form-common">
        <div className="left-form">
          <img src={Image} alt="Signup" />
        </div>
        <div className="right-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="row">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="row">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="phone"
                placeholder="Phone"
              />
              <input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
                placeholder="Date of Birth"
              />
            </div>
            <div className="row">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="row">
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </div>

          </form>
          <div className="flex mt-4 "><p className='me-2'>ALready have Account </p>
          <NavLink className="text-teal-400" to='/login'>Login</NavLink></div>
          
        </div>
      </div>
    </div>
  );
};

export default Form;
