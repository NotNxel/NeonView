function doneAction() {
  alert('Done! (Add your own action here.)');
}

function renderRecommendations(recs) {
    if (!recs.length) {
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

// Show new set on load with your custom Dexter image
window.onload = function(){
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
}
