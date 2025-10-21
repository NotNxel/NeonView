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

    // Example: Replace fetch call with real backend later
    setTimeout(() => {
        renderRecommendations([
            {
                title: "Inception",
                year: 2010,
                desc: "A thief who steals secrets through dream-sharing technology.",
                poster: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
            },
            {
                title: "The Matrix",
                year: 1999,
                desc: "A computer hacker discovers reality and rebels against its controllers.",
                poster: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
            },
            {
                title: "Stranger Things",
                year: 2016,
                desc: "When a young boy disappears, his mother and friends confront supernatural forces.",
                poster: "https://image.tmdb.org/t/p/w200/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
            },
            {
                title: "Fight Club",
                year: 1999,
                desc: "An insomniac and a soap maker form an underground fight club.",
                poster: "https://image.tmdb.org/t/p/w200/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg"
            }
        ]);
    }, 800);
}

function renderRecommendations(recs) {
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

// Show demo cards *on page load* for testing, remove or comment later!
window.onload = function(){
    renderRecommendations([
        {
            title: "Inception",
            year: 2010,
            desc: "A thief who steals secrets through dream-sharing technology.",
            poster: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
        },
        {
            title: "The Matrix",
            year: 1999,
            desc: "A computer hacker discovers reality and rebels against its controllers.",
            poster: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
        },
        {
            title: "Stranger Things",
            year: 2016,
            desc: "When a young boy disappears, his mother and friends confront supernatural forces.",
            poster: "https://image.tmdb.org/t/p/w200/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
        },
        {
            title: "Fight Club",
            year: 1999,
            desc: "An insomniac and a soap maker form an underground fight club.",
            poster: "https://image.tmdb.org/t/p/w200/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg"
        }
    ]);
}
