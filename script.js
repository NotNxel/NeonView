let selectedMovies = []; // pills
let allMovies = []; // Will be loaded from DB via suggestion API

window.onload = function(){
    // You may fetch default popular here if desired...
    renderRecommendations([
        {
            title: "Dexter",
            year: 2006,
            desc: "A Miami-based blood spatter expert for the police leads a secret life as a serial killer.",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSyQ_KxaUOgMjJhMNLelunH6HQNcHckCtQoNHO_CYiWwMmM2SRi0Wf7mHE9i_67UVoJRsDKiHhYJ4NJrWnn5Sas3_Wd5xvrf_Afrrfiw243YA"
        },
        {
            title: "Breaking Bad",
            year: 2008,
            desc: "A chemistry teacher turned meth kingpin teams up with a former student.",
            poster: "https://image.tmdb.org/t/p/w200/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
        },
        {
            title: "Stranger Things",
            year: 2016,
            desc: "When a young boy disappears, his mother and friends confront supernatural forces.",
            poster: "https://image.tmdb.org/t/p/w200/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
        },
        {
            title: "The Matrix",
            year: 1999,
            desc: "A computer hacker discovers reality and rebels against its controllers.",
            poster: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
        }
    ]);
};

function showSuggestions(query) {
    const sug = document.getElementById('suggestions');
    if (!query.trim()) {
        sug.style.display = 'none';
        return;
    }
    // FETCH suggestion from your database via backend autocomplete!
    fetch(`/lookup?query=${encodeURIComponent(query)}`)
      .then(r=>r.json())
      .then(movies => {
        // Remove already picked
        movies = movies.filter(title => !selectedMovies.includes(title));
        if (movies.length === 0) {
          sug.style.display = 'none';
          return;
        }
        sug.innerHTML = movies.map(title => `<div class="suggestion-item" onclick="addPill('${title}')">${title}</div>`).join('');
        sug.style.display = 'block';
      });
}

function addPill(title) {
    selectedMovies.push(title);
    document.getElementById('movieInput').value = '';
    document.getElementById('suggestions').style.display = 'none';
    renderPills();
}

function removePill(title) {
    selectedMovies = selectedMovies.filter(t => t !== title);
    renderPills();
}

function renderPills() {
    const bar = document.getElementById('pill-searchbar');
    // Collect all pills + input
    let pillsHTML = selectedMovies.map(title => `
        <span class="pill">${title}
            <button class="pill-remove" type="button" onclick="removePill('${title}')">&times;</button>
        </span>
    `).join('');
    // Add the input and suggestions back
    pillsHTML += `<input type="text" id="movieInput" class="search-pill-input" autocomplete="off" placeholder="Search movies..." oninput="showSuggestions(this.value)">`;
    pillsHTML += `<div class="suggestions" id="suggestions"></div>`;
    bar.innerHTML = pillsHTML;
}

function submitSearch() {
    // send pills as watched to recommendation API
    if (selectedMovies.length === 0) {
        alert("Please select movies!");
        return;
    }
    fetch('/recommend', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shows: selectedMovies})
    })
    .then(r=>r.json())
    .then(data => {
        renderRecommendations(data.top_shows);
    });
}

// Results cards
function renderRecommendations(recs) {
    if (!recs || !recs.length) {
        document.getElementById('results').innerHTML = '<div style="text-align:center;">No recommendations found.</div>';
        return;
    }
    document.getElementById('results').innerHTML = recs.map(rec => `
        <div class="result-card">
            <img class="result-poster" src="${rec.poster}" alt="${rec.title}">
            <div class="result-title">${rec.title}</div>
            ${rec.year ? `<div class="result-year">${rec.year}</div>` : ''}
            ${rec.desc ? `<div class="result-desc">${rec.desc}</div>` : ''}
        </div>
    `).join('');
}
