// Carousel functionality
// Objeto para llevar control del slide actual por carrusel
const currentSlides = {
    imageCarousel: 0,
    missionCarousel: 0
};

// Avanzar al siguiente slide
function nextSlide(carouselId) {
    const carousel = document.getElementById(`${carouselId}Inner`);
    if (!carousel) return; // Validación extra
    const slides = carousel.children;
    currentSlides[carouselId] = (currentSlides[carouselId] + 1) % slides.length;
    updateCarousel(carouselId);
}

// Volver al slide anterior
function prevSlide(carouselId) {
    const carousel = document.getElementById(`${carouselId}Inner`);
    if (!carousel) return; // Validación extra
    const slides = carousel.children;
    currentSlides[carouselId] = (currentSlides[carouselId] - 1 + slides.length) % slides.length;
    updateCarousel(carouselId);
}

// Actualizar la posición del carrusel
function updateCarousel(carouselId) {
    const carousel = document.getElementById(`${carouselId}Inner`);
    if (!carousel) return;
    const translateX = -currentSlides[carouselId] * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    carousel.style.transition = 'transform 0.5s ease'; // Agregamos animación suave
}

// Animación al hacer scroll sobre la sección de calidad
let qualityAnimated = false; // Evitar reanimar constantemente

window.addEventListener('scroll', () => {
    if (qualityAnimated) return; // Solo animar una vez

    const qualitySection = document.querySelector('.quality-section');
    if (!qualitySection) return;

    const rect = qualitySection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 200);
        });
        qualityAnimated = true;
    }
});


// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value;
            if (searchTerm) {
                alert(`Buscando: ${searchTerm}`);
            }
        }
    });

    document.querySelector('.search-bar button').addEventListener('click', function() {
        const searchTerm = document.querySelector('.search-bar input').value;
        if (searchTerm) {
            alert(`Buscando: ${searchTerm}`);
        }
    });
});
