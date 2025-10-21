import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Update path if your CSV is in a folder, e.g. "data/movies.csv"
movies_df = pd.read_csv('show_titles.csv')

@app.route('/lookup')
def lookup():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify([])
    matches = movies_df[movies_df['title'].str.lower().str.contains(query)]
    return jsonify(matches['title'].drop_duplicates().tolist()[:10])

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    selected_titles = set([t.lower() for t in data.get('shows', [])])
    pool = movies_df[~movies_df['title'].str.lower().isin(selected_titles)]
    sample = pool.sample(min(8, len(pool))) if not pool.empty else movies_df.head(8)
    top_shows = [
        {
            "title": x['title'],
            "year": int(x['year']) if 'year' in x and pd.notnull(x['year']) else "",
            "desc": x['desc'] if 'desc' in x else "",
            "poster": x['poster'] if 'poster' in x else ""
        }
        for _, x in sample.iterrows()
    ]
    return jsonify({"top_shows": top_shows})

if __name__ == '__main__':
    app.run(debug=True)
