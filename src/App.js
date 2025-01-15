import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UpcomingEvent from './pages/UpcomingEvent';
import Community from './pages/Community';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  const location = useLocation(); // Get current location

  const hideFooterRoutes = ['/signin', '/signup']; // Routes without footer
  const showFooter = !hideFooterRoutes.includes(location.pathname); // Determine if footer should show

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/events" element={<UpcomingEvent />} />
        <Route path="/community" element={<Community />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {showFooter && <Footer />} {/* Conditionally render footer */}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
