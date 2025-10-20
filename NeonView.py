from flask import Flask, request, jsonify
import pandas as pd

# Load the Netflix dataset once at startup
df = pd.read_csv('show_titles.csv')

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    # Step 1: Get watched titles from POST request
    watched = request.json.get('shows', [])
    
    # Step 2: Confirm watched titles exist in the dataset
    confirmed_watched = []
    for t in watched:
        match = df[df['title'].str.lower() == t.lower()]
        if not match.empty:
            confirmed_watched.append(t)

    # Step 3: Count user preferences for genres, actors, directors, type, country
    genre_counts = {}
    actor_counts = {}
    director_counts = {}
    type_preference = {}
    country_counts = {}

    for t in confirmed_watched:
        row = df[df['title'].str.lower() == t.lower()]
        if not row.empty:
            # Genre
            if not pd.isna(row.iloc[0]['listed_in']):
                genres = row.iloc[0]['listed_in'].split(', ')
                for g in genres:
                    genre_counts[g] = genre_counts.get(g, 0) + 1
            # Actor
            if not pd.isna(row.iloc[0]['cast']):
                actors = row.iloc[0]['cast'].split(', ')
                for a in actors:
                    actor_counts[a] = actor_counts.get(a, 0) + 1
            # Director
            if not pd.isna(row.iloc[0]['director']):
                directors = row.iloc[0]['director'].split(', ')
                for d in directors:
                    director_counts[d] = director_counts.get(d, 0) + 1
            # Type
            if not pd.isna(row.iloc[0]['type']):
                mtype = row.iloc[0]['type']
                type_preference[mtype] = type_preference.get(mtype, 0) + 1
            # Country
            if not pd.isna(row.iloc[0]['country']):
                countries = row.iloc[0]['country'].split(', ')
                for c in countries:
                    country_counts[c] = country_counts.get(c, 0) + 1

    # Find top preferences
    sorted_genres = sorted(genre_counts.items(), key=lambda x: x[1], reverse=True)
    top_genres = [genre for genre, count in sorted_genres if count == sorted_genres[0][1]] if sorted_genres else []
    sorted_actors = sorted(actor_counts.items(), key=lambda x: x[1], reverse=True)
    top_actors = [actor for actor, count in sorted_actors if count == sorted_actors[0][1]] if sorted_actors else []
    sorted_directors = sorted(director_counts.items(), key=lambda x: x[1], reverse=True)
    top_directors = [director for director, count in sorted_directors if count == sorted_directors[0][1]] if sorted_directors else []
    sorted_types = sorted(type_preference.items(), key=lambda x: x[1], reverse=True)
    preferred_type = sorted_types[0][0] if sorted_types else 'Movie'
    sorted_countries = sorted(country_counts.items(), key=lambda x: x[1], reverse=True)
    top_countries = [country for country, count in sorted_countries if count == sorted_countries[0][1]] if sorted_countries else []

    # Build sets for fast matching
    top_genres_set = set(top_genres)
    top_actors_set = set(top_actors)
    top_directors_set = set(top_directors)
    top_countries_set = set(top_countries)

    # Step 5: Recommendation scoring loop
    recommendation_scores = {}

    for index, row in df.iterrows():
        if row['title'].lower() in [t.lower() for t in confirmed_watched]:
            continue  # skip watched

        genres = set(row['listed_in'].split(', ')) if not pd.isna(row['listed_in']) else set()
        actors = set(row['cast'].split(', ')) if not pd.isna(row['cast']) else set()
        directors = set(row['director'].split(', ')) if not pd.isna(row['director']) else set()
        countries = set(row['country'].split(', ')) if not pd.isna(row['country']) else set()
        type_match = 1 if not pd.isna(row['type']) and row['type'] == preferred_type else 0

        genre_matches = len(genres & top_genres_set)
        actor_matches = len(actors & top_actors_set)
        director_matches = len(directors & top_directors_set)
        country_matches = len(countries & top_countries_set)

        score = (genre_matches * 2) + (actor_matches * 4) + (director_matches * 2) + (country_matches * 1) + (type_match * 1)
        if score > 0:
            recommendation_scores[row['title']] = score

    # Step 6: Pick top 5 recommendations
    sorted_recommendations = sorted(recommendation_scores.items(), key=lambda x: x[1], reverse=True)
    top_recommendations = [title for title, score in sorted_recommendations][:5]

    # Return recommendations as JSON
    return jsonify({"top_shows": top_recommendations})

if __name__ == '__main__':
    app.run(debug=True)
