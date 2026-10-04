/* ==========================================================================
   BLUE PRINT - Minimal Editorial Architecture Portfolio Home Page
   Modeled precisely after reference blueprint design language
   ========================================================================== */

import { projects, studioInfo, constructionComparison } from '../data/content.js';
import { setupScrollReveals } from '../app.js';
import { ImageComparisonSlider } from '../components/ImageComparisonSlider.js';

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

    const comparisonMarkup = ImageComparisonSlider.render({
      id: 'home-construction-slider',
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
      <!-- Hero Section (Clean blueprint drafting layout, no large photo) -->
      <section class="blueprint-hero">
        <div class="container hero-inner">
          <div class="location-pill reveal-fade-up">
            ${studioInfo.locationLabel}
          </div>
          
          <h1 class="hero-headline font-serif reveal-fade-up">
            Spaces drawn with intention,<br>
            <span class="highlight-blue">built</span> with precision
          </h1>

          <p class="hero-subline reveal-fade-up">
            ${studioInfo.tagline}
          </p>

          <div class="hero-cta-wrap reveal-fade-up">
            <a href="/projects" data-nav="projects" class="btn btn-blueprint">View Our Work</a>
            <a href="/contact" data-nav="contact" class="btn-build-with-us">Build with Us</a>
          </div>
        </div>
      </section>

      <!-- Architectural Scale Ruler / Tick Marks Bar -->
      <div class="scale-ruler-bar" aria-hidden="true"></div>

      <!-- Selected Work Section -->
      <section class="blueprint-work-section" id="portfolio">
        <div class="container">
          <div class="work-section-header reveal-fade-up">
            <h2 class="work-section-title">Selected Work</h2>
            <a href="/projects" data-nav="projects" class="work-view-all">View All Projects</a>
          </div>

          <div class="blueprint-work-grid">
            ${projectCardsMarkup}
          </div>
        </div>
      </section>

      <!-- Construction Transformation Section (Interactive Comparison Slider) -->
      <section class="transformation-section" id="transformation">
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

    // 3. Initialize Interactive Comparison Slider
    ImageComparisonSlider.init('#home-construction-slider');

    // 4. Bind CTA button and "view all projects" links
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
