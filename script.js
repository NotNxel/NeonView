const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');
const pillContainer = document.getElementById('pill-container');
const doneButton = document.getElementById('done-button');
const recommendationsDiv = document.getElementById('recommendations');

let watched = [];

function renderPills() {
  pillContainer.innerHTML = '';
  watched.forEach((title, i) => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = title;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.onclick = () => {
      watched.splice(i, 1);
      renderPills();
      updateDoneState();
      recommendationsDiv.innerHTML = '';
    };
    pill.appendChild(removeBtn);
    pillContainer.appendChild(pill);
  });
}

function updateDoneState() {
  doneButton.disabled = watched.length === 0;
}

searchInput.addEventListener('input', async () => {
  const val = searchInput.value.trim();
  suggestionsBox.innerHTML = '';
  if (val.length < 2) return;

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
    const results = await res.json();

    results.forEach(item => {
      if (watched.includes(item.title)) return;
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = item.title;
      div.onclick = () => {
        watched.push(item.title);
        renderPills();
        updateDoneState();
        searchInput.value = '';
        suggestionsBox.innerHTML = '';
        recommendationsDiv.innerHTML = '';
      };
      suggestionsBox.appendChild(div);
    });
  } catch (e) {
    console.error(e);
  }
});

doneButton.addEventListener('click', async () => {
  if (watched.length === 0) return;
  recommendationsDiv.innerHTML = '<p>Loading recommendations...</p>';
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({watched})
    });
    const recs = await res.json();
    renderRecommendations(recs);
  } catch (e) {
    recommendationsDiv.innerHTML = '<p>Error loading recommendations.</p>';
    console.error(e);
  }
});

function renderRecommendations(recs) {
  if (!recs.length) {
    recommendationsDiv.innerHTML = '<p>No recommendations found.</p>';
    return;
  }
  recommendationsDiv.innerHTML = '';
  recs.forEach(item => {
    const card = document.createElement('div');
    card.className = 'recommend-card';

    const img = document.createElement('img');
    img.src = item.poster || 'fallback.jpg';
    img.alt = item.title;

    const title = document.createElement('h3');
    title.textContent = item.title;

    const info = document.createElement('div');
    info.className = 'info';
    info.textContent = (item.genres ? item.genres.join(', ') : '') + (item.country ? ' | ' + item.country : '');

    const desc = document.createElement('p');
    desc.textContent = item.description || '';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(info);
    card.appendChild(desc);
    recommendationsDiv.appendChild(card);
  });
}

// Initialize button state
updateDoneState();
renderPills();
