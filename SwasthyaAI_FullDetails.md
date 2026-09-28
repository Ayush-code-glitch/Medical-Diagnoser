# SwasthyaAI / Medical Diagnoser — Full Project Details


This file provides a complete, consolidated reference for the SwasthyaAI (Medical Diagnoser) project located at D:/Medical-Diagnoser. It gathers architecture, components, tech stack, run instructions, data/model details, database schema, security, testing, deployment, and important file links.

---

## Table of contents

- Executive summary
- Problem & goals
- Key features
- Architecture overview
- Component details and important files
- Tech stack & dependencies
- API endpoints
- Data & model
- Database schema
- How to run (local dev)
- Deployment & CI recommendations
- Security & privacy considerations
- Testing & validation
- Roadmap & milestones
- Contributors & contact
- Demo & screenshots
- Appendix: dataset preview and file references

---

## Executive summary

- Objective: AI-assisted symptom triage and health guidance to support early referral and urgent-care escalation workflows.
- Scope: React frontend (client/), Node.js backend (client/backend/) with MySQL persistence, Python ML API (client/python-api/) running a TF-IDF + MultinomialNB model trained on a demo symptoms dataset.
- Value: Safety-first triage, red-flag detection, doctor-facing prioritization, and accessible health guidance.

---

## Problem & goals

- Problem: Lack of accessible, explainable early triage tools for underserved communities; clinicians require safe, prioritized information to act on.
- Goals:
  - Provide urgency scoring and red-flag detection.
  - Preserve patient context (age, chronic conditions, meds, allergies, pregnancy status).
  - Enable a doctor desk workflow and care network view for escalation.
  - Provide a multilingual (English/Hindi) UI for patients and care teams.

---

## Key features

- AI-based symptom analysis with urgency scoring and safety-focused outputs.
- Patient context capture (age, conditions, medications, allergies, pregnancy).
- Red-flag detection and emergency escalation guidance.
- Health dashboard and history persistence for follow-up workflows.
- Doctor desk and care network view for prioritized triage.
- Multilingual toggle (English/Hindi) for navigation and content.

---

## Architecture overview

- Frontend: React + Vite + Tailwind for interactive symptom input, history, and dashboards.
- Backend: Node.js + Express acting as the API server and auth provider; proxies diagnosis requests to the Python ML service.
- Python ML service: Flask app exposing POST /predict implementing a TF-IDF + MultinomialNB pipeline trained on client/python-api/symptoms.csv.
- Database: MySQL schema defined by client/backend/database.sql (users, diagnoses).
- Data flow: Frontend -> Backend (/api/diagnosis) -> Python API (/predict) -> Backend -> Frontend.

---

## Component details and important files

- Project root: D:/Medical-Diagnoser
  - README: [D:/Medical-Diagnoser/README.md](D:/Medical-Diagnoser/README.md)
- Frontend (client/): Vite + React app
  - README: [D:/Medical-Diagnoser/client/README.md](D:/Medical-Diagnoser/client/README.md)
  - package.json: [D:/Medical-Diagnoser/client/package.json](D:/Medical-Diagnoser/client/package.json)
  - assets: hero image at [D:/Medical-Diagnoser/client/src/assets/hero.png](D:/Medical-Diagnoser/client/src/assets/hero.png)
- Backend (client/backend/): Express API
  - entry: [D:/Medical-Diagnoser/client/backend/index.js](D:/Medical-Diagnoser/client/backend/index.js)
  - routes: auth and diagnosis — [D:/Medical-Diagnoser/client/backend/routes/auth.js](D:/Medical-Diagnoser/client/backend/routes/auth.js), [D:/Medical-Diagnoser/client/backend/routes/diagnosis.js](D:/Medical-Diagnoser/client/backend/routes/diagnosis.js)
  - controllers: [D:/Medical-Diagnoser/client/backend/controllers/authController.js](D:/Medical-Diagnoser/client/backend/controllers/authController.js)
  - models: [D:/Medical-Diagnoser/client/backend/models/User.js](D:/Medical-Diagnoser/client/backend/models/User.js)
  - DB schema: [D:/Medical-Diagnoser/client/backend/database.sql](D:/Medical-Diagnoser/client/backend/database.sql)
  - package.json: [D:/Medical-Diagnoser/client/backend/package.json](D:/Medical-Diagnoser/client/backend/package.json)
- Python ML API (client/python-api/):
  - app.py: [D:/Medical-Diagnoser/client/python-api/app.py](D:/Medical-Diagnoser/client/python-api/app.py)
  - requirements: [D:/Medical-Diagnoser/client/python-api/requirements.txt](D:/Medical-Diagnoser/client/python-api/requirements.txt)
  - dataset: [D:/Medical-Diagnoser/client/python-api/symptoms.csv](D:/Medical-Diagnoser/client/python-api/symptoms.csv)
---

## Tech stack & dependencies (high-level)

- Frontend (client/package.json) — selected runtime dependencies include:
  - react, react-dom (React 19)
  - vite (dev server/build)
  - tailwindcss, @tailwindcss/vite
  - axios, react-router-dom, react-icons, react-hot-toast
  - chart.js and react-chartjs-2 for dashboard charts

- Backend (client/backend/package.json) — dependencies include:
  - express, cors, dotenv
  - jsonwebtoken, bcryptjs for auth
  - mysql2 for DB access
  - nodemon for local restart

- Python API (client/python-api/requirements.txt) — notable packages:
  - Flask (3.1.3)
  - scikit-learn (1.9.0)
  - numpy, pandas, scipy
  - joblib, MarkupSafe, Jinja2 (Flask dependencies)

Exact dependency files:
- [D:/Medical-Diagnoser/client/package.json](D:/Medical-Diagnoser/client/package.json)
- [D:/Medical-Diagnoser/client/backend/package.json](D:/Medical-Diagnoser/client/backend/package.json)
- [D:/Medical-Diagnoser/client/python-api/requirements.txt](D:/Medical-Diagnoser/client/python-api/requirements.txt)

---

## API endpoints (summary)

Backend (client/backend/index.js and routes):

- GET / -> health check
- POST /api/auth/register -> register user (public) — returns JWT
- POST /api/auth/login -> login (public) — returns JWT
- GET /api/auth/user -> get current user (private — requires auth middleware)
- POST /api/diagnosis -> submit symptoms (private) -> backend proxies to Python API

Python ML API (client/python-api/app.py):

- POST /predict -> accepts JSON { "symptoms": ["fever","cough",...] } and returns {"disease":..., "confidence":...}

Notes:
- The backend's diagnosis route calls the Python API at http://localhost:5001/predict by default (see client/backend/routes/diagnosis.js).
- Authentication uses JWT; environment variable JWT_SECRET is expected in client/backend/.env.

---

## Data & model

- Dataset: client/python-api/symptoms.csv — CSV with columns symptom1,symptom2,symptom3,symptom4,disease. This is a small demo dataset used to train the Naive Bayes model at service startup.

- Model: scikit-learn pipeline comprised of TfidfVectorizer and MultinomialNB (Multinomial Naive Bayes). The pipeline trains on concatenated symptoms text and predicts a disease label and associated class probability.

- Limitations:
  - Dataset is a demo; not clinically validated.
  - Model is simple and intended for demo/triage support, not diagnostic decision making.
  - Model is retrained every service start in the current design; consider persisting a trained model artifact and loading it instead of retraining on startup for performance and reproducibility.

---

## Database schema

Schema file: [D:/Medical-Diagnoser/client/backend/database.sql](D:/Medical-Diagnoser/client/backend/database.sql)

Highlights:

- users table:
  - id INT AUTO_INCREMENT PRIMARY KEY
  - username VARCHAR(255) NOT NULL UNIQUE
  - email VARCHAR(255) NOT NULL UNIQUE
  - password_hash VARCHAR(255) NOT NULL
  - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

- diagnoses table:
  - id INT AUTO_INCREMENT PRIMARY KEY
  - user_id INT NOT NULL (FK -> users.id)
  - symptoms TEXT NOT NULL
  - disease VARCHAR(255) NOT NULL
  - confidence FLOAT NOT NULL
  - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

---

## How to run (local development)

1. Frontend (client):

```bash
cd D:/Medical-Diagnoser/client
npm install
npm run dev
```

2. Backend (client/backend):

```bash
cd D:/Medical-Diagnoser/client/backend
npm install
# create .env with JWT_SECRET and DB credentials (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
npm start
```

3. Python ML API (client/python-api):

```bash
cd D:/Medical-Diagnoser/client/python-api
python -m pip install -r requirements.txt
python app.py
```

Ports used (defaults):
- Frontend (Vite) — 5173 (dev)
- Backend — 5000
- Python API — 5001

Important:
- Start the Python API before exercising diagnosis endpoints, or the backend proxy will fail.
- Ensure MySQL is running and database `medical_diagnoser` exists or run the statements in database.sql to create schema.
- Populate .env in client/backend with JWT_SECRET and DB credentials.

---

## Deployment & CI recommendations

- Containerize components: Dockerfile per service (frontend, backend, python-api) and orchestrate using docker-compose or Kubernetes.
- Use a managed MySQL service in production; use secure secrets storage for JWT_SECRET and DB credentials.
- Deploy behind an API gateway (TLS termination, rate-limiting, authentication) and enable HTTPS for all endpoints.
- CI pipeline suggestions:
  - Linting: ESLint for frontend; suggested lint script exists in client/package.json.
  - Unit tests: add jest/react-testing-library for frontend, mocha/jest for backend as appropriate.
  - Model validation: add an automated step to validate trained model performance on holdout data before merging.
  - Security scanning: Snyk or npm audit in CI to detect vulnerable dependencies.

---

## Security & privacy considerations

- Legal & ethical: The system is not a replacement for clinical diagnosis; present a clear disclaimer in the UI and require user consent before storing sensitive data.
- Secrets: Keep JWT_SECRET and DB credentials out of source control; use environment variables or a secrets manager.
- Data protection: Encrypt sensitive data at rest and in transit. Minimize stored personally identifiable information (PII). Consider hashing or tokenizing identifiers where possible.
- Access control: Enforce RBAC for doctor/admin views, add audit logs, and ensure tokens expire and are revocable.
- Rate limiting and input validation: Add server-side rate limiting and sanitize inputs (Caveat: the Python API reads and tokenizes free text — add checks to avoid DoS and injection risks).

---

## Testing & validation

Suggested testing strategy:

- Unit tests:
  - Frontend components and utilities.
  - Backend controllers, services, and auth middleware.
- Integration tests:
  - Backend <-> Python API contract tests (e.g., ensure /api/diagnosis proxies correctly and handles errors).
- Model tests:
  - Cross-validation and holdout evaluation measuring precision/recall per class.
  - Monitor model drift and add data pipelines to capture labeled corrections if available.
- Clinical validation:
  - Engage clinicians to review model outputs and dataset coverage; run prospective validation in controlled settings.

---

## Roadmap & milestones

Short-term:
- Replace demo logic with a persisted trained model artifact.
- Add secure authentication and persistent DB records with migrations.
- Clean up data ingestion and increase dataset size and variety.

Medium-term:
- Integrate hospital and telemedicine APIs for next-step actions and contacts.
- Add role-based access (doctor, admin) and analytics dashboards.
- Improve multilingual support and add voice interfaces.

Long-term:
- Clinical validation and regulatory reviews before production deployment.
- Scaled deployment, monitoring, and incident response plans.

---

## Contributors & contact

- Repository location: D:/Medical-Diagnoser
- Add maintainer contact information in project metadata (package.json or CONTRIBUTING.md) to list authors and maintainers.

---

## Demo & screenshots

- Demo UI hero image: [D:/Medical-Diagnoser/client/src/assets/hero.png](D:/Medical-Diagnoser/client/src/assets/hero.png) (embedded into generated PPT if present).
- Generated slides and PPTX files are placed at the project root (see file links above).

---

## Appendix: Dataset preview (first 10 lines of client/python-api/symptoms.csv)

```
symptom1,symptom2,symptom3,symptom4,disease
fever,cough,sore_throat,,cold
fever,cough,headache,,flu
fever,rash,headache,,measles
fever,chills,body_ache,nausea,malaria
cough,shortness_of_breath,wheezing,,asthma
fever,cough,sore_throat,runny_nose,cold
fever,cough,headache,fatigue,flu
fever,rash,headache,conjunctivitis,measles
fever,chills,body_ache,vomiting,malaria
cough,shortness_of_breath,chest_tightness,,asthma
```

---

## Important files referenced

- Project README: [D:/Medical-Diagnoser/README.md](D:/Medical-Diagnoser/README.md)
- Frontend: [D:/Medical-Diagnoser/client/](D:/Medical-Diagnoser/client/)
- Backend: [D:/Medical-Diagnoser/client/backend/](D:/Medical-Diagnoser/client/backend/)
- Python API: [D:/Medical-Diagnoser/client/python-api/](D:/Medical-Diagnoser/client/python-api/)
---

If you want this exported differently (e.g., split into separate markdown chapters, converted to PDF, or pushed into a Git repository with a single commit), say which option and I will perform that change next.
