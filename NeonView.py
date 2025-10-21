from flask import Flask, jsonify, request, render_template
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load Shows_Dataset.json containing shows and movies with poster URLs and metadata
with open('Shows_Dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Preprocess to add combined text features for content similarity
for item in data:
    features = []
    features.append(item.get('title', ''))
    features.append(" ".join(item.get('genres', [])) if isinstance(item.get('genres'), list) else item.get('genres', ''))
    features.append(item.get('cast', ''))
    features.append(item.get('director', ''))
    features.append(item.get('description', ''))
    item['combined_features'] = " ".join(features).lower()

# Vectorize combined features with TF-IDF
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform([item['combined_features'] for item in data])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search')
def search():
    q = request.args.get('q', '').lower()
    if not q:
        return jsonify([])
    matches = [item for item in data if q in item['title'].lower()]
    return jsonify(matches[:10])

@app.route('/api/recommend', methods=['POST'])
def recommend():
    watched_titles = request.json.get('watched', [])
    if not watched_titles:
        return jsonify([])
    watched_indices = [i for i, item in enumerate(data) if item['title'] in watched_titles]
    if not watched_indices:
        return jsonify([])
    similarity_scores = cosine_similarity(tfidf_matrix[watched_indices], tfidf_matrix).mean(axis=0)
    for idx in watched_indices:
        similarity_scores[idx] = -1  # exclude watched items
    recommended_indices = similarity_scores.argsort()[::-1][:5]
    recommendations = [data[i] for i in recommended_indices if similarity_scores[i] > 0]
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
