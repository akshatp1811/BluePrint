/* ==========================================================================
   BLUE PRINT - Minimal Contact Page & Enquiry Form View
   ========================================================================== */

import { studioInfo } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const ContactView = {
  async render() {
    return `
      <!-- Contact Hero with Blueprint Grid -->
      <section class="blueprint-grid-bg projects-blueprint-hero">
        <div class="container projects-hero-inner">
          <div class="projects-pill reveal-fade-up">INQUIRIES</div>
          <h1 class="projects-title font-serif reveal-fade-up">Start a Conversation</h1>
          <p class="projects-subtitle reveal-fade-up">
            Whether planning a new build, interior fit-out, or adaptive renovation, we welcome your project brief.
          </p>
        </div>
      </section>

      <div class="scale-ruler-bar" aria-hidden="true"></div>

      <!-- Details & Form Grid -->
      <section class="contact-section">
        <div class="container contact-minimal-grid">
          
          <!-- Column 1: Studio Information Details -->
          <div class="contact-info-block reveal-fade-up">
            <div>
              <div class="contact-item-label">STUDIO LOCATION</div>
              <h3 class="contact-item-title">Blueprint Design Studio</h3>
              <p class="contact-item-desc">${studioInfo.contact.address}</p>
            </div>

            <div style="margin-top: var(--space-md);">
              <div class="contact-item-label">DIRECT INQUIRIES</div>
              <p class="contact-item-desc">
                Email: <a href="mailto:${studioInfo.contact.email}" class="text-primary" style="font-weight: 500;">${studioInfo.contact.email}</a><br>
                Phone: <a href="tel:${studioInfo.contact.phone.replace(/\s+/g, '')}" class="text-primary" style="font-weight: 500;">${studioInfo.contact.phone}</a>
              </p>
            </div>

            <div style="margin-top: var(--space-md);">
              <div class="contact-item-label">HOURS</div>
              <p class="contact-item-desc">${studioInfo.contact.hours}<br><span style="color: var(--color-text-light); font-size: 0.85rem;">By prior appointment</span></p>
            </div>
          </div>

          <!-- Column 2: Enquiry Form Block -->
          <div class="contact-form-wrapper reveal-fade-up delay-1" id="enquiry-form-container">
            <h3 class="form-heading font-serif">Project Outline</h3>
            
            <form id="project-enquiry-form" novalidate style="margin-top: var(--space-md);">
              <div class="form-group">
                <label for="form-name" class="form-label">Full Name *</label>
                <input type="text" id="form-name" class="form-control" placeholder="Your name" required>
              </div>

              <div class="form-group">
                <label for="form-email" class="form-label">Email Address *</label>
                <input type="email" id="form-email" class="form-control" placeholder="your@email.com" required>
              </div>

              <div class="form-group">
                <label for="form-project-type" class="form-label">Discipline *</label>
                <select id="form-project-type" class="form-control" required>
                  <option value="" disabled selected>Select a category</option>
                  <option value="Interiors">Interiors</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Design to Build">Design to Build</option>
                </select>
              </div>

              <div class="form-group">
                <label for="form-message" class="form-label">Project Brief & Location *</label>
                <textarea id="form-message" class="form-control" rows="4" placeholder="Brief outline of scope, site location, and timeline..." required></textarea>
              </div>

              <div style="margin-top: var(--space-md);">
                <button type="submit" class="btn btn-blueprint" style="width: 100%;">Send Inquiry</button>
              </div>
            </form>
          </div>

        </div>
      </section>
    `;
  },

  init(params, router) {
    setupScrollReveals();

    const form = document.getElementById('project-enquiry-form');
    const formContainer = document.getElementById('enquiry-form-container');

    if (form && formContainer) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const projectTypeInput = document.getElementById('form-project-type');
        const messageInput = document.getElementById('form-message');

        let isValid = true;
        [nameInput, emailInput, projectTypeInput, messageInput].forEach(input => {
          if (input) input.style.borderColor = '';
        });

        if (!nameInput.value.trim()) {
          nameInput.style.borderColor = '#c0392b';
          isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
          emailInput.style.borderColor = '#c0392b';
          isValid = false;
        }

        if (!projectTypeInput.value) {
          projectTypeInput.style.borderColor = '#c0392b';
          isValid = false;
        }

        if (!messageInput.value.trim()) {
          messageInput.style.borderColor = '#c0392b';
          isValid = false;
        }

        if (!isValid) return;

        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(8px)';
        formContainer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        setTimeout(() => {
          formContainer.innerHTML = `
            <div style="padding: var(--space-lg) 0; text-align: center;">
              <h3 class="font-serif" style="font-size: 1.8rem; margin-bottom: 8px;">Message Received</h3>
              <p style="color: var(--color-text-muted); margin-bottom: 24px;">
                Thank you, <strong>${nameInput.value.trim()}</strong>. Our studio directors will review your project brief and get in touch within 24–48 hours.
              </p>
              <a href="/projects" data-nav="projects" class="btn btn-blueprint">
                View Portfolio
              </a>
            </div>
          `;

          const successBtn = formContainer.querySelector('a[data-nav]');
          if (successBtn) {
            successBtn.addEventListener('click', (ev) => {
              ev.preventDefault();
              router.navigate('/projects', 'projects');
            });
          }

          formContainer.style.opacity = '1';
          formContainer.style.transform = 'translateY(0)';
        }, 250);
      });
    }
  }
};
