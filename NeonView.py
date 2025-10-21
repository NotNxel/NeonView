import json
from flask import Flask, request, jsonify, render_template
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load your dataset (replace with your real dataset path)
# Dataset has: id, title, description, genres, actors, directors, poster_url
shows_df = pd.read_csv('shows_dataset.csv').fillna('')

# Combine searchable fields for content-based recommendation
shows_df['combined_features'] = (
    shows_df['genres'] + ' ' + shows_df['actors'] + ' ' + shows_df['directors'] + ' ' + shows_df['description']
)

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(shows_df['combined_features'])
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Map title to index
title_to_index = pd.Series(shows_df.index, index=shows_df['title'].str.lower())

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/search')
def search():
    query = request.args.get('q', '').lower()
    # Simple partial matching
    matches = shows_df[shows_df['title'].str.lower().str.contains(query)]
    results = matches[['title', 'poster_url']].head(7).to_dict(orient='records')
    return jsonify(results)

@app.route('/api/recommend', methods=['POST'])
def recommend():
    """
    Expects JSON: { watched: ["title1", "title2", ...] }
    Returns 5 recommended shows with their metadata.
    """
    data = request.get_json()
    watched = [w.lower() for w in data.get('watched', [])]

    # Get index of watched shows present in dataset
    idx_list = [title_to_index.get(title) for title in watched if title in title_to_index.index]

    if not idx_list:
        return jsonify({'recommendations': []})

    # Average similarity score across watched shows to all shows
    sim_scores = cosine_sim[idx_list].mean(axis=0)

    # Recommend shows not in watched, top 5
    watched_indices = set(idx_list)
    sim_scores_filtered = [(i, score) for i, score in enumerate(sim_scores) if i not in watched_indices]
    sim_scores_filtered.sort(key=lambda x: x[1], reverse=True)
    top5 = sim_scores_filtered[:5]

    recs = []
    for i, score in top5:
        row = shows_df.iloc[i]
        recs.append({
            'title': row['title'],
            'description': row['description'],
            'poster_url': row['poster_url'],
            'genres': row['genres'],
            'actors': row['actors'],
            'directors': row['directors']
        })

    return jsonify({'recommendations': recs})

if __name__ == '__main__':
    app.run(debug=True)
