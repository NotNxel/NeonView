// ✅ Final Expanded showsDb Dataset
// ✅ Final Hybrid showsDb (Yours kept, mine fixed with working posters)
const showsDb = [
  // Your shows (unchanged)
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
    title: 'Supernatural',
    poster: 'https://resizing.flixster.com/om9VCp1cZlY13TCNV5BdtBXIKVY=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p185113_b_h8_bg.jpg',
    genre: 'Drama, Fantasy, Horror',
    director: 'Eric Kripke',
    actors: 'Jared Padalecki, Jensen Ackles',
    country: 'US',
    desc: 'Brothers hunt supernatural creatures while facing dark forces.'
  },

  // Replaced posters (my titles only; all TMDB clean)
  {
    title: 'Batman Begins',
    poster: 'https://image.tmdb.org/t/p/w342/1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg',
    genre: 'Action, Crime, Drama',
    director: 'Christopher Nolan',
    actors: 'Christian Bale',
    country: 'US',
    desc: 'Bruce Wayne becomes Batman to fight the forces threatening Gotham City.'
  },
  {
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    genre: 'Action, Crime, Drama, Thriller',
    director: 'Christopher Nolan',
    actors: 'Christian Bale, Heath Ledger',
    country: 'US',
    desc: 'Batman faces chaos unleashed by the Joker in Gotham City.'
  },
  {
    title: 'The Dark Knight Rises',
    poster: 'https://image.tmdb.org/t/p/w342/dEYnvnUfXrqvqeRSqvIEtmzhoA8.jpg',
    genre: 'Action, Crime, Drama, Thriller',
    director: 'Christopher Nolan',
    actors: 'Christian Bale, Tom Hardy, Anne Hathaway',
    country: 'US',
    desc: 'A reclusive Bruce Wayne returns to defend Gotham from Bane.'
  },
  {
    title: 'The Matrix',
    poster: 'https://image.tmdb.org/t/p/w342/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    genre: 'Action, Sci-Fi',
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: 'Keanu Reeves, Carrie-Anne Moss, Laurence Fishburne',
    country: 'US',
    desc: 'A hacker discovers a dystopian world controlled by machines.'
  },
  {
    title: 'The Matrix Reloaded',
    poster: 'https://image.tmdb.org/t/p/w342/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg',
    genre: 'Action, Sci-Fi',
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    country: 'US',
    desc: 'Neo continues his battle against the machines as he learns more about the Matrix.'
  },
  {
    title: 'Iron Man',
    poster: 'https://image.tmdb.org/t/p/w342/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    genre: 'Action, Adventure, Sci-Fi',
    director: 'Jon Favreau',
    actors: 'Robert Downey Jr., Gwyneth Paltrow, Jeff Bridges',
    country: 'US',
    desc: 'Tony Stark builds the Iron Man suit to fight evil after being captured.'
  },
  {
    title: 'Iron Man 2',
    poster: 'https://image.tmdb.org/t/p/w342/ArqQUK6fXW5tvJxnrUfyqzn1jAY.jpg',
    genre: 'Action, Adventure, Sci-Fi',
    director: 'Jon Favreau',
    actors: 'Robert Downey Jr., Scarlett Johansson, Mickey Rourke',
    country: 'US',
    desc: 'Tony Stark faces new enemies and rivals while the world learns about Iron Man.'
  },
  {
    title: 'Iron Man 3',
    poster: 'https://image.tmdb.org/t/p/w342/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
    genre: 'Action, Adventure, Sci-Fi',
    director: 'Shane Black',
    actors: 'Robert Downey Jr., Gwyneth Paltrow, Ben Kingsley',
    country: 'US',
    desc: 'After the events of Avengers, Tony Stark faces a powerful new foe: the Mandarin.'
  },
  {
    title: 'Avengers: Endgame',
    poster: 'https://image.tmdb.org/t/p/w342/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    genre: 'Action, Adventure, Sci-Fi',
    director: 'Anthony Russo, Joe Russo',
    actors: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
    country: 'US',
    desc: 'The Avengers unite to undo Thanos’s devastating snap.'
  },
  {
    title: 'Spider-Man: No Way Home',
    poster: 'https://image.tmdb.org/t/p/w342/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    genre: 'Action, Adventure, Sci-Fi',
    director: 'Jon Watts',
    actors: 'Tom Holland, Zendaya, Benedict Cumberbatch',
    country: 'US',
    desc: 'Spider-Man faces multiverse villains while confronting his own identity.'
  },
  {
    title: 'Money Heist',
    poster: 'https://image.tmdb.org/t/p/w342/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    genre: 'Action, Crime, Thriller',
    director: 'Álex Pina',
    actors: 'Úrsula Corberó, Álvaro Morte',
    country: 'ES',
    desc: 'A criminal mastermind plans the biggest heist in Spain’s history.'
  },
  {
    title: 'Prison Break',
    poster: 'https://image.tmdb.org/t/p/w342/fvYQwh4m2x0ijcyf5q8pVZgKtmS.jpg',
    genre: 'Action, Crime, Drama, Thriller',
    director: 'Paul Scheuring',
    actors: 'Wentworth Miller, Dominic Purcell',
    country: 'US',
    desc: 'A man intentionally gets imprisoned to help his brother escape death row.'
  },
  {
    title: 'Friends',
    poster: 'https://image.tmdb.org/t/p/w342/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
    genre: 'Comedy, Romance',
    director: 'David Crane, Marta Kauffman',
    actors: 'Jennifer Aniston, Courteney Cox, Matthew Perry',
    country: 'US',
    desc: 'Six friends navigate life and relationships in New York City.'
  },
  {
    title: 'Moon Knight',
    poster: 'https://image.tmdb.org/t/p/w342/yxMpoHO0CXP5o9gB7IfsciilQS4.jpg',
    genre: 'Action, Adventure, Fantasy, Superhero',
    director: 'Mohamed Diab',
    actors: 'Oscar Isaac, Ethan Hawke',
    country: 'US',
    desc: 'A man battles dissociative identity disorder and confronts Egyptian gods.'
  },
  {
    title: 'Loki',
    poster: 'https://image.tmdb.org/t/p/w342/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg',
    genre: 'Action, Fantasy, Sci-Fi',
    director: 'Kate Herron',
    actors: 'Tom Hiddleston, Owen Wilson',
    country: 'US',
    desc: 'The God of Mischief navigates the chaos of the multiverse.'
  },
  {
    title: 'The Mandalorian',
    poster: 'https://image.tmdb.org/t/p/w342/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
    genre: 'Action, Adventure, Sci-Fi',
    director: 'Jon Favreau',
    actors: 'Pedro Pascal',
    country: 'US',
    desc: 'A lone bounty hunter explores the outer reaches of the galaxy.'
  }
];

// ✅ Combined Database
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
