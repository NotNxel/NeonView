@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');

body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: #050905;
    min-height: 100vh;
    overflow-x: hidden;
}
#bgVideo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    opacity: 0.40;
    filter: blur(1.6px) brightness(0.46) saturate(1.1);
}

.main-header {
    max-width: 820px;
    margin: 6vh auto 3.5vh auto;
    padding: 2rem 3vw;
    background: linear-gradient(90deg, #18ff58 0%, #186027 100%);
    color: #031309;
    border-radius: 30px;
    box-shadow: 0 0 42px 0 #22ff5066;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main-header h1 {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin: 0;
    background: none;
    -webkit-text-fill-color: unset;
    color: #061e0e;
    text-shadow: 0 2px 12px #13ff6658, 0 0 1px #fff;
}

/* Searchbar Pills Section */
.pill-search-section {
    max-width: 600px;
    margin: 2em auto 1.7em auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#searchform {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1em;
}

.pill-searchbar {
    min-height: 54px;
    width: 100%;
    background: rgba(240,255,240,0.17);
    border-radius: 28px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 0 2px 12px 1px rgba(50,255,100,0.14);
    padding: 0.25em 0.8em 0.25em 1em;
    position: relative;
    backdrop-filter: blur(11.5px);
    -webkit-backdrop-filter: blur(11.5px);
}

.search-pill-input {
    flex: 1 1 auto;
    min-width: 120px;
    max-width: 320px;
    font-size: 1.14em;
    border: none;
    outline: none;
    background: transparent;
    color: #def9cf;
    margin: 0.25em 0;
    padding: 0.57em 0.9em 0.57em 0.2em;
    font-weight: 500;
}
.search-pill-input::placeholder {
    color: #a7e2be;
    opacity: 0.93;
    font-weight: 500;
}

.pill {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg,#18ff58 50%,#12bb3c 100%);
    color: #092e13;
    border-radius: 20px;
    box-shadow: 0 1px 3px #15ea4aa2;
    font-size: 1.05em;
    margin: 0.18em 0.36em 0.18em 0;
    padding: 0.33em 1.1em 0.33em 1.1em;
    font-weight: 700;
    position: relative;
    z-index: 2;
}
.pill .pill-remove {
    cursor: pointer;
    margin-left: 0.76em;
    background: #0f2e16;
    color: #18ff58;
    border-radius: 50%;
    border: none;
    padding: 0.09em 0.54em;
    font-size: 1em;
    font-weight: 900;
    outline: none;
    transition: background .12s;
}
.pill .pill-remove:hover {background: #16e946;color:#fff;}

.suggestions {
    position: absolute;
    left: 0.6em;
    top: 100%;
    width: 98%;
    background: #092314;
    z-index: 3;
    border-radius: 0 0 13px 13px;
    box-shadow: 0 10px 40px #050 0.13;
    max-height: 230px;
    overflow-y: auto;
    display: none;
}

.suggestion-item {
    padding: 0.7em 1.1em;
    font-size: 1.07em;
    color: #d0ffd0;
    border-bottom: 1px solid #18ff5813;
    cursor: pointer;
    transition: background .12s,color .14s;
}
.suggestion-item:last-child { border-bottom: none; }
.suggestion-item:hover { background: #15ea4a36; color: #fff; }

/* Search button */
.search-btn {
    width: 70%;
    margin: 1.7em auto;
    display: block;
    background: linear-gradient(90deg,#18ff58 25%,#146e26 100%);
    color: #031309;
    font-size: 1.18em;
    font-weight: 800;
    border: none;
    border-radius: 13em;
    padding: 1em 0;
    cursor: pointer;
    box-shadow: 0 8px 38px 0 #18ff584b;
    outline: none;
    transition: background .16s,color .17s,transform .11s;
    letter-spacing: 0.11em;
}
.search-btn:hover {
    background: linear-gradient(90deg,#12bb3c 15%,#18ff58 100%);
    color: #020b05;
    transform: scale(1.03);
}
.search-btn:active {
    color: #13b840;
    background: linear-gradient(90deg,#13dd52 15%,#146e26 100%);
    transform: scale(0.99);
}

/* Results - show your cards as before */
.result-section {
    font-weight: 700;
    font-size: 1.24em;
    letter-spacing: 0.1em;
    color: #18ff58;
    text-shadow: 0 0 9px #11b84844;
    margin: 3em 0 1em 0.1vw;
    text-align: left;
}
#results {
    display: flex;
    gap: 1.4em;
    padding: 0.1em 0 2.5em 0;
    min-height: 2rem;
    overflow-x: auto;
    scrollbar-width: thin;
    align-items: flex-start;
}
.result-card {
    min-width: 180px;
    max-width: 210px;
    background: #05180b;
    border-radius: 18px;
    border: 2.5px solid #18ff5860;
    box-shadow: 0 2.5px 14px 0 #18ff582c;
    padding: 1.2em 1em 0.9em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow .21s, transform .18s;
    position: relative;
}
.result-card:hover {
    box-shadow: 0 9px 39px 2px #18ff58b5;
    transform: translateY(-5px) scale(1.04);
    border-color: #18ff58;
}
.result-poster {
    width: 100px;
    height: 133px;
    object-fit: cover;
    border-radius: 13px;
    box-shadow: 0 0 12px #18ff581a;
    background: #083a10;
    margin-bottom: 0.8em;
}
.result-title { font-size: 1.08em; font-weight: 700; color: #19ff5c; margin-bottom: 0.14em; text-align: center; }
.result-year { font-size: 0.96em; color: #13dd52; opacity: 0.7; margin-bottom: 0.21em; text-align: center; }
.result-desc { font-size: 0.96em; color: #b9fff0; opacity: 0.90; text-align: center; margin-bottom: 0.3em; }

@media (max-width: 700px) {
    .main-header {padding: 1.4rem 3vw;}
    .main-header h1 {font-size: 1.65rem;}
    #results {gap: 0.85em;}
    .result-card {min-width: 140px;}
}
