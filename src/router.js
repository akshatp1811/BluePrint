/* ==========================================================================
   BLUE PRINT - Client-Side SPA Router & Page Transitions
   ========================================================================== */

import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';

export class Router {
  constructor(routes, mountingPoint, navbarPoint, footerPoint) {
    this.routes = routes;
    this.mountingPoint = mountingPoint;
    this.navbarPoint = navbarPoint;
    this.footerPoint = footerPoint;
    this.currentViewName = '';
  }

  init() {
    // 1. Intercept Global Clicks on data-nav elements
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-nav]');
      if (link) {
        e.preventDefault();
        const routeName = link.getAttribute('data-nav');
        const path = link.getAttribute('href');
        this.navigate(path, routeName);
      }
    });

    // 2. Handle Browser Back / Forward buttons
    window.addEventListener('popstate', () => {
      this.resolveRoute(window.location.pathname);
    });

    // 3. Resolve the initial page load route
    this.resolveRoute(window.location.pathname);
  }

  navigate(path, routeName) {
    if (window.location.pathname === path) return;
    
    window.history.pushState({}, '', path);
    this.resolveRoute(path, routeName);
  }

  async resolveRoute(path, routeName) {
    // Match route
    let matchedRoute = this.matchRoute(path);

    if (!matchedRoute) {
      // Default fallback to home
      matchedRoute = { route: this.routes['/'], params: {} };
    }

    const { route, params } = matchedRoute;
    this.currentViewName = route.name;

    // Trigger Page Transition Animation Sequence
    const overlay = document.getElementById('page-transition-overlay');
    
    if (overlay) {
      // 1. Slide-up blue overlay to block viewport
      overlay.classList.remove('animating-out');
      overlay.classList.add('animating-in');

      // 2. Wait for overlay to slide in fully (approx 450ms)
      await new Promise(resolve => setTimeout(resolve, 450));
      
      // 3. Render Navbar & Footer dynamically (Navbar needs to highlight active state)
      if (this.navbarPoint) {
        this.navbarPoint.innerHTML = Navbar.render(this.currentViewName);
        Navbar.init(this);
      }
      
      if (this.footerPoint) {
        this.footerPoint.innerHTML = Footer.render();
        Footer.init(this);
      }

      // 4. Render main view content
      this.mountingPoint.innerHTML = await route.view.render(params);
      
      // 5. Scroll page instantly back to top
      window.scrollTo(0, 0);

      // 6. Initialize page-specific behaviors, attach scroll reveals & animations
      if (route.view.init) {
        route.view.init(params, this);
      }

      // 7. Slide-up blue overlay out of viewport (reveal new page)
      overlay.classList.remove('animating-in');
      overlay.classList.add('animating-out');
      
      // 8. Clean up animation classes once finished
      setTimeout(() => {
        overlay.classList.remove('animating-out');
      }, 600);

    } else {
      // Fallback: Immediate render if overlay elements are missing
      if (this.navbarPoint) {
        this.navbarPoint.innerHTML = Navbar.render(this.currentViewName);
        Navbar.init(this);
      }
      if (this.footerPoint) {
        this.footerPoint.innerHTML = Footer.render();
        Footer.init(this);
      }
      this.mountingPoint.innerHTML = await route.view.render(params);
      window.scrollTo(0, 0);
      if (route.view.init) {
        route.view.init(params, this);
      }
    }

    // Update browser title
    document.title = `${route.title} | BLUE PRINT`;
  }

  matchRoute(path) {
    // Exact match check
    if (this.routes[path]) {
      return { route: this.routes[path], params: {} };
    }

    // Dynamic path check (e.g. /project/:id)
    for (const routePath in this.routes) {
      if (routePath.includes(':')) {
        const routeParts = routePath.split('/');
        const pathParts = path.split('/');

        if (routeParts.length === pathParts.length) {
          const params = {};
          let match = true;

          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              const paramName = routeParts[i].slice(1);
              params[paramName] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
              match = false;
              break;
            }
          }

          if (match) {
            return { route: this.routes[routePath], params };
          }
        }
      }
    }

    return null;
  }
}
