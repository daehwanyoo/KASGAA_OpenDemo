import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './SignIn.css'; // Reusing the same CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    reenterPassword: '',
    subscription: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { firstName, lastName, email, password, reenterPassword, subscription } = formData;

    if (password !== reenterPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, subscription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('User created successfully!');
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="SignInPage">
      <Header />

        <section className="signin-container">
          <div className="signin-form">
            <h1>SIGN UP</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="reenterPassword"
                placeholder="Re-enter your password"
                value={formData.reenterPassword}
                onChange={handleChange}
              />
              <div className="subscribe">
                <label htmlFor="subscribe">Subscribe to updates and emails</label>
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscription"
                  checked={formData.subscription}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="signin-btn">sign up</button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <p className="signup-link">
              already have an account? <a href="/signin">sign in</a>
            </p>
          </div>

          <div className="welcome-section">
            <h1>WELCOME TO</h1>
            <img src={`${process.env.PUBLIC_URL}/logo-white.png`} alt="Logo" />
            <p className="welcome-message">Sign up to keep connected with us</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
