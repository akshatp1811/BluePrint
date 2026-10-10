/* ==========================================================================
   BLUE PRINT - Minimal Contact Page & Enquiry Form View
   ========================================================================== */

import { studioInfo, copy, escapeText, plainText } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const ContactView = {
  async render() {
    return `
      <!-- Contact Hero with Blueprint Grid -->
      <section class="blueprint-grid-bg projects-blueprint-hero">
        <div class="container projects-hero-inner">
          <div class="projects-pill reveal-fade-up">${copy.contact.eyebrow}</div>
          <h1 class="projects-title font-serif reveal-fade-up">${copy.contact.heading}</h1>
          <p class="projects-subtitle reveal-fade-up">
            ${copy.contact.intro}
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
              <div class="contact-item-label">${copy.contact.locationLabel}</div>
              <h3 class="contact-item-title">${copy.contact.studioName}</h3>
              <p class="contact-item-desc">${studioInfo.contact.address}</p>
            </div>

            <div style="margin-top: var(--space-md);">
              <div class="contact-item-label">${copy.contact.enquiryLabel}</div>
              <p class="contact-item-desc">
                ${copy.contact.emailLabel} <a href="mailto:${studioInfo.contact.email}" class="text-primary" style="font-weight: 500;">${studioInfo.contact.email}</a><br>
                ${copy.contact.phoneLabel} <a href="tel:${studioInfo.contact.phone.replace(/\s+/g, '')}" class="text-primary" style="font-weight: 500;">${studioInfo.contact.phone}</a>
              </p>
            </div>

            <div style="margin-top: var(--space-md);">
              <div class="contact-item-label">${copy.contact.hoursLabel}</div>
              <p class="contact-item-desc">${studioInfo.contact.hours}<br><span style="color: var(--color-text-light); font-size: 0.85rem;">${copy.contact.appointment}</span></p>
            </div>
          </div>

          <!-- Column 2: Enquiry Form Block -->
          <div class="contact-form-wrapper reveal-fade-up delay-1" id="enquiry-form-container">
            <h3 class="form-heading font-serif">${copy.contact.formHeading}</h3>
            
            <form id="project-enquiry-form" novalidate style="margin-top: var(--space-md);">
              <div class="form-group">
                <label for="form-name" class="form-label">${copy.contact.nameLabel}</label>
                <input type="text" id="form-name" class="form-control" placeholder="${copy.contact.namePlaceholder}" maxlength="150" required>
              </div>

              <div class="form-group">
                <label for="form-email" class="form-label">${copy.contact.emailFieldLabel}</label>
                <input type="email" id="form-email" class="form-control" placeholder="${copy.contact.emailPlaceholder}" maxlength="254" required>
              </div>

              <div class="form-group">
                <label for="form-project-type" class="form-label">${copy.contact.disciplineLabel}</label>
                <select id="form-project-type" class="form-control" required>
                  <option value="" disabled selected>${copy.contact.disciplinePlaceholder}</option>
                  ${copy.contact.disciplines.map(value => `<option value="${value}">${value}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label for="form-message" class="form-label">${copy.contact.messageLabel}</label>
                <textarea id="form-message" class="form-control" rows="4" placeholder="${copy.contact.messagePlaceholder}" maxlength="5000" required></textarea>
              </div>

              <div style="margin-top: var(--space-md);">
                <button type="submit" class="btn btn-blueprint" style="width: 100%;">${copy.contact.submit}</button>
              </div>
              <div class="cms-honeypot" aria-hidden="true"><label for="form-website">Website</label><input id="form-website" tabindex="-1" autocomplete="off"></div>
              <p id="form-error" role="alert"></p>
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
      form.addEventListener('submit', async (e) => {
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

        const submit = form.querySelector('button[type="submit"]'); submit.disabled = true;
        const error = document.getElementById('form-error'); error.textContent = '';
        try {
          const response = await fetch('/api/v1/public/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: nameInput.value.trim(), email: emailInput.value.trim(), discipline: projectTypeInput.value, message: messageInput.value.trim(), website: document.getElementById('form-website').value }) });
          if (!response.ok) throw new Error(plainText(copy.interface.enquiryError));
        } catch (failure) { error.textContent = failure.message; submit.disabled = false; return; }

        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(8px)';
        formContainer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        setTimeout(() => {
          formContainer.innerHTML = `
            <div style="padding: var(--space-lg) 0; text-align: center;">
              <h3 class="font-serif" style="font-size: 1.8rem; margin-bottom: 8px;">${copy.contact.successHeading}</h3>
              <p style="color: var(--color-text-muted); margin-bottom: 24px;">
                ${copy.contact.success.replace('{name}', escapeText(nameInput.value.trim()))}
              </p>
              <a href="/projects" data-nav="projects" class="btn btn-blueprint">
                ${copy.contact.successLink}
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
