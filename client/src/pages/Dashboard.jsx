import React from 'react';
import { Link } from 'react-router-dom';
import { careActions } from '../data/healthData';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    eyebrow: 'Overview',
    title: 'Dashboard',
    subtitle: 'Patient overview with triage awareness and care guidance.',
    latestUrgency: 'Latest urgency',
    recentAssessments: 'Recent assessments',
    matchedConditions: 'Matched conditions',
    lastReview: 'Last review',
    noAssessment: 'No assessment yet',
    patientSummary: 'Patient summary',
    personalContext: 'Personal context',
    age: 'Age',
    gender: 'Gender',
    existingConditions: 'Existing conditions',
    currentMedications: 'Current medications',
    allergies: 'Allergies',
    pregnancyStatus: 'Pregnancy status',
    latestAssessment: 'Latest assessment',
    noAssessmentText: 'No assessment available yet. Start a symptom analysis to generate guidance.',
    urgencyOverview: 'Urgency overview',
    urgent: 'Urgent',
    moderate: 'Moderate',
    low: 'Low',
    careActionCentre: 'Care action centre',
    runAnalysis: 'Run new analysis',
    viewEmergency: 'View emergency network',
    notProvided: 'Not provided',
    notSpecified: 'Not specified',
  },
  hi: {
    eyebrow: 'अवलोकन',
    title: 'डैशबोर्ड',
    subtitle: 'ट्राएज जागरूकता और देखभाल मार्गदर्शन के साथ मरीज़ डैशबोर्ड।',
    latestUrgency: 'नवीनतम गंभीरता',
    recentAssessments: 'हाल के मूल्यांकन',
    matchedConditions: 'मिलान हुई स्थितियाँ',
    lastReview: 'अंतिम समीक्षा',
    noAssessment: 'अभी कोई मूल्यांकन नहीं',
    patientSummary: 'मरीज सारांश',
    personalContext: 'व्यक्तिगत संदर्भ',
    age: 'आयु',
    gender: 'लिंग',
    existingConditions: 'मौजूदा स्थितियाँ',
    currentMedications: 'वर्तमान दवाएँ',
    allergies: 'एलर्जी',
    pregnancyStatus: 'गर्भावस्था स्थिति',
    latestAssessment: 'नवीनतम मूल्यांकन',
    noAssessmentText: 'अभी कोई मूल्यांकन उपलब्ध नहीं है। मार्गदर्शन प्राप्त करने के लिए लक्षण विश्लेषण शुरू करें।',
    urgencyOverview: 'गंभीरता अवलोकन',
    urgent: 'तत्काल',
    moderate: 'मध्यम',
    low: 'कम',
    careActionCentre: 'केयर एक्शन सेंटर',
    runAnalysis: 'नया विश्लेषण शुरू करें',
    viewEmergency: 'आपातकालीन नेटवर्क देखें',
    notProvided: 'दिया नहीं गया',
    notSpecified: 'निर्दिष्ट नहीं',
  },
  gu: {
    eyebrow: 'ઓવરવ્યૂ',
    title: 'ડૅશબોર્ડ',
    subtitle: 'ટ્રાઇજ જાગૃતિ અને સંભાળ માર્ગદર્શન સાથે દર્દી ડૅશબોર્ડ.',
    latestUrgency: 'નવીનતમ તાત્કાલિકતા',
    recentAssessments: 'હાલના મૂલ્યાંકનો',
    matchedConditions: 'મિલેલી/સંબંધિત સ્થિતિઓ',
    lastReview: 'છેલ્લી સમીક્ષા',
    noAssessment: 'હજુ સુધી મૂલ્યાંકન નથી',
    patientSummary: 'દર્દીનો સારાંશ',
    personalContext: 'વ્યક્તિગત સંદર્ભ',
    age: 'ઉંમર',
    gender: 'લિંગ',
    existingConditions: 'હાલની સ્થિતિઓ',
    currentMedications: 'હાલની દવાઓ',
    allergies: 'એલર્જી',
    pregnancyStatus: 'ગર્ભાવસ્થા',
    latestAssessment: 'નવીનતમ મૂલ્યાંકન',
    noAssessmentText: 'હજુ સુધી કોઈ મૂલ્યાંકન ઉપલબ્ધ નથી. માર્ગદર્શન માટે લક્ષણનું વિશ્લેષણ શરૂ કરો.',
    urgencyOverview: 'તાત્કાલિકતા અવલોકન',
    urgent: 'તાત્કાલિક',
    moderate: 'મધ્યમ',
    low: 'ઓછી',
    careActionCentre: 'કેર એક્શન સેન્ટર',
    runAnalysis: 'નવું વિશ্লેષણ શરૂ કરો',
    viewEmergency: 'ઇમરજન્સી નેટવર્ક જુઓ',
    notProvided: 'આપેલ નથી',
    notSpecified: 'નિશ્ચિત નથી',
  },
};

const Dashboard = () => {
  const { language } = useLanguage();
  const text = content[language] || content.en;

  const latestAssessment = (() => {
    try {
      const history = JSON.parse(localStorage.getItem('swasthya-history') || '[]');
      return history[0] || null;
    } catch {
      return null;
    }
  })();

  const patientContext = latestAssessment?.patientContext || {
    age: text.notProvided,
    gender: text.notProvided,
    existingConditions: 'No issues noted',
    medications: 'No medication details',
    allergies: text.notSpecified,
    pregnancyStatus: text.notSpecified,
  };

  const history = (() => {
    try {
      return JSON.parse(localStorage.getItem('swasthya-history') || '[]');
    } catch {
      return [];
    }
  })();

  const summaryStats = [
    { label: text.latestUrgency, value: latestAssessment?.urgency || text.noAssessment },
    { label: text.recentAssessments, value: history.length || 0 },
    { label: text.matchedConditions, value: latestAssessment?.conditions?.length ? latestAssessment.conditions.length : 0 },
    { label: text.lastReview, value: latestAssessment ? new Date(latestAssessment.date).toLocaleDateString() : 'No entry yet' },
  ];

  const urgencyBreakdown = {
    urgent: history.filter((entry) => entry.urgency === 'urgent').length,
    moderate: history.filter((entry) => entry.urgency === 'moderate').length,
    low: history.filter((entry) => entry.urgency === 'low').length,
  };

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="section-header">
          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
            <p className="welcome-line">Showcase demo</p>
          </div>
          <p className="muted-text">{text.subtitle}</p>
        </div>

        <div className="info-grid">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="mini-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>{text.patientSummary}</h2>
        <div className="profile-grid">
          <div className="info-panel profile-card">
            <h3>{text.personalContext}</h3>
            <ul>
              <li><strong>{text.age}:</strong> {patientContext.age}</li>
              <li><strong>{text.gender}:</strong> {patientContext.gender}</li>
              <li><strong>{text.existingConditions}:</strong> {patientContext.existingConditions}</li>
              <li><strong>{text.currentMedications}:</strong> {patientContext.medications}</li>
              <li><strong>{text.allergies}:</strong> {patientContext.allergies || text.notSpecified}</li>
              <li><strong>{text.pregnancyStatus}:</strong> {patientContext.pregnancyStatus || text.notSpecified}</li>
            </ul>
          </div>

          <div className="info-panel profile-card">
            <h3>{text.latestAssessment}</h3>
            <p>{latestAssessment?.summary || text.noAssessmentText}</p>
            {latestAssessment && (
              <div className="mini-stat-row">
                <span className={`badge ${latestAssessment.urgency || 'low'}`}>{latestAssessment.urgency}</span>
                <span>{latestAssessment.symptoms.join(', ') || 'No symptoms recorded'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>{text.urgencyOverview}</h2>
        <div className="info-grid">
          <div className="mini-card">
            <span>{text.urgent}</span>
            <strong>{urgencyBreakdown.urgent}</strong>
          </div>
          <div className="mini-card">
            <span>{text.moderate}</span>
            <strong>{urgencyBreakdown.moderate}</strong>
          </div>
          <div className="mini-card">
            <span>{text.low}</span>
            <strong>{urgencyBreakdown.low}</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>{text.careActionCentre}</h2>
        <div className="resource-grid">
          {careActions.map((action) => (
            <div key={action} className="feature-card">
              <p>{action}</p>
            </div>
          ))}
        </div>
        <div className="cta-row" style={{ marginTop: '1rem' }}>
          <Link to="/diagnosis" className="primary-button">{text.runAnalysis}</Link>
          <Link to="/emergency" className="secondary-button">{text.viewEmergency}</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;