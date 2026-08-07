/**
 * Dune Bar & Kitchen - Main JavaScript
 * Modern interactions, scroll animations, and form handling
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ========================================
    // Scroll Reveal Animations
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger hero animations immediately
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + (i * 150));
    });

    // ========================================
    // Reservation Form Handling
    // ========================================
    const reservationForm = document.getElementById('reservationForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalOk = document.getElementById('modalOk');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Confirming...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success modal
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Reset form
            reservationForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Log reservation data (in production, send to server)
            console.log('Reservation submitted:', data);
        }, 1200);
    });

    // Modal close handlers
    function closeModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', closeModal);

    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Gallery Image Hover Enhancement
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-overlay span')?.textContent || '';

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    ${caption ? `<p>${caption}</p>` : ''}
                    <button class="lightbox-close">&times;</button>
                </div>
            `;

            // Add lightbox styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .lightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 3000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .lightbox-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(12, 10, 9, 0.95);
                    backdrop-filter: blur(10px);
                }
                .lightbox-content {
                    position: relative;
                    z-index: 1;
                    max-width: 90vw;
                    max-height: 90vh;
                    text-align: center;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 8px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                }
                .lightbox-content p {
                    color: #a8a29e;
                    margin-top: 16px;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.2rem;
                }
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: none;
                    border: none;
                    color: #fafaf9;
                    font-size: 2.5rem;
                    cursor: pointer;
                    line-height: 1;
                    transition: color 0.2s;
                }
                .lightbox-close:hover {
                    color: #d4a853;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close lightbox
            const closeLightbox = () => {
                lightbox.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => {
                    lightbox.remove();
                    style.remove();
                    document.body.style.overflow = '';
                }, 300);
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // ========================================
    // Parallax Effect for Hero (Desktop Only)
    // ========================================
    const heroBg = document.querySelector('.hero-bg');
    let ticking = false;

    function updateParallax() {
        if (window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.4;
            heroBg.style.transform = `scale(1.05) translateY(${rate}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // ========================================
    // Preload Critical Images
    // ========================================
    const criticalImages = [
        'images/rooftop.jpg',
        'images/hero-interior.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ========================================
    // Dynamic Menu Rendering
    // ========================================
    const menuTabs = document.getElementById('menuTabs');
    const menuItems = document.getElementById('menuItems');

    window.renderMenu = function() {
        // Use window.menuData if available, otherwise the local one
        const data = window.menuData || (typeof menuData !== 'undefined' ? menuData : null);
        
        if (!data || data.length === 0) {
            console.log('No menu data available to render');
            return;
        }

        if (!menuTabs || !menuItems) return;

        // Create Tabs
        menuTabs.innerHTML = '';
        data.forEach((category, index) => {
            const tab = document.createElement('button');
            tab.className = `menu-tab ${index === 0 ? 'active' : ''}`;
            tab.textContent = category.category;
            tab.addEventListener('click', () => {
                document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                window.displayCategory(category.items);
            });
            menuTabs.appendChild(tab);
        });

        // Initial Display
        window.displayCategory(data[0].items);
    };

    window.displayCategory = function(items) {
        if (!menuItems) return;
        menuItems.style.opacity = '0';
        setTimeout(() => {
            menuItems.innerHTML = '';
            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'menu-item reveal-up visible';
                itemEl.innerHTML = `
                    <div class="menu-item-header">
                        <span class="menu-item-name">${item.name}</span>
                        <div class="menu-item-dots"></div>
                        <span class="menu-item-price">₹${item.price}</span>
                    </div>
                    ${item.description ? `<p class="menu-item-desc">${item.description}</p>` : ''}
                `;
                menuItems.appendChild(itemEl);
            });
            menuItems.style.opacity = '1';
        }, 200);
    };

    // Initial check for menu data
    if (typeof menuData !== 'undefined' && menuData.length > 0) {
        window.renderMenu();
    } else if (window.menuData && window.menuData.length > 0) {
        window.renderMenu();
    } else {
        // Fallback if menuData is not yet loaded (async)
        import('./menu.js').then(module => {
            if (!window.menuData || window.menuData.length === 0) {
                window.menuData = module.default;
                window.renderMenu();
            }
        }).catch(err => console.error('Error loading fallback menu:', err));
    }

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c Dune Bar & Kitchen ', 'background: #d4a853; color: #0c0a09; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
    console.log('%c Welcome to our digital oasis. ', 'color: #a8a29e; font-size: 12px;');
    console.log('%c Follow us on Instagram: @dunebarandkitchen ', 'color: #d4a853; font-size: 12px;');

});
