import React from 'react';
import { emergencyContacts, hospitals, careActions } from '../data/healthData';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    eyebrow: 'Care coordination',
    title: 'Emergency and care network',
    subtitle: 'Fast access to urgent support, hospital guidance, and follow-up steps across Gujarat.',
    response: 'Emergency response',
    mapping: 'Nearest support',
    followup: 'Follow-up',
    contacts: 'Emergency contacts',
    centres: 'Gujarat care centres',
    actions: 'Recommended escalation actions',
    location: 'Location',
    distance: 'Distance',
    services: 'Services',
    immediate: 'Immediate action',
    hospital: 'Hospital mapping',
    tele: 'Teleconsult + home care',
  },
  hi: {
    eyebrow: 'केयर समन्वय',
    title: 'आपातकालीन और स्वास्थ्य नेटवर्क',
    subtitle: 'गुजरात में त्वरित सहायता, अस्पताल मार्गदर्शन और फॉलो-अप चरणों तक तेज़ पहुंच।',
    response: 'आपातकाल प्रतिक्रिया',
    mapping: 'निकटतम सहायता',
    followup: 'फॉलो-अप',
    contacts: 'आपातकालीन संपर्क',
    centres: 'गुजरात के देखभाल केंद्र',
    actions: 'अनुशंसित उन्नयन कदम',
    location: 'स्थान',
    distance: 'दूरी',
    services: 'सेवाएँ',
    immediate: 'तुरंत कार्रवाई',
    hospital: 'अस्पताल मैपिंग',
    tele: 'टेलीकंसल्ट + होम केयर',
  },
  gu: {
    eyebrow: 'કેર કોઓર્ડિનેશન',
    title: 'તાત્કાલિક અને કેર નેટવર્ક',
    subtitle: 'ગુજરાતમાં તાત્કાલિક સહાય, હોસ્પિટલ માર્ગદર્શન અને ફોલોઅપ પગલાંઓ સુધી ઝડપી પહોંચ.',
    response: 'તાત્કાલિક પ્રતિસાદ',
    mapping: 'નજીકની સહાય',
    followup: 'ફોલોઅપ',
    contacts: 'તાત્કાલિક સંપર્ક',
    centres: 'ગુજરાતના કેર સેન્ટરો',
    actions: 'સુચિત એક્શન પગલાં',
    location: 'સ્થાન',
    distance: 'અંતર',
    services: 'સેવાઓ',
    immediate: 'તરત એક્શન',
    hospital: 'હોસ્પિટલ મેપિંગ',
    tele: 'ટેલિકન્સલ્ટ + હોમ કેર',
  },
};

const Emergency = () => {
  const { language } = useLanguage();
  const text = content[language] || content.en;

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="section-header">
          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
          </div>
          <p className="muted-text">{text.subtitle}</p>
        </div>

        <div className="info-grid">
          <div className="mini-card">
            <span>{text.response}</span>
            <strong>{text.immediate}</strong>
          </div>
          <div className="mini-card">
            <span>{text.mapping}</span>
            <strong>{text.hospital}</strong>
          </div>
          <div className="mini-card">
            <span>{text.followup}</span>
            <strong>{text.tele}</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>{text.contacts}</h2>
        <div className="resource-grid">
          {emergencyContacts.map((contact) => (
            <div key={contact.number} className="feature-card">
              <div className="condition-topline">
                <h3>{contact.name}</h3>
                <span className="badge urgent">{contact.number}</span>
              </div>
              <p>{contact.zone}</p>
              <p>{contact.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>{text.centres}</h2>
        <div className="resource-grid">
          {hospitals.map((hospital) => (
            <div key={hospital.name} className="feature-card">
              <div className="condition-topline">
                <h3>{hospital.name}</h3>
                <span className="badge moderate">{hospital.type}</span>
              </div>
              <p><strong>{text.location}:</strong> {hospital.location}</p>
              <p><strong>{text.distance}:</strong> {hospital.distance}</p>
              <p><strong>{text.services}:</strong> {hospital.services.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>{text.actions}</h2>
        <ul>
          {careActions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Emergency;
