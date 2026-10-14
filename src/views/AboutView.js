/* ==========================================================================
   BLUE PRINT - Minimal Editorial About Studio View
   ========================================================================== */

import { studioInfo, team, copy } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const AboutView = {
  async render() {
    // Four slots for four core team members as requested
    const coreTeam = team.slice(0, copy.about.visibleTeamCount);

    const teamCardsMarkup = coreTeam
      .map(member => {
        return `
          <div class="team-card reveal-fade-up">
            <div class="team-image-wrapper">
              ${member.image ? `<img src="${member.image}" alt="${member.alt || member.name}" class="team-member-img" loading="lazy">` : ''}
            </div>
            <div class="team-card-info">
              <h3 class="team-member-name">${member.name}</h3>
              <p class="team-member-role">${member.role}</p>
            </div>
          </div>
        `;
      })
      .join('');

    return `
      <!-- About Blueprint Header -->
      <section class="blueprint-grid-bg projects-blueprint-hero">
        <div class="container projects-hero-inner">
          <div class="projects-pill reveal-fade-up">${studioInfo.locationLabel}</div>
          <h1 class="projects-title font-serif reveal-fade-up">${copy.about.heading}</h1>
          <p class="projects-subtitle reveal-fade-up">
            ${studioInfo.tagline}
          </p>
        </div>
      </section>

      <div class="scale-ruler-bar" aria-hidden="true"></div>

      <!-- Meet Our Team Section (First with 4 slots for 4 team members) -->
      <section class="blueprint-team-section" ${copy.about.showTeam ? '' : 'hidden'}>
        <div class="container">
          <div class="team-section-header reveal-fade-up">
            <span class="label-mono">${copy.about.teamEyebrow}</span>
            <h2 class="team-section-title font-serif">${copy.about.teamHeading}</h2>
            <p class="team-section-subtitle">
              ${copy.about.teamIntro}
            </p>
          </div>
          <div class="blueprint-team-grid">
            ${teamCardsMarkup}
          </div>
        </div>
      </section>

      <!-- Concise Studio Narrative -->
      <section class="blueprint-about-story-section">
        <div class="container about-minimal-container">
          <div class="about-quote-box reveal-fade-up">
            <h2 class="about-lead-headline font-serif">
              ${copy.about.headline}
            </h2>
            ${copy.about.paragraphs.map((text, i) => `<p class="about-lead-body" ${i ? 'style="margin-top: 1rem;"' : ''}>${text}</p>`).join('')}
          </div>
        </div>
      </section>

      <!-- Minimal Studio Contact CTA -->
      <section class="blueprint-quote-section" style="border-top: 1px solid var(--color-border);">
        <div class="container quote-container reveal-fade-up">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 12px; font-weight: 400;">
            ${copy.about.ctaHeading}
          </h3>
          <p style="color: var(--color-text-muted); margin-bottom: 24px;">
            ${copy.about.ctaBody}
          </p>
          <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
            <a href="${copy.about.ctaPrimaryUrl}" data-nav="contact" class="btn btn-blueprint">${copy.about.ctaPrimary}</a>
            <a href="${copy.about.ctaSecondaryUrl}" data-nav="contact" class="btn-build-with-us">${copy.about.ctaSecondary}</a>
          </div>
        </div>
      </section>
    `;
  },

  init(params, router) {
    setupScrollReveals();

    const ctaLinks = document.querySelectorAll('.blueprint-about-story-section a[data-nav], .blueprint-quote-section a[data-nav]');
    ctaLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const routeName = link.getAttribute('data-nav') || 'contact';
        const path = link.getAttribute('href') || '/contact';
        router.navigate(path, routeName);
      });
    });
  }
};
