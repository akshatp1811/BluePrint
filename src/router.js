import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { ImageComparisonSlider } from './components/ImageComparisonSlider.js';
import { Lightbox } from './components/Lightbox.js';
import { loadContent, copy, plainText, previewMode, projects } from './data/content.js';

export class Router {
  constructor(routes, mountingPoint, navbarPoint, footerPoint) {
    Object.assign(this, { routes, mountingPoint, navbarPoint, footerPoint, sequence: 0 });
  }
  init() {
    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[data-nav]');
      if (!link) return;
      event.preventDefault(); this.navigate(link.getAttribute('href'));
    });
    window.addEventListener('popstate', () => this.resolveRoute(location.pathname));
    this.resolveRoute(location.pathname);
  }
  navigate(path) {
    const url = new URL(path, location.origin);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) { location.href = path; return; }
    if (location.pathname === url.pathname && !url.hash) return;
    if (previewMode) url.searchParams.set('preview', '1');
    history.pushState({}, '', url.pathname + url.search + url.hash); this.resolveRoute(url.pathname);
  }
  async resolveRoute(path) {
    const sequence = ++this.sequence;
    const overlay = document.getElementById('page-transition-overlay');
    overlay?.classList.remove('animating-out'); overlay?.classList.add('animating-in');
    try {
      await loadContent();
      const match = this.matchRoute(path);
      let markup;
      if (!match) markup = `<div class="container" style="padding:80px 0"><h1>${copy.detail.missingHeading}</h1><p>${copy.detail.missingText}</p><a href="/projects" data-nav="projects">${copy.detail.missingLink}</a></div>`;
      else markup = await match.route.view.render(match.params);
      if (sequence !== this.sequence) return;
      Navbar.destroy(); ImageComparisonSlider.destroy(); Lightbox.close();
      this.currentViewName = match?.route.name || '';
      this.navbarPoint.innerHTML = Navbar.render(this.currentViewName); Navbar.init(this);
      this.footerPoint.innerHTML = Footer.render(); Footer.init(this);
      this.mountingPoint.innerHTML = markup;
      window.scrollTo(0, 0);
      match?.route.view.init?.(match.params, this);
      const project = match?.params.id ? projects.find(p => p.id === match.params.id) : null;
      const pageKey = path === '/' ? 'home' : this.currentViewName;
      const routeTitle = project?.title || (match ? copy[pageKey]?.title : copy.detail.missingHeading);
      document.title = plainText(routeTitle ? `${routeTitle} | ${copy.branding.titleSuffix}` : copy.seo.title);
      document.querySelector('meta[name="description"]')?.setAttribute('content', plainText(project?.description || copy.seo.description));
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (copy.seo.image) { if (!ogImage) { ogImage = document.createElement('meta'); ogImage.setAttribute('property', 'og:image'); document.head.append(ogImage); } ogImage.setAttribute('content', plainText(copy.seo.image)); }
      else ogImage?.remove();
      let favicon = document.querySelector('link[rel="icon"]');
      if (copy.branding.favicon) { if (!favicon) { favicon = document.createElement('link'); favicon.rel = 'icon'; document.head.append(favicon); } favicon.href = plainText(copy.branding.favicon); }
      else favicon?.remove();
    } catch (failure) {
      if (sequence !== this.sequence) return;
      const message = document.createElement('p'); message.textContent = failure.message;
      const button = document.createElement('button'); button.textContent = plainText(copy.interface?.retry || 'Retry'); button.onclick = () => this.resolveRoute(path);
      this.mountingPoint.replaceChildren(message, button);
    } finally {
      if (sequence === this.sequence) {
        overlay?.classList.remove('animating-in'); overlay?.classList.add('animating-out');
        setTimeout(() => { if (sequence === this.sequence) overlay?.classList.remove('animating-out'); }, 600);
      }
    }
  }
  matchRoute(path) {
    if (this.routes[path]) return { route: this.routes[path], params: {} };
    const match = path.match(/^\/project\/([a-z0-9-]+)\/?$/);
    return match ? { route: this.routes['/project/:id'], params: { id: match[1] } } : null;
  }
}
