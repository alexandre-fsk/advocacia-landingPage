// GSAP Animations
window.addEventListener('DOMContentLoaded', () => {
  // Navbar fade-in
  gsap.from('.navbar', { y: -60, opacity: 0, duration: 1, ease: 'power2.out' });

  // Hero content animation
  gsap.from('.hero-content h1', { y: 40, opacity: 0, duration: 1, delay: 0.3 });
  gsap.from('.hero-content p', { y: 40, opacity: 0, duration: 1, delay: 0.5 });
  gsap.from('.cta-btn', { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.8 });

  // Section titles
  gsap.utils.toArray('section h2').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1
    });
  });

  // Service cards
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.1
    });
  });

  // Team members
  gsap.utils.toArray('.team-member').forEach((member, i) => {
    gsap.from(member, {
      scrollTrigger: {
        trigger: member,
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.1
    });
  });

  // Testimonials
  gsap.utils.toArray('.testimonials-grid blockquote').forEach((quote, i) => {
    gsap.from(quote, {
      scrollTrigger: {
        trigger: quote,
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.1
    });
  });

  // Contact form
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 90%',
    },
    y: 40,
    opacity: 0,
    duration: 0.8
  });
});

// Algolia Search Integration
// Replace with your Algolia credentials
const ALGOLIA_APP_ID = 'YourAlgoliaAppID';
const ALGOLIA_SEARCH_KEY = 'YourAlgoliaSearchKey';
const ALGOLIA_INDEX = 'YourAlgoliaIndex';

if (ALGOLIA_APP_ID !== 'YourAlgoliaAppID') {
  const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
  const index = searchClient.initIndex(ALGOLIA_INDEX);

  const searchInput = document.getElementById('algolia-search');
  const resultsContainer = document.getElementById('search-results');

  searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
      resultsContainer.innerHTML = '';
      return;
    }
    try {
      const { hits } = await index.search(query, { hitsPerPage: 5 });
      if (hits.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
      }
      resultsContainer.innerHTML = hits.map(hit => `
        <div class="search-hit">
          <strong>${hit.title || hit.name}</strong><br>
          <span>${hit.description || ''}</span>
        </div>
      `).join('');
    } catch (err) {
      resultsContainer.innerHTML = '<p>Erro ao buscar resultados.</p>';
    }
  });
}

// Optional: Add some style for search results
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .search-hit {
      background: #f7f7f7;
      border-radius: 8px;
      padding: 0.8rem 1rem;
      margin-bottom: 0.7rem;
      box-shadow: 0 2px 8px rgba(26,35,126,0.05);
      color: #222;
    }
    .search-hit strong {
      color: #1a237e;
    }
  `;
  document.head.appendChild(style);
}); 