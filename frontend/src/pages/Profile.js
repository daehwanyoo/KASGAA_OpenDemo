import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '2000-01-01',
    phone: '000-000-0000',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/profile?email=${user.email}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/signin'); // Redirect to sign-in page
  };
  


  return (
    <div>
      <Header pageType="profile" />
      <div className="ProfilePage">
        <h2>PROFILE</h2>
        <div className="profile-section">
          <div className="profile-image-container">
            <img
              src={`${process.env.PUBLIC_URL}/exampleprofile.png`}
              alt="Profile"
              className="profile-image"
            />
            <button className="edit-photo">EDIT PHOTO</button>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <label>name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>birth date</label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />

            <label>email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>account password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="button-container">
              <button type="submit" className="save-changes-btn">
                SAVE CHANGES
              </button>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          </form>
        </div>
        <div className="profile-logo-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/profilelogo.png`}
            alt="Logo"
            className="profile-logo"
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;
