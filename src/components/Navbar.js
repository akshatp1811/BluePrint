/* ==========================================================================
   BLUE PRINT - Navigation Bar Component
   ========================================================================== */

import { studioInfo } from '../data/content.js';

export const Navbar = {
  render(activeRoute = 'home') {
    const links = [
      { id: 'about', label: 'about', path: '/about' },
      { id: 'services', label: 'services', path: '/#services' },
      { id: 'projects', label: 'portfolio', path: '/projects' },
      { id: 'process', label: 'process', path: '/#process' },
      { id: 'contact', label: 'contact', path: '/contact' }
    ];

    const desktopLinksMarkup = links
      .map(
        link => `
        <li class="nav-item">
          <a href="${link.path}" data-nav="${link.id}" class="nav-link ${
          activeRoute === link.id ? 'active' : ''
        } ${link.id === 'contact' ? 'nav-link-contact' : ''}">${link.label}</a>
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
          <!-- Logo matching reference -->
          <a href="/" data-nav="home" class="logo">
            <span class="logo-blue">blueprint</span> <span class="logo-dark">design studio</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links">
            ${desktopLinksMarkup}
          </ul>

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
        </div>
      </nav>
    `;
  },

  init(router) {
    const navbar = document.getElementById('main-navbar');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-navigation');

    if (!navbar) return;

    // 1. Sticky Scroll Behavior
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Mobile Menu Toggle Action
    const toggleMenu = () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      toggleBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');

      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleMenu);
    }

    // Navigation link helper
    const handleLinkClick = (e, link) => {
      e.preventDefault();
      const routeName = link.getAttribute('data-nav');
      const href = link.getAttribute('href');

      if (toggleBtn && mobileNav && mobileNav.classList.contains('active')) {
        document.body.style.overflow = '';
        toggleBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }

      if (href.includes('#')) {
        const [path, hash] = href.split('#');
        const currentPath = window.location.pathname;

        if (currentPath === '/' || path === '') {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        // If on another page, navigate home then scroll
        router.navigate('/', 'home');
        setTimeout(() => {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        router.navigate(href, routeName);
      }
    };

    // Bind mobile links
    if (mobileNav) {
      mobileNav.querySelectorAll('a[data-nav]').forEach(link => {
        link.addEventListener('click', (e) => handleLinkClick(e, link));
      });
    }

    // Bind desktop links & logo
    navbar.querySelectorAll('.navbar-inner a[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => handleLinkClick(e, link));
    });
  }
};
