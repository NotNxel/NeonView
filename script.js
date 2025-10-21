<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Movie Recommendation Demo</title>
<style>
  /* Basic styles to match your existing theme */
  body {
    font-family: 'Montserrat', sans-serif;
    background: #18191A;
    color: #f3f3f3;
    margin: 0;
    padding: 20px;
  }
  #pill-container {
    margin-bottom: 12px;
    min-height: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .pill {
    background: #B39CD0;
    color: #18191A;
    padding: 6px 14px;
    border-radius: 25px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    cursor: default;
  }
  .pill button {
    background: none;
    border: none;
    margin-left: 10px;
    color: #18191A;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .pill button:hover {
    color: #30e5ff;
  }
  #search-input {
    width: 100%;
    max-width: 530px;
    padding: 16px 24px;
    font-size: 1.15rem;
    border-radius: 50px;
    border: none;
    background: #21223A;
    color: #30e5ff;
    box-shadow: inset 0 2px 8px #b39cd022;
    outline: none;
  }
  #suggestions {
    background: #292A38;
    border-radius: 14px;
    margin-top: 4px;
    max-height: 120px;
    overflow-y: auto;
    font-size: 1rem;
    color: #B39CD0;
    max-width: 530px;
  }
  .suggestion-item {
    padding: 12px 20px;
    border-bottom: 1px solid #22223A;
    cursor: pointer;
    font-weight: 600;
  }
  .suggestion-item:last-child {
    border-bottom: none;
  }
  .suggestion-item:hover {
    background: #B39CD0;
    color: #292A38;
  }
  #done-button {
    margin-top: 16px;
    padding: 16px 56px;
    font-size: 1.15rem;
    background: linear-gradient(90deg, #B39CD0 60%, #30e5ff 100%);
    color: #18191A;
    border-radius: 55px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 4px 22px #b39cd0aa;
  }
  #done-button:disabled {
    background: #777;
    color: #222;
    cursor: not-allowed;
    box-shadow: none;
  }
  #done-button:not(:disabled):hover {
    box-shadow: 0 10px 40px #b39cd0cc;
    transform: scale(1.07);
  }
  #recommendations {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
  }
  .recommend-card {
    background: #292A38;
    border-radius: 14px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 0 14px #b39cd034;
  }
  .recommend-card img {
    width: 150px;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 18px #0006;
  }
  .recommend-card h3 {
    margin: 1rem 0 0.5rem 0;
    color: #B39CD0;
    font-weight: bold;
  }
  .recommend-card .info {
    font-size: 0.95rem;
    color: #AAA;
    margin-bottom: 8px;
  }
  .recommend-card p {
    font-size: 1rem;
    color: #f3f3f3;
  }
</style>
</head>
<body>

<div id="pill-container"></div>
<input id="search-input" type="text" placeholder="Search movies or actors..." autocomplete="off" />
<div id="suggestions"></div>
<button id="done-button" disabled>Get Recommendations</button>
<div id="recommendations"></div>

<script>
const moviesDb = [
  { title: 'Dexter', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/zHh8B0RqrFttxh1lENkemE5QMmE.jpg', genre: 'Crime, Drama', director: 'Michael Cuesta', actors: 'Michael C. Hall', country: 'US', desc: 'A Miami forensic expert hides his double life as a serial killer while solving crimes.' },
  { title: 'The Defeated', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ap2Cf1mIhK83rjbjUdR4UKzQ5qg.jpg', genre: 'Thriller, Crime', director: 'Mans Marlind', actors: 'Taylor Kitsch', country: 'DE', desc: 'Set in Berlin during the aftermath of WWII, detectives search for justice.' },
  { title: 'Sade', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/igRUnb6P5a4Aww7JDDn5NbBP9JJ.jpg', genre: 'Drama', director: 'Marie-Amélie', actors: 'Daniel Auteuil', country: 'FR', desc: 'A Frenchman tries to survive in 18th-century political turmoil.' },
  { title: 'Christine', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/AoDlvFfYE74tgE2oi4N8E1u4GTZ.jpg', genre: 'Biography, Drama', director: 'Antonio Campos', actors: 'Rebecca Hall, Michael C. Hall', country: 'US', desc: 'The true story of Christine Chubbuck, a news reporter.' },
  { title: 'Boardwalk Empire', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bDkVOj1MYpt9QfxNkX3yQAxpLp7.jpg', genre: 'Crime, Drama, History', director: 'Terence Winter', actors: 'Steve Buscemi, Michael Shannon', country: 'US', desc: 'Atlantic City in the Prohibition era ruled by powerful criminals.' },
  { title: 'Six Feet Under', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/lmoULwbtgVrweqWZWzm7UodPkOn.jpg', genre: 'Drama', director: 'Alan Ball', actors: 'Peter Krause, Michael C. Hall', country: 'US', desc: 'A family runs a funeral home in LA, navigating personal drama.' },
  { title: 'Sherlock', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/iUkrg7JOhL9BiPIv4Hheeh6mWpx.jpg', genre: 'Crime, Mystery', director: 'Paul McGuigan', actors: 'Benedict Cumberbatch', country: 'UK', desc: 'Modern day adaptation of Sherlock Holmes detective stories.' },
  { title: 'True Detective', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/7esOKb7bRJ5FzojXN5CCTSZhAWR.jpg', genre: 'Crime, Thriller', director: 'Cary Joji Fukunaga', actors: 'Matthew McConaughey', country: 'US', desc: 'Crime drama series with different detectives investigating grisly crimes.' },
  { title: 'Castle', poster: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/iGaYZBCRsEIAh0Y1rPp5WGLgBcs.jpg', genre: 'Crime, Comedy', director: 'Andrew W. Marlowe', actors: 'Nathan Fillion', country: 'US', desc: 'A mystery novelist teams with an NYPD detective to solve crimes.' }
];

// Case-insensitive fuzzy search
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
  if (watched.length === 0) return;
  const watchedObjs = moviesDb.filter(m => watched.includes(m.title));
  function arr(str){
    return str ? str.split(/,\s*/) : [];
  }
  let allActors = [], allDirectors = [], allGenre = [];
  watchedObjs.forEach(m => {
    allActors = allActors.concat(arr(m.actors));
    allDirectors = allDirectors.concat(arr(m.director));
    allGenre = allGenre.concat(arr(m.genre));
  });
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
</script>

</body>
</html>
