import React, { useState } from 'react';
import './Form.css';
import Image from './img/signupimg.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import { BASE_URL } from '../../../variable';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [apiError, setApiError] = useState(''); 
  const [errors, setErrors] = useState({});
   const [showModal,setShowModal]=useState(false);
    const [success, setSuccess] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  const validate = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        newErrors.firstName = !value ? 'First name is required' : '';
        break;
      case 'lastName':
        newErrors.lastName = !value ? 'Last name is required' : '';
        break;
      case 'email':
        newErrors.email = !value
          ? 'Email is required'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Invalid email format'
          : '';
        break;
      case 'password':
        newErrors.password =
          !value ? 'Password is required' : value.length < 6
          ? 'Password must be at least 6 characters long'
          : '';
        break;
      case 'phone':
        newErrors.phone =
          !value ? 'Phone number is required' : value.length !== 10
          ? 'Phone number must be 10 digits'
          : '';
        break;
      case 'dob':
        newErrors.dob = !value ? 'Date of birth is required' : '';
        break;
      case 'gender':
        newErrors.gender = !value ? 'Please select a gender' : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };
  const handleModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err)) return;

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
      const response = await fetch(`${BASE_URL}/patient/createPatient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        handleModal(`logged in successfully!`, 'success');

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        handleModal(
          data.message || 'Failed to log in. Please check your credentials and try again.',
          'error'
        );
        // setApiError(data.message || 'An error occurred while registering the patient.');
      }
    } catch (error) {
      console.log(error,"fvfggggggkjjkjkl")
      handleModal('Something went wrong. Please try again later.', error);
      // setApiError('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <div className="continer">
        <h1>Register Patient</h1>
        <div className="form-common">
          <div className="left-form">
            <img src={Image} alt="Signup" />
          </div>
          <div className="right-form">
            <form onSubmit={handleSubmit}>
              {apiError && (
                <div className="api-error">
                  <p style={{ color: 'red' }}>{apiError}</p>
                </div>
              )}
              <div className="row">
                <div className="col">
                  <input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validate('firstName', e.target.value); 
                    }}
                    type="text"
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>
                <div className="col">
                  <input
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validate('lastName', e.target.value); 
                    }}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validate('email', e.target.value); 
                    }}
                    type="text"
                    placeholder="Email"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="col">
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validate('password', e.target.value); 
                    }}
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      validate('phone', e.target.value); 
                    }}
                    type="text"
                    placeholder="Phone"
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
                <div className="col">
                  <input
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                      validate('dob', e.target.value); 
                    }}
                    type="date"
                    placeholder="Date of Birth"
                  />
                  {errors.dob && <p className="error-message">{errors.dob}</p>}
                </div>
              </div>
              <div className="row mt-[2rem]">
                <div className="col">
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      validate('gender', e.target.value); 
                    }}
                  >
                    <option value="">Select Gender :</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="error-message">{errors.gender}</p>}
                </div>
              </div>
              <div className="row">
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <div className="flex mt-4">
              <p className="me-2">Already have an account?</p>
              <NavLink className="text-teal-400" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        </div>
        <Modal
        message={modalMessage}
        type={modalType}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
      </div>
    </>
  );
};

export default Form;


