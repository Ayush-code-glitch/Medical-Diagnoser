import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand-block">
          <div className="brand-mark">SwasthyaAI</div>
          <p>AI-assisted triage and care coordination for faster, safer primary healthcare decisions.</p>
        </div>

        <div className="footer-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/diagnosis">Diagnosis</Link>
          <Link to="/emergency">Emergency</Link>
          <Link to="/doctor-desk">Doctor Desk</Link>
        </div>

        <div className="footer-links">
          <Link to="/profile">Profile</Link>
          <Link to="/history">History</Link>
          <Link to="/doctor-desk">Doctor Desk</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SwasthyaAI</span>
        <span>Showcase demo · assessments are saved in this browser</span>
      </div>
    </footer>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
