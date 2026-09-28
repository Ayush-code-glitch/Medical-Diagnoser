export const emergencyContacts = [
  { name: 'National Emergency', number: '112', zone: 'All India', note: 'For immediate ambulance or life-threatening emergencies.' },
  { name: 'Women Helpline', number: '1091', zone: 'India', note: 'Support for emergency maternal and women-related incidents.' },
  { name: 'Poison Control', number: '1066', zone: 'India', note: 'For poisonous exposure and urgent help after accidental ingestion.' },
  { name: 'Gujarat Emergency Care', number: '108', zone: 'Gujarat', note: 'Ambulance and emergency response coverage in Gujarat.' },
];

export const hospitals = [
  { name: 'Apollo Hospitals Ahmedabad', type: 'Multi-speciality', district: 'Ahmedabad', location: 'Ahmedabad, Gujarat', distance: '4.1 km', services: ['Emergency', 'Cardiology', 'General Medicine'] },
  { name: 'Sterling Hospital', type: 'Multi-speciality', district: 'Ahmedabad', location: 'Ahmedabad, Gujarat', distance: '6.5 km', services: ['Emergency', 'Oncology', 'Critical Care'] },
  { name: 'Narayana Multispeciality Hospital', type: 'Tertiary care', district: 'Gandhinagar', location: 'Gandhinagar, Gujarat', distance: '8.2 km', services: ['Pediatrics', 'Emergency', 'Neurology'] },
  { name: 'Sanjivani Hospital', type: 'Community hospital', district: 'Rajkot', location: 'Rajkot, Gujarat', distance: '5.4 km', services: ['Primary care', 'Diagnostics', 'Teleconsult'] },
  { name: 'Bhailal Amin General Hospital', type: 'General hospital', district: 'Vadodara', location: 'Vadodara, Gujarat', distance: '7.1 km', services: ['General Medicine', 'Orthopedics', 'Emergency'] },
  { name: 'SMC Hospital', type: 'Urban healthcare', district: 'Surat', location: 'Surat, Gujarat', distance: '3.9 km', services: ['Emergency', 'Maternity', 'ICU'] },
  { name: 'Civil Hospital Rajkot', type: 'District hospital', district: 'Rajkot', location: 'Rajkot, Gujarat', distance: '2.6 km', services: ['Emergency', 'General Surgery', 'Maternal Care'] },
  { name: 'Bhavnagar General Hospital', type: 'District hospital', district: 'Bhavnagar', location: 'Bhavnagar, Gujarat', distance: '3.8 km', services: ['General Medicine', 'Pediatrics', 'Diagnostics'] },
  { name: 'Kutch Medical Centre', type: 'Community hospital', district: 'Kutch', location: 'Bhuj, Gujarat', distance: '6.0 km', services: ['Primary care', 'Trauma', 'Teleconsult'] },
  { name: 'Junagadh District Hospital', type: 'District hospital', district: 'Junagadh', location: 'Junagadh, Gujarat', distance: '4.7 km', services: ['Emergency', 'Medicine', 'General Surgery'] },
];

export const gujaratDoctors = [
  { name: 'Dr. Nisha Patel', specialty: 'General Medicine', city: 'Ahmedabad', district: 'Ahmedabad', availability: 'Today 10:00 AM - 6:00 PM' },
  { name: 'Dr. Rakesh Shah', specialty: 'Emergency Medicine', city: 'Surat', district: 'Surat', availability: '24x7 emergency triage' },
  { name: 'Dr. Meera Joshi', specialty: 'Pediatrics', city: 'Vadodara', district: 'Vadodara', availability: 'Today 9:30 AM - 5:30 PM' },
  { name: 'Dr. Kartik Desai', specialty: 'Cardiology', city: 'Rajkot', district: 'Rajkot', availability: 'Today 11:00 AM - 7:00 PM' },
  { name: 'Dr. Aditi Vora', specialty: 'OB-GYN', city: 'Gandhinagar', district: 'Gandhinagar', availability: 'Today 8:30 AM - 4:30 PM' },
  { name: 'Dr. Harsh Patel', specialty: 'Neurology', city: 'Bhavnagar', district: 'Bhavnagar', availability: 'Today 9:00 AM - 4:00 PM' },
  { name: 'Dr. Jigna Trivedi', specialty: 'Orthopedics', city: 'Junagadh', district: 'Junagadh', availability: 'Today 10:30 AM - 6:30 PM' },
  { name: 'Dr. Vimal Sharma', specialty: 'Critical Care', city: 'Bhuj', district: 'Kutch', availability: '24x7 ICU consultation' },
];

export const gujaratDistricts = ['All Gujarat', 'Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Gandhinagar', 'Bhavnagar', 'Junagadh', 'Kutch'];

export const doctorQueue = [
  { patient: 'Asha R.', risk: 'urgent', concern: 'Chest pain and shortness of breath', priority: 'Immediate triage', location: 'Ahmedabad' },
  { patient: 'Mohan K.', risk: 'moderate', concern: 'Fever + cough for 3 days', priority: 'Review within 30 min', location: 'Surat' },
  { patient: 'Riya S.', risk: 'moderate', concern: 'Pregnancy discomfort and abdominal pain', priority: 'OB-GYN consult', location: 'Gandhinagar' },
  { patient: 'Anil P.', risk: 'low', concern: 'Mild headache and fatigue', priority: 'Follow-up routine care', location: 'Vadodara' },
  { patient: 'Kavita M.', risk: 'moderate', concern: 'Post-surgery swelling and fever', priority: 'Surgical review', location: 'Rajkot' },
];

export const careActions = [
  'Escalate emergency symptoms to the nearest emergency room immediately.',
  'Offer teleconsult when symptom severity is moderate and local care is delayed.',
  'Document allergies, medications, and chronic conditions before triage.',
  'Recommend home monitoring for stable low-risk cases with clear follow-up dates.',
  'Coordinate with Gujarat district-level referral pathways for chronic and maternal cases.',
];
