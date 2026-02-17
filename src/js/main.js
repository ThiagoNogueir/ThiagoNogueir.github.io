/* ===================================
   Thiago | Backend Developer Portfolio
   Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas as funcionalidades
    initNavbar();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initCounterAnimation();
    initContactForm();
    initSkillsCarousel();
    initProjectsCarousel();
});

/* ===================================
   Navbar Scroll & Mobile Menu
   =================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Efeito de scroll na navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle menu mobile
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* ===================================
   Typing Effect
   =================================== */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = [
        'Backend Developer',
        'Python Developer',
        'Node.js Developer',
        'API Architect'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pausa ao completar a palavra
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pausa antes de começar a próxima palavra
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ===================================
   Particles Background
   =================================== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 1;
        
        // Duração da animação aleatória
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Opacidade aleatória (tons de cinza)
        const opacity = Math.random() * 0.3 + 0.1;
        const grayValue = Math.floor(Math.random() * 155 + 100); // 100-255
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: rgb(${grayValue}, ${grayValue}, ${grayValue});
            border-radius: 50%;
            opacity: ${opacity};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }

    // Adicionar keyframes da animação dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar skill bars quando visíveis
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .project-card, .contact-content'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/* ===================================
   Counter Animation
   =================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/* ===================================
   Contact Form
   =================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Aqui você pode integrar com um serviço de email
            // Por enquanto, apenas mostramos um feedback visual
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            submitBtn.style.background = 'var(--accent-green)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
            
            console.log('Form submitted:', data);
        });
    }
}

/* ===================================
   Smooth Scroll para Links Internos
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70; // Compensar navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ===================================
   Skill Cards - Tooltip Effect
   =================================== */
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const tech = this.getAttribute('data-tech');
        // Aqui você pode adicionar um tooltip customizado se desejar
        console.log(`Tech: ${tech}`);
    });
});

/* ===================================
   Skills Carousel
   =================================== */
function initSkillsCarousel() {
    const track = document.querySelector('.skills-carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = document.querySelectorAll('.skill-category');
    
    function updateCarousel() {
        const container = track.parentElement;
        const containerWidth = container.clientWidth;
        const cardWidth = window.innerWidth <= 992 ? 300 : 340;
        const gap = 32;
        const totalWidth = cardWidth + gap;
        const visibleCards = Math.floor((containerWidth + gap) / totalWidth);
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        return { cardWidth, gap, totalWidth, maxIndex };
    }
    
    let { cardWidth, gap, totalWidth, maxIndex } = updateCarousel();

    let currentIndex = 0;
    
    // Criar dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -(currentIndex * totalWidth);
        track.style.transform = `translateX(${offset}px)`;
        updateDots();
        updateButtons();
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Swipe/touch support
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        track.style.transition = 'none';
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.pageX;
        const diff = currentX - startX;
        const offset = -(currentIndex * totalWidth) + diff;
        track.style.transform = `translateX(${offset}px)`;
    });
    
    track.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
    
    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
    
    // Touch support para mobile
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        track.style.transition = 'none';
    });
    
    track.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].pageX;
        const diff = currentX - startX;
        const offset = -(currentIndex * totalWidth) + diff;
        track.style.transform = `translateX(${offset}px)`;
    });
    
    track.addEventListener('touchend', () => {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    updateButtons();
}

/* ===================================
   Projects Carousel
   =================================== */
function initProjectsCarousel() {
    const track = document.querySelector('.projects-carousel-track');
    const prevBtn = document.querySelector('.projects-carousel-container .prev-btn');
    const nextBtn = document.querySelector('.projects-carousel-container .next-btn');
    const dotsContainer = document.querySelector('.projects-carousel-dots');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = document.querySelectorAll('.projects-carousel-track .project-card');
    
    function updateCarousel() {
        const container = track.parentElement;
        const containerWidth = container.clientWidth;
        const cardWidth = window.innerWidth <= 992 ? 300 : 340;
        const gap = 32;
        const totalWidth = cardWidth + gap;
        const visibleCards = Math.floor((containerWidth + gap) / totalWidth);
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        return { cardWidth, gap, totalWidth, maxIndex };
    }
    
    let { cardWidth, gap, totalWidth, maxIndex } = updateCarousel();

    let currentIndex = 0;

    // Criar dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('projects-carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.projects-carousel-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -(currentIndex * totalWidth);
        track.style.transform = `translateX(${offset}px)`;
        updateDots();
        updateButtons();
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Swipe/touch support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        track.style.transition = 'none';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.pageX;
        const diff = currentX - startX;
        const offset = -(currentIndex * totalWidth) + diff;
        track.style.transform = `translateX(${offset}px)`;
    });

    track.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    // Touch support para mobile
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].pageX;
        const diff = currentX - startX;
        const offset = -(currentIndex * totalWidth) + diff;
        track.style.transform = `translateX(${offset}px)`;
    });

    track.addEventListener('touchend', () => {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    updateButtons();
}
