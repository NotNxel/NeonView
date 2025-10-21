import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the TV shows dataset
shows_df = pd.read_csv('tv_shows.csv')  # <- Use your actual filename

def get_year(date_str):
    if pd.isna(date_str): return ""
    return str(date_str).split("-")[0]

def make_poster_url(path):
    return f"https://image.tmdb.org/t/p/w200{path}" if pd.notna(path) and path else "https://via.placeholder.com/100x140.png?text=No+Image"

@app.route('/lookup')
def lookup():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify([])
    matches = shows_df[shows_df['name'].str.lower().str.contains(query)]
    return jsonify(matches['name'].drop_duplicates().tolist()[:10])

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    selected_titles = set([t.lower() for t in data.get('shows', [])])
    pool = shows_df[~shows_df['name'].str.lower().isin(selected_titles)]
    sample = pool.sample(min(8, len(pool))) if not pool.empty else shows_df.head(8)
    top_shows = [
        {
            "title": x['name'],
            "year": get_year(x['first_air_date']),
            "desc": x['overview'] if 'overview' in x else "",
            "poster": make_poster_url(x['poster_path'])
        }
        for _, x in sample.iterrows()
    ]
    return jsonify({"top_shows": top_shows})

if __name__ == '__main__':
    app.run(debug=True)
