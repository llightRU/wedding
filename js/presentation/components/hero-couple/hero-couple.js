import { wedding } from '../../../domain/models/wedding.js';
import { createAsyncImage } from '../../../utils/async-image.js';

const SLIDESHOW_IMAGES = [
    'assets/images/hero_bg.webp',
    'assets/images/NLV_0046.webp',
    'assets/images/NLV_0240.webp',
    'assets/images/NLV_0546.webp',
    'assets/images/NLV_9678.webp',
];

const SLIDE_INTERVAL = 6000;

export function initHeroCouple() {
    const section = document.getElementById('hero-couple');
    if (!section) return;

    section.innerHTML = `
        <div class="hero-couple">
            <div class="hero-couple__slideshow" id="heroSlideshow"></div>
            <div class="hero-couple__content">
                <p class="hero-couple__label hero-anim">Thiệp Mời Cưới</p>
                <h2 class="hero-couple__name hero-anim">${wedding.groom}</h2>
                <span class="hero-couple__ampersand hero-anim">&</span>
                <h2 class="hero-couple__name hero-anim">${wedding.bride}</h2>
                <p class="hero-couple__quote hero-anim">"Từ hai con đường riêng, chúng mình đã tìm thấy nhau"</p>
                <p class="hero-couple__date hero-anim">07 · 04 · 2026</p>
                <p class="hero-couple__venue hero-anim">${wedding.venue}</p>
            </div>
            <div class="hero-couple__scroll-indicator scroll-indicator hero-anim">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M7 10l5 5 5-5"/>
                </svg>
            </div>
        </div>
    `;

    runEntranceAnimation();
    startSlideshow();

    /* Click scroll indicator → scroll to next section */
    const indicator = section.querySelector('.hero-couple__scroll-indicator');
    if (indicator) {
        indicator.style.cursor = 'pointer';
        indicator.addEventListener('click', () => {
            const next = document.getElementById('gallery');
            if (next) next.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function runEntranceAnimation() {
    const elements = document.querySelectorAll('.hero-anim');
    const delays = [300, 600, 900, 1200, 1500, 1800, 2100, 2500];

    elements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    elements.forEach((el, i) => {
        const delay = delays[i] || (i * 300);
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';

            /* Last element (scroll indicator) — add bounce after entrance */
            if (i === elements.length - 1) {
                setTimeout(() => {
                    el.style.transition = 'none';
                    el.classList.add('bounce');
                }, 800);
            }
        }, delay);
    });
}

function startSlideshow() {
    const container = document.getElementById('heroSlideshow');
    if (!container) return;

    const slides = SLIDESHOW_IMAGES.map((src, i) => {
        const slide = document.createElement('div');
        slide.className = 'hero-couple__slide';

        const inner = document.createElement('div');
        inner.className = 'hero-couple__slide-inner';

        const asyncImg = createAsyncImage(src, '', 'hero-couple__slide-img', {
            dark: true,
            loading: i === 0 ? 'eager' : 'lazy',
        });

        const overlay = document.createElement('div');
        overlay.className = 'hero-couple__slide-overlay';

        inner.appendChild(asyncImg);
        inner.appendChild(overlay);
        slide.appendChild(inner);
        container.appendChild(slide);
        return slide;
    });

    let current = 0;
    slides[0].classList.add('active');

    setInterval(() => {
        const prev = current;
        current = (current + 1) % slides.length;

        slides[prev].classList.remove('active');
        slides[prev].classList.add('fade-out');
        slides[current].classList.add('active');
        slides[current].classList.remove('fade-out');

        setTimeout(() => slides[prev].classList.remove('fade-out'), 1500);
    }, SLIDE_INTERVAL);
}
