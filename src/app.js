/* ==========================================================================
   BLUE PRINT - Main Entry Bootstrapper
   ========================================================================== */

import { Router } from './router.js';
import { Lightbox } from './components/Lightbox.js';

// Import Page Views
import { HomeView } from './views/HomeView.js';
import { ProjectsView } from './views/ProjectsView.js';
import { ProjectDetailView } from './views/ProjectDetailView.js';
import { AboutView } from './views/AboutView.js';
import { ContactView } from './views/ContactView.js';

// Route Configurations Mapping
const routes = {
  '/': {
    name: 'home',
    title: 'Architecture Studio',
    view: HomeView
  },
  '/projects': {
    name: 'projects',
    title: 'Selected Projects',
    view: ProjectsView
  },
  '/project/:id': {
    name: 'projects',
    title: 'Project Detail',
    view: ProjectDetailView
  },
  '/about': {
    name: 'about',
    title: 'Our Story & Approach',
    view: AboutView
  },
  '/contact': {
    name: 'contact',
    title: 'Start a Project',
    view: ContactView
  }
};

// Global scroll-revealing trigger helper using IntersectionObserver
export function setupScrollReveals() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px', // Trigger slightly before element enters 8% from bottom
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Animate exactly once
      }
    });
  }, observerOptions);

  // Bind to fade-ups and clip reveals
  const elementsToReveal = document.querySelectorAll('.reveal-fade-up, .reveal-image-clip');
  elementsToReveal.forEach(el => observer.observe(el));
}

// Kick off when DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {
  const appMount = document.getElementById('app');
  const navbarMount = document.getElementById('navbar-container');
  const footerMount = document.getElementById('footer-container');

  // Initialize Lightbox Singleton modal structures
  Lightbox.init();

  // Instantiate Client-side SPA Router
  const router = new Router(routes, appMount, navbarMount, footerMount);
  router.init();

  // Fire initial page setup reveals
  setupScrollReveals();
});
