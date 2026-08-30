/* ==========================================================================
   BLUE PRINT - Navigation Bar Component
   ========================================================================== */

import { studioInfo } from '../data/content.js';

export const Navbar = {
  render(activeRoute = 'home') {
    const links = [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'projects', label: 'Projects', path: '/projects' },
      { id: 'about', label: 'About', path: '/about' },
      { id: 'contact', label: 'Contact', path: '/contact' }
    ];

    const desktopLinksMarkup = links
      .map(
        link => `
        <li class="nav-item">
          <a href="${link.path}" data-nav="${link.id}" class="nav-link ${
          activeRoute === link.id ? 'active' : ''
        }">${link.label}</a>
        </li>
      `
      )
      .join('');

    const mobileLinksMarkup = links
      .map(
        link => `
        <li>
          <a href="${link.path}" data-nav="${link.id}" class="mobile-nav-link ${
          activeRoute === link.id ? 'active' : ''
        }">${link.label}</a>
        </li>
      `
      )
      .join('');

    return `
      <nav class="navbar" id="main-navbar">
        <div class="container navbar-inner">
          <!-- Logo -->
          <a href="/" data-nav="home" class="logo">
            BLUE <span class="logo-blue">PRINT</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links">
            ${desktopLinksMarkup}
          </ul>

          <!-- Right side CTA -->
          <div class="nav-cta">
            <a href="/contact" data-nav="contact" class="btn btn-secondary" style="padding: 10px 24px; font-size: 0.8rem;">
              Start a Project
            </a>
          </div>

          <!-- Mobile Toggle Hamburger -->
          <button class="mobile-toggle" id="mobile-menu-toggle" aria-label="Toggle Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <!-- Mobile Fullscreen Overlay -->
        <div class="mobile-nav" id="mobile-navigation">
          <ul class="mobile-nav-list">
            ${mobileLinksMarkup}
          </ul>
          <a href="/contact" data-nav="contact" class="btn btn-primary" id="mobile-cta-btn">
            Start a Project
          </a>
        </div>
      </nav>
    `;
  },

  init(router) {
    const navbar = document.getElementById('main-navbar');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-navigation');

    if (!navbar) return;

    // 1. Sticky Scroll Behavior (Shrink Height & Add Backdrop Blur)
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately to check page initial load position

    // 2. Mobile Menu Toggle Action
    const toggleMenu = () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      toggleBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');

      if (!isExpanded) {
        document.body.style.overflow = 'hidden'; // Lock background scrolling
      } else {
        document.body.style.overflow = '';
      }
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // 3. Close mobile menu on clicking any navigation link
    const mobileLinks = mobileNav.querySelectorAll('a[data-nav]');
    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove overflow block
        document.body.style.overflow = '';
        toggleBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');

        // Route using custom SPA router
        const routeName = link.getAttribute('data-nav');
        const path = link.getAttribute('href');
        router.navigate(path, routeName);
      });
    });

    // 4. Bind standard links inside the Navbar (Logo, Desktop Links, CTA)
    const activeNavbarLinks = navbar.querySelectorAll('.navbar-inner a[data-nav]');
    activeNavbarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const routeName = link.getAttribute('data-nav');
        const path = link.getAttribute('href');
        router.navigate(path, routeName);
      });
    });
  }
};
