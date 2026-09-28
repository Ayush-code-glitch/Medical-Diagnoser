import React, { useMemo, useState } from 'react';
import { doctorQueue, gujaratDoctors, gujaratDistricts } from '../data/healthData';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    eyebrow: 'Clinician workflow',
    title: 'Doctor triage desk',
    subtitle: 'This dashboard shows which patients need faster review based on urgency, risk level, and referral needs across Gujarat hospitals.',
    pending: 'Cases waiting for review',
    urgent: 'High-risk patients',
    window: 'Target review time',
    queue: 'Priority queue',
    patient: 'Patient',
    risk: 'Risk',
    concern: 'Concern',
    priority: 'Priority',
    location: 'Location',
    specialists: 'Gujarat specialists available today',
    specialty: 'Specialty',
    city: 'City',
    availability: 'Availability',
    filterByDistrict: 'Filter by district',
    allDistricts: 'All Gujarat',
    allSpecialties: 'All specialties',
  },
  hi: {
    eyebrow: 'क्लिनिशन वर्कफ़्लो',
    title: 'डॉक्टर ट्राएज डेस्क',
    subtitle: 'यह डैशबोर्ड दिखाता है कि किन मरीजों की समीक्षा सबसे पहले करनी है—उनकी गंभीरता, जोखिम और रेफरल जरूरतों के आधार पर।',
    pending: 'समीक्षा के लिए लंबित केस',
    urgent: 'उच्च जोखिम वाले मरीज',
    window: 'लक्ष्य समीक्षा समय',
    queue: 'प्राथमिकता कतार',
    patient: 'मरीज',
    risk: 'जोखिम',
    concern: 'समस्या',
    priority: 'प्राथमिकता',
    location: 'स्थान',
    specialists: 'आज उपलब्ध गुजरात विशेषज्ञ',
    specialty: 'विशेषज्ञता',
    city: 'शहर',
    availability: 'उपलब्धता',
    filterByDistrict: 'जिले के आधार पर फिल्टर करें',
    allDistricts: 'सभी गुजरात',
    allSpecialties: 'सभी विशेषज्ञताएँ',
  },
  gu: {
    eyebrow: 'ક્લિનિશન વર્કફ્લો',
    title: 'ડૉક્ટર ટ્રાઇજ ડેસ્ક',
    subtitle: 'આ ડૅશબોર્ડ બતાવતું છે કે કયા દર્દીઓની સમીક્ષા સૌથી પહેલા કરવી જ જોઈએ—તેમની તાત્કાલિકતા, જોખમ અને રેફરલ જરૂરિયાતો પર आधारित.',
    pending: 'સમીક્ષાની રાહમાં રહેલા કેસ',
    urgent: 'ઉચ્ચ જોખમી દર્દીઓ',
    window: 'લક્ષ્ય સમીક્ષા સમય',
    queue: 'પ્રાધાન્ય કતાર',
    patient: 'દર્દી',
    risk: 'જોખમ',
    concern: 'સમસ્યા',
    priority: 'પ્રાધાન્ય',
    location: 'સ્થાન',
    specialists: 'આજે ઉપલબ્ધ ગુજરાતના સ્પેશિયાલિસ્ટ',
    specialty: 'સ્પેશિયાલિટી',
    city: 'શહેર',
    availability: 'ઉપલબ્ધતા',
    filterByDistrict: 'જિલ્લા પ્રમાણે ફિલ્ટર કરો',
    allDistricts: 'બધું ગુજરાત',
    allSpecialties: 'બધી સ્પેશિયાલિટી',
  },
};

const DoctorDesk = () => {
  const { language } = useLanguage();
  const text = content[language] || content.en;
  const [selectedDistrict, setSelectedDistrict] = useState('All Gujarat');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All specialties');

  const specialties = useMemo(
    () => ['All specialties', ...new Set(gujaratDoctors.map((doctor) => doctor.specialty))],
    []
  );

  const filteredDoctors = gujaratDoctors.filter((doctor) => {
    const districtMatch = selectedDistrict === 'All Gujarat' || doctor.district === selectedDistrict;
    const specialtyMatch = selectedSpecialty === 'All specialties' || doctor.specialty === selectedSpecialty;
    return districtMatch && specialtyMatch;
  });

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
            <span>{text.pending}</span>
            <strong>{doctorQueue.length}</strong>
          </div>
          <div className="mini-card">
            <span>{text.urgent}</span>
            <strong>{doctorQueue.filter((item) => item.risk === 'urgent').length}</strong>
          </div>
          <div className="mini-card">
            <span>{text.window}</span>
            <strong>30 min</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2>{text.queue}</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{text.patient}</th>
                <th>{text.risk}</th>
                <th>{text.concern}</th>
                <th>{text.priority}</th>
                <th>{text.location}</th>
              </tr>
            </thead>
            <tbody>
              {doctorQueue.map((entry) => (
                <tr key={entry.patient}>
                  <td>{entry.patient}</td>
                  <td><span className={`badge ${entry.risk}`}>{entry.risk}</span></td>
                  <td>{entry.concern}</td>
                  <td>{entry.priority}</td>
                  <td>{entry.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>{text.specialists}</h2>
        <div className="filter-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <label style={{ minWidth: '220px' }}>
            <span>{text.filterByDistrict}</span>
            <select value={selectedDistrict} onChange={(event) => setSelectedDistrict(event.target.value)}>
              {gujaratDistricts.map((district) => (
                <option key={district} value={district}>{district === 'All Gujarat' ? text.allDistricts : district}</option>
              ))}
            </select>
          </label>
          <label style={{ minWidth: '220px' }}>
            <span>{text.specialty}</span>
            <select value={selectedSpecialty} onChange={(event) => setSelectedSpecialty(event.target.value)}>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty === 'All specialties' ? text.allSpecialties : specialty}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="resource-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.name} className="feature-card">
              <div className="condition-topline">
                <h3>{doctor.name}</h3>
                <span className="badge moderate">{doctor.city}</span>
              </div>
              <p><strong>{text.specialty}:</strong> {doctor.specialty}</p>
              <p><strong>{text.availability}:</strong> {doctor.availability}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDesk;
