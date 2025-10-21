const searchInput = document.getElementById('search-input');
const suggestionsDiv = document.getElementById('suggestions');
const pillsDiv = document.getElementById('watched-pills');
const recommendBtn = document.getElementById('recommend-btn');
const recommendationsDiv = document.getElementById('recommendations');

let watched = [];

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  suggestionsDiv.innerHTML = '';
  if (query.length < 2) return;

  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  data.forEach(item => {
    if (watched.includes(item.name)) return;
    const div = document.createElement('div');
    div.textContent = item.name;
    div.className = 'suggestion-item';
    div.onclick = () => {
      watched.push(item.name);
      renderPills();
      recommendBtn.disabled = false;
      searchInput.value = '';
      suggestionsDiv.innerHTML = '';
      recommendationsDiv.innerHTML = '';
    };
    suggestionsDiv.appendChild(div);
  });
});

function renderPills() {
  pillsDiv.innerHTML = '';
  watched.forEach((name, index) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = name + ' ×';
    pill.onclick = () => {
      watched.splice(index, 1);
      renderPills();
      if (watched.length === 0) recommendBtn.disabled = true;
      recommendationsDiv.innerHTML = '';
    };
    pillsDiv.appendChild(pill);
  });
}

recommendBtn.addEventListener('click', async () => {
  if (watched.length === 0) return;

  recommendationsDiv.innerHTML = '<p>Loading recommendations...</p>';
  const res = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ watched }),
  });
  const recs = await res.json();
  renderRecommendations(recs);
});

function renderRecommendations(items) {
  recommendationsDiv.innerHTML = '';
  if (!items.length) {
    recommendationsDiv.innerHTML = '<p>No recommendations found.</p>';
    return;
  }
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'recommend-card';
    div.innerHTML = `
      <img src="${item.poster}" alt="${item.name}" width="150" />
      <h3>${item.name}</h3>
      <p>${item.genre || ''}</p>
      <p>${item.description || ''}</p>
      <p>IMDb: ${item.imdb_rating || 'N/A'}</p>
    `;
    recommendationsDiv.appendChild(div);
  });
}

renderPills();
recommendBtn.disabled = true;
