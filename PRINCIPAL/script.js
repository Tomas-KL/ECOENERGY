// Carousel functionality
let currentSlides = {
    imageCarousel: 0,
    missionCarousel: 0
};

function nextSlide(carouselId) {
    const carousel = document.getElementById(carouselId + 'Inner');
    const slides = carousel.children;
    currentSlides[carouselId] = (currentSlides[carouselId] + 1) % slides.length;
    updateCarousel(carouselId);
}

function prevSlide(carouselId) {
    const carousel = document.getElementById(carouselId + 'Inner');
    const slides = carousel.children;
    currentSlides[carouselId] = (currentSlides[carouselId] - 1 + slides.length) % slides.length;
    updateCarousel(carouselId);
}

function updateCarousel(carouselId) {
    const carousel = document.getElementById(carouselId + 'Inner');
    const translateX = -currentSlides[carouselId] * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Auto-play for image carousel
setInterval(() => {
    nextSlide('imageCarousel');
}, 4000);

// Smooth scrolling animation for quality section
window.addEventListener('scroll', () => {
    const qualitySection = document.querySelector('.quality-section');
    const rect = qualitySection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.6s ease forwards`;
            }, index * 200);
        });
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