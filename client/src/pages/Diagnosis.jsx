import React, { useState } from 'react';
import { analyzeSymptoms, commonSymptoms, normalizeSymptoms } from '../utils/swasthyaEngine';
import { useLanguage } from '../context/LanguageContext';

const HISTORY_KEY = 'swasthya-history';
const PROFILE_KEY = 'swasthya-profile';

const defaultContext = {
  age: '',
  gender: 'Prefer not to say',
  existingConditions: '',
  medications: '',
  allergies: '',
  pregnancyStatus: 'Not pregnant',
  recentHospitalization: 'No',
};

const content = {
  en: {
    eyebrow: 'Clinical decision support',
    title: 'SwasthyaAI symptom analysis',
    subtitle: 'AI-guided guidance based on symptoms and personal health context with safety-first triage.',
    age: 'Age',
    gender: 'Gender',
    pregnancyStatus: 'Pregnancy status',
    recentHospitalization: 'Recent hospitalization',
    existingConditions: 'Existing conditions',
    currentMedications: 'Current medications',
    allergies: 'Allergies',
    symptoms: 'Symptoms',
    preferNotToSay: 'Prefer not to say',
    notPregnant: 'Not pregnant',
    pregnant: 'Pregnant',
    breastfeeding: 'Breastfeeding',
    no: 'No',
    yes30: 'Yes, within the last 30 days',
    yesOlder: 'Yes, older than 30 days',
    symptomPlaceholder: 'Type symptoms or separate them with commas',
    quickPicker: 'Quick symptom picker',
    selected: 'selected',
    analyzeButton: 'Analyze with SwasthyaAI',
    low: 'Low urgency',
    moderate: 'Moderate urgency',
    urgent: 'Urgent',
    assessmentSummary: 'Assessment summary',
    redFlag: 'Red flag symptoms detected',
    triageNote: 'Triage note',
    riskFactors: 'Risk factors in context',
    actionPlan: 'Action plan',
    safetyLayer: 'Safety layer',
    otherConditions: 'Other possible conditions',
    noConditions: 'No conditions noted',
    notProvided: 'Not provided',
    agePlaceholder: '30',
    anti: 'Female',
    male: 'Male',
    other: 'Other',
  },
  hi: {
    eyebrow: 'क्लिनिकल निर्णय सहायता',
    title: 'स्वस्थ्यएआई लक्षण विश्लेषण',
    subtitle: 'लक्षणों और व्यक्तिगत स्वास्थ्य संदर्भ के आधार पर सुरक्षित ट्राएज के साथ एआई मार्गदर्शन।',
    age: 'आयु',
    gender: 'लिंग',
    pregnancyStatus: 'गर्भावस्था स्थिति',
    recentHospitalization: 'हाल की अस्पताल में भर्ती',
    existingConditions: 'मौजूदा स्थितियाँ',
    currentMedications: 'वर्तमान दवाएँ',
    allergies: 'एलर्जी',
    symptoms: 'लक्षण',
    preferNotToSay: 'बताने से इनकार करें',
    notPregnant: 'गर्भवती नहीं',
    pregnant: 'गर्भवती',
    breastfeeding: 'स्तनपान',
    no: 'नहीं',
    yes30: 'हाँ, पिछले 30 दिनों के भीतर',
    yesOlder: 'हाँ, 30 दिनों से अधिक पुराना',
    symptomPlaceholder: 'लक्षण टाइप करें या commas से अलग करें',
    quickPicker: 'त्वरित लक्षण चयनकर्ता',
    selected: 'चुने गए',
    analyzeButton: 'स्वस्थ्यएआई से विश्लेषण करें',
    low: 'कम गंभीरता',
    moderate: 'मध्यम गंभीरता',
    urgent: 'तत्काल',
    assessmentSummary: 'मूल्यांकन सारांश',
    redFlag: 'रेड-फ्लैग लक्षण पाए गए',
    triageNote: 'ट्राएज नोट',
    riskFactors: 'संदर्भ में जोखिम कारक',
    actionPlan: 'कार्य योजना',
    safetyLayer: 'सुरक्षा परत',
    otherConditions: 'अन्य संभावित स्थितियाँ',
    noConditions: 'कोई स्थिति दर्ज नहीं',
    notProvided: 'दिया नहीं गया',
    agePlaceholder: '३०',
    anti: 'महिला',
    male: 'पुरुष',
    other: 'अन्य',
  },
  gu: {
    eyebrow: 'ક્લિનિકલ ડેસિશન સપોર્ટ',
    title: 'સ્વસ્થ્યએઆઈ લક્ષણ વિશ્લેષણ',
    subtitle: 'લક્ષણો અને વ્યક્તિગત સ્વાસ્થ્ય સંદર્ભ પર આધારિત સુરક્ષિત ટ્રાઇજ સાથે એઆઈ માર્ગદર્શન.',
    age: 'ઉંમર',
    gender: 'લિંગ',
    pregnancyStatus: 'ગર્ભાવસ્થા સ્થિતિ',
    recentHospitalization: 'હાલમાં હોસ્પિટલમાં દાખલ થવાની સ્થિતિ',
    existingConditions: 'હાલની સ્થિતિઓ',
    currentMedications: 'હાલની દવાઓ',
    allergies: 'એલર્જી',
    symptoms: 'લક્ષણો',
    preferNotToSay: 'કહવું પસંદ ન કરે',
    notPregnant: 'ગર્ભવતી નથી',
    pregnant: 'ગર્ભવતી',
    breastfeeding: 'બાળનિર્માણ',
    no: 'નથી',
    yes30: 'હા, છેલ્લા 30 દિવસમાં',
    yesOlder: 'હા, 30 દિવસથી વધુ જૂનું',
    symptomPlaceholder: 'લક્ષણો લખો અથવા કોમાથી અલગ કરો',
    quickPicker: 'ઝડપી લક્ષણ પસંદગી',
    selected: 'પસંદ કરેલ',
    analyzeButton: 'સ્વસ્થ્યએઆઈ સાથે વિશ્લેષણ કરો',
    low: 'ઓછી તાત્કાલિકતા',
    moderate: 'મધ્યમ તાત્કાલિકતા',
    urgent: 'તાત્કાલિક',
    assessmentSummary: 'મૂલ્યાંકન સારાંશ',
    redFlag: 'રેડ-ફ્લેગ લક્ષણો જોવાયા',
    triageNote: 'ટ્રાઇજ નોંધ',
    riskFactors: 'સંદર્ભમાં જોખમી પરિબળો',
    actionPlan: 'ક્રિયા યોજનો',
    safetyLayer: 'સુરક્ષા સ્તર',
    otherConditions: 'અન્ય સંભવિત સ્થિતિઓ',
    noConditions: 'કોઈ સ્થિતિ નોંધાયેલ નથી',
    notProvided: 'આપેલ નથી',
    agePlaceholder: '૩૦',
    anti: 'મહિલા',
    male: 'પુરુષ',
    other: 'અન્ય',
  },
};

const Diagnosis = () => {
  const { language } = useLanguage();
  const text = content[language] || content.en;
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [patientContext, setPatientContext] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null') || defaultContext;
    } catch {
      return defaultContext;
    }
  });
  const [result, setResult] = useState(null);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((current) =>
      current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const combinedSymptoms = [...new Set([...selectedSymptoms, ...normalizeSymptoms(symptomInput)])];
    const analysis = analyzeSymptoms(combinedSymptoms, patientContext);

    setResult(analysis);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(patientContext));

    const historyEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      symptoms: combinedSymptoms,
      urgency: analysis.urgency,
      summary: analysis.summary,
      conditions: analysis.conditions,
      triageNote: analysis.triageNote,
      actionPlan: analysis.actionPlan,
      patientContext: analysis.patientContext,
    };

    const previousHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    localStorage.setItem(HISTORY_KEY, JSON.stringify([historyEntry, ...previousHistory].slice(0, 8)));
  };

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

        <form onSubmit={handleSubmit} className="symptom-form">
          <div className="input-grid">
            <label>
              {text.age}
              <input
                type="number"
                min="0"
                max="120"
                value={patientContext.age}
                onChange={(event) => setPatientContext((current) => ({ ...current, age: event.target.value }))}
                placeholder={text.agePlaceholder}
              />
            </label>

            <label>
              {text.gender}
              <select
                value={patientContext.gender}
                onChange={(event) => setPatientContext((current) => ({ ...current, gender: event.target.value }))}
              >
                <option>{text.preferNotToSay}</option>
                <option>{text.anti}</option>
                <option>{text.male}</option>
                <option>{text.other}</option>
              </select>
            </label>
          </div>

          <div className="input-grid">
            <label>
              {text.pregnancyStatus}
              <select
                value={patientContext.pregnancyStatus}
                onChange={(event) => setPatientContext((current) => ({ ...current, pregnancyStatus: event.target.value }))}
              >
                <option>{text.notPregnant}</option>
                <option>{text.pregnant}</option>
                <option>{text.breastfeeding}</option>
                <option>{text.preferNotToSay}</option>
              </select>
            </label>

            <label>
              {text.recentHospitalization}
              <select
                value={patientContext.recentHospitalization}
                onChange={(event) => setPatientContext((current) => ({ ...current, recentHospitalization: event.target.value }))}
              >
                <option>{text.no}</option>
                <option>{text.yes30}</option>
                <option>{text.yesOlder}</option>
              </select>
            </label>
          </div>

          <label>
            {text.existingConditions}
            <textarea
              value={patientContext.existingConditions}
              onChange={(event) => setPatientContext((current) => ({ ...current, existingConditions: event.target.value }))}
              placeholder="Asthma, diabetes, hypertension..."
              rows="2"
            />
          </label>

          <label>
            {text.currentMedications}
            <textarea
              value={patientContext.medications}
              onChange={(event) => setPatientContext((current) => ({ ...current, medications: event.target.value }))}
              placeholder="Paracetamol, antihistamines, insulin..."
              rows="2"
            />
          </label>

          <label>
            {text.allergies}
            <textarea
              value={patientContext.allergies}
              onChange={(event) => setPatientContext((current) => ({ ...current, allergies: event.target.value }))}
              placeholder="Penicillin, peanuts, dust..."
              rows="2"
            />
          </label>

          <label>
            {text.symptoms}
            <textarea
              value={symptomInput}
              onChange={(event) => setSymptomInput(event.target.value)}
              placeholder={text.symptomPlaceholder}
              rows="4"
            />
          </label>

          <div>
            <div className="chip-header">
              <strong>{text.quickPicker}</strong>
              <span>{selectedSymptoms.length} {text.selected}</span>
            </div>
            <div className="chip-row">
              {commonSymptoms.map((symptom) => (
                <button
                  type="button"
                  key={symptom}
                  className={selectedSymptoms.includes(symptom) ? 'chip active' : 'chip'}
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="primary-button full-width">
            {text.analyzeButton}
          </button>
        </form>
      </div>

      {result && (
        <div className="panel result-panel">
          <div className={`urgency-banner ${result.urgency}`}>
            <span className="status-dot" />
            {result.urgency === 'urgent' ? text.urgent : result.urgency === 'moderate' ? text.moderate : text.low}
          </div>

          <div className="result-head">
            <h2>{text.assessmentSummary}</h2>
            <p>{result.summary}</p>
          </div>

          <div className="info-grid compact-grid">
            <div className="mini-card">
              <span>{text.age}</span>
              <strong>{result.patientContext.age || text.notProvided}</strong>
            </div>
            <div className="mini-card">
              <span>{text.gender}</span>
              <strong>{result.patientContext.gender}</strong>
            </div>
            <div className="mini-card">
              <span>{text.existingConditions}</span>
              <strong>{result.patientContext.existingConditions || text.noConditions}</strong>
            </div>
          </div>

          {result.redFlags.length > 0 && (
            <div className="alert-box danger">
              <strong>{text.redFlag}:</strong> {result.redFlags.join(', ')}
            </div>
          )}

          <div className="alert-box neutral">
            <strong>{text.triageNote}:</strong> {result.triageNote}
          </div>

          <div className="info-grid compact-grid">
            <div className="mini-card">
              <span>{text.pregnancyStatus}</span>
              <strong>{result.patientContext.pregnancyStatus}</strong>
            </div>
            <div className="mini-card">
              <span>{text.allergies}</span>
              <strong>{result.patientContext.allergies}</strong>
            </div>
            <div className="mini-card">
              <span>{text.recentHospitalization}</span>
              <strong>{result.patientContext.recentHospitalization}</strong>
            </div>
          </div>

          {result.conditions.length > 0 && (
            <>
              <div className="condition-card primary-condition">
                <div className="condition-topline">
                  <h3>{result.conditions[0].name}</h3>
                  <span className={`badge ${result.conditions[0].urgency}`}>{result.conditions[0].urgency}</span>
                </div>
                <p className="condition-explanation">{result.conditions[0].explanation}</p>
                <div className="condition-meta">
                  <span>Confidence: {result.conditions[0].confidence}%</span>
                  <span>• Specialist: {result.conditions[0].specialist}</span>
                </div>
                <div>
                  <strong className="list-label">Symptoms contributing:</strong>
                  <p>{result.conditions[0].matchedSymptoms.join(', ')}</p>
                </div>
                <div>
                  <strong className="list-label">Precautions:</strong>
                  <ul>
                    {result.conditions[0].precautions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="list-label">Self-care advice:</strong>
                  <ul>
                    {result.conditions[0].selfCare.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="list-label">When to seek help:</strong>
                  <ul>
                    {result.conditions[0].whenToSeekHelp.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {result.conditions.length > 1 && (
                <div>
                  <h3 className="secondary-title">{text.otherConditions}</h3>
                  <div className="condition-list secondary-list">
                    {result.conditions.slice(1).map((condition) => (
                      <div key={condition.id} className="condition-card secondary-condition">
                        <div className="condition-topline">
                          <h3>{condition.name}</h3>
                          <span className={`badge ${condition.urgency}`}>{condition.urgency}</span>
                        </div>
                        <p className="condition-explanation">{condition.explanation}</p>
                        <div className="condition-meta">
                          <span>Confidence: {condition.confidence}%</span>
                          <span>• Specialist: {condition.specialist}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {result.riskFactors.length > 0 && (
            <div className="alert-box neutral">
              <strong>{text.riskFactors}:</strong> {result.riskFactors.join(' • ')}
            </div>
          )}

          <div className="panel sub-panel">
            <h3>{text.actionPlan}</h3>
            <ul>
              {result.actionPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="alert-box neutral">
            <strong>{text.safetyLayer}:</strong> {result.safetyNote}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
