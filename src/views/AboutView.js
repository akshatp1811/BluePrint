/* ==========================================================================
   BLUE PRINT - Minimal Editorial About Studio View
   ========================================================================== */

import { studioInfo, services } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const AboutView = {
  async render() {
    const servicesMarkup = services
      .map(
        svc => `
        <div class="service-col reveal-fade-up">
          <span class="service-num">${svc.num}</span>
          <h3 class="service-title">${svc.title}</h3>
          <p class="service-desc">${svc.desc}</p>
        </div>
      `
      )
      .join('');

    return `
      <!-- About Blueprint Header -->
      <section class="blueprint-grid-bg projects-blueprint-hero">
        <div class="container projects-hero-inner">
          <div class="projects-pill reveal-fade-up">${studioInfo.locationLabel}</div>
          <h1 class="projects-title font-serif reveal-fade-up">about the studio</h1>
          <p class="projects-subtitle reveal-fade-up">
            ${studioInfo.tagline}
          </p>
        </div>
      </section>

      <div class="scale-ruler-bar" aria-hidden="true"></div>

      <!-- Concise Studio Narrative -->
      <section class="blueprint-about-story-section">
        <div class="container about-minimal-container">
          <div class="about-quote-box reveal-fade-up">
            <h2 class="about-lead-headline font-serif">
              quiet, functional, and deeply intentional spaces.
            </h2>
            <p class="about-lead-body">
              ${studioInfo.aboutStory.shortIntro}
            </p>
            <p class="about-lead-body" style="margin-top: 1rem;">
              From initial drafting through structural coordination and interior turnkey joinery, our work emphasizes geometric restraint, natural illumination, and honest materials.
            </p>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="blueprint-services-section" style="padding-top: 0;">
        <div class="container">
          <div class="work-section-header reveal-fade-up" style="margin-bottom: var(--space-lg);">
            <h2 class="work-section-title">core disciplines</h2>
          </div>
          <div class="services-columns-grid">
            ${servicesMarkup}
          </div>
        </div>
      </section>

      <!-- Minimal Studio Contact CTA -->
      <section class="blueprint-quote-section" style="border-top: 1px solid var(--color-border);">
        <div class="container quote-container reveal-fade-up">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 12px; font-weight: 400;">
            ready to discuss your site or renovation?
          </h3>
          <p style="color: var(--color-text-muted); margin-bottom: 24px;">
            connect with our civil lines office in prayagraj.
          </p>
          <a href="/contact" data-nav="contact" class="btn btn-blueprint">get in touch</a>
        </div>
      </section>
    `;
  },

  init(params, router) {
    setupScrollReveals();

    const ctaLink = document.querySelector('.blueprint-about-story-section a[data-nav], .blueprint-quote-section a[data-nav]');
    if (ctaLink) {
      ctaLink.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate('/contact', 'contact');
      });
    }
  }
};
