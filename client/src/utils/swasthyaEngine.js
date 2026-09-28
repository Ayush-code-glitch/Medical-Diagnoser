export const commonSymptoms = [
  'fever',
  'cough',
  'fatigue',
  'headache',
  'sore throat',
  'runny nose',
  'body ache',
  'nausea',
  'vomiting',
  'chest pain',
  'shortness of breath',
  'dizziness',
  'rash',
  'abdominal pain',
  'diarrhea',
  'wheezing',
  'joint pain',
  'loss of appetite',
  'burning urination',
  'sleepiness',
  'dehydration',
];

const conditionCatalog = [
  {
    id: 'viral-respiratory',
    name: 'Viral respiratory illness',
    keywords: ['fever', 'cough', 'fatigue', 'headache', 'sore throat', 'runny nose', 'body ache'],
    explanation:
      'A combination of fever, cough, and body ache commonly matches viral respiratory infections such as flu or a common cold.',
    urgency: 'moderate',
    precautions: ['Rest and hydration', 'Avoid close contact with others', 'Use a mask in crowded areas'],
    selfCare: ['Warm fluids', 'Steam inhalation', 'Monitor temperature twice a day'],
    whenToSeekHelp: ['Breathing difficulty', 'Chest pain', 'High or persistent fever'],
    specialist: 'General physician',
  },
  {
    id: 'asthma',
    name: 'Asthma flare-up',
    keywords: ['wheezing', 'shortness of breath', 'cough', 'chest tightness'],
    explanation:
      'Wheezing with cough or tightness in the chest is consistent with an asthma flare-up or airway irritation.',
    urgency: 'moderate',
    precautions: ['Avoid smoke, allergens, and dust exposure', 'Follow your inhaler plan', 'Keep rescue medication available'],
    selfCare: ['Sit upright and breathe slowly', 'Use prescribed inhalers as directed', 'Limit strenuous activity'],
    whenToSeekHelp: ['Blue lips', 'Severe breathlessness', 'Inability to speak full sentences'],
    specialist: 'Pulmonologist / general physician',
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis / food-related illness',
    keywords: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain', 'dehydration'],
    explanation:
      'Nausea, vomiting, and diarrhea together are often seen in infections or food irritation causing stomach upset.',
    urgency: 'moderate',
    precautions: ['Drink oral rehydration solution', 'Avoid heavy or oily meals', 'Wash hands thoroughly'],
    selfCare: ['Sip water in small amounts', 'Eat bland foods like rice and bananas', 'Rest until symptoms improve'],
    whenToSeekHelp: ['Blood in stool', 'Severe dehydration', 'Persistent vomiting'],
    specialist: 'General physician',
  },
  {
    id: 'migraine',
    name: 'Migraine or severe headache',
    keywords: ['headache', 'dizziness', 'light sensitivity', 'nausea'],
    explanation:
      'A headache combined with nausea or dizziness can be consistent with a migraine episode, especially if it is one-sided or intense.',
    urgency: 'moderate',
    precautions: ['Reduce screen time', 'Avoid triggers like skipped meals', 'Keep lights dim and rest'],
    selfCare: ['Hydrate well', 'Take a quiet break in a dark room', 'Avoid strenuous activity'],
    whenToSeekHelp: ['Sudden worst headache', 'Weakness or confusion', 'Vomiting with no relief'],
    specialist: 'Neurologist / general physician',
  },
  {
    id: 'infection',
    name: 'Possible infection requiring review',
    keywords: ['fever', 'rash', 'fatigue', 'body ache', 'sleepiness'],
    explanation:
      'Fever with rash or a strong feeling of tiredness may indicate a systemic infection that needs careful assessment.',
    urgency: 'moderate',
    precautions: ['Seek medical review promptly', 'Monitor temperature and hydration', 'Avoid self-treatment if worsening'],
    selfCare: ['Rest and fluids', 'Track when symptoms started', 'Contact a clinician if they worsen'],
    whenToSeekHelp: ['Confusion', 'Fainting', 'Severe weakness'],
    specialist: 'General physician',
  },
  {
    id: 'urgent-red-flag',
    name: 'Urgent medical attention recommended',
    keywords: ['chest pain', 'shortness of breath', 'severe weakness', 'loss of consciousness', 'difficulty breathing'],
    explanation:
      'This symptom pattern contains red flags that can signal a serious problem and should be treated as urgent.',
    urgency: 'urgent',
    precautions: ['Do not delay emergency care', 'Call emergency services if symptoms worsen', 'Avoid driving yourself if very unwell'],
    selfCare: ['Sit comfortably and keep airways open', 'Stay with someone nearby', 'Prepare for emergency transfer'],
    whenToSeekHelp: ['Chest pain', 'Severe shortness of breath', 'Fainting or confusion'],
    specialist: 'Emergency care / ER',
  },
];

const urgencyOrder = { urgent: 3, moderate: 2, low: 1 };

export const normalizeSymptoms = (rawSymptoms = '') => {
  if (Array.isArray(rawSymptoms)) {
    return [...new Set(rawSymptoms.map((value) => value.toLowerCase().trim()).filter(Boolean))];
  }

  return [...new Set(
    String(rawSymptoms)
      .split(/[\n,]+/)
      .map((value) => value.toLowerCase().trim())
      .filter(Boolean)
  )];
};

const getMatchedSymptoms = (condition, symptoms) =>
  condition.keywords.filter((keyword) => symptoms.some((item) => item.includes(keyword) || keyword.includes(item)));

export const analyzeSymptoms = (rawSymptoms, context = {}) => {
  const symptoms = normalizeSymptoms(rawSymptoms);

  if (!symptoms.length) {
    return {
      summary: 'Add at least one symptom to begin the analysis.',
      urgency: 'low',
      conditions: [],
      redFlags: [],
      triageNote: 'Please describe the symptoms clearly before using the tool.',
      actionPlan: ['Review the symptom list', 'Add age and medical context', 'Seek clinician advice if symptoms worsen'],
      safetyNote:
        'SwasthyaAI is an educational guide and not a diagnosis. Please consult a qualified clinician if symptoms are severe or worsening.',
    };
  }

  const existingConditions = (context.existingConditions || '')
    .toLowerCase()
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  const redFlags = symptoms.filter((item) =>
    ['chest pain', 'shortness of breath', 'difficulty breathing', 'fainting', 'severe weakness', 'bluish lips', 'seizure'].includes(item)
  );

  const riskFactors = [];
  if (context.pregnancyStatus && /pregnant|expecting|gestation/i.test(context.pregnancyStatus)) {
    riskFactors.push('Pregnancy-related risk needs careful assessment');
  }
  if (context.allergies && context.allergies.trim()) {
    riskFactors.push('Allergies are documented for medication review');
  }
  if (context.recentHospitalization && /yes|recent|admitted|hospital/i.test(context.recentHospitalization)) {
    riskFactors.push('Recent hospitalization may affect current care urgency');
  }

  const assessedConditions = conditionCatalog
    .map((condition) => {
      const matched = getMatchedSymptoms(condition, symptoms);
      let confidence = Math.min(94, Math.max(32, (matched.length / condition.keywords.length) * 100));

      if (existingConditions.some((term) => condition.name.toLowerCase().includes(term) || term.includes(condition.name.toLowerCase()))) {
        confidence += 8;
      }

      if (Number(context.age) && Number(context.age) > 65 && condition.urgency !== 'urgent') {
        confidence += 6;
      }

      if (Number(context.age) && Number(context.age) < 12 && condition.urgency === 'moderate') {
        confidence += 5;
      }

      if (context.pregnancyStatus && /pregnant|expecting|gestation/i.test(context.pregnancyStatus) && condition.urgency !== 'urgent') {
        confidence += 4;
      }

      const isUrgentFlag = redFlags.length > 0 && condition.id === 'urgent-red-flag';
      const finalUrgency = isUrgentFlag ? 'urgent' : condition.urgency;

      const topSymptoms = matched.length ? matched : isUrgentFlag ? redFlags.slice(0, 3) : [];

      return {
        ...condition,
        matchedSymptoms: topSymptoms,
        confidence: Math.round(Math.min(98, confidence)),
        urgency: finalUrgency,
      };
    })
    .filter((condition) => condition.matchedSymptoms.length > 0 || (condition.id === 'urgent-red-flag' && redFlags.length > 0))
    .sort((a, b) => {
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    })
    .slice(0, 3);

  const strongestCondition = assessedConditions[0] || {
    name: 'General review recommended',
    urgency: 'low',
    confidence: 40,
    explanation: 'The reported symptoms are broad and may need a clinician review to narrow the causes.',
  };

  const urgency = redFlags.length > 0 ? 'urgent' : strongestCondition.urgency === 'moderate' || strongestCondition.confidence > 70 || riskFactors.length > 0 ? 'moderate' : 'low';

  const summary = `${strongestCondition.name} is the strongest match based on ${symptoms.slice(0, 4).join(', ')}.`;

  const triageNote =
    urgency === 'urgent'
      ? 'This pattern contains red-flag symptoms and should be escalated for urgent medical review.'
      : riskFactors.length > 0
        ? 'Medical context adds risk, so review with a clinician or local care provider before self-management.'
        : 'Symptoms are not immediately red-flagged, but professional review is recommended for persistent or worsening concerns.';

  const actionPlan =
    urgency === 'urgent'
      ? ['Call emergency services if symptoms are worsening', 'Do not delay urgent evaluation', 'Inform caregiver or a nearby family member']
      : [
          'Monitor symptoms at regular intervals',
          'Follow the precautions and self-care guidance',
          'Book a clinician review if symptoms persist beyond 24–48 hours',
        ];

  const safetyNote =
    urgency === 'urgent'
      ? 'This pattern includes red flags. Seek urgent medical evaluation or emergency care promptly rather than waiting for the issue to worsen.'
      : 'SwasthyaAI is an educational support system and not a diagnosis. It is best used to understand possible conditions and decide when professional medical review is appropriate.';

  return {
    summary,
    urgency,
    conditions: assessedConditions,
    redFlags,
    triageNote,
    actionPlan,
    riskFactors,
    safetyNote,
    patientContext: {
      age: context.age || 'Not provided',
      gender: context.gender || 'Not provided',
      existingConditions: context.existingConditions || 'No additional conditions noted',
      medications: context.medications || 'No medications noted',
      allergies: context.allergies || 'No allergies noted',
      pregnancyStatus: context.pregnancyStatus || 'Not specified',
      recentHospitalization: context.recentHospitalization || 'No recent hospitalization noted',
    },
  };
};
