document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('query').value.trim();
  const resultsEl = document.getElementById('results');

  if (query.length === 0) {
    resultsEl.textContent = '';
    return;
  }

  // Simulate search result display; replace this with actual API call integration
  resultsEl.textContent = `You searched for: "${query}" — recommendation engine coming soon!`;
});
