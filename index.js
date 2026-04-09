document.addEventListener('DOMContentLoaded', () => {
    // 1. Rain Animation
    const rainContainer = document.getElementById('rain-container');
    const dropCount = 50;

    function createRain() {
        if (!rainContainer) return;
        rainContainer.innerHTML = '';
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = Math.random() * 20 + 1 + 's';
            drop.style.animationDelay = Math.random() * 10 + 's';
            rainContainer.appendChild(drop);
        }
    }
    createRain();

    // 2. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // 3. Active Nav Indicator & Scroll Sync
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const activeIndicator = document.querySelector('.active-indicator');

    function updateNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNav);
    window.addEventListener('resize', updateNav);
    updateNav(); // Initial call

    // 4. Modal Logic
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const src = trigger.getAttribute('data-src');
            const type = trigger.getAttribute('data-type');
            
            modalBody.innerHTML = '';
            
            if (type === 'pdf') {
                const iframe = document.createElement('iframe');
                iframe.src = src;
                modalBody.appendChild(iframe);
            } else if (type === 'image') {
                const img = document.createElement('img');
                img.src = src;
                modalBody.appendChild(img);
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Disable scroll
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modalBody.innerHTML = '';
            document.body.style.overflow = 'auto'; // Re-enable scroll
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalBody.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });

    // 5. Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // 6. Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Certificates Explore More
    const certCards = document.querySelectorAll('.cert-card');
    const exploreBtn = document.getElementById('explore-more-btn');
    
    if (exploreBtn) {
        if (certCards.length > 4) {
            certCards.forEach((card, index) => {
                if (index >= 4) {
                    card.classList.add('hidden-cert');
                }
            });

            exploreBtn.addEventListener('click', () => {
                const hiddenCards = document.querySelectorAll('.hidden-cert');
                if (hiddenCards.length > 0) {
                    hiddenCards.forEach(card => {
                        card.classList.remove('hidden-cert');
                        card.classList.add('shown-cert');
                    });
                    exploreBtn.textContent = 'Show Less';
                } else {
                    const shownCards = document.querySelectorAll('.shown-cert');
                    shownCards.forEach(card => {
                        card.classList.remove('shown-cert');
                        card.classList.add('hidden-cert');
                    });
                    exploreBtn.textContent = 'Explore More Certificates';
                    
                    const certSection = document.getElementById('certificates');
                    if(certSection) {
                        const navHeight = document.getElementById('main-nav') ? document.getElementById('main-nav').offsetHeight : 80;
                        const targetPosition = certSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        } else {
            exploreBtn.style.display = 'none';
        }
    }
});
