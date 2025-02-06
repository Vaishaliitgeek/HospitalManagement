import './UpdateProfile.css';
import React, { useState, useEffect } from 'react';
import Image from './img/signupimg.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const userData = location.state?.user || {}; 
console.log(userData,"userdata")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');  
  const [image, setImage] = useState(null);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
      setGender(userData.gender || '');
      setRole(userData.role || 'doctor'); 
      setImage(userData.image||'')
    }
  }, [userData]);
// console.log(role,"role")
  const validate = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!gender) newErrors.gender = 'Please select a gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("running");
    e.preventDefault();
  
    // if (!validate()) return;
    // console.log("running1");

  
    const formData = new FormData();
  
    formData.append('firstName', firstName.trim());
    formData.append('lastName', lastName.trim());
    formData.append('email', email.trim());
    formData.append('phone', phone.trim());
    formData.append('gender', gender.trim());
  
    if (password) formData.append('password', password.trim());
    if (role === 'doctor' && image) formData.append('image', image); 
  
    // Log form data for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      let response;

      if (role == 'doctor') {
        console.log("doctorrrrr role")
        const doctorId = userData.id; 
        console.log(doctorId,"doctorid")
        response = await axios.put(`http://localhost:5000/doctor/doctorUpdate/${doctorId}`, formData, {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem('token')}`,
          // },
        });
      } else {
        console.log("patient role")
        response = await axios.put('http://localhost:5000/api/updateProfile', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
  
      const data = response.data;
      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/home');
      } else {
        setApiError(data.message || 'An error occurred while updating your profile.');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong. Please try again later.');
    }
  };
  
  return (
    <div className="continer">
      <h1>Update Profile</h1>
      <div className="form-common">
        <div className="left-form">
          <img src={Image} alt="Signup" />
        </div>
        <div className="right-form">
          <form onSubmit={handleSubmit}>
            {apiError && <p className="api-error">{apiError}</p>}
            <div className="row">
              <div className="col">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
              </div>
              <div className="col">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
            </div>

            {role === 'doctor' && (
              <div className="row">
                <div className="col">
                  {/* <p>{image}</p> */}
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
              </div>
            )}
                {/* <p>{image}</p> */}
            
            <div className="row">
              <button className="submit-btn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;



