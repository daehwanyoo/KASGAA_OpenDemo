import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ pageType }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from local storage
  const firstName = user?.firstName;

  // Dynamically assign header class and logo based on page type
  const headerClass = pageType ? `${pageType}-header` : 'default-page-header'; // Default to home-style header
  const isDefaultPage = pageType === 'home' || pageType === 'default';

  return (
    <header className={isDefaultPage ? 'default-page-header' : headerClass}>
      <div className="logo">
        <Link to="/">
          <img
            src={isDefaultPage ? 'logo.png' : 'logo-white.png'}
            alt="Logo"
          />
        </Link>
      </div>
      <nav>
        <ul>
          <li><a href="/#home">HOME</a></li>
          <li><a href="/#about">ABOUT</a></li>
          <li><a href="/events">EVENT</a></li>
          <li><a href="/community">COMMUNITY</a></li>
          {user ? (
            <li>
              <Link to="/profile" className="btn">HELLO, {firstName}!</Link>
            </li>
          ) : (
            <li><a href="/signin" className="btn">SIGN IN</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
