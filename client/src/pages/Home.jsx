import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    eyebrow: 'AI Based Symptom Analysis and Health Guidance System',
    title: 'Welcome to SwasthyaAI',
    subtitle: 'A safer and smarter healthcare companion for symptom triage, urgent care escalation, and personalized health guidance in underserved communities.',
    dashboard: 'Open dashboard',
    analyze: 'Start analysis',
    low: 'Low urgency',
    moderate: 'Moderate',
    urgent: 'Urgent',
    bullet1: 'Symptom matching with explainable reasoning',
    bullet2: 'Red-flag detection and emergency escalation',
    bullet3: 'AI guidance customized to age, pregnancy, medications, and chronic context',
    feature1Title: 'AI symptom analysis',
    feature1Description: 'Turn symptoms into possible conditions with confidence scoring, triage logic, and explainability.',
    feature2Title: 'Severity assessment',
    feature2Description: 'Highlight low, moderate, and urgent cases with a safety-first voice for emergency symptoms.',
    feature3Title: 'Personalized guidance',
    feature3Description: 'Consider age, pregnancy, conditions, allergies, and medication history to tailor recommendations.',
    feature4Title: 'Doctor and care workflow',
    feature4Description: 'Connect triage to hospital referrals, clinician review, and home-care follow-up actions.',
    workflow: 'How SwasthyaAI works',
    input: '1. Input',
    inputText: 'Symptoms, age, gender, pregnancy, medication, allergy, and chronic-health context.',
    analysis: '2. Analysis',
    analysisText: 'AI matches symptom clusters with possible conditions and urgent escalation flags.',
    guidance: '3. Guidance',
    guidanceText: 'Self-care guidance, doctor triage, and referral to emergency or teleconsult support.',
  },
  hi: {
    eyebrow: 'एआई आधारित लक्षण विश्लेषण और स्वास्थ्य मार्गदर्शन प्रणाली',
    title: 'स्वस्थ्यएआई में आपका स्वागत है',
    subtitle: 'कमजोर समुदायों में लक्षणों की प्राथमिकता, आपातकालीन देखभाल और व्यक्तिगत स्वास्थ्य मार्गदर्शन के लिए सुरक्षित और स्मार्ट स्वास्थ्य सहयोगी।',
    dashboard: 'डैशबोर्ड खोलें',
    analyze: 'विश्लेषण शुरू करें',
    low: 'कम गंभीरता',
    moderate: 'मध्यम',
    urgent: 'तत्काल',
    bullet1: 'स्पष्टीकरण के साथ लक्षण मिलान',
    bullet2: 'रेड-फ्लैग पहचान और आपातकालीन escalation',
    bullet3: 'एआई मार्गदर्शन आयु, गर्भावस्था, दवाओं और पुरानी स्थिति के अनुसार',
    feature1Title: 'एआई लक्षण विश्लेषण',
    feature1Description: 'लक्षणों को संभावित स्थितियों में बदलें, confidence scoring और triage logic के साथ।',
    feature2Title: 'गंभीरता मूल्यांकन',
    feature2Description: 'कम, मध्यम और तत्काल मामलों को आपातकालीन लक्षणों के लिए सुरक्षित तरीके से उजागर करें।',
    feature3Title: 'व्यक्तिगत मार्गदर्शन',
    feature3Description: 'आयु, गर्भावस्था, स्थिति, दवाएँ, एलर्जी और पुरानी स्थिति को ध्यान में रखकर सुझाव बनाएं।',
    feature4Title: 'डॉक्टर और केयर वर्कफ़्लो',
    feature4Description: 'ट्राएज को अस्पताल रेफरल, चिकित्सक समीक्षा और घरेलू फॉलो-अप कार्यों से जोड़ें।',
    workflow: 'स्वस्थ्यएआई कैसे काम करता है',
    input: '1. इनपुट',
    inputText: 'लक्षण, आयु, लिंग, गर्भावस्था, दवा, एलर्जी और पुरानी स्वास्थ्य स्थिति।',
    analysis: '2. विश्लेषण',
    analysisText: 'एआई लक्षण समूहों को संभावित रोगों और आपातकालीन चेतावनी से जोड़ता है।',
    guidance: '3. मार्गदर्शन',
    guidanceText: 'स्व-देखभाल, डॉक्टर ट्राएज और आपातकाल/टेलीकंसल्ट सहायता की सिफारिश।',
  },
  gu: {
    eyebrow: 'એઆઈ આધારીત લક્ષણ વિશ્લેષણ અને સ્વાસ્થ્ય માર્ગદર્શન પ્રણાલી',
    title: 'સ્વસ્થ્યએઆઈમાં આપનું સ્વાગત છે',
    subtitle: 'નબળા વર્ગ અને ગ્રામીણ વિસ્તારોમાં લક્ષણોને ઓળખીને તાત્કાલિક સારવાર અને વ્યક્તિગત સ્વાસ્થ્ય માર્ગદર્શન આપતી સુરક્ષિત અને બુદ્ધિશાળી સંભાળ.',
    dashboard: 'ડૅશબોર્ડ જુઓ',
    analyze: 'વિશ્લેષણ શરૂ કરો',
    low: 'ઓછી તાત્કાલિકતા',
    moderate: 'મધ્યમ',
    urgent: 'તાત્કાલિક',
    bullet1: 'સમજૂતી સાથે લક્ષણોને ઓળખવું',
    bullet2: 'રેડ-ફ્લેગ અને ઇમરજન્સી જોખમની ચેતવણીઓ',
    bullet3: 'ઉંમર, ગર્ભાવસ્થા, દવાઓ અને ક્રોનિક પરિસ્થિતિને ધ્યાનમાં રાખીને એઆઈ માર્ગદર્શન',
    feature1Title: 'એઆઈ લક્ષણ વિશ્લેષણ',
    feature1Description: 'લક્ષણોનું વિશ્લેષણ કરીને શક્ય સ્થિતિઓ, સંભાવના અને તાત્કાલિકતા ઓળખી શકાય.',
    feature2Title: 'ગંભીરતાનું મૂલ્યાંકન',
    feature2Description: 'ઓછી, મધ્યમ અને તાત્કાલિક કેસોને સુરક્ષિત રીતે શોધી કાઢવું.',
    feature3Title: 'વ્યક્તિગત માર્ગદર્શન',
    feature3Description: 'ઉંમર, ગર્ભાવસ્થા, રોગનો ઇતિહાસ, એલર્જી અને દવાઓને ધ્યાનમાં રાખીને અસરકારક સલાહ આપવી.',
    feature4Title: 'ડૉક્ટર અને કેર વર્કફ્લો',
    feature4Description: 'ટ્રાઇજને હોસ્પિટલ રેફરલ, ક્લિનિશન રિવ્યુ અને હોમ કેર ફોલોઅપ સાથે જોડવું.',
    workflow: 'સ્વસ્થ્યએઆઈ કેવી રીતે કાર્ય કરે છે',
    input: '1. ઇનપુટ',
    inputText: 'લક્ષણો, ઉંમર, લિંગ, ગર્ભાવસ્થા, દવાઓ, એલર્જી અને ક્રોનિક સ્વાસ્થ્ય સંદર્ભ.',
    analysis: '2. વિશ્લેષણ',
    analysisText: 'એઆઈ લક્ષણ-સમૂહોને સંભવિત રોગો અને તાત્કાલિક ચેતવણીઓ સાથે જોડે છે.',
    guidance: '3. માર્ગદર્શન',
    guidanceText: 'સ્વ-સંભાળ, ડૉક્ટર ટ્રાઇજ અને ઇમરજન્સી અથવા ટેલિકન્સલ્ટ સહાયની સલાહ.',
  },
};

const Home = () => {
  const { language } = useLanguage();
  const text = content[language] || content.en;

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">{text.eyebrow}</span>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
          <div className="cta-row">
            <Link to="/dashboard" className="primary-button">{text.dashboard}</Link>
            <Link to="/diagnosis" className="secondary-button">{text.analyze}</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="status-pill low">{text.low}</div>
          <div className="status-pill moderate">{text.moderate}</div>
          <div className="status-pill urgent">{text.urgent}</div>
          <ul>
            <li>{text.bullet1}</li>
            <li>{text.bullet2}</li>
            <li>{text.bullet3}</li>
          </ul>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <h2>{text.feature1Title}</h2>
          <p>{text.feature1Description}</p>
        </article>
        <article className="feature-card">
          <h2>{text.feature2Title}</h2>
          <p>{text.feature2Description}</p>
        </article>
        <article className="feature-card">
          <h2>{text.feature3Title}</h2>
          <p>{text.feature3Description}</p>
        </article>
        <article className="feature-card">
          <h2>{text.feature4Title}</h2>
          <p>{text.feature4Description}</p>
        </article>
      </section>

      <section className="info-panel">
        <h2>{text.workflow}</h2>
        <div className="timeline">
          <div>
            <strong>{text.input}</strong>
            <span>{text.inputText}</span>
          </div>
          <div>
            <strong>{text.analysis}</strong>
            <span>{text.analysisText}</span>
          </div>
          <div>
            <strong>{text.guidance}</strong>
            <span>{text.guidanceText}</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
