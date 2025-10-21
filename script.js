document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('query').value.trim();
  const resultsEl = document.getElementById('results');

  if (query.length === 0) {
    resultsEl.textContent = '';
    return;
  }

  // Placeholder: show search text, connect to your logic/backend here
  resultsEl.textContent = `You searched for: "${query}" — recommendation engine coming soon!`;
});

