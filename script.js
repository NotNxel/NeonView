const moviesDb = [
  // Demo dataset
  { title: 'Dexter', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/zHh8B0RqrFttxh1lENkemE5QMmE.jpg', genre: 'Crime, Drama', director: 'Michael Cuesta', actors: 'Michael C. Hall', country: 'US', desc: 'A Miami forensic expert hides his double life as a serial killer while solving crimes.' },
  { title: 'The Defeated', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ap2Cf1mIhK83rjbjUdR4UKzQ5qg.jpg', genre: 'Thriller, Crime', director: 'Mans Marlind', actors: 'Taylor Kitsch', country: 'DE', desc: 'Set in Berlin during the aftermath of WWII, detectives search for justice.' },
  { title: 'Sade', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/igRUnb6P5a4Aww7JDDn5NbBP9JJ.jpg', genre: 'Drama', director: 'Marie-Amélie,' , actors: 'Daniel Auteuil', country: 'FR', desc: 'A Frenchman tries to survive in 18th-century political turmoil.' },
  { title: 'Christine', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/AoDlvFfYE74tgE2oi4N8E1u4GTZ.jpg', genre: 'Biography, Drama', director: 'Antonio Campos', actors: 'Rebecca Hall, Michael C. Hall', country: 'US', desc: 'The true story of Christine Chubbuck, a news reporter.' },
  { title: 'Boardwalk Empire', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bDkVOj1MYpt9QfxNkX3yQAxpLp7.jpg', genre: 'Crime, Drama, History', director: 'Terence Winter', actors: 'Steve Buscemi, Michael Shannon', country: 'US', desc: 'Atlantic City in the Prohibition era ruled by powerful criminals.' },
  { title: 'Six Feet Under', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/lmoULwbtgVrweqWZWzm7UodPkOn.jpg', genre: 'Drama', director: 'Alan Ball', actors: 'Peter Krause, Michael C. Hall', country: 'US', desc: 'A family runs a funeral home in LA, navigating personal drama.' },
  { title: 'Sherlock', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/iUkrg7JOhL9BiPIv4Hheeh6mWpx.jpg', genre: 'Crime, Mystery', director: 'Paul McGuigan', actors: 'Benedict Cumberbatch', country: 'UK', desc: 'Modern day adaptation of Sherlock Holmes detective stories.' },
  { title: 'True Detective', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7esOKb7bRJ5FzojXN5CCTSZhAWR.jpg', genre: 'Crime, Thriller', director: 'Cary Joji Fukunaga', actors: 'Matthew McConaughey', country: 'US', desc: 'Crime drama series with different detectives investigating grisly crimes.' },
  { title: 'Castle', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/iGaYZBCRsEIAh0Y1rPp5WGLgBcs.jpg', genre: 'Crime, Comedy', director: 'Andrew W. Marlowe', actors: 'Nathan Fillion', country: 'US', desc: 'A mystery novelist teams with an NYPD detective to solve crimes.' }
];

// Case-insensitive fuzzy match
function autoSuggest(query) {
  const q = query.toLowerCase();
  return moviesDb.filter(movie =>
    movie.title.toLowerCase().includes(q) ||
    movie.actors?.toLowerCase().includes(q) ||
    movie.director?.toLowerCase().includes(q)
  ).slice(0,6);
}

let watched = [];
const pillContainer = document.getElementById('pill-container');
const searchInput = document.getElementById('search-input');
const suggestions = document.getElementById('suggestions');
const doneBtn = document.getElementById('done-button');
const recGrid = document.getElementById('recommendations');

function renderPills() {
  pillContainer.innerHTML = '';
  watched.forEach((title, i) => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = title;
    const btn = document.createElement('button');
    btn.textContent = '×';
    btn.onclick = () => {
      watched.splice(i,1);
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

searchInput.addEventListener('input', () => {
  const val = searchInput.value.trim();
  suggestions.innerHTML = '';
  if (val.length < 2) return;
  autoSuggest(val).forEach(m => {
    if(watched.includes(m.title)) return;
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
  // Recommend logic: based on actors, director, genre, etc.
  // Score all movies by how many shared actors, director, or genre with watched list.
  if (watched.length === 0) return;
  const watchedObjs = moviesDb.filter(m => watched.includes(m.title));
  // Helper - create arrays of actors/director/genre
  function arr(str){
    return str ? str.split(/,\s*/) : [];
  }
  // Aggregate features
  let allActors = [], allDirectors = [], allGenre = [];
  watchedObjs.forEach(m => {
    allActors = allActors.concat(arr(m.actors));
    allDirectors = allDirectors.concat(arr(m.director));
    allGenre = allGenre.concat(arr(m.genre));
  });
  // Recommendation score
  const scores = moviesDb.map(m => {
    if (watched.includes(m.title)) return {movie:m,score:-1};
    let score = 0;
    arr(m.actors).forEach(a => {if(allActors.includes(a)) score += 2;});
    arr(m.director).forEach(d => {if(allDirectors.includes(d)) score += 1.5;});
    arr(m.genre).forEach(g => {if(allGenre.includes(g)) score += 1;});
    return {movie:m, score};
  });
  scores.sort((a,b)=>b.score-a.score);
  const topN = scores.filter(s=>s.score>0).slice(0,5);
  recGrid.innerHTML = '';
  if (topN.length == 0) {
    recGrid.innerHTML = '<p style="color:#b39cd0;font-weight:600;text-align:center">No relevant recommendations found.</p>';
    return;
  }
  topN.forEach(({movie}) => {
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
