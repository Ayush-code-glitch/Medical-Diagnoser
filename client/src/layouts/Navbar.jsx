import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage((previous) => {
      if (previous === 'en') return 'hi';
      if (previous === 'hi') return 'gu';
      return 'en';
    });
  };

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'));
  };

  const labels = {
    en: {
      home: 'Home',
      dashboard: 'Dashboard',
      diagnosis: 'Diagnosis',
      history: 'History',
      profile: 'Profile',
      emergency: 'Emergency',
      doctor: 'Doctor Desk',
    },
    hi: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      diagnosis: 'निदान',
      history: 'इतिहास',
      profile: 'प्रोफ़ाइल',
      emergency: 'आपातकाल',
      doctor: 'डॉक्टर डेस्क',
    },
    gu: {
      home: 'હોમ',
      dashboard: 'ડૅશબોર્ડ',
      diagnosis: 'નિદાન',
      history: 'ઈતિહાસ',
      profile: 'પ્રોફાઇલ',
      emergency: 'તાત્કાલિક',
      doctor: 'ડૉક્ટર ડેસ્ક',
    },
  };

  return (
    <nav className="topbar">
      <div className="nav-shell">
        <Link to="/" className="brand-mark">
          SwasthyaAI
        </Link>

        <ul className="nav-links">
          <li><Link to="/">{labels[language].home}</Link></li>
          <li><Link to="/dashboard">{labels[language].dashboard}</Link></li>
          <li><Link to="/diagnosis">{labels[language].diagnosis}</Link></li>
          <li><Link to="/history">{labels[language].history}</Link></li>
          <li><Link to="/profile">{labels[language].profile}</Link></li>
          <li><Link to="/emergency">{labels[language].emergency}</Link></li>
          <li><Link to="/doctor-desk">{labels[language].doctor}</Link></li>
        </ul>

        <div className="nav-actions">
          <button type="button" className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button type="button" className="lang-switch" onClick={toggleLanguage}>
            {language === 'en' ? 'हिंदी' : language === 'hi' ? 'ગુજરાતી' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
