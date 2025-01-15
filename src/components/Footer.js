// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <h3>Join Our Newsletter</h3>
        <p>Subscribe to our newsletter and </p><p> receive weekly emails with event updates.</p>
        <input type="email" placeholder="Email" />
      </div>
      <div className="social-links">
      <a href="https://www.instagram.com">
          <img src="/instagram.png" alt="Instagram" className="social-icon" />
        </a>
        <a href="https://www.facebook.com">
          <img src="/facebook.png" alt="Facebook" className="social-icon" />
        </a>
      </div>
      <p className="credit">©2024 Website Credit: Daehwan Yoo | Jin Yoo</p>
    </footer>
  );
};

export default Footer;
