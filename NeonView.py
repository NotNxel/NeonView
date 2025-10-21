from flask import Flask, jsonify, request, render_template
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load your large JSON dataset (movies + tv shows with posters and metadata)
with open('Shows_dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Preprocess: build combined metadata field for content-based recommendation
for item in data:
    features = []
    features.append(item.get('title',''))
    features.append(" ".join(item.get('genres', [])) if isinstance(item.get('genres'), list) else item.get('genres',''))
    features.append(item.get('cast',''))
    features.append(item.get('director',''))
    features.append(item.get('description',''))
    item['combined_features'] = " ".join(features).lower()

titles = [item['title'] for item in data]
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform([item['combined_features'] for item in data])

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/search')
def search():
    q = request.args.get('q', '').lower()
    if not q:
        return jsonify([])

    # Simple substring match for quick search
    results = [item for item in data if q in item['title'].lower()]
    return jsonify(results[:10])

@app.route('/api/recommend', methods=['POST'])
def recommend():
    watched = request.json.get('watched', [])
    if not watched:
        return jsonify([])

    # Find indices of watched titles
    watched_indices = [i for i, item in enumerate(data) if item['title'] in watched]

    # If no valid titles found return empty
    if not watched_indices:
        return jsonify([])

    # Compute average cosine similarity across watched shows
    sim_scores = cosine_similarity(tfidf_matrix[watched_indices], tfidf_matrix).mean(axis=0)

    # Exclude watched from recommendations
    for idx in watched_indices:
        sim_scores[idx] = -1

    # Get top 5 recommendations
    recommend_indices = sim_scores.argsort()[::-1][:5]
    recs = [data[i] for i in recommend_indices if sim_scores[i] > 0]

    return jsonify(recs)

if __name__ == '__main__':
    app.run(debug=True)
