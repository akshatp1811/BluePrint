/* ==========================================================================
   BLUE PRINT - Project Detail Page View
   ========================================================================== */

import { projects } from '../data/content.js';
import { setupScrollReveals } from '../app.js';
import { Lightbox } from '../components/Lightbox.js';
import { ImageComparisonSlider } from '../components/ImageComparisonSlider.js';

export const ProjectDetailView = {
  async render(params) {
    const projectId = params.id;
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    // Fallback if project is not found
    if (projectIndex === -1) {
      return `
        <div class="container" style="padding: var(--space-xxl) 0; text-align: center;">
          <h2>Project Not Found</h2>
          <p>The requested project does not exist.</p>
          <a href="/projects" data-nav="projects" class="btn btn-primary" style="margin-top: 24px;">Back to Portfolio</a>
        </div>
      `;
    }

    const project = projects[projectIndex];
    
    // Determine the next project for the bottom navigation link
    const nextProjectIndex = (projectIndex + 1) % projects.length;
    const nextProject = projects[nextProjectIndex];

    // Assemble Specs Grid
    const specs = [
      { label: 'Client', val: project.client },
      { label: 'Location', val: project.location },
      { label: 'Year', val: project.year },
      { label: 'Area', val: project.area },
      { label: 'Project Type', val: project.category },
      { label: 'Status', val: project.status }
    ];

    const specsMarkup = specs
      .map(
        spec => `
        <div class="spec-item">
          <div class="spec-label">${spec.label}</div>
          <div class="spec-val">${spec.val}</div>
        </div>
      `
      )
      .join('');

    // Gallery Collage markup with asymmetric column layout (pattern: 8, 4, 12, 6, 6)
    const colPatterns = ['col-8', 'col-4', 'col-12', 'col-6', 'col-6'];
    const galleryMarkup = project.galleryImages
      .map((img, index) => {
        const colClass = colPatterns[index % colPatterns.length];
        return `
          <div class="gallery-item ${colClass} reveal-fade-up" data-gallery-index="${index}">
            <img src="${img.url}" alt="${img.caption || project.title}">
          </div>
        `;
      })
      .join('');

    // Drawings markup
    const drawingsMarkup = project.drawings
      .map((dwg, index) => {
        return `
          <div class="drawing-card reveal-fade-up" data-drawing-index="${index}">
            <div class="drawing-image-wrapper">
              <img src="${dwg.url}" alt="${dwg.name}">
            </div>
            <div class="drawing-title">${dwg.name}</div>
          </div>
        `;
      })
      .join('');

    // Renders markup
    const rendersMarkup = project.renders
      .map((render, index) => {
        return `
          <div class="render-card reveal-fade-up" data-render-index="${index}">
            <div class="render-image-wrapper">
              <img src="${render.url}" alt="${render.name}">
            </div>
            <div class="render-title">${render.name}</div>
          </div>
        `;
      })
      .join('');

    // Comparison Slider markup if project has comparison defined
    let comparisonMarkup = '';
    if (project.comparison) {
      const sliderHtml = ImageComparisonSlider.render({
        id: `project-comparison-${project.id}`,
        beforeImage: project.comparison.beforeImage,
        afterImage: project.comparison.afterImage,
        beforeAlt: project.comparison.beforeAlt,
        afterAlt: project.comparison.afterAlt,
        beforeLabel: project.comparison.beforeLabel || 'BEFORE',
        afterLabel: project.comparison.afterLabel || 'AFTER',
        caption: project.comparison.caption
      });

      comparisonMarkup = `
        <section class="transformation-section">
          <div class="container">
            <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
              <span class="label-mono">Transformation</span>
              <h2>Construction vs Completion</h2>
              <p class="section-subtitle">Slide to compare the active building phase with the realized architectural volume.</p>
            </div>
            <div class="reveal-fade-up delay-1">
              ${sliderHtml}
            </div>
          </div>
        </section>
      `;
    }

    // Story Editorial rows (alternating text left/right and image left/right)
    const storyMarkup = project.story
      .map((story, index) => {
        const isAlternate = index % 2 !== 0;
        return `
          <div class="story-row ${isAlternate ? 'alternate' : ''}">
            <div class="story-content reveal-fade-up">
              <span class="label-mono">${project.title} Story</span>
              <h2 class="story-heading">${story.heading}</h2>
              <p class="story-text">${story.text}</p>
            </div>
            <div class="story-image-wrapper reveal-image-clip">
              <img src="${story.image}" alt="${story.heading}" class="story-image" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        `;
      })
      .join('');

    return `
      <!-- Hero Header -->
      <section class="project-detail-hero">
        <img src="${project.heroImage}" alt="${project.title}" class="detail-hero-bg hero-bg-reveal">
        <div class="detail-hero-overlay"></div>
        <div class="container detail-hero-content">
          <span class="label-mono hero-title-reveal" style="color: #ffffff; border-bottom: 2px solid var(--color-primary); padding-bottom: 4px;">Featured Project</span>
          <h1 class="detail-hero-title hero-title-reveal">${project.title}</h1>
          <p class="detail-hero-meta hero-subtitle-reveal">${project.location} &mdash; ${project.year}</p>
        </div>
      </section>

      <!-- Info Specs Block -->
      <section class="detail-info-section">
        <div class="container detail-info-grid">
          <div class="specs-grid reveal-fade-up">
            ${specsMarkup}
          </div>
          <div class="reveal-fade-up delay-1">
            <h3 style="margin-bottom: var(--space-sm); font-weight: 300;">The Project Brief</h3>
            <p class="description-text">${project.description}</p>
          </div>
        </div>
      </section>

      <!-- Editorial Story Block -->
      <section class="project-story-section">
        <div class="container">
          ${storyMarkup}
        </div>
      </section>

      <!-- Image Gallery Section -->
      <section class="detail-gallery-section bg-secondary">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">Gallery</span>
            <h2>Project Gallery</h2>
            <p class="section-subtitle">A collection of exterior, interior, and macro details capturing the spatial texture.</p>
          </div>
          <div class="gallery-collage">
            ${galleryMarkup}
          </div>
        </div>
      </section>

      <!-- Technical Drawings Section -->
      <section class="technical-drawings-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-lg);">
            <span class="label-mono">Drafts</span>
            <h2>The Architectural Design</h2>
            <p class="section-subtitle">Architectural plans, sections, and site drawings defining the structural geometry.</p>
          </div>
          <div class="drawings-grid">
            ${drawingsMarkup}
          </div>
        </div>
      </section>

      <!-- 3D Renders / Visualizations Section -->
      <section class="renders-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-lg);">
            <span class="label-mono">Visualization</span>
            <h2>Visualizing the Space</h2>
            <p class="section-subtitle">Volumetric massing renders and 3D modeling drafts prepared during the development phase.</p>
          </div>
          <div class="renders-grid">
            ${rendersMarkup}
          </div>
        </div>
      </section>

      <!-- Before / After Construction Comparison Section -->
      ${comparisonMarkup}

      <!-- Next Project Link Anchor -->
      <section class="next-project-section" id="next-project-btn" data-next-id="${nextProject.id}">
        <img src="${nextProject.heroImage}" alt="${nextProject.title}" class="next-project-bg">
        <div class="container next-project-content">
          <span class="next-project-label">Next Project &rarr;</span>
          <h2 class="next-project-title">${nextProject.title}</h2>
          <div class="next-project-arrow">&darr;</div>
        </div>
      </section>
    `;
  },

  init(params, router) {
    const projectId = params.id;
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // 1. Fire Scroll Reveal Observer
    setupScrollReveals();

    // 2. Lightbox bind for main image gallery collage
    const galleryItems = document.querySelectorAll('.gallery-item[data-gallery-index]');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.getAttribute('data-gallery-index'), 10);
        // Prepare lightbox array
        const lbArray = project.galleryImages.map(img => ({
          url: img.url,
          caption: img.caption
        }));
        Lightbox.open(lbArray, index);
      });
    });

    // 3. Lightbox bind for technical drawings
    const drawingCards = document.querySelectorAll('.drawing-card[data-drawing-index]');
    drawingCards.forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-drawing-index'), 10);
        const lbArray = project.drawings.map(dwg => ({
          url: dwg.url,
          caption: dwg.name
        }));
        Lightbox.open(lbArray, index);
      });
    });

    // 4. Lightbox bind for 3D Renders
    const renderCards = document.querySelectorAll('.render-card[data-render-index]');
    renderCards.forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-render-index'), 10);
        const lbArray = project.renders.map(r => ({
          url: r.url,
          caption: r.name
        }));
        Lightbox.open(lbArray, index);
      });
    });

    // 5. Initialize comparison slider if present
    if (project.comparison) {
      ImageComparisonSlider.init(`#project-comparison-${project.id}`);
    }

    // 6. Navigate to Next Project click listener
    const nextBtn = document.getElementById('next-project-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextId = nextBtn.getAttribute('data-next-id');
        router.navigate(`/project/${nextId}`, 'projects');
      });
    }
  }
};
