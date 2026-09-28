from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

app = Flask(__name__)

# Load and prepare the data
data = pd.read_csv('symptoms.csv').fillna('')
X = data.apply(lambda x: ' '.join(x[['symptom1', 'symptom2', 'symptom3', 'symptom4']]), axis=1)
y = data['disease']

# Create and train the model
model = make_pipeline(TfidfVectorizer(), MultinomialNB())
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.json.get('symptoms', [])
    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400

    symptoms_str = ' '.join(symptoms)
    prediction = model.predict([symptoms_str])
    confidence = model.predict_proba([symptoms_str]).max()

    return jsonify({'disease': prediction[0], 'confidence': confidence})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
