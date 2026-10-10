/* ==========================================================================
   BLUE PRINT - Projects Portfolio Page View
   Connected with blueprint-inspired navy grid header and refined project cards
   ========================================================================== */

import { projects, constructionComparison, copy, categories } from '../data/content.js';
import { setupScrollReveals } from '../app.js';
import { ImageComparisonSlider } from '../components/ImageComparisonSlider.js';

export const ProjectsView = {
  currentCategory: 'All',

  async render() {
    this.currentCategory = 'All';
    const filterCategories = ['All', ...categories];
    
    const filterButtonsMarkup = filterCategories
      .map(cat => {
        const isActive = this.currentCategory.toLowerCase() === cat.toLowerCase();
        return `
          <button class="blueprint-filter-btn ${isActive ? 'active' : ''}" data-filter="${cat}">
            ${cat === 'All' ? copy.projects.all : cat}
          </button>
        `;
      })
      .join('');

    // Initial render displays all projects
    const cardsMarkup = this.renderProjectCards(projects);

    const comparisonMarkup = ImageComparisonSlider.render({
      id: 'projects-construction-slider',
      beforeImage: constructionComparison.beforeImage,
      afterImage: constructionComparison.afterImage,
      beforeAlt: constructionComparison.beforeAlt,
      afterAlt: constructionComparison.afterAlt,
      beforeLabel: constructionComparison.beforeLabel,
      afterLabel: constructionComparison.afterLabel,
      initialPosition: 50,
      aspectRatio: '16 / 9',
      caption: constructionComparison.caption
    });

    return `
      <!-- Blueprint Grid Navy Hero Header -->
      <section class="blueprint-grid-bg projects-blueprint-hero">
        <div class="container projects-hero-inner">
          <div class="projects-pill reveal-fade-up">${copy.projects.eyebrow}</div>
          <h1 class="projects-title font-serif reveal-fade-up">${copy.projects.heading}</h1>
          <p class="projects-subtitle reveal-fade-up">
            ${copy.projects.intro}
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

      <!-- Construction Transformation Section (Interactive Comparison Slider) -->
      <section class="transformation-section" id="projects-transformation" ${copy.projects.showComparison ? '' : 'hidden'}>
        <div class="container">
          <div class="transformation-header reveal-fade-up">
            <span class="label-mono">${constructionComparison.tagline}</span>
            <h2 class="transformation-title">${constructionComparison.title}</h2>
            <p class="transformation-desc">${constructionComparison.description}</p>
          </div>
          <div class="reveal-fade-up delay-1">
            ${comparisonMarkup}
          </div>
        </div>
      </section>
    `;
  },

  renderProjectCards(filteredProjects) {
    if (filteredProjects.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-xl) 0;">
          <p style="color: var(--color-text-muted);">${copy.projects.empty}</p>
        </div>
      `;
    }

    return filteredProjects
      .map(project => {
        return `
          <a href="/project/${project.id}" data-nav="projects" class="blueprint-project-card reveal-fade-up" data-project-id="${project.id}">
            <div class="blueprint-card-image-wrap">
              ${project.heroImage ? `<img src="${project.heroImage}" alt="${project.heroAlt || project.title}" class="blueprint-card-img" loading="lazy">` : ''}
              <span class="blueprint-card-badge">${project.category}</span>
            </div>
            <div class="blueprint-card-meta">
              <h3 class="blueprint-card-title">${project.title}</h3>
              <div class="blueprint-card-location">${project.location}</div>
            </div>
          </a>
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
        card.addEventListener('click', (event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
          event.preventDefault();
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
        if (selectedCat.toLowerCase() !== 'all') {
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

    // 4. Initialize Interactive Comparison Slider
    ImageComparisonSlider.init('#projects-construction-slider');
  }
};
