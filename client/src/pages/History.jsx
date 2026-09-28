import React from 'react';

const HISTORY_KEY = 'swasthya-history';

const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
};

const formatDate = (value) => {
  if (!value) return 'Recently';
  return new Date(value).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
};

const History = () => {
  const history = getHistory();

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="section-header">
          <div>
            <span className="eyebrow">Personal records</span>
            <h1>Diagnosis history</h1>
          </div>
          <p className="muted-text">Review previous SwasthyaAI assessments and compare how risk changed over time.</p>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <p>No assessments yet.</p>
            <p>Use the diagnosis page to generate your first health evaluation.</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((entry, index) => (
              <article key={entry.id || index} className="history-card">
                <div className="history-header">
                  <div>
                    <span className="history-date">{formatDate(entry.date)}</span>
                    <h3>{entry.summary}</h3>
                  </div>
                  <span className={`badge ${entry.urgency}`}>{entry.urgency}</span>
                </div>

                <div className="history-details">
                  <div>
                    <strong>Symptoms:</strong>
                    <p>{entry.symptoms.join(', ') || 'No symptoms recorded'}</p>
                  </div>
                  <div>
                    <strong>Likely conditions:</strong>
                    <p>{entry.conditions.map((condition) => condition.name).join(', ') || 'General review recommended'}</p>
                  </div>
                  <div>
                    <strong>Context:</strong>
                    <p>
                      Age: {entry.patientContext?.age || 'Not provided'} · Gender: {entry.patientContext?.gender || 'Not provided'}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
