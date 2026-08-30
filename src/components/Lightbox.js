/* ==========================================================================
   BLUE PRINT - Fullscreen Image Lightbox Component (Singleton)
   ========================================================================== */

export const Lightbox = {
  images: [],
  currentIndex: 0,
  isOpen: false,

  render() {
    return `
      <div class="lightbox" id="app-lightbox" aria-hidden="true" role="dialog">
        <!-- Close button -->
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close Lightbox"></button>

        <!-- Previous Navigation -->
        <button class="lightbox-nav lightbox-prev" id="lightbox-prev-btn" aria-label="Previous Image">
          <svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>

        <!-- Main Slide Display Area -->
        <div class="lightbox-content">
          <img src="" alt="" class="lightbox-image" id="lightbox-display-img">
        </div>

        <!-- Next Navigation -->
        <button class="lightbox-nav lightbox-next" id="lightbox-next-btn" aria-label="Next Image">
          <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>

        <!-- Metas & Counters -->
        <div class="lightbox-meta">
          <div class="lightbox-counter" id="lightbox-counter-label">0 / 0</div>
          <div class="lightbox-caption" id="lightbox-caption-label">Image Caption</div>
        </div>
      </div>
    `;
  },

  init() {
    const container = document.getElementById('lightbox-container');
    if (!container) return;

    // Inject base HTML markup
    container.innerHTML = this.render();

    // Bind event handlers
    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');
    const overlay = document.getElementById('app-lightbox');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        // If clicking outside the active image, close the lightbox
        if (e.target === overlay || e.target.classList.contains('lightbox-content')) {
          this.close();
        }
      });
    }

    // Keyboard bindings
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  },

  open(imagesArray, startIndex = 0) {
    if (!imagesArray || imagesArray.length === 0) return;

    this.images = imagesArray;
    this.currentIndex = startIndex;
    this.isOpen = true;

    const overlay = document.getElementById('app-lightbox');
    if (overlay) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock scrolling
      this.updateView();
    }
  },

  close() {
    this.isOpen = false;
    const overlay = document.getElementById('app-lightbox');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Unlock scrolling
    }
  },

  next() {
    if (!this.isOpen || this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateView();
  },

  prev() {
    if (!this.isOpen || this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateView();
  },

  updateView() {
    const imgEl = document.getElementById('lightbox-display-img');
    const counterEl = document.getElementById('lightbox-counter-label');
    const captionEl = document.getElementById('lightbox-caption-label');

    if (!imgEl) return;

    const currentImage = this.images[this.currentIndex];
    
    // Add subtle scale out and in during image updates
    imgEl.style.transform = 'scale(0.97)';
    imgEl.style.opacity = '0.3';
    
    setTimeout(() => {
      imgEl.src = currentImage.url;
      imgEl.alt = currentImage.caption || '';
      if (captionEl) captionEl.textContent = currentImage.caption || '';
      if (counterEl) counterEl.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
      
      imgEl.style.transform = 'scale(1)';
      imgEl.style.opacity = '1';
    }, 150);
  }
};
