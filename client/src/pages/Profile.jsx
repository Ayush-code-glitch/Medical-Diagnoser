import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const HISTORY_KEY = 'swasthya-history';
const PROFILE_KEY = 'swasthya-profile';

const getLatestAssessment = () => {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return history[0] || null;
  } catch {
    return null;
  }
};

const getPatientProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null') || {};
  } catch {
    return {};
  }
};

const content = {
  en: {
    eyebrow: 'Account overview',
    title: 'Personal health profile',
    subtitle: 'This profile keeps the context used for symptom triage, risk filtering, and follow-up recommendations.',
    patientSnapshot: 'Patient snapshot',
    age: 'Age',
    gender: 'Gender',
    currentConditions: 'Current conditions',
    medications: 'Medications',
    allergies: 'Allergies',
    pregnancyStatus: 'Pregnancy status',
    recentHospitalization: 'Recent hospitalization',
    latestAssessment: 'Latest assessment',
    noAssessment: 'No assessment available yet.',
    matchedConditions: 'matched conditions',
    notProvided: 'Not provided',
    notSpecified: 'Not specified',
    noConditionsAdded: 'No conditions added',
    noMedicationsAdded: 'No medications added',
    noAllergies: 'No allergies recorded',
    noRecentHospitalization: 'No recent hospitalization',
  },
  hi: {
    eyebrow: 'अकाउंट अवलोकन',
    title: 'व्यक्तिगत स्वास्थ्य प्रोफ़ाइल',
    subtitle: 'यह प्रोफ़ाइल लक्षण ट्राएज, जोखिम फ़िल्टरिंग और फॉलो-अप सिफारिशों के लिए उपयोग किए गए संदर्भ को रखती है।',
    patientSnapshot: 'मरीज स्नैपशॉट',
    age: 'आयु',
    gender: 'लिंग',
    currentConditions: 'मौजूदा स्थितियाँ',
    medications: 'दवाएँ',
    allergies: 'एलर्जी',
    pregnancyStatus: 'गर्भावस्था स्थिति',
    recentHospitalization: 'हाल की अस्पताल में भर्ती',
    latestAssessment: 'नवीनतम मूल्यांकन',
    noAssessment: 'अभी कोई मूल्यांकन उपलब्ध नहीं है।',
    matchedConditions: 'मिलान हुई स्थितियाँ',
    notProvided: 'दिया नहीं गया',
    notSpecified: 'निर्दिष्ट नहीं',
    noConditionsAdded: 'कोई स्थिति नहीं जोड़ी गई',
    noMedicationsAdded: 'कोई दवा नहीं जोड़ी गई',
    noAllergies: 'कोई एलर्जी दर्ज नहीं',
    noRecentHospitalization: 'हाल में कोई अस्पताल भर्ती नहीं',
  },
  gu: {
    eyebrow: 'એકાઉન્ટ ઓવરવ્યૂ',
    title: 'વ્યક્તિગત સ્વાસ્થ્ય પ્રોફાઇલ',
    subtitle: 'આ પ્રોફાઇલ લક્ષણ ટ્રાઇજ, જોખમ મૂલ્યાંકન અને ફોલોઅપ સલાહ માટે ઉપયોગમાં લેવાતા સંદર્ભને સચવાય રાખે છે.',
    patientSnapshot: 'દર્દીનો સંક્ષિપ્ત અવલોકન',
    age: 'ઉંમર',
    gender: 'લિંગ',
    currentConditions: 'હાલની સ્થિતિઓ',
    medications: 'દવાઓ',
    allergies: 'એલર્જી',
    pregnancyStatus: 'ગર્ભાવસ્થા સ્થિતિ',
    recentHospitalization: 'હાલમાં હોસ્પિટલમાં દાખલ થવાની સ્થિતિ',
    latestAssessment: 'નવીનતમ મૂલ્યાંકન',
    noAssessment: 'હજી સુધી કોઈ મૂલ્યાંકન ઉપલબ્ધ નથી.',
    matchedConditions: 'મિલેલી સ્થિતિઓ',
    notProvided: 'આપેલ નથી',
    notSpecified: 'નિશ્ચિત નથી',
    noConditionsAdded: 'કોઈ સ્થિતિ ઉમેરવામાં આવી નથી',
    noMedicationsAdded: 'કોઈ દવા ઉમેરવામાં આવી નથી',
    noAllergies: 'કોઈ એલર્જી નોંધાયેલ નથી',
    noRecentHospitalization: 'હાલમાં હોસ્પિટલમાં દાખલ નથી',
  },
};

const Profile = () => {
  const { language } = useLanguage();
  const text = content[language] || content.en;
  const latestAssessment = getLatestAssessment();
  const profile = getPatientProfile();

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

        <div className="profile-grid">
          <div className="info-panel profile-card">
            <h3>{text.patientSnapshot}</h3>
            <ul>
              <li><strong>{text.age}:</strong> {profile.age || latestAssessment?.patientContext?.age || text.notProvided}</li>
              <li><strong>{text.gender}:</strong> {profile.gender || latestAssessment?.patientContext?.gender || text.notProvided}</li>
              <li><strong>{text.currentConditions}:</strong> {profile.existingConditions || latestAssessment?.patientContext?.existingConditions || text.noConditionsAdded}</li>
              <li><strong>{text.medications}:</strong> {profile.medications || latestAssessment?.patientContext?.medications || text.noMedicationsAdded}</li>
              <li><strong>{text.allergies}:</strong> {profile.allergies || text.noAllergies}</li>
              <li><strong>{text.pregnancyStatus}:</strong> {profile.pregnancyStatus || text.notSpecified}</li>
              <li><strong>{text.recentHospitalization}:</strong> {profile.recentHospitalization || text.noRecentHospitalization}</li>
            </ul>
          </div>

          <div className="info-panel profile-card">
            <h3>{text.latestAssessment}</h3>
            <p>{latestAssessment?.summary || text.noAssessment}</p>
            <div className="mini-stat-row">
              <span className={`badge ${latestAssessment?.urgency || 'low'}`}>
                {latestAssessment?.urgency || 'low'}
              </span>
              <span>{latestAssessment?.conditions?.length || 0} {text.matchedConditions}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
