# SwasthyaAI

SwasthyaAI is an AI-assisted symptom triage and health guidance platform designed to support safer preliminary evaluation and early referral workflows. It focuses on urgent care awareness, personalized patient context, and doctor-facing workflows.

## Core capabilities

- AI-based symptom analysis with urgency scoring and safety-first outputs
- Patient context support for age, chronic conditions, medications, allergies, and pregnancy status
- Red-flag detection and emergency escalation guidance
- Healthcare dashboard for risk summary and trend review
- Emergency and care network view for hospital support and contacts
- Doctor desk view for priority triage workflow
- Patient profile capture and history persistence in local storage for follow-up workflows
- Multilingual toggle support with English/Hindi navigation experience
- Support for underserved and primary-care screening use cases

## Project structure

- client: React frontend
- client/backend: Node.js backend foundation
- client/python-api: Python prototype for model experiments

## Core workflow

1. User logs symptoms and medical context
2. System generates possible conditions and urgency level
3. Safety layer flags red-flag symptoms
4. Care network and doctor desk help with next steps and escalation
5. History and profile keep track of prior assessment context

## Run locally

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd client/backend
npm install
npm start
```

### Python API

```bash
cd client/python-api
python app.py
```
