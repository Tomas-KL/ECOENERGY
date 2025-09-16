// Animaciones de scroll reveal
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Agregar clase scroll-reveal a elementos que queremos animar
    const elementsToAnimate = [
        '.hero h2',
        '.hero p',
        '.carousel-section h2',
        '.mission-slide',
        '.how-it-works h2',
        '.monitor-explanation',
        '.quality-section h2',
        '.metric-card',
        '.reviews-section h2',
        '.review-card'
    ];

    elementsToAnimate.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach((element, i) => {
            element.classList.add('scroll-reveal', `stagger-${(i % 6) + 1}`);
            observer.observe(element);
        });
    });
}

// Animación de contadores para las métricas
function initCounterAnimations() {
    const counters = document.querySelectorAll('.metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const hasSlash = text.includes('/');
    
    let finalValue, suffix = '';
    
    if (hasSlash) {
        // Para valores como "24/7"
        element.classList.add('animate');
        return;
    } else if (isPercentage) {
        finalValue = parseFloat(text.replace('%', ''));
        suffix = '%';
    } else {
        // Para valores como "99.9%"
        const match = text.match(/[\d.]+/);
        if (match) {
            finalValue = parseFloat(match[0]);
            suffix = text.replace(match[0], '');
        } else {
            element.classList.add('animate');
            return;
        }
    }

    let currentValue = 0;
    const increment = finalValue / 60; // 60 frames para la animación
    const duration = 2000; // 2 segundos
    const frameTime = duration / 60;

    element.classList.add('animate');

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        if (finalValue % 1 === 0) {
            // Número entero
            element.textContent = Math.floor(currentValue) + suffix;
        } else {
            // Número decimal
            element.textContent = currentValue.toFixed(1) + suffix;
        }
    }, frameTime);
}


// Efecto parallax suave en scroll
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .carousel-section::before, .mission-carousel::before');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Animación de carga de página
function initPageLoadAnimation() {
    document.body.classList.add('page-load');
    
    // Animar elementos del navbar
    setTimeout(() => {
        document.querySelector('.logo')?.classList.add('page-load');
    }, 200);
    
    setTimeout(() => {
        document.querySelector('.brand-info')?.classList.add('page-load');
    }, 400);
    
    setTimeout(() => {
        document.querySelector('.search-bar')?.classList.add('page-load');
    }, 600);
    
    setTimeout(() => {
        document.querySelector('.nav-right')?.classList.add('page-load');
    }, 800);
}

// Efecto typewriter para textos especiales (opcional)
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i > text.length) {
            clearInterval(timer);
        }
    }, speed);
}

// Smooth scroll mejorado para navegación
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar todas las animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initPageLoadAnimation();
    initScrollAnimations();
    initCounterAnimations();
    initMagneticEffects();
    initParallaxEffects();
    initSmoothScrolling();
});

// Optimización para dispositivos móviles
if (window.innerWidth <= 768) {
    // Reducir animaciones en móviles para mejor rendimiento
    const style = document.createElement('style');
    style.textContent = `
        .floating { animation: none !important; }
        .carousel-section::before,
        .hero::before,
        .mission-carousel::before { display: none !important; }
    `;
    document.head.appendChild(style);
}

// Detectar preferencia de movimiento reducido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}