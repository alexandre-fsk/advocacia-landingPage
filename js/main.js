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

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });
}

// Highlight active section in navbar
const sections = document.querySelectorAll('main section');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for nav links
navItems.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonials-grid blockquote');
const leftArrow = document.querySelector('.testimonial-arrow.left');
const rightArrow = document.querySelector('.testimonial-arrow.right');
let testimonialIndex = 0;
function showTestimonial(idx) {
  testimonials.forEach((el, i) => {
    el.style.display = i === idx ? 'block' : 'none';
  });
}
if (testimonials.length) {
  showTestimonial(testimonialIndex);
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
    rightArrow.addEventListener('click', () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    });
  }
}

// Floating label support for contact form
const formGroups = document.querySelectorAll('.form-group input, .form-group textarea');
formGroups.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.value) {
      this.classList.add('filled');
    } else {
      this.classList.remove('filled');
    }
  });
});

// Contact form validation and feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]');
    const email = contactForm.querySelector('[name="email"]');
    const message = contactForm.querySelector('[name="message"]');
    const feedback = contactForm.querySelector('.form-feedback');
    let valid = true;
    if (!name.value.trim()) {
      valid = false;
      name.classList.add('error');
    } else {
      name.classList.remove('error');
    }
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      valid = false;
      email.classList.add('error');
    } else {
      email.classList.remove('error');
    }
    if (!message.value.trim()) {
      valid = false;
      message.classList.add('error');
    } else {
      message.classList.remove('error');
    }
    if (valid) {
      feedback.textContent = 'Mensagem enviada com sucesso!';
      feedback.style.color = 'green';
      contactForm.reset();
      formGroups.forEach(input => input.classList.remove('filled'));
    } else {
      feedback.textContent = 'Por favor, preencha todos os campos corretamente.';
      feedback.style.color = 'red';
    }
  });
}

// Tooltips for social icons
const socialLinks = document.querySelectorAll('.social-icons a');
socialLinks.forEach(link => {
  link.addEventListener('focus', function() {
    this.setAttribute('title', this.getAttribute('aria-label'));
  });
}); 