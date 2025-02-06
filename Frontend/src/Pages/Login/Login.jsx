import React, { useState } from 'react';
import './login.css';
import Image from './img/signupimg.jpg';
import { setToken, setuserInfo } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({}); 
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  // Validation function to update the error state for each field
  const validate = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
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
      case 'role':
        newErrors.role = !value ? 'Role is required' : '';
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
 
    if (Object.values(errors).some((err) => err)) return;  // Don't submit if there are errors
    if (!role) {
      handleModal('Role is required', 'error');
      return; 
    }
    const formData = {
      email,
      password,
      role,
    };

    const apiUrl = 'http://localhost:5000/api/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data, "infoooooooooooo");

      if (response.ok) {
        if (data.role !== role) {
          handleModal(
            `Incorrect role selected. Expected role: ${
              data.role.charAt(0).toUpperCase() + data.role.slice(1)
            }`,
            'error'
          );
          return;
        }

        setToken(data.token);
        setuserInfo(data.user);
        handleModal(`${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully!`, 'success');
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        handleModal(
          data.message || 'Failed to log in. Please check your credentials and try again.',
          'error'
        );
      }
    } catch (error) {
      handleModal('Something went wrong. Please try again later.', 'error');
      console.error('Error:', error);
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
              <div className="col">
              <input
                value={email}
                onChange={(e) => { setEmail(e.target.value); validate('email', e.target.value); }}
                type="text"
                placeholder="Email"
              />
              
              {errors.email && <p className="error-message">{errors.email}</p>} 
              </div>{/* Display email error */}
            </div>
            <div className="row">
              <div className="col">
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value); validate('password', e.target.value); }}
                type="password"
                placeholder="Password"
                disabled={role === 'head'}
              />
              {errors.password && <p className="error-message">{errors.password}</p>} {/* Display password error */}
              </div>
            </div>
            <div className="row mt-[2rem]">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={role}
                onChange={(e) => { setRole(e.target.value); validate('role', e.target.value); }}
              >
                <option value="">Select Role</option>
                <option value="head">Head</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              {errors.role && <p className="error-message">{errors.role}</p>} {/* Display role error */}
            </div>
            <div className="row">
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        message={modalMessage}
        type={modalType}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Login;
