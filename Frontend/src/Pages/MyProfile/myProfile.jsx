import React, { useEffect, useState } from 'react';
import './myProfile.css';
import abimg from './aboutimg/aboutimg.png';
import { getToken } from '../../utils/auth'; 
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const BASE_URL = 'http://localhost:5000/'; 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken(); 
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:5000/api/search', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

        const data = await response.json();
        setUserData(data.user); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = () => {
    navigate('/updateProfile', { state: { user: userData } }); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  const profileImage = userData.image ? userData.image : abimg;
  return (
    <div className="update-container-main">
      <div className="box-profile">
        {
          userData.image?<img 
          src={`${BASE_URL}${userData.image}`} 
          // alt={`${item.firstName}'s profile`} 
          // style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
        />: <img src={abimg} alt="Profile" />
        }
      {/* <img 
                      src={`${BASE_URL}${item.image}`} 
                      alt={`${item.firstName}'s profile`} 
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                    /> */}
        {/* <img src={abimg} alt="Profile" /> */}
        <p>
          <span className="s">Name:</span> {userData.firstName} {userData.lastName}
        </p>
        <p>
          <span className="s">Email:</span> {userData.email}
        </p>
        <p>
          <span className="s">Numbers:</span> {userData.phone || 'N/A'}
        </p>
        {/* <p>
          <span className="s">Specialization:</span> {userData.specialization || 'N/A'}
        </p> */}
        <button className="update-btn" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
