/* ==========================================================================
   BLUE PRINT - Minimal Editorial Architecture Portfolio Home Page
   Modeled precisely after reference blueprint design language
   ========================================================================== */

import { projects, services, processSteps, studioInfo } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const HomeView = {
  async render() {
    // Top 3 featured projects matching reference layout
    const featuredProjects = projects.slice(0, 3);

    const projectCardsMarkup = featuredProjects
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

    const servicesMarkup = services
      .map(service => {
        return `
          <div class="service-col reveal-fade-up">
            <span class="service-num">${service.num}</span>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-desc">${service.desc}</p>
          </div>
        `;
      })
      .join('');

    const processMarkup = processSteps
      .map(step => {
        return `
          <div class="process-col reveal-fade-up">
            <span class="process-num">${step.num}</span>
            <div class="process-name">${step.title}</div>
          </div>
        `;
      })
      .join('');

    return `
      <!-- Hero Section (Clean blueprint drafting layout, no large photo) -->
      <section class="blueprint-hero">
        <div class="container hero-inner">
          <div class="location-pill reveal-fade-up">
            ${studioInfo.locationLabel}
          </div>
          
          <h1 class="hero-headline font-serif reveal-fade-up">
            spaces drawn with intention,<br>
            <span class="highlight-blue">built</span> with precision
          </h1>

          <p class="hero-subline reveal-fade-up">
            ${studioInfo.tagline}
          </p>

          <div class="hero-cta-wrap reveal-fade-up">
            <a href="/projects" data-nav="projects" class="btn btn-blueprint">view our work</a>
          </div>
        </div>
      </section>

      <!-- Architectural Scale Ruler / Tick Marks Bar -->
      <div class="scale-ruler-bar" aria-hidden="true"></div>

      <!-- Services Section (3 Clean Disciplines with Vertical Dividers) -->
      <section class="blueprint-services-section" id="services">
        <div class="container">
          <div class="services-columns-grid">
            ${servicesMarkup}
          </div>
        </div>
      </section>

      <!-- Selected Work Section -->
      <section class="blueprint-work-section" id="portfolio">
        <div class="container">
          <div class="work-section-header reveal-fade-up">
            <h2 class="work-section-title">selected work</h2>
            <a href="/projects" data-nav="projects" class="work-view-all">view all projects</a>
          </div>

          <div class="blueprint-work-grid">
            ${projectCardsMarkup}
          </div>
        </div>
      </section>

      <!-- How We Work Section (Signature Navy Blueprint Grid) -->
      <section class="blueprint-grid-bg blueprint-process-section" id="process">
        <div class="container">
          <h2 class="process-section-title reveal-fade-up">how we work</h2>
          <div class="process-columns-grid">
            ${processMarkup}
          </div>
        </div>
      </section>

      <!-- Editorial Quote / Testimonial Section -->
      <section class="blueprint-quote-section">
        <div class="container quote-container reveal-fade-up">
          <blockquote class="editorial-quote font-serif">
            ${studioInfo.quote.text}
          </blockquote>
          <div class="quote-author">
            ${studioInfo.quote.author}
          </div>
        </div>
      </section>
    `;
  },

  init(params, router) {
    // 1. Fire scroll-reveals
    setupScrollReveals();

    // 2. Setup Project Tile Links Routing
    const projectCards = document.querySelectorAll('.blueprint-project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        router.navigate(`/project/${projectId}`, 'projects');
      });
    });

    // 3. Bind CTA button and "view all projects" links
    const spaLinks = document.querySelectorAll('.blueprint-hero a[data-nav], .blueprint-work-section a[data-nav]');
    spaLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const routeName = link.getAttribute('data-nav');
        const path = link.getAttribute('href');
        router.navigate(path, routeName);
      });
    });
  }
};
