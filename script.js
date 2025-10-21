function getRecommendations() {
    const shows = document.getElementById('watched').value
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    if (!shows.length) {
        document.getElementById('results').innerHTML = '<div style="text-align:center;">Please enter at least one show.</div>';
        return;
    }

    document.getElementById('results').innerHTML = '<div style="text-align: center; color: #19ffe6;">Getting recommendations...</div>';

    fetch('http://127.0.0.1:5000/recommend', { // Change this to your deployed backend!
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shows: shows})
    })
    .then(response => response.json())
    .then(data => {
        renderRecommendations(data.top_shows || []);
    })
    .catch(err => {
        document.getElementById('results').innerHTML = '<div style="text-align: center; color: #ff6b6b;">Unable to connect to recommendation service.</div>';
    });
}

function renderRecommendations(recs) {
    // recs: Array of objects: {title, year, desc, poster}
    if (!recs.length) {
        document.getElementById('results').innerHTML = '<div style="text-align:center;">No recommendations found.</div>';
        return;
    }

    document.getElementById('results').innerHTML = `
        <div class="result-section">Popular Recommendations</div>
        ${
            recs.map(rec => `
            <div class="result-card">
                ${rec.poster ? `<img class="result-poster" src="${rec.poster}" alt="${rec.title}">` : ''}
                <div class="result-info">
                    <div class="result-title">${rec.title}</div>
                    ${rec.year ? `<div class="result-year">${rec.year}</div>` : ''}
                    ${rec.desc ? `<div class="result-desc">${rec.desc}</div>` : ''}
                </div>
            </div>
        `).join('')
        }
    `;
}

// Demo/Test - Show some recommendations if you want to preview
// Uncomment to see demo cards:
// renderRecommendations([
//     {
//         title: "Inception",
//         year: 2010,
//         desc: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea.",
//         poster: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
//     },
//     {
//         title: "The Matrix",
//         year: 1999,
//         desc: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
//         poster: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
//     }
// ]);
