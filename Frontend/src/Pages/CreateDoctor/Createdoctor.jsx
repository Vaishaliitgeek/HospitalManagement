import React, { useState } from 'react';
import './Createdoctor.css';
import axios from 'axios';


const Createdoctor = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value) error = 'First name is required';
        break;
      case 'lastName':
        if (!value) error = 'Last name is required';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      case 'specialization':
        if (!value) error = 'Specialization is required';
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (value.length !== 10) {
          error = 'Phone number must be 10 digits';
        }
        break;
      case 'image':
        if (!value) error = 'Image is required';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Validation function
  // const validate = () => {
  //   const newErrors = {};

  //   if (!firstName) newErrors.firstName = 'First name is required';
  //   if (!lastName) newErrors.lastName = 'Last name is required';
  //   if (!email) {
  //     newErrors.email = 'Email is required';
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     newErrors.email = 'Invalid email format';
  //   }
  //   if (!password) {
  //     newErrors.password = 'Password is required';
  //   } else if (password.length < 6) {
  //     newErrors.password = 'Password must be at least 6 characters long';
  //   }
  //   if (!specialization) newErrors.specialization = 'Specialization is required';
  //   if (!phone) {
  //     newErrors.phone = 'Phone number is required';
  //   } else if (phone.length !== 10) {
  //     newErrors.phone = 'Phone number must be 10 digits';
  //   }
  //   if(!image){
  //     newErrors.image="Image is required";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'specialization':
        setSpecialization(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError('');
    if (Object.values(errors).some((error) => error)) return;
    // if (!validate()) return;

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
      console.log(response,"response dkhte h")

      if (response.status === 201) {
        alert('Doctor created successfully');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setSpecialization('');
        setPassword('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error creating doctor:', error);
      setApiError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="doctor-create-box">
      <h3>Create Doctor</h3>
      <form className="createForm" onSubmit={handleSubmit}>
        {apiError && (
          <div className="api-error">
            <p style={{ color: 'red' }}>{apiError}</p>
          </div>
        )}
        <div className="row">
          <div className="col">
          <input
            type="text"
             name="firstName"
            placeholder="Firstname"
            value={firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>
          <div className="col">
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            value={lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="col">
          <input
            type="password"
                name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
          <input
            type="text"
                  name="specialization"
            placeholder="Specialization"
            value={specialization}
            onChange={handleInputChange}
          />
          {errors.specialization && <p className="error-message">{errors.specialization}</p>}
          </div>
          <div className="col">
          <input
            type="number"
                 name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
          <input
            type="file"
            placeholder="Upload your image"
            onChange={handleImageUpload}
          />
           {errors.image && <p className="error-message">{errors.image}</p>}
           </div>
        </div>
        <button className="submit-btn1 " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Createdoctor;
