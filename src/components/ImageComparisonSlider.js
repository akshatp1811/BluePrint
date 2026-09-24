/* ==========================================================================
   BLUE PRINT - Interactive Before / After Comparison Slider Component
   ========================================================================== */

export const ImageComparisonSlider = {
  /**
   * Generates the markup for the before/after image comparison slider.
   */
  render(options = {}) {
    const {
      id = 'construction-comparison-slider',
      beforeImage = '/assets/projects/construction_before.jpg',
      afterImage = '/assets/projects/construction_after.jpg',
      beforeAlt = 'Living room during raw construction phase',
      afterAlt = 'Completed architectural living room interior',
      beforeLabel = 'BEFORE',
      afterLabel = 'AFTER',
      initialPosition = 50,
      aspectRatio = '16 / 9',
      caption = 'Drag or swipe the divider to compare the structural construction phase with the completed architectural space.'
    } = options;

    return `
      <div class="comparison-slider-container" id="${id}">
        <div class="comparison-slider-box" style="--slider-pos: ${initialPosition}%; aspect-ratio: ${aspectRatio};">
          <!-- After Image Layer (Completed / Background) -->
          <div class="comparison-layer comparison-layer-after">
            <img src="${afterImage}" alt="${afterAlt}" class="comparison-image" draggable="false" loading="lazy">
            <span class="comparison-badge comparison-badge-after">${afterLabel}</span>
          </div>

          <!-- Before Image Layer (Construction / Clipped Foreground) -->
          <div class="comparison-layer comparison-layer-before">
            <img src="${beforeImage}" alt="${beforeAlt}" class="comparison-image" draggable="false" loading="lazy">
            <span class="comparison-badge comparison-badge-before">${beforeLabel}</span>
          </div>

          <!-- Draggable Vertical Divider & Handle -->
          <div class="comparison-divider" role="slider" tabindex="0" aria-label="Before and after comparison slider" aria-valuenow="${initialPosition}" aria-valuemin="0" aria-valuemax="100">
            <div class="comparison-divider-line"></div>
            <div class="comparison-handle" aria-hidden="true">
              <svg class="comparison-handle-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="8 7 3 12 8 17"></polyline>
                <polyline points="16 7 21 12 16 17"></polyline>
                <line x1="3" y1="12" x2="21" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
        ${caption ? `
          <div class="comparison-footer">
            <span class="comparison-hint-icon"></span>
            <p class="comparison-caption">${caption}</p>
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Initializes drag & touch listeners for comparison sliders.
   */
  init(containerSelector = '.comparison-slider-container') {
    const containers = typeof containerSelector === 'string'
      ? document.querySelectorAll(containerSelector)
      : [containerSelector];

    containers.forEach(container => {
      if (!container || container._comparisonInitialized) return;
      container._comparisonInitialized = true;

      const sliderBox = container.querySelector('.comparison-slider-box');
      const divider = container.querySelector('.comparison-divider');
      if (!sliderBox || !divider) return;

      let isDragging = false;
      let currentPos = parseFloat(divider.getAttribute('aria-valuenow')) || 50;

      const updatePosition = (percent) => {
        const clamped = Math.max(0, Math.min(100, percent));
        currentPos = clamped;
        sliderBox.style.setProperty('--slider-pos', `${clamped}%`);
        divider.setAttribute('aria-valuenow', Math.round(clamped));
      };

      const handlePointerMove = (clientX) => {
        const rect = sliderBox.getBoundingClientRect();
        if (rect.width === 0) return;
        const offsetX = clientX - rect.left;
        const percent = (offsetX / rect.width) * 100;
        updatePosition(percent);
      };

      const onPointerDown = (e) => {
        isDragging = true;
        sliderBox.classList.add('is-dragging');
        handlePointerMove(e.clientX);
        try {
          divider.setPointerCapture(e.pointerId);
        } catch (_) {}
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        handlePointerMove(e.clientX);
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        sliderBox.classList.remove('is-dragging');
        try {
          divider.releasePointerCapture(e.pointerId);
        } catch (_) {}
      };

      // Pointer event listeners (supporting both desktop mouse & mobile touch)
      sliderBox.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);

      // Keyboard accessibility (Arrow keys, Home, End)
      divider.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          updatePosition(currentPos - step);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          updatePosition(currentPos + step);
        } else if (e.key === 'Home') {
          e.preventDefault();
          updatePosition(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          updatePosition(100);
        }
      });
    });
  }
};
