/* ==========================================================================
   BLUE PRINT - Projects Portfolio Page View
   ========================================================================== */

import { projects } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const ProjectsView = {
  // Global reference to current active category
  currentCategory: 'all',

  async render() {
    const categories = ['all', 'residential', 'commercial', 'interior', 'hospitality'];
    
    const filterButtonsMarkup = categories
      .map(cat => {
        const isActive = this.currentCategory === cat;
        return `
          <button class="filter-btn ${isActive ? 'active' : ''}" data-filter="${cat}">
            ${cat}
          </button>
        `;
      })
      .join('');

    // Initial render displays all projects
    const cardsMarkup = this.renderProjectCards(projects);

    return `
      <section class="projects-hero">
        <div class="container">
          <span class="label-mono reveal-fade-up">Portfolio</span>
          <h1 class="reveal-fade-up">Our Projects</h1>
          <p class="section-subtitle reveal-fade-up" style="max-width: 600px;">
            Exploring contemporary ideas, functional geometry, natural materials, and the structural possibilities of light.
          </p>
        </div>
      </section>

      <section class="projects-grid-section" style="padding-bottom: var(--space-xxl);">
        <div class="container">
          <!-- Filter Bar -->
          <div class="filter-bar reveal-fade-up">
            ${filterButtonsMarkup}
          </div>

          <!-- Portfolio Grid container -->
          <div class="portfolio-grid" id="portfolio-grid-container">
            ${cardsMarkup}
          </div>
        </div>
      </section>
    `;
  },

  renderProjectCards(filteredProjects) {
    if (filteredProjects.length === 0) {
      return `
        <div class="grid-col-12" style="text-align: center; padding: var(--space-xl) 0;">
          <p style="color: var(--color-text-light);">No projects found in this category.</p>
        </div>
      `;
    }

    // Editorial layout rhythm rules:
    // Repeated pattern of columns: Col-8, Col-4, Col-4, Col-8, Col-6, Col-6
    const layoutPatterns = ['grid-col-8', 'grid-col-4', 'grid-col-4', 'grid-col-8', 'grid-col-6', 'grid-col-6'];

    return filteredProjects
      .map((project, index) => {
        const colClass = layoutPatterns[index % layoutPatterns.length];
        // Generate staggered delays for entering items
        const delayStyle = `animation-delay: ${(index % 3) * 0.15}s;`;
        
        return `
          <article class="project-card ${colClass} fade-in-item" data-project-id="${project.id}" style="${delayStyle}">
            <div class="project-card-image-wrapper">
              <img src="${project.heroImage}" alt="${project.title}" class="project-card-image">
              <div class="project-card-overlay"></div>
              <div class="project-card-indicator">View Project &rarr;</div>
            </div>
            <div class="project-card-info">
              <div class="project-card-meta">
                <span>${project.location}</span>
                <span>${project.category} | ${project.year}</span>
              </div>
              <h3 class="project-card-title">${project.title}</h3>
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
      const cards = document.querySelectorAll('.project-card[data-project-id]');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const projectId = card.getAttribute('data-project-id');
          router.navigate(`/project/${projectId}`, 'projects');
        });
      });
    };

    bindCardClicks(); // Bind on initial load

    // 3. Category Filter buttons logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gridContainer = document.getElementById('portfolio-grid-container');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button highlight
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Extract selected category
        const selectedCat = btn.getAttribute('data-filter');
        this.currentCategory = selectedCat;

        // Perform filtering logic
        let filteredProjects = projects;
        if (selectedCat !== 'all') {
          filteredProjects = projects.filter(
            p => p.category.toLowerCase() === selectedCat.toLowerCase()
          );
        }

        // Apply smooth transition: fade out current cards first, then render new ones
        if (gridContainer) {
          gridContainer.style.opacity = '0';
          gridContainer.style.transform = 'translateY(15px)';
          gridContainer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

          setTimeout(() => {
            // Render new cards
            gridContainer.innerHTML = this.renderProjectCards(filteredProjects);
            
            // Re-bind clicks on the new elements
            bindCardClicks();

            // Fade back in
            gridContainer.style.opacity = '1';
            gridContainer.style.transform = 'translateY(0)';
          }, 250);
        }
      });
    });
  }
};
