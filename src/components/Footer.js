/* ==========================================================================
   BLUE PRINT - Reusable Footer Component
   ========================================================================== */

import { studioInfo } from '../data/content.js';

export const Footer = {
  render() {
    const currentYear = new Date().getFullYear();
    
    const socialLinksMarkup = studioInfo.socials
      .map(
        social => `
        <a href="${social.url}" class="footer-social-link" target="_blank" rel="noopener noreferrer">${social.name}</a>
      `
      )
      .join('');

    return `
      <footer class="footer">
        <div class="container footer-grid">
          <!-- Column 1: Brand -->
          <div class="footer-brand">
            <a href="/" data-nav="home" class="logo">
              BLUE <span class="logo-blue">PRINT</span>
            </a>
            <p class="footer-tagline">${studioInfo.tagline}</p>
          </div>

          <!-- Column 2: Studio Links -->
          <div>
            <h4 class="footer-title">Studio</h4>
            <ul class="footer-links">
              <li><a href="/" data-nav="home">Home</a></li>
              <li><a href="/projects" data-nav="projects">Projects</a></li>
              <li><a href="/about" data-nav="about">About</a></li>
              <li><a href="/contact" data-nav="contact">Contact</a></li>
            </ul>
          </div>

          <!-- Column 3: Socials -->
          <div>
            <h4 class="footer-title">Connect</h4>
            <div class="footer-links" style="gap: 12px; display: flex; flex-direction: column;">
              ${socialLinksMarkup}
            </div>
          </div>

          <!-- Column 4: Contact -->
          <div>
            <h4 class="footer-title">Contact</h4>
            <div class="footer-info">
              <p class="footer-info-highlight">${studioInfo.contact.address}</p>
              <p>
                T: <a href="tel:${studioInfo.contact.phone.replace(/\s+/g, '')}" class="footer-info-highlight">${studioInfo.contact.phone}</a><br>
                E: <a href="mailto:${studioInfo.contact.email}" class="footer-info-highlight">${studioInfo.contact.email}</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="container footer-bottom">
          <p>&copy; ${currentYear} BLUE PRINT Architecture Studio. All rights reserved.</p>
          <p>Architecture that shapes the way we live.</p>
        </div>
      </footer>
    `;
  },

  init(router) {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    // Bind click events on all SPA links in the footer
    const footerLinks = footerContainer.querySelectorAll('a[data-nav]');
    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const routeName = link.getAttribute('data-nav');
        const path = link.getAttribute('href');
        router.navigate(path, routeName);
      });
    });
  }
};
