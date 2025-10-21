

// Your new showsDb dataset integrated below
const showsDb = [
  {
    title: 'Dexter',
    poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p185267_b_v8_ac.jpg',
    genre: 'Crime, Drama',
    director: 'Michael Cuesta',
    actors: 'Michael C. Hall',
    country: 'US',
    desc: 'A Miami forensic expert hides his double life as a serial killer while solving crimes.'
  },
  {
    title: 'Breaking Bad',
    poster: 'https://resizing.flixster.com/PLUQRzpsaCQazJPOsdc6CI4AxIk=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8696131_b_h9_aa.jpg',
    genre: 'Crime, Drama, Thriller',
    director: 'Vince Gilligan',
    actors: 'Bryan Cranston',
    country: 'US',
    desc: 'A chemistry teacher turned methamphetamine manufacturer faces moral dilemmas and law enforcement.'
  },
  {
    title: 'Stranger Things',
    poster: 'https://resizing.flixster.com/98TQcHJjUJSBLBmiig7_U7Kadyg=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12991665_b_h9_aa.jpg',
    genre: 'Drama, Fantasy, Horror',
    director: 'The Duffer Brothers',
    actors: 'Millie Bobby Brown',
    country: 'US',
    desc: 'Kids confront supernatural forces in a small town.'
  },
  {
    title: 'Squid Game',
    poster: 'https://resizing.flixster.com/6F48KCzRu11SMjGcFGBwv4Q6LTg=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p20492218_b_v8_ae.jpg',
    genre: 'Drama, Thriller',
    director: 'Hwang Dong-hyuk',
    actors: 'Lee Jung-jae',
    country: 'KR',
    desc: 'Contestants risk their lives in deadly games.'
  },
  {
    title: 'Peacemaker',
    poster: 'https://resizing.flixster.com/YjquXjsEOPntiHVUvZlTljYnlZw=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNDJkODE0MDctYjAzNy00MWIyLTlmMjgtZDM5YWY3MDI0YjUzLmpwZw==',
    genre: 'Action, Comedy, Superhero',
    director: 'James Gunn',
    actors: 'John Cena',
    country: 'US',
    desc: 'A flawed antihero fights for peace at any cost.'
  },
  {
    title: 'Dexter: Resurrection',
    poster: 'https://resizing.flixster.com/Y4hsqPBGzSlx9x8p0GTrUVuGj6E=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p30176692_b_v13_ae.jpg',
    genre: 'Crime, Drama',
    director: 'Charles H. Eglee',
    actors: 'Michael C. Hall',
    country: 'US',
    desc: 'The return of Dexter Morgan after faked death.'
  },
  {
    title: 'Dexter: New Blood',
    poster: 'https://m.media-amazon.com/images/M/MV5BZGY4YjY5MGItNzM2NS00Y2M1LWFkYTYtZjI0ZDk3NTE0NmE0XkEyXkFqcGc@._V1_.jpg',
    genre: 'Crime, Drama',
    director: 'Edison Krebs',
    actors: 'Michael C. Hall',
    country: 'US',
    desc: 'Dexter starts a new life in upstate New York.'
  },
  {
    title: 'Dexter: Original Sin',
    poster: 'https://resizing.flixster.com/0ZR_MoGv9oXxpLhDahhS_iOKlxE=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28319476_b_h9_ac.jpg',
    genre: 'Crime, Drama',
    director: 'Anton Cropper',
    actors: 'Clancy Brown',
    country: 'US',
    desc: 'New chapter in Dexter saga with dark secrets.'
  },
  {
    title: 'Better Call Saul',
    poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13837077_b_v8_av.jpg',
    genre: 'Crime, Drama',
    director: 'Vince Gilligan',
    actors: 'Bob Odenkirk',
    country: 'US',
    desc: 'The story of Jimmy McGill before he became Saul Goodman.'
  },
  {
    title: 'The Sopranos',
    poster: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p184487_b_v8_bg.jpg',
    genre: 'Crime, Drama',
    director: 'David Chase',
    actors: 'James Gandolfini',
    country: 'US',
    desc: 'New Jersey mob boss copes with personal and professional issues.'
  },
  {
    title: 'Supernatural',
    poster: 'https://resizing.flixster.com/om9VCp1cZlY13TCNV5BdtBXIKVY=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p185113_b_h8_bg.jpg',
    genre: 'Drama, Fantasy, Horror',
    director: 'Eric Kripke',
    actors: 'Jared Padalecki, Jensen Ackles',
    country: 'US',
    desc: 'Brothers hunt supernatural creatures while facing dark forces.'
  }
];

// Combine moviesDb and showsDb into one for search and recommendation (optional)
const combinedDb = [...showsDb];

// Case-insensitive fuzzy match function adapted for combinedDb (use whichever dataset you want)
function autoSuggest(query) {
  const q = query.toLowerCase();
  return combinedDb.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.actors.toLowerCase().includes(q) ||
    item.director.toLowerCase().includes(q)
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
  const watchedObjs = combinedDb.filter(m => watched.includes(m.title));
  function arr(str){
    return str ? str.split(/,\s*/) : [];
  }
  let allActors = [], allDirectors = [], allGenre = [];
  watchedObjs.forEach(m => {
    allActors = allActors.concat(arr(m.actors));
    allDirectors = allDirectors.concat(arr(m.director));
    allGenre = allGenre.concat(arr(m.genre));
  });
  const scores = combinedDb.map(m => {
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
