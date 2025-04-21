document.addEventListener("DOMContentLoaded", function () {
    // ===== CONFIGURATION =====
    const IMAGES = ["/img/GTR.jpg", "/img/AUDIRes.jpg", "/img/nissan.jpg"];
    const TRANSITION_DURATION = 1000; // 1 second fade
    const VISIBLE_DURATION = 3000; // 3 seconds fully visible
    const SLIDE_INTERVAL = VISIBLE_DURATION + TRANSITION_DURATION; // Total 4s per cycle

    // ===== GET ELEMENTS FROM EXISTING HTML =====
    const homeSection = document.querySelector(".home");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    let slideInterval;

    // ===== SLIDER FUNCTIONS =====
    function initializeSlider() {
        // Create image layers
        IMAGES.forEach((img, index) => {
            const layer = document.createElement("div");
            layer.className = "slider-layer";
            layer.style.backgroundImage = `url(${img})`;
            layer.style.transition = `opacity ${TRANSITION_DURATION}ms ease-in-out`;
            layer.style.opacity = index === 0 ? "1" : "0";
            homeSection.insertBefore(layer, homeSection.firstChild);
        });

        // Set up auto-rotation
        startAutoRotation();

        // Initialize dots
        updateDots();
    }

    function changeSlide(newIndex) {
        const layers = document.querySelectorAll(".slider-layer");

        // Update layers
        layers.forEach((layer, i) => {
            layer.style.opacity = i === newIndex ? "1" : "0";
        });

        currentIndex = newIndex;
        updateDots();
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % IMAGES.length;
        changeSlide(newIndex);
    }

    // ===== DOT NAVIGATION =====
    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function setupDotNavigation() {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                changeSlide(index);
                resetTimer();
            });
        });
    }

    // ===== AUTO-ROTATION CONTROL =====
    function startAutoRotation() {
        slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startAutoRotation();
    }

    function setupPauseOnHover() {
        homeSection.addEventListener("mouseenter", () => {
            clearInterval(slideInterval);
        });

        homeSection.addEventListener("mouseleave", () => {
            startAutoRotation();
        });
    }

    // ===== INITIALIZATION =====
    initializeSlider();
    setupDotNavigation();
    setupPauseOnHover();

    // ===== STYLE INJECTION =====
    const style = document.createElement("style");
    style.textContent = `
        .slider-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 1;
        }
        .home {
            position: relative;
        }
        .main__info {
            position: relative;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
});
