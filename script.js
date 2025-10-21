const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');
const pillContainer = document.getElementById('pill-container');
const doneButton = document.getElementById('done-button');
const recommendationsDiv = document.getElementById('recommendations');

let watchedShows = [];

function updatePills() {
  pillContainer.innerHTML = '';
  watchedShows.forEach((title, idx) => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = title;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.onclick = () => {
      watchedShows.splice(idx, 1);
      updatePills();
      updateDoneButton();
      clearRecommendations();
    };
    pill.appendChild(removeBtn);

    pillContainer.appendChild(pill);
  });
}

function updateDoneButton() {
  doneButton.disabled = watchedShows.length === 0;
}

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  suggestionsBox.innerHTML = '';
  if (query.length < 2) return;

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const suggestions = await res.json();

    suggestions.forEach(({title, poster_url}) => {
      // Don't show already selected titles
      if (watchedShows.includes(title)) return;

      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = title;
      item.onclick = () => {
        watchedShows.push(title);
        updatePills();
        updateDoneButton();
        searchInput.value = '';
        suggestionsBox.innerHTML = '';
        clearRecommendations();
      };
      suggestionsBox.appendChild(item);
    });
  } catch(e) {
    console.error('Search failed', e);
  }
});

doneButton.onclick = async () => {
  if (watchedShows.length === 0) return;
  recommendationsDiv.innerHTML = '<p>Loading recommendations...</p>';
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({watched: watchedShows}),
    });
    const data = await res.json();
    renderRecommendations(data.recommendations);
  } catch(e) {
    recommendationsDiv.innerHTML = `<p>Error loading recommendations.</p>`;
    console.error(e);
  }
};

function renderRecommendations(recommendations) {
  if (!recommendations.length) {
    recommendationsDiv.innerHTML = '<p>No recommendations found.</p>';
    return;
  }
  recommendationsDiv.innerHTML = '';
  recommendations.forEach(rec => {
    const card = document.createElement('div');
    card.className = 'recommendation-card';

    const img = document.createElement('img');
    img.src = rec.poster_url || '';
    img.alt = rec.title;

    const title = document.createElement('h3');
    title.textContent = rec.title;

    const desc = document.createElement('p');
    desc.textContent = rec.description.length > 120 ? rec.description.slice(0, 117) + '...' : rec.description;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    recommendationsDiv.appendChild(card);
  });
}

function clearRecommendations() {
  recommendationsDiv.innerHTML = '';
}

// Initialize button state
updateDoneButton();
