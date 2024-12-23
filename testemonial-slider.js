document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-testimonial');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide-testimonial');
        const dotsContainer = slider.nextElementSibling;
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;

        // Create dots for mobile view
        function createDots() {
            if (window.innerWidth >= 390 && dotsContainer.children.length === 0) {
                slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot-testimonial');
                    if (index === currentIndex) dot.classList.add('active-testimonial');
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            } else if (window.innerWidth < 390) {
                dotsContainer.innerHTML = '';
            }
        }

        function goToSlide(index) {
            if (window.innerWidth < 390) return;
            
            currentIndex = index;
            const offset = -index * 100;
            slider.style.transform = `translateX(${offset}%)`;
            updateDots();
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot-testimonial');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active-testimonial', index === currentIndex);
            });
        }

        slider.addEventListener('touchstart', (e) => {
            if (window.innerWidth < 390) return;
            touchStartX = e.touches[0].clientX;
            isDragging = true;
            slider.style.transition = 'none';
        }, { passive: true });

        slider.addEventListener('touchmove', (e) => {
            if (!isDragging || window.innerWidth < 390) return;
            const currentX = e.touches[0].clientX;
            const diff = currentX - touchStartX;
            const movePercent = (diff / window.innerWidth) * 100;
            const newPosition = -currentIndex * 100 + movePercent;
            
            // Limit sliding to the first and last slides
            if (newPosition <= 0 && newPosition >= -((slides.length - 1) * 100)) {
                slider.style.transform = `translateX(${newPosition}%)`;
            }
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            if (!isDragging || window.innerWidth < 390) return;
            isDragging = false;
            touchEndX = e.changedTouches[0].clientX;
            
            const diff = touchEndX - touchStartX;
            const threshold = window.innerWidth * 0.15; // 15% of screen width

            slider.style.transition = 'transform 0.3s ease-out';

            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex > 0) {
                    currentIndex--;
                } else if (diff < 0 && currentIndex < slides.length - 1) {
                    currentIndex++;
                }
            }
            
            goToSlide(currentIndex);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            createDots();
            if (window.innerWidth < 390) {
                slider.style.transform = 'translateX(0)';
                dotsContainer.style.display = 'none';
            } else {
                goToSlide(currentIndex);
                dotsContainer.style.display = 'flex';
            }
        });

        // Initial setup
        createDots();
        if (window.innerWidth >= 390) {
            dotsContainer.style.display = 'flex';
        }
    });
});
