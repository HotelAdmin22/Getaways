document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');
    const dots = document.querySelector('.dots');

    let currentIndex = 0;
    let slidesToShow = 1;

    function updateSlidesToShow() {
        if (window.innerWidth >= 790) {
            slidesToShow = 3;
        } else {
            slidesToShow = 1;
        }
        updateSlider();
    }

    function updateSlider() {
        const totalSlides = Math.ceil(slides.length / slidesToShow);
        slider.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
        updateDots();
    }

    function updateDots() {
        const totalSlides = Math.ceil(slides.length / slidesToShow);
        dots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dots.appendChild(dot);
        }
    }

    function nextSlide() {
        const totalSlides = Math.ceil(slides.length / slidesToShow);
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        const totalSlides = Math.ceil(slides.length / slidesToShow);
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    slides.forEach(slide => {
        const leftTapArea = slide.querySelector('.tap-area.left');
        const rightTapArea = slide.querySelector('.tap-area.right');

        leftTapArea.addEventListener('click', prevSlide);
        rightTapArea.addEventListener('click', nextSlide);
    });

    window.addEventListener('resize', updateSlidesToShow);
    updateSlidesToShow();
});

