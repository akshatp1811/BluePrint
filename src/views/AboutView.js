/* ==========================================================================
   BLUE PRINT - About Page View
   ========================================================================== */

import { studioInfo, team, services, designPhilosophy } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const AboutView = {
  async render() {
    const storyParagraphs = studioInfo.aboutStory.paragraphs
      .map(p => `<p>${p}</p>`)
      .join('');

    // Approach principles (we add Sustainability as the 4th item or use our designPhilosophy list)
    // Let's create the 4 principles requested: Context, Function, Material, Sustainability
    const principles = [
      { num: '01', title: 'Context', desc: 'Every site has a narrative. We carefully study local context, native geography, daylight paths, and cultural heritage to design forms that look natural and grounded in their landscape.' },
      { num: '02', title: 'Function', desc: 'Architecture should enhance day-to-day living. We design internal flows from the inside out, aligning geometry and custom divisions with the specific routines of the users.' },
      { num: '03', title: 'Material', desc: 'We value tactile authenticity. Our studio favors raw concrete, textured local timbers, natural brick, and raw iron, letting the true physical qualities of materials serve as the ornament.' },
      { num: '04', title: 'Sustainability', desc: 'Spaces designed for longevity. We integrate passive solar shading, cross-ventilation shafts, structural thermal mass, and high-performance screens to minimize carbon footprint.' }
    ];

    const principlesMarkup = principles
      .map(
        pr => `
        <div class="principle-row reveal-fade-up">
          <div class="principle-border"></div>
          <div class="principle-num">${pr.num}</div>
          <h3 class="principle-title">${pr.title}</h3>
          <p class="principle-desc">${pr.desc}</p>
        </div>
      `
      )
      .join('');

    const servicesMarkup = services
      .map(
        svc => `
        <div class="service-card reveal-fade-up">
          <h3 class="service-card-title">${svc.title}</h3>
          <p class="service-card-desc">${svc.desc}</p>
        </div>
      `
      )
      .join('');

    const teamMarkup = team
      .map(
        t => `
        <div class="team-card reveal-fade-up">
          <div class="team-image-wrapper">
            <img src="${t.image}" alt="${t.name}" class="team-image">
            <div class="team-overlay"></div>
          </div>
          <div class="team-card-info">
            <h3 class="team-name">${t.name}</h3>
            <span class="team-role">${t.role}</span>
          </div>
        </div>
      `
      )
      .join('');

    return `
      <!-- About Hero -->
      <section class="about-hero">
        <div class="container">
          <span class="label-mono reveal-fade-up">About Studio</span>
          <h1 class="reveal-fade-up">${studioInfo.aboutStory.heading}</h1>
          <p class="section-subtitle reveal-fade-up" style="max-width: 600px;">
            BLUE PRINT is a contemporary architecture and design studio focused on creating thoughtful spaces that respond to people, context, and the environment.
          </p>
        </div>
      </section>

      <!-- Story Narrative -->
      <section class="about-story-section">
        <div class="container about-story-grid">
          <div class="reveal-fade-up">
            <h2 style="font-weight: 300; line-height: 1.2;">Crafting spaces that balance form, function, and human experience.</h2>
          </div>
          <div class="about-story-content reveal-fade-up delay-1">
            ${storyParagraphs}
          </div>
        </div>
      </section>

      <!-- Our Approach (Interactive List) -->
      <section class="about-principles-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">Principles</span>
            <h2>Our Design Approach</h2>
            <p class="section-subtitle">The guidelines that define our spatial thinking and structure details.</p>
          </div>
          <div class="principles-list">
            ${principlesMarkup}
          </div>
        </div>
      </section>

      <!-- What We Do (Services) -->
      <section class="about-services-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px;">
            <span class="label-mono">Services</span>
            <h2>Capabilities</h2>
            <p class="section-subtitle">A comprehensive design service from early concepts to complete construction supervision.</p>
          </div>
          <div class="services-grid">
            ${servicesMarkup}
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="about-team-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">People</span>
            <h2>Meet the Team</h2>
            <p class="section-subtitle">The creative architects, designers, and visualizers behind the spaces.</p>
          </div>
          <div class="team-grid">
            ${teamMarkup}
          </div>
        </div>
      </section>
    `;
  },

  init(params, router) {
    // Fire Scroll Reveal Observer
    setupScrollReveals();
  }
};
