import { showsDb } from './shows.js';

const pillContainer = document.getElementById('pill-container');
const searchInput = document.getElementById('search-input');
const suggestions = document.getElementById('suggestions');
const doneBtn = document.getElementById('done-button');
const recGrid = document.getElementById('recommendations');

let watched = [];

function renderPills() {
  pillContainer.innerHTML = '';
  watched.forEach((title, i) => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = title;
    const btn = document.createElement('button');
    btn.textContent = '×';
    btn.onclick = () => {
      watched.splice(i, 1);
      renderPills();
      renderButton();
      recGrid.innerHTML = '';
    };
    pill.appendChild(btn);
    pillContainer.appendChild(pill);
  });
}

function renderButton() {
  doneBtn.disabled = watched.length === 0;
}

function autoSuggest(query) {
  const q = query.toLowerCase();
  return showsDb.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.actors.toLowerCase().includes(q) ||
    item.director.toLowerCase().includes(q)
  ).slice(0, 6);
}

searchInput.addEventListener('input', () => {
  const val = searchInput.value.trim();
  suggestions.innerHTML = '';
  if (val.length < 2) return;
  autoSuggest(val).forEach(m => {
    if (watched.includes(m.title)) return;
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = m.title;
    div.onclick = () => {
      watched.push(m.title);
      renderPills();
      renderButton();
      searchInput.value = '';
      suggestions.innerHTML = '';
      recGrid.innerHTML = '';
    };
    suggestions.appendChild(div);
  });
});

doneBtn.onclick = () => {
  if (watched.length === 0) return;
  const watchedObjs = showsDb.filter(m => watched.includes(m.title));
  function arr(str) {
    return str ? str.split(/,\s*/) : [];
  }
  let allActors = [],
    allDirectors = [],
    allGenre = [];
  watchedObjs.forEach(m => {
    allActors = allActors.concat(arr(m.actors));
    allDirectors = allDirectors.concat(arr(m.director));
    allGenre = allGenre.concat(arr(m.genre));
  });
  const scores = showsDb.map(m => {
    if (watched.includes(m.title)) return { movie: m, score: -1 };
    let score = 0;
    arr(m.actors).forEach(a => {
      if (allActors.includes(a)) score += 2;
    });
    arr(m.director).forEach(d => {
      if (allDirectors.includes(d)) score += 1.5;
    });
    arr(m.genre).forEach(g => {
      if (allGenre.includes(g)) score += 1;
    });
    return { movie: m, score };
  });
  scores.sort((a, b) => b.score - a.score);
  const topN = scores.filter(s => s.score > 0).slice(0, 5);
  recGrid.innerHTML = '';
  if (topN.length == 0) {
    recGrid.innerHTML =
      '<p style="color:#b39cd0;font-weight:600;text-align:center">No relevant recommendations found.</p>';
    return;
  }
  topN.forEach(({ movie }) => {
    const card = document.createElement('div');
    card.className = 'recommend-card';
    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = movie.title;
    const h3 = document.createElement('h3');
    h3.textContent = movie.title;
    const info = document.createElement('div');
    info.className = 'info';
    info.textContent = `${movie.genre} | ${movie.country}`;
    const p = document.createElement('p');
    p.textContent = movie.desc;
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(info);
    card.appendChild(p);
    recGrid.appendChild(card);
  });
};

renderPills();
renderButton();
