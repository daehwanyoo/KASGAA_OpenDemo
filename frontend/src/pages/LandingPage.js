import React, { useRef } from 'react';
import Header from '../components/Header';
import './LandingPage.css';

const LandingPage = () => {
  const aboutRef = useRef(null); // Reference to the About section

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to About
  };

  return (
    <div className="LandingPage">
      <Header scrollToAbout={scrollToAbout} />

      <section className="landing">
        <img src={`${process.env.PUBLIC_URL}/landing.png`} alt="Landing Page" />
        <div className="event-box">
          <a href="/events">
            <span>CHECK OUR</span> <br />
            UPCOMING EVENT →
          </a>
        </div>
      </section>

      <section ref={aboutRef} id="about" className="about">
        <div className="about-title">
          <h2>ABOUT</h2>
        </div>
        <div className="about-content">
          <img src={`${process.env.PUBLIC_URL}/about.png`} alt="About" />
          <div className="about-text">
            <h3>Korean American Society Greater Ann Arbor</h3>
            <p>
              Welcome to KASGAA! We are dedicated to connecting communities and organizing events
              that bring people together. Learn more about our mission, vision, and values here.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;