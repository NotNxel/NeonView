function getRecommendations() {
    const shows = document.getElementById('watched').value
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    document.getElementById('results').innerHTML = 'Getting recommendations...';

    fetch('http://127.0.0.1:5000/recommend', { // change this to your online backend later!
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shows: shows})
    })
    .then(response => response.json())
    .then(data => {
        if (data.top_shows && data.top_shows.length > 0) {
            document.getElementById('results').innerHTML =
                '<h2 style="color:#19ffe6;margin-bottom:0.7em;">Top Recommendations:</h2>' +
                '<ul>' + data.top_shows.map(
                    show => `<li>${show}</li>`
                ).join('') + '</ul>';
        } else {
            document.getElementById('results').innerHTML = 'No recommendations found.';
        }
    })
    .catch(err => {
        document.getElementById('results').innerHTML = 'Error: Unable to connect to backend.';
    });
}
