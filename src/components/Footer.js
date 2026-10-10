/* ==========================================================================
   BLUE PRINT - Reusable Footer Component
   ========================================================================== */

import { studioInfo, copy } from '../data/content.js';

export const Footer = {
  render() {
    return `
      <footer class="footer blueprint-footer">
        <div class="container footer-content-minimal">
          <div class="footer-left">
            <a href="/" data-nav="home" class="footer-studio-name">${copy.footer.name}</a>
            <div class="footer-location-sub">${copy.footer.location}</div>
          </div>
          <div class="footer-right">
            <a href="mailto:${studioInfo.contact.email}" class="footer-email-link">${studioInfo.contact.email}</a>
          </div>
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
