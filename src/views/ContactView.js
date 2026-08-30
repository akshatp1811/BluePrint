/* ==========================================================================
   BLUE PRINT - Contact Page & Enquiry Form View
   ========================================================================== */

import { studioInfo } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const ContactView = {
  async render() {
    return `
      <!-- Contact Hero -->
      <section class="contact-hero">
        <div class="container">
          <span class="label-mono reveal-fade-up">Get in Touch</span>
          <h1 class="reveal-fade-up">Let's create something meaningful.</h1>
          <p class="section-subtitle reveal-fade-up" style="max-width: 600px;">
            Whether you are planning a new home, commercial space, or a larger masterplan, we'd love to hear about your project goals.
          </p>
        </div>
      </section>

      <!-- Details & Form Grid -->
      <section class="contact-section">
        <div class="container contact-grid">
          
          <!-- Column 1: Studio Information Details -->
          <div class="contact-info-block reveal-fade-up">
            
            <div>
              <h3 class="contact-item-title">Our Studio</h3>
              <div class="contact-item-value">
                <strong>BLUE PRINT Architecture Studio</strong><br>
                ${studioInfo.contact.address}
              </div>
            </div>

            <div>
              <h3 class="contact-item-title">Direct Contact</h3>
              <div class="contact-item-value">
                <p>
                  General Inquiries: <a href="mailto:${studioInfo.contact.email}" class="text-primary" style="font-weight: 500;">${studioInfo.contact.email}</a>
                </p>
                <p>
                  Call Us: <a href="tel:${studioInfo.contact.phone.replace(/\s+/g, '')}" class="text-primary" style="font-weight: 500;">${studioInfo.contact.phone}</a>
                </p>
              </div>
            </div>

            <div>
              <h3 class="contact-item-title">Studio Hours</h3>
              <div class="contact-item-value">
                <p>${studioInfo.contact.hours}</p>
                <p style="color: var(--color-text-light); font-size: 0.9rem;">By appointment only.</p>
              </div>
            </div>

          </div>

          <!-- Column 2: Enquiry Form Block -->
          <div class="contact-form-wrapper reveal-fade-up delay-1" id="enquiry-form-container">
            <h2 class="contact-form-title" style="font-weight: 300;">Let's talk about your project.</h2>
            
            <form id="project-enquiry-form" novalidate>
              <div class="form-group">
                <label for="form-name" class="form-label">Full Name *</label>
                <input type="text" id="form-name" class="form-control" placeholder="John Doe" required>
              </div>

              <div class="form-group">
                <label for="form-email" class="form-label">Email Address *</label>
                <input type="email" id="form-email" class="form-control" placeholder="john@example.com" required>
              </div>

              <div class="form-group">
                <label for="form-phone" class="form-label">Phone Number</label>
                <input type="tel" id="form-phone" class="form-control" placeholder="+91 98765 43210">
              </div>

              <div class="form-group">
                <label for="form-project-type" class="form-label">Project Type *</label>
                <select id="form-project-type" class="form-control" required>
                  <option value="" disabled selected>Select a project category</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="form-message" class="form-label">Tell us about your project *</label>
                <textarea id="form-message" class="form-control" rows="5" placeholder="Outline your project scope, timeline, and location..." required></textarea>
              </div>

              <div style="margin-top: var(--space-lg);">
                <button type="submit" class="btn btn-primary" style="width: 100%;">Send Enquiry</button>
              </div>
            </form>
          </div>

        </div>
      </section>
    `;
  },

  init(params, router) {
    // 1. Run scroll reveal animations
    setupScrollReveals();

    // 2. Validate and Handle Form Submission
    const form = document.getElementById('project-enquiry-form');
    const formContainer = document.getElementById('enquiry-form-container');

    if (form && formContainer) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve field values
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const projectTypeInput = document.getElementById('form-project-type');
        const messageInput = document.getElementById('form-message');

        let isValid = true;

        // Reset custom input border highlights
        [nameInput, emailInput, projectTypeInput, messageInput].forEach(input => {
          if (input) {
            input.style.borderColor = '';
          }
        });

        // Simple validation check
        if (!nameInput.value.trim()) {
          nameInput.style.borderColor = 'red';
          isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
          emailInput.style.borderColor = 'red';
          isValid = false;
        }

        if (!projectTypeInput.value) {
          projectTypeInput.style.borderColor = 'red';
          isValid = false;
        }

        if (!messageInput.value.trim()) {
          messageInput.style.borderColor = 'red';
          isValid = false;
        }

        if (!isValid) {
          // Trigger a subtle vibration or alert if fields are empty
          return;
        }

        // Collect Form Data Object for future endpoint integration
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: document.getElementById('form-phone').value.trim(),
          projectType: projectTypeInput.value,
          message: messageInput.value.trim(),
          submittedAt: new Date().toISOString()
        };

        // Log to console to show data collection is active and structured
        console.log('Blueprint Project Enquiry Submitted:', formData);

        // Run premium fadeout and inject thank-you checklist success animation
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(10px)';
        formContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

        setTimeout(() => {
          formContainer.innerHTML = `
            <div class="contact-form-success">
              <div class="success-icon-wrapper">
                <svg class="success-icon" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="success-title">Message Sent</h2>
              <p class="success-text">
                Thank you for reaching out, <strong>${formData.name}</strong>. Our design directors have received your project inquiry and will contact you within 24–48 hours.
              </p>
              <a href="/projects" data-nav="projects" class="btn btn-secondary" style="margin-top: var(--space-md); width: auto;">
                Explore Selected Projects
              </a>
            </div>
          `;

          // Bind navigation click event on the newly generated success button
          const successBtn = formContainer.querySelector('a[data-nav]');
          if (successBtn) {
            successBtn.addEventListener('click', (ev) => {
              ev.preventDefault();
              const routeName = successBtn.getAttribute('data-nav');
              const path = successBtn.getAttribute('href');
              router.navigate(path, routeName);
            });
          }

          // Fade back in
          formContainer.style.opacity = '1';
          formContainer.style.transform = 'translateY(0)';
        }, 400);
      });
    }
  }
};
