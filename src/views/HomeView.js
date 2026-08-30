/* ==========================================================================
   BLUE PRINT - Home Page View
   ========================================================================== */

import { projects, statistics, designPhilosophy, processSteps, studioInfo } from '../data/content.js';
import { setupScrollReveals } from '../app.js';

export const HomeView = {
  async render() {
    // Select first 4 projects for selected grid on Home
    const featuredProjects = projects.slice(0, 4);

    const projectCardsMarkup = featuredProjects
      .map(project => {
        return `
          <article class="project-card reveal-fade-up" data-project-id="${project.id}">
            <div class="project-card-image-wrapper">
              <img src="${project.heroImage}" alt="${project.title}" class="project-card-image">
              <div class="project-card-overlay"></div>
              <div class="project-card-indicator">View Project &rarr;</div>
            </div>
            <div class="project-card-info">
              <div class="project-card-meta">
                <span>${project.location}</span>
                <span>${project.category} | ${project.year}</span>
              </div>
              <h3 class="project-card-title">${project.title}</h3>
            </div>
          </article>
        `;
      })
      .join('');

    const statsMarkup = statistics
      .map(stat => {
        return `
          <div class="stat-item">
            <div class="stat-number" data-target="${stat.value}">0</div>
            <div class="stat-label">${stat.label}</div>
          </div>
        `;
      })
      .join('');

    const philosophyMarkup = designPhilosophy
      .map(philo => {
        return `
          <div class="philosophy-card reveal-fade-up">
            <div class="philosophy-num">${philo.num}</div>
            <h3 class="philosophy-title">${philo.title}</h3>
            <p class="philosophy-desc">${philo.desc}</p>
            <div class="philosophy-line"></div>
          </div>
        `;
      })
      .join('');

    const processMarkup = processSteps
      .map((step, idx) => {
        return `
          <div class="process-step" id="process-step-${idx}">
            <div class="process-step-node">${step.num}</div>
            <div class="process-step-content">
              <h3 class="process-step-title">${step.title}</h3>
              <p class="process-step-desc">${step.desc}</p>
            </div>
          </div>
        `;
      })
      .join('');

    return `
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-background-wrapper">
          <!-- Main Hero Background -->
          <img src="/assets/projects/hero_main.jpg" alt="Blueprint Architecture Hero" class="hero-background hero-bg-reveal">
        </div>
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <span class="label-mono hero-title-reveal">Architectural Studio</span>
          <h1 class="hero-title hero-title-reveal">${studioInfo.name}</h1>
          <p class="hero-subtitle hero-subtitle-reveal">${studioInfo.tagline}</p>
          <p class="hero-description hero-desc-reveal">
            Blue Print is an architecture and design studio creating thoughtful, contemporary spaces that balance form, function, and human experience.
          </p>
          <div class="hero-actions hero-btn-reveal">
            <a href="/projects" data-nav="projects" class="btn btn-primary">Explore Projects</a>
            <a href="/contact" data-nav="contact" class="btn btn-secondary">Start a Project</a>
          </div>
          <div class="hero-metadata hero-meta-reveal">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Based in</span>
              <span class="hero-meta-val">Bengaluru, India</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Est. Year</span>
              <span class="hero-meta-val">2016</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Focus</span>
              <span class="hero-meta-val">Minimalism</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Introduction Section (Asymmetric Editorial Layout) -->
      <section class="intro-section">
        <div class="container intro-grid">
          <div class="intro-text-wrapper reveal-fade-up">
            <span class="label-mono">Introduction</span>
            <h2 class="intro-heading">We design spaces with purpose.</h2>
            <p class="intro-body">
              We believe that architecture is more than just raw material and structure. It is the framework for human life. Our process is deeply rooted in context, crafting tailored designs that respond to native landscapes, light, and the unique habits of their inhabitants.
            </p>
            <p class="intro-body" style="font-size: 1rem; color: var(--color-text-light);">
              From private residential sanctuaries to carbon-neutral commercial buildings, we seek to bring a contemporary design sensibility that stands the test of time, marrying geometric clarity with organic warmth.
            </p>
            <a href="/about" data-nav="about" class="btn-text" style="margin-top: var(--space-sm);">
              Read Our Story <span class="arrow">&rarr;</span>
            </a>
          </div>
          <div class="intro-image-wrapper reveal-image-clip" id="intro-parallax-container">
            <img src="/assets/projects/intro_main.jpg" alt="Architectural design process" class="intro-image parallax-image" id="intro-parallax-img">
          </div>
        </div>
      </section>

      <!-- Statistics Section (Counter Animations) -->
      <section class="stats-section" id="stats-trigger-section">
        <div class="container stats-grid">
          ${statsMarkup}
        </div>
      </section>

      <!-- Selected Projects (Grid Portfolio) -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-wrapper reveal-fade-up">
              <span class="label-mono">Portfolio</span>
              <h2>Selected Projects</h2>
              <p class="section-subtitle">A selection of spaces shaped by context, material, and human experience.</p>
            </div>
            <div class="reveal-fade-up delay-1">
              <a href="/projects" data-nav="projects" class="btn btn-secondary">View All Projects</a>
            </div>
          </div>
          <div class="featured-grid">
            ${projectCardsMarkup}
          </div>
        </div>
      </section>

      <!-- Design Philosophy -->
      <section class="philosophy-section">
        <div class="container">
          <div class="reveal-fade-up" style="text-align: center; max-width: 600px; margin: 0 auto var(--space-xl);">
            <span class="label-mono">Our Beliefs</span>
            <h2>Form. Function. Experience.</h2>
            <p class="section-subtitle">We design based on four core architectural pillars, creating structures that enrich everyday life.</p>
          </div>
          <div class="philosophy-grid">
            ${philosophyMarkup}
          </div>
        </div>
      </section>

      <!-- Process Section (Horizontal Timeline) -->
      <section class="process-section" id="process-trigger-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">The Way We Work</span>
            <h2>From idea to reality.</h2>
            <p class="section-subtitle">A step-by-step collaboration tailored to guide clients seamlessly from sketch to structural delivery.</p>
          </div>
          
          <div class="process-timeline reveal-fade-up delay-1">
            <div class="process-timeline-progress" id="timeline-progress-bar"></div>
            ${processMarkup}
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="cta-section reveal-fade-up">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-heading">Have a space in mind? Let's build it.</h2>
            <p class="cta-desc">Tell us about your next project and let's create something remarkable together.</p>
          </div>
          <div class="cta-action">
            <a href="/contact" data-nav="contact" class="btn btn-secondary">Start a Conversation</a>
          </div>
        </div>
      </section>
    `;
  },

  init(params, router) {
    // 1. Fire scroll-reveals
    setupScrollReveals();

    // 2. Setup Project Tile Links Routing
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        router.navigate(`/project/${projectId}`, 'projects');
      });
    });

    // 3. Setup Scroll Parallax on Intro Image
    const parallaxImg = document.getElementById('intro-parallax-img');
    const parallaxContainer = document.getElementById('intro-parallax-container');
    
    if (parallaxImg && parallaxContainer) {
      const handleParallax = () => {
        const rect = parallaxContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If element is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollPct = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          const translateY = (scrollPct - 0.5) * 50; // Shift range +/- 25px
          parallaxImg.style.transform = `translateY(${translateY}px) scale(1.08)`;
        }
      };
      window.addEventListener('scroll', handleParallax);
      handleParallax(); // Initial positioning
    }

    // 4. Setup Animated Counters on Stats Viewport Entry
    const statsSection = document.getElementById('stats-trigger-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statsSection && statNumbers.length > 0) {
      let animated = false;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            
            statNumbers.forEach(stat => {
              const target = parseInt(stat.getAttribute('data-target'), 10);
              const duration = 1800; // 1.8 seconds duration
              const startTime = performance.now();

              const animateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing curve (easeOutQuad)
                const easedProgress = progress * (2 - progress);
                const currentValue = Math.floor(easedProgress * target);

                stat.textContent = `${currentValue}+`;

                if (progress < 1) {
                  requestAnimationFrame(animateCounter);
                } else {
                  stat.textContent = `${target}+`;
                }
              };

              requestAnimationFrame(animateCounter);
            });
            
            observer.unobserve(statsSection);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(statsSection);
    }

    // 5. Setup Process Timeline Active State Shifter
    const processSection = document.getElementById('process-trigger-section');
    const progressBar = document.getElementById('timeline-progress-bar');
    const steps = document.querySelectorAll('.process-step');
    
    if (processSection && progressBar && steps.length > 0) {
      let timelineAnimated = false;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !timelineAnimated) {
            timelineAnimated = true;
            
            // Stagger animation to fill timeline bar and activate dots sequentially
            let progress = 0;
            const targetWidths = [12.5, 37.5, 62.5, 87.5]; // Positioning percentages for steps
            
            steps.forEach((step, index) => {
              setTimeout(() => {
                // Set active class
                step.classList.add('active');
                
                // Update progress bar length
                progressBar.style.width = `${targetWidths[index]}%`;
              }, index * 400); // 400ms delay per step
            });

            // Set final width to 100% after all steps are activated
            setTimeout(() => {
              progressBar.style.width = '100%';
            }, steps.length * 400);

            observer.unobserve(processSection);
          }
        });
      }, { threshold: 0.3 });

      observer.observe(processSection);
    }
  }
};
