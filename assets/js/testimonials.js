// Testimonials Carousel - Simple vanilla JS implementation
(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize carousel on page load
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials-track');
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    
    if (cards.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval = null;
    let isPaused = false;

    // Only initialize carousel on desktop (>900px)
    function isDesktop() {
      return window.innerWidth > 900;
    }

    // Calculate how many cards to show at once
    function getVisibleCards() {
      return isDesktop() ? 3 : 1;
    }

    // Calculate total steps (advancing by 1 card at a time)
    function getTotalSteps() {
      return cards.length - getVisibleCards() + 1;
    }

    // Move to specific index
    function goToIndex(index) {
      if (!isDesktop()) return;
      
      const visibleCards = getVisibleCards();
      const totalSteps = getTotalSteps();
      
      // Loop around
      if (index >= totalSteps) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = totalSteps - 1;
      } else {
        currentIndex = index;
      }

      // Calculate offset - advance by 1 card width + gap
      const cardWidth = cards[0].offsetWidth;
      const gap = 20; // matches CSS gap
      const offset = -(currentIndex * (cardWidth + gap));
      
      track.style.transform = `translateX(${offset}px)`;
    }

    // Advance to next card
    function nextSlide() {
      goToIndex(currentIndex + 1);
    }

    // Start autoplay
    function startAutoplay() {
      if (prefersReducedMotion || !isDesktop() || isPaused) return;
      
      stopAutoplay(); // Clear any existing interval
      autoplayInterval = setInterval(nextSlide, 3000); // Advance every 3 seconds
    }

    // Stop autoplay
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', function() {
      isPaused = true;
      stopAutoplay();
    });

    // Resume on mouse leave
    carousel.addEventListener('mouseleave', function() {
      isPaused = false;
      startAutoplay();
    });

    // Pause on focus (accessibility)
    carousel.addEventListener('focusin', function() {
      isPaused = true;
      stopAutoplay();
    });

    // Resume on blur
    carousel.addEventListener('focusout', function() {
      isPaused = false;
      startAutoplay();
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        if (isDesktop()) {
          goToIndex(currentIndex);
          if (!isPaused) {
            startAutoplay();
          }
        } else {
          stopAutoplay();
          track.style.transform = '';
        }
      }, 250);
    });

    // Initialize on desktop
    if (isDesktop() && !prefersReducedMotion) {
      goToIndex(0);
      startAutoplay();
    }
  });
})();
