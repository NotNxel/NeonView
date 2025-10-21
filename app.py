from flask import Flask, jsonify, request, render_template
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load dataset here (adjust path as needed)
with open('Shows_Dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Prepare combined feature string for each item for similarity
for item in data:
    features = [
        item.get('name', ''),
        item.get('genre', ''),
        item.get('cast_and_crew', ''),  # can be parsed for more detail if needed
        item.get('description', '')
    ]
    item['combined'] = " ".join(features).lower()

# Create TF-IDF matrix for all shows/movies
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform([item['combined'] for item in data])

# Create index lookup for quick search
indices = {item['name']: i for i, item in enumerate(data)}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search')
def search():
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify([])
    results = [item for item in data if query in item['name'].lower()]
    return jsonify(results[:10])  # top 10 matches

@app.route('/api/recommend', methods=['POST'])
def recommend():
    watched = request.json.get('watched', [])
    if not watched:
        return jsonify([])
    watched_indices = [indices.get(title) for title in watched if title in indices]
    if not watched_indices:
        return jsonify([])
    similarity_scores = cosine_similarity(tfidf_matrix[watched_indices], tfidf_matrix).mean(axis=0)
    for idx in watched_indices:
        similarity_scores[idx] = -1  # exclude watched itself
    top_indices = similarity_scores.argsort()[::-1][:5]
    recommendations = [data[i] for i in top_indices if similarity_scores[i] > 0]
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
