import { getState, updateState, subscribe } from '../../state/app-state.js';
import { createAsyncImage } from '../../../utils/async-image.js';

const GALLERY_IMAGES = [
    'NLV_0046', 'NLV_0098', 'NLV_0123', 'NLV_0213', 'NLV_0240',
    'NLV_0404', 'NLV_0546', 'NLV_0557', 'NLV_0672', 'NLV_0842',
    'NLV_0939', 'NLV_1062', 'NLV_1584', 'NLV_1630', 'NLV_1969',
    'NLV_2304', 'NLV_2351', 'NLV_9678', 'NLV_9709',
].map((name, i) => ({
    thumb: `assets/images/thumbs/${name}.webp`,
    full: `assets/images/${name}.webp`,
    alt: `Ảnh cưới ${i + 1}`,
}));

export function initGallery() {
    const section = document.getElementById('gallery');
    if (!section) return;

    section.innerHTML = `
        <div class="container">
            <h2 class="section-title">Khoảnh Khắc Của Chúng Tôi</h2>
            <p class="gallery__quote">"Mỗi bức ảnh là một câu chuyện, mỗi khoảnh khắc là một kỷ niệm"</p>
            <div class="gallery__grid" id="galleryGrid"></div>
        </div>
        <div class="gallery__lightbox" id="galleryLightbox">
            <button class="gallery__lightbox-close" id="lightboxClose" aria-label="Đóng">&times;</button>
            <button class="gallery__lightbox-prev" id="lightboxPrev" aria-label="Ảnh trước">&#8249;</button>
            <button class="gallery__lightbox-next" id="lightboxNext" aria-label="Ảnh sau">&#8250;</button>
            <img class="gallery__lightbox-img" id="lightboxImg" src="" alt="">
            <div class="gallery__lightbox-counter" id="lightboxCounter"></div>
        </div>
    `;

    renderGrid();
    bindLightbox();
}

function renderGrid() {
    const grid = document.getElementById('galleryGrid');

    GALLERY_IMAGES.forEach((image, i) => {
        const item = document.createElement('div');
        item.className = 'gallery__item';
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        const asyncImg = createAsyncImage(image.thumb, image.alt, 'gallery__img');
        item.appendChild(asyncImg);
        item.addEventListener('click', () => openLightbox(i));
        grid.appendChild(item);
    });

    /* Stagger reveal when section scrolls into view */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const items = grid.querySelectorAll('.gallery__item');
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, i * 100);
            });
            observer.disconnect();
        });
    }, { threshold: 0.1 });

    observer.observe(grid);
}

function openLightbox(index) {
    updateState('gallery.currentIndex', index);
    updateState('gallery.lightboxOpen', true);
    showLightboxImage(index);
    document.getElementById('galleryLightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    updateState('gallery.lightboxOpen', false);
    document.getElementById('galleryLightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function navigate(direction) {
    const state = getState();
    const total = GALLERY_IMAGES.length;
    const next = (state.gallery.currentIndex + direction + total) % total;
    updateState('gallery.currentIndex', next);
    showLightboxImage(next);
}

function showLightboxImage(index) {
    const img = document.getElementById('lightboxImg');
    const counter = document.getElementById('lightboxCounter');
    img.src = GALLERY_IMAGES[index].full;
    img.alt = GALLERY_IMAGES[index].alt;
    counter.textContent = `${index + 1} / ${GALLERY_IMAGES.length}`;
}

function bindLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navigate(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navigate(1));

    /* Close on backdrop click */
    document.getElementById('galleryLightbox').addEventListener('click', (e) => {
        if (e.target.id === 'galleryLightbox') closeLightbox();
    });

    /* Keyboard navigation */
    document.addEventListener('keydown', (e) => {
        if (!getState().gallery.lightboxOpen) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    /* Touch swipe */
    let touchStartX = 0;
    const lightbox = document.getElementById('galleryLightbox');

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) {
            navigate(diff > 0 ? -1 : 1);
        }
    }, { passive: true });
}
