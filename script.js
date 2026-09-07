/* ============================================================
   ALDRIN ABIR — CREATIVE PORTFOLIO
   High-Performance Vanilla JS Architecture
   Smooth Cursor · Timeline Playhead · Intersection Reveals · Counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Top Scroll Progress Bar ────────────────────────────── */
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgress) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }
  }, { passive: true });


  /* ── 2. Custom Magnetic Cursor with Lerp Physics ──────────── */
  const cursor = document.getElementById('customCursor');
  const cursorDot = cursor ? cursor.querySelector('.cursor-dot') : null;
  const cursorRing = cursor ? cursor.querySelector('.cursor-ring') : null;
  const cursorLabel = cursor ? cursor.querySelector('.cursor-label') : null;

  if (cursor && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    });

    function renderCursor() {
      // Lerp smoothing (0.15 factor for crisp responsiveness)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      if (cursorLabel) {
        cursorLabel.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Cursor Context-Aware States
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const type = el.getAttribute('data-cursor');
        document.body.classList.remove('cursor-hover', 'cursor-view', 'cursor-play');

        if (type === 'VIEW') {
          document.body.classList.add('cursor-view');
          if (cursorLabel) cursorLabel.textContent = 'VIEW';
        } else if (type === 'PLAY') {
          document.body.classList.add('cursor-play');
          if (cursorLabel) cursorLabel.textContent = 'PLAY';
        } else if (type === 'SCROLL') {
          document.body.classList.add('cursor-view');
          if (cursorLabel) cursorLabel.textContent = 'SCROLL';
        } else if (type === 'LINK') {
          document.body.classList.add('cursor-hover');
        }
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover', 'cursor-view', 'cursor-play');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });

    // Standard anchors and buttons
    document.querySelectorAll('a, button, .app-icon-badge, .service-cyan-pill').forEach((el) => {
      if (!el.hasAttribute('data-cursor')) {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      }
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
  }


  /* ── 3. Magnetic CTA Button Physics ────────────────────────── */
  const ctaBtn = document.getElementById('ctaMagneticBtn');
  if (ctaBtn && window.innerWidth > 768) {
    ctaBtn.addEventListener('mousemove', (e) => {
      const rect = ctaBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - btnCenterX) * 0.28;
      const deltaY = (e.clientY - btnCenterY) * 0.28;

      ctaBtn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.04)`;
    });

    ctaBtn.addEventListener('mouseleave', () => {
      ctaBtn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  }


  /* ── 4. Hero Video Controller & Interactive Scrubber ─────── */
  const heroVideo = document.getElementById('heroVideo');
  const heroPlayToggle = document.getElementById('heroPlayToggle');
  const heroIconPause = document.getElementById('heroIconPause');
  const heroIconPlay = document.getElementById('heroIconPlay');
  const heroSoundToggle = document.getElementById('heroSoundToggle');
  const heroIconMuted = document.getElementById('heroIconMuted');
  const heroIconUnmuted = document.getElementById('heroIconUnmuted');
  const heroScrubberWrap = document.getElementById('heroScrubberWrap');
  const heroScrubberTrack = document.getElementById('heroScrubberTrack');
  const heroScrubberProgress = document.getElementById('heroScrubberProgress');
  const heroScrubberThumb = document.getElementById('heroScrubberThumb');

  if (heroVideo) {
    // Autoplay guarantee
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback if browser requires user gesture
        if (heroPlayToggle) {
          heroPlayToggle.classList.add('is-paused');
          if (heroIconPause) heroIconPause.style.display = 'none';
          if (heroIconPlay) heroIconPlay.style.display = 'block';
        }
      });
    }

    // Play/Pause State Synchronization
    function updatePlayState(isPlaying) {
      if (heroPlayToggle) {
        if (isPlaying) {
          heroPlayToggle.classList.remove('is-paused');
          if (heroIconPause) heroIconPause.style.display = 'block';
          if (heroIconPlay) heroIconPlay.style.display = 'none';
        } else {
          heroPlayToggle.classList.add('is-paused');
          if (heroIconPause) heroIconPause.style.display = 'none';
          if (heroIconPlay) heroIconPlay.style.display = 'block';
        }
      }
    }

    heroVideo.addEventListener('play', () => updatePlayState(true));
    heroVideo.addEventListener('pause', () => updatePlayState(false));

    if (heroPlayToggle) {
      heroPlayToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (heroVideo.paused) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    }

    // Click anywhere on hero video wrapper to toggle play/pause
    const heroVideoWrapper = document.querySelector('.hero-video-wrapper');
    if (heroVideoWrapper) {
      heroVideoWrapper.addEventListener('click', () => {
        if (heroVideo.paused) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    }

    // Audio Mute/Unmute Toggle
    if (heroSoundToggle) {
      heroSoundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        heroVideo.muted = !heroVideo.muted;
        if (heroVideo.muted) {
          if (heroIconMuted) heroIconMuted.style.display = 'block';
          if (heroIconUnmuted) heroIconUnmuted.style.display = 'none';
          heroSoundToggle.setAttribute('aria-label', 'Unmute audio');
        } else {
          if (heroIconMuted) heroIconMuted.style.display = 'none';
          if (heroIconUnmuted) heroIconUnmuted.style.display = 'block';
          heroSoundToggle.setAttribute('aria-label', 'Mute audio');
        }
      });
    }

    // Real-Time Scrubber Progress Update
    let isScrubbing = false;

    heroVideo.addEventListener('timeupdate', () => {
      if (!isScrubbing && heroVideo.duration) {
        const percent = (heroVideo.currentTime / heroVideo.duration) * 100;
        if (heroScrubberProgress) heroScrubberProgress.style.width = `${percent}%`;
        if (heroScrubberThumb) heroScrubberThumb.style.left = `${percent}%`;
      }
    });

    // Scrubber Seeking (Click & Drag)
    function seekFromEvent(e) {
      if (!heroScrubberTrack || !heroVideo.duration) return;
      const rect = heroScrubberTrack.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      heroVideo.currentTime = pos * heroVideo.duration;
      const percent = pos * 100;
      if (heroScrubberProgress) heroScrubberProgress.style.width = `${percent}%`;
      if (heroScrubberThumb) heroScrubberThumb.style.left = `${percent}%`;
    }

    if (heroScrubberWrap) {
      heroScrubberWrap.addEventListener('mousedown', (e) => {
        isScrubbing = true;
        seekFromEvent(e);

        const onMouseMove = (moveEvent) => {
          if (isScrubbing) seekFromEvent(moveEvent);
        };

        const onMouseUp = () => {
          isScrubbing = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });

      // Mobile Touch Scrubbing
      heroScrubberWrap.addEventListener('touchstart', (e) => {
        isScrubbing = true;
        if (e.touches && e.touches[0]) seekFromEvent(e.touches[0]);
      }, { passive: true });

      heroScrubberWrap.addEventListener('touchmove', (e) => {
        if (isScrubbing && e.touches && e.touches[0]) seekFromEvent(e.touches[0]);
      }, { passive: true });

      heroScrubberWrap.addEventListener('touchend', () => {
        isScrubbing = false;
      });
    }
  }

  /* ── 4b. About Creative Process Video Controls ───────────────── */
  const aboutProcessCard = document.getElementById('aboutProcessCard');
  const aboutProcessVideo = document.getElementById('aboutProcessVideo');
  const aboutPlayToggle = document.getElementById('aboutPlayToggle');
  const aboutPlayIcon = document.getElementById('aboutPlayIcon');
  const aboutPauseIcon = document.getElementById('aboutPauseIcon');
  const aboutSoundToggle = document.getElementById('aboutSoundToggle');
  const aboutSoundOnIcon = document.getElementById('aboutSoundOnIcon');
  const aboutSoundOffIcon = document.getElementById('aboutSoundOffIcon');

  if (aboutProcessVideo) {
    // Autoplay guarantee muted
    aboutProcessVideo.muted = true;
    const playPromise = aboutProcessVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        updateAboutPlayUI(false);
      });
    }

    function updateAboutPlayUI(isPlaying) {
      if (aboutPlayToggle) {
        if (isPlaying) {
          aboutPlayToggle.classList.remove('is-paused');
          if (aboutPlayIcon) aboutPlayIcon.style.display = 'none';
          if (aboutPauseIcon) aboutPauseIcon.style.display = 'block';
          aboutPlayToggle.setAttribute('aria-label', 'Pause process video');
        } else {
          aboutPlayToggle.classList.add('is-paused');
          if (aboutPlayIcon) aboutPlayIcon.style.display = 'block';
          if (aboutPauseIcon) aboutPauseIcon.style.display = 'none';
          aboutPlayToggle.setAttribute('aria-label', 'Play process video');
        }
      }
    }

    function updateAboutSoundUI(isMuted) {
      if (aboutSoundToggle) {
        if (isMuted) {
          if (aboutSoundOnIcon) aboutSoundOnIcon.style.display = 'none';
          if (aboutSoundOffIcon) aboutSoundOffIcon.style.display = 'block';
          aboutSoundToggle.setAttribute('aria-label', 'Unmute process video');
        } else {
          if (aboutSoundOnIcon) aboutSoundOnIcon.style.display = 'block';
          if (aboutSoundOffIcon) aboutSoundOffIcon.style.display = 'none';
          aboutSoundToggle.setAttribute('aria-label', 'Mute process video');
        }
      }
    }

    aboutProcessVideo.addEventListener('play', () => updateAboutPlayUI(true));
    aboutProcessVideo.addEventListener('pause', () => updateAboutPlayUI(false));

    function toggleAboutPlay() {
      if (aboutProcessVideo.paused) {
        aboutProcessVideo.play().catch(() => {});
      } else {
        aboutProcessVideo.pause();
      }
    }

    if (aboutPlayToggle) {
      aboutPlayToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAboutPlay();
      });
    }

    if (aboutSoundToggle) {
      aboutSoundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        aboutProcessVideo.muted = !aboutProcessVideo.muted;
        updateAboutSoundUI(aboutProcessVideo.muted);
      });
    }

    if (aboutProcessCard) {
      // Clicking card toggles play/pause
      aboutProcessCard.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        toggleAboutPlay();
      });

      // Keyboard accessibility (Space or Enter to toggle play)
      aboutProcessCard.addEventListener('keydown', (e) => {
        if (e.target === aboutProcessCard && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          toggleAboutPlay();
        }
      });
    }
  }

  /* ── 4c. Earth Globe Background Video Auto-Play on View ─────── */
  const earthGlobeVideo = document.getElementById('earthGlobeVideo');
  if (earthGlobeVideo) {
    earthGlobeVideo.muted = true;
    const globeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          earthGlobeVideo.play().catch(() => {});
        } else {
          earthGlobeVideo.pause();
        }
      });
    }, {
      threshold: 0.05
    });
    globeObserver.observe(earthGlobeVideo);
  }


  /* ── 5. IntersectionObserver Scroll Reveal ─────────────────── */
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ── 6. Eased Stat Counters Animation ──────────────────────── */
  const statDigits = document.querySelectorAll('.stat-digit');

  function animateDigit(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 2000;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Exponential ease-out
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('.projects-stats-bar');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statDigits.forEach((digit) => animateDigit(digit));
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }


  /* ── 7. Interactive Play Simulation for Video Cards ───────── */
  document.querySelectorAll('.about-media-card, .ai-player-mockup, .studio-reel-frame').forEach((card) => {
    card.addEventListener('click', () => {
      const playBtn = card.querySelector('.play-circle-btn, .ai-play-btn-large, .reel-play-button');
      if (playBtn) {
        playBtn.style.transform = 'scale(0.85)';
        setTimeout(() => {
          playBtn.style.transform = 'scale(1.15)';
        }, 150);
      }
    });
  });


  /* ── 8. Smooth Auto-Scroll for Web Prototype Mockup ────────── */
  const prototypeScroll = document.querySelector('.prototype-scroll-frame');
  if (prototypeScroll) {
    let scrollDirection = 1;
    let autoScrollActive = true;

    prototypeScroll.addEventListener('mouseenter', () => { autoScrollActive = false; });
    prototypeScroll.addEventListener('mouseleave', () => { autoScrollActive = true; });

    setInterval(() => {
      if (!autoScrollActive) return;
      const maxScroll = prototypeScroll.scrollHeight - prototypeScroll.clientHeight;
      if (maxScroll <= 0) return;

      if (prototypeScroll.scrollTop >= maxScroll - 5) {
        scrollDirection = -1;
      } else if (prototypeScroll.scrollTop <= 5) {
        scrollDirection = 1;
      }

      prototypeScroll.scrollTop += scrollDirection * 1;
    }, 40);
  }


  /* ── 9. Floating "Back to Top" Button Controller ─────────── */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 10. Toast Notification System ──────────────────────── */
  const portfolioToast = document.getElementById('portfolioToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg, duration = 3200) {
    if (!portfolioToast || !toastMessage) return;
    toastMessage.textContent = msg;
    portfolioToast.classList.add('is-visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      portfolioToast.classList.remove('is-visible');
    }, duration);
  }

  /* ── 10b. Interactive Contact & Booking Drawer ───────────── */
  const contactDrawerOverlay = document.getElementById('contactDrawerOverlay');
  const contactDrawerClose = document.getElementById('contactDrawerClose');
  const chatTrigger = document.getElementById('floatingChatTrigger');
  const dockCtaBtn = document.getElementById('dockCtaBtn');
  const quickCopyEmailBtn = document.getElementById('quickCopyEmailBtn');
  const drawerInquiryForm = document.getElementById('drawerInquiryForm');

  function openContactDrawer(e) {
    if (e) e.preventDefault();
    if (contactDrawerOverlay) {
      contactDrawerOverlay.classList.add('is-active');
      contactDrawerOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = document.getElementById('inquiryName');
      if (firstInput) setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeContactDrawer() {
    if (contactDrawerOverlay) {
      contactDrawerOverlay.classList.remove('is-active');
      contactDrawerOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (chatTrigger) chatTrigger.addEventListener('click', openContactDrawer);
  if (dockCtaBtn) dockCtaBtn.addEventListener('click', openContactDrawer);
  if (contactDrawerClose) contactDrawerClose.addEventListener('click', closeContactDrawer);

  if (contactDrawerOverlay) {
    contactDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === contactDrawerOverlay) closeContactDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactDrawerOverlay && contactDrawerOverlay.classList.contains('is-active')) {
      closeContactDrawer();
    }
  });

  if (quickCopyEmailBtn) {
    quickCopyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = 'aldrinabir@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  }

  if (drawerInquiryForm) {
    drawerInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inquiryName')?.value || '';
      const contact = document.getElementById('inquiryContact')?.value || '';
      const budget = document.getElementById('inquiryBudget')?.value || '';
      const brief = document.getElementById('inquiryBrief')?.value || '';
      
      const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(cb => cb.value)
        .join(', ') || 'Video Editing';

      const subject = encodeURIComponent(`Project Inquiry from ${name} (${services})`);
      const body = encodeURIComponent(
        `Name: ${name}\nContact: ${contact}\nServices: ${services}\nEstimated Budget: ${budget}\n\nProject Brief:\n${brief}`
      );

      showToast('Opening your email client with your project brief...', 4000);
      
      setTimeout(() => {
        window.location.href = `mailto:aldrinabir@gmail.com?subject=${subject}&body=${body}`;
        closeContactDrawer();
        drawerInquiryForm.reset();
      }, 700);
    });
  }


  /* ── 11. 3D Tilt on Location Glass Cards ──────────────────── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.location-glass-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      });
    });
  }

  /* ── 12. Smooth Scroll on Dock Navigation Links ──────────── */
  document.querySelectorAll('.dock-item-link').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ── 13. Digital Rights & Media Download Prevention ───────── */
  // Prevent right-click context menu on all images, videos, canvas, and media showcases
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('img, video, .hero-video-wrapper, .earth-globe-wrapper, .about-process-card, .brand-mockups-stage, .project-tile, .campaign-card, .prototype-scroll-frame')) {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // Prevent drag-to-desktop / drag-to-folder on all media
  document.addEventListener('dragstart', (e) => {
    if (e.target.closest('img, video')) {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // Block keyboard shortcuts commonly used to scrape/download media (Ctrl+S, Cmd+S)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

});

