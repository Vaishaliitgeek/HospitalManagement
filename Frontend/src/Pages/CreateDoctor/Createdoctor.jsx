import React, { useState } from 'react';
import './Createdoctor.css';
import axios from 'axios';

const Createdoctor = () => {
  // Define state for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    setFirstName('');
    setLastName("");
    setEmail("");
    setPhone('');
    setSpecialization('');
    setImage('');
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('specialization', specialization);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/doctor/createDoctor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Doctor created successfully');
    } catch (error) {
      console.error('Error creating doctor:', error);
      alert('Error creating doctor');
    }
  };

  return (
    <div className="doctor-create-box">
      <h3>Create Doctor</h3>
      <form className="createForm" onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="row">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="row">
          <input
            type="file"
            placeholder="Upload your image"
            onChange={handleImageUpload}
          />
        </div>
        <button className="submit-btn1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Createdoctor;
