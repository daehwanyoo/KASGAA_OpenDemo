import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { email, password } = formData;

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Login successful! Redirecting...');
      localStorage.setItem('user', JSON.stringify({ email: email, firstName: data.firstName }));
      setTimeout(() => {
        navigate('/'); // Redirect to landing page
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
            <h1>SIGN IN</h1>
            <form onSubmit={handleSubmit}>
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

              <div className="remember-me">
              <label htmlFor="remember">Remember this device</label>

                <input type="checkbox" id="remember" />
              </div>

              <button type="submit" className="signin-btn">sign In</button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <p className="signup-link">
            don't have an account? <a href="/signup">sign up</a>
          </p>
          </div>

          <div className="welcome-section">
            <h1>WELCOME BACK</h1>
            <img src={`${process.env.PUBLIC_URL}/logo-white.png`} alt="Logo" />
            <p className="latest-news">check our latest news!</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
