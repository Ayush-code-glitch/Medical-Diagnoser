import os
import json
import re
import subprocess

# Ensure python-pptx is available
try:
    from pptx import Presentation
    from pptx.util import Inches, Pt
except ImportError:
    subprocess.check_call(["python", "-m", "pip", "install", "python-pptx"])
    from pptx import Presentation
    from pptx.util import Inches, Pt


def read_text(path):
    if not os.path.exists(path):
        return ''
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()


def safe_load_json(path):
    try:
        return json.loads(read_text(path))
    except Exception:
        return {}


def bullets_from_md_section(md, heading):
    if not md:
        return []
    pattern = re.compile(r"^##+\s+" + re.escape(heading) + r"\s*$", re.IGNORECASE | re.MULTILINE)
    m = pattern.search(md)
    if not m:
        return []
    start = m.end()
    rest = md[start:]
    lines = rest.splitlines()
    out = []
    for line in lines:
        if re.match(r"^##+\s+", line):
            break
        line = line.strip()
        if line:
            out.append(line)
    cleaned = []
    for l in out:
        if l.startswith('- '):
            cleaned.append(l[2:].strip())
        elif re.match(r"^\d+\.\s+", l):
            cleaned.append(re.sub(r"^\d+\.\s+", '', l).strip())
        else:
            cleaned.append(l)
    return cleaned


def add_slide(prs, title, bullets, layout_index=1):
    layout = prs.slide_layouts[layout_index] if len(prs.slide_layouts) > layout_index else prs.slide_layouts[0]
    slide = prs.slides.add_slide(layout)
    try:
        slide.shapes.title.text = title
    except Exception:
        pass
    # find body
    body = None
    for shape in slide.shapes:
        if shape.has_text_frame and (not shape == slide.shapes.title):
            body = shape.text_frame
            break
    if body is None:
        left = Inches(1)
        top = Inches(1.8)
        width = Inches(8)
        height = Inches(4.5)
        tx = slide.shapes.add_textbox(left, top, width, height)
        body = tx.text_frame
    body.clear()
    for i, b in enumerate(bullets):
        p = body.add_paragraph() if i > 0 or len(body.paragraphs) == 0 else body.paragraphs[0]
        p.text = b
        p.level = 0
        p.font.size = Pt(18)


def short(text, limit=300):
    return (text.strip()[:limit] + '...') if text and len(text) > limit else text.strip()


def main():
    root = r"D:\Medical-Diagnoser"
    out = os.path.join(root, 'SwasthyaAI_Presentation_FullDetails.pptx')

    readme = read_text(os.path.join(root, 'README.md'))
    client_readme = read_text(os.path.join(root, 'client', 'README.md'))
    backend_pkg = safe_load_json(os.path.join(root, 'client', 'backend', 'package.json'))
    client_pkg = safe_load_json(os.path.join(root, 'client', 'package.json'))
    python_requirements = read_text(os.path.join(root, 'client', 'python-api', 'requirements.txt'))
    db_sql = read_text(os.path.join(root, 'client', 'backend', 'database.sql'))
    hero = os.path.join(root, 'client', 'src', 'assets', 'hero.png')
    symptoms_preview = ''
    symptoms_csv = os.path.join(root, 'client', 'python-api', 'symptoms.csv')
    if os.path.exists(symptoms_csv):
        try:
            with open(symptoms_csv, 'r', encoding='utf-8', errors='ignore') as f:
                lines = [next(f).strip() for _ in range(10)]
            symptoms_preview = '\n'.join(lines)
        except Exception:
            symptoms_preview = ''

    # Create presentation
    prs = Presentation()

    # Title slide
    project_title = ''
    for line in readme.splitlines():
        if line.startswith('# '):
            project_title = line[2:].strip()
            break
    project_title = project_title or 'SwasthyaAI (Medical Diagnoser)'
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    try:
        slide.shapes.title.text = project_title
    except Exception:
        pass
    try:
        for shape in slide.placeholders:
            if shape.placeholder_format.type == 1:
                shape.text = 'Comprehensive project details — architecture, tech stack, data, deployment, testing, roadmap'
                break
    except Exception:
        pass

    # Executive summary
    exec_bullets = [
        'Objective: AI-assisted symptom triage to help early referral and urgent-care escalation',
        'Scope: Frontend (React), Backend (Node/Express + MySQL), Python ML API (Flask, scikit-learn)',
        'Value: Safety-first triage, red-flag detection, doctor desk workflow, multilingual demo'
    ]
    add_slide(prs, 'Executive summary', exec_bullets)

    # Problem & Goals
    problem_bullets = [
        'Problem: Limited early triage tools for underserved communities; need for safe, explainable guidance',
        'Goals: Provide urgency scoring, preserve patient context, and enable doctor-facing prioritization'
    ]
    add_slide(prs, 'Problem & Goals', problem_bullets)

    # Features
    improvements = bullets_from_md_section(readme, 'Core capabilities')
    client_notes = bullets_from_md_section(client_readme, 'Notes')
    feats = improvements + client_notes
    if not feats:
        feats = ['AI-based symptom analysis', 'Context capture (age, conditions, meds)', 'Red-flag detection and escalation', 'Doctor desk and care network views']
    add_slide(prs, 'Key features', feats)

    # Architecture overview
    arch_bullets = [
        'Frontend: React + Vite + Tailwind — interactive symptom input, history, UI dashboards',
        'Backend: Node.js + Express — auth, diagnosis proxy, MySQL persistence',
        'Python API: Flask service exposing /predict — TF-IDF + MultinomialNB model trained on symptoms.csv',
        'Database: MySQL (users, diagnoses), schema in client/backend/database.sql',
        'Data flow: Frontend -> Backend (/api/diagnosis) -> Python API (/predict) -> Backend -> Client'
    ]
    add_slide(prs, 'Architecture overview', arch_bullets)

    # Component details
    comp_bullets = [
        'Frontend: client/ — Vite dev server, routes, components, health-dashboard, localization toggle',
        'Backend: client/backend/ — index.js, routes (auth, diagnosis), controllers, MySQL connector',
        'Python ML service: client/python-api/ — app.py (TF-IDF + MultinomialNB), symptoms.csv dataset',
        'Persistence: client/backend/database.sql defines users and diagnoses tables'
    ]
    add_slide(prs, 'Component details', comp_bullets)

    # Tech stack & dependencies
    deps = []
    if client_pkg.get('dependencies'):
        deps.append('Frontend deps: ' + ', '.join(list(client_pkg['dependencies'].keys())[:8]))
    if backend_pkg.get('dependencies'):
        deps.append('Backend deps: ' + ', '.join(list(backend_pkg['dependencies'].keys())))
    if python_requirements:
        reqs = [r.strip() for r in python_requirements.splitlines() if r.strip()]
        deps.append('Python deps (select): ' + ', '.join(reqs[:8]))
    add_slide(prs, 'Tech stack & dependencies', deps)

    # API Endpoints
    api_bullets = [
        'Frontend served by Vite (dev) — npm run dev',
        'Backend endpoints (sample):',
        '  - GET / -> health check',
        '  - POST /api/auth/register -> register user',
        '  - POST /api/auth/login -> login returns JWT',
        '  - GET /api/auth/user -> get user (auth)',
        '  - POST /api/diagnosis -> submit symptoms (auth) -> proxied to Python API',
        'Python API: POST /predict -> returns {disease, confidence}'
    ]
    add_slide(prs, 'API Endpoints', api_bullets)

    # Data & Model
    data_bullets = [
        'Dataset: client/python-api/symptoms.csv — fields: symptom1..symptom4, disease',
        'Model: TF-IDF vectorizer + MultinomialNB (scikit-learn pipeline)',
        'Training: model is trained at service startup from symptoms.csv (line-limited demo dataset)',
        'Outputs: predicted disease label + confidence (probability)',
        'Limitations: demo dataset, not clinically validated — intended for demo/triage support only'
    ]
    add_slide(prs, 'Data & Model', data_bullets)

    # Database schema
    db_bullets = []
    if db_sql:
        # Extract table create lines
        tlines = [l.strip() for l in db_sql.splitlines() if l.strip()]
        db_bullets.append('Database: MySQL — schema highlights:')
        # include user and diagnoses create summary
        db_bullets.append('Users table: id, username, email, password_hash, created_at')
        db_bullets.append('Diagnoses table: user_id, symptoms, disease, confidence, created_at')
    else:
        db_bullets = ['Database: MySQL (expected schema in client/backend/database.sql)']
    add_slide(prs, 'Database schema', db_bullets)

    # How to run (detailed)
    run_bullets = [
        'Frontend (dev): cd client && npm install && npm run dev',
        'Backend: cd client/backend && npm install && npm start (requires .env with JWT_SECRET, DB creds)',
        "Python API: cd client/python-api && python -m pip install -r requirements.txt && python app.py",
        'Ports: frontend (Vite) default 5173, backend 5000, python-api 5001',
        'Notes: Backend /diagnosis proxies to http://localhost:5001/predict — ensure python-api running'
    ]
    add_slide(prs, 'How to run (local dev)', run_bullets)

    # Deployment & CI
    deploy_bullets = [
        'Suggested deployment: Containerize frontend, backend, python-api; run behind API gateway',
        'Use MySQL managed service; secure JWT secret via secrets manager; enable HTTPS',
        'CI: run linters (ESLint), unit tests (if added), and a model validation step before merging'
    ]
    add_slide(prs, 'Deployment & CI recommendations', deploy_bullets)

    # Security & privacy
    sec_bullets = [
        'Do not use predictions as definitive diagnoses; include strong disclaimer in UI',
        'Secure JWT secret and DB credentials; enforce HTTPS and CORS policies',
        'Protect PHI: avoid storing sensitive identifiable data without consent and encryption at rest',
        'Add audit logging, RBAC for doctor/admin views, and rate-limiting on prediction endpoints'
    ]
    add_slide(prs, 'Security & privacy considerations', sec_bullets)

    # Testing & validation
    test_bullets = [
        'Add unit tests for backend controllers and client components',
        'Add integration tests for backend <-> python-api contracts',
        'Model validation: cross-validation on labelled dataset, track precision/recall per class',
        'Clinical validation: partner with clinicians for real-world evaluation and safety checks'
    ]
    add_slide(prs, 'Testing & validation', test_bullets)

    # Roadmap & milestones
    roadmap = bullets_from_md_section(readme, 'Future-ready roadmap')
    rm = roadmap or ['Replace demo-only logic with clinically validated model', 'Add secure auth and persistent DB', 'Integrate hospital APIs and telemedicine', 'Add multilingual voice interfaces', 'Role-based access and analytics']
    add_slide(prs, 'Roadmap & milestones', rm)

    # Contributors & contacts
    contrib = ['Project: SwasthyaAI / Medical Diagnoser', 'Repo: local workspace D:\\Medical-Diagnoser', 'Contact: add maintainer emails in project metadata']
    add_slide(prs, 'Contributors & contact', contrib)

    # Demo & screenshots
    if os.path.exists(hero):
        layout = prs.slide_layouts[5] if len(prs.slide_layouts) > 5 else prs.slide_layouts[1]
        slide = prs.slides.add_slide(layout)
        try:
            slide.shapes.title.text = 'Demo UI / Screenshots'
        except Exception:
            pass
        left = Inches(1)
        top = Inches(1.4)
        try:
            slide.shapes.add_picture(hero, left, top, width=Inches(8))
        except Exception:
            pass

    # Appendix: sample dataset preview
    if symptoms_preview:
        add_slide(prs, 'Dataset preview (first lines)', symptoms_preview.splitlines())

    # Save
    prs.save(out)
    print('Saved expanded presentation to:', out)

if __name__ == '__main__':
    main()
