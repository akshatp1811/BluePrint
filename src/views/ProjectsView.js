/* ==========================================================================
   BLUE PRINT - Projects Portfolio Page View
   Connected with blueprint-inspired navy grid header and refined project cards
   ========================================================================== */

import { projects } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const ProjectsView = {
  currentCategory: 'all',

  async render() {
    const categories = ['all', 'interiors', 'architecture', 'commercial'];
    
    const filterButtonsMarkup = categories
      .map(cat => {
        const isActive = this.currentCategory === cat;
        return `
          <button class="blueprint-filter-btn ${isActive ? 'active' : ''}" data-filter="${cat}">
            ${cat}
          </button>
        `;
      })
      .join('');

    // Initial render displays all projects
    const cardsMarkup = this.renderProjectCards(projects);

    return `
      <!-- Blueprint Grid Navy Hero Header -->
      <section class="blueprint-grid-bg projects-blueprint-hero">
        <div class="container projects-hero-inner">
          <div class="projects-pill reveal-fade-up">PORTFOLIO ARCHIVE</div>
          <h1 class="projects-title font-serif reveal-fade-up">selected works</h1>
          <p class="projects-subtitle reveal-fade-up">
            spaces drawn with intention, built with precision across residential, commercial, and interior sectors.
          </p>
        </div>
      </section>

      <!-- Architectural Scale Divider -->
      <div class="scale-ruler-bar" aria-hidden="true"></div>

      <!-- Projects Grid Section -->
      <section class="projects-section">
        <div class="container">
          <!-- Filter Bar -->
          <div class="filter-bar reveal-fade-up">
            ${filterButtonsMarkup}
          </div>

          <!-- Portfolio Grid container -->
          <div class="blueprint-work-grid" id="portfolio-grid-container">
            ${cardsMarkup}
          </div>
        </div>
      </section>
    `;
  },

  renderProjectCards(filteredProjects) {
    if (filteredProjects.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-xl) 0;">
          <p style="color: var(--color-text-muted);">No projects found in this category.</p>
        </div>
      `;
    }

    return filteredProjects
      .map(project => {
        return `
          <article class="blueprint-project-card reveal-fade-up" data-project-id="${project.id}">
            <div class="blueprint-card-image-wrap">
              <img src="${project.heroImage}" alt="${project.title}" class="blueprint-card-img" loading="lazy">
              <span class="blueprint-card-badge">${project.category}</span>
            </div>
            <div class="blueprint-card-meta">
              <h3 class="blueprint-card-title">${project.title}</h3>
              <div class="blueprint-card-location">${project.location}</div>
            </div>
          </article>
        `;
      })
      .join('');
  },

  init(params, router) {
    // 1. Run scroll reveal animations
    setupScrollReveals();

    // 2. Click Handler on Project Cards for SPA routing
    const bindCardClicks = () => {
      const cards = document.querySelectorAll('.blueprint-project-card[data-project-id]');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const projectId = card.getAttribute('data-project-id');
          router.navigate(`/project/${projectId}`, 'projects');
        });
      });
    };

    bindCardClicks();

    // 3. Category Filter buttons logic
    const filterButtons = document.querySelectorAll('.blueprint-filter-btn');
    const gridContainer = document.getElementById('portfolio-grid-container');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCat = btn.getAttribute('data-filter');
        this.currentCategory = selectedCat;

        let filteredProjects = projects;
        if (selectedCat !== 'all') {
          filteredProjects = projects.filter(
            p => p.category.toLowerCase() === selectedCat.toLowerCase()
          );
        }

        if (gridContainer) {
          gridContainer.style.opacity = '0';
          gridContainer.style.transform = 'translateY(10px)';
          gridContainer.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

          setTimeout(() => {
            gridContainer.innerHTML = this.renderProjectCards(filteredProjects);
            bindCardClicks();
            setupScrollReveals();
            gridContainer.style.opacity = '1';
            gridContainer.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    });
  }
};
