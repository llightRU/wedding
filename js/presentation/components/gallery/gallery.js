import { getState, updateState, subscribe } from '../../state/app-state.js';

const GALLERY_IMAGES = [
    { src: 'assets/images/z7650127744494_a2d3dd15743849918363dc759a93f4cb.jpg', alt: 'Ảnh cưới 1' },
    { src: 'assets/images/z7650127797331_b209cb3c98e58590f19ed715e4a5a15e.jpg', alt: 'Ảnh cưới 2' },
    { src: 'assets/images/z7650127952924_548054d77a0a822e978f945f120fedd0.jpg', alt: 'Ảnh cưới 3' },
    { src: 'assets/images/z7650128111193_9a0608158b23f6ce0b063517981bbe76.jpg', alt: 'Ảnh cưới 4' },
    { src: 'assets/images/z7650128213748_5dcc61fc3e253d5f9153a27b2ee5ab29.jpg', alt: 'Ảnh cưới 5' },
    { src: 'assets/images/z7650128266764_437d02fb3df55c05bf504cccd4d1b528.jpg', alt: 'Ảnh cưới 6' },
    { src: 'assets/images/z7653202237929_b12a0a9b9794d5a113f7f1133326cfdb.jpg', alt: 'Ảnh cưới 7' },
    { src: 'assets/images/z7653202301990_6536c21497f0257add3a9f25a0dbe6c6.jpg', alt: 'Ảnh cưới 8' },
    { src: 'assets/images/z7653202445379_c9b46fd8816ccedb66cbd6a222f1e334.jpg', alt: 'Ảnh cưới 9' },
    { src: 'assets/images/z7653202518052_7b0d6e21a386dcb2c47e4f89c75f8e96.jpg', alt: 'Ảnh cưới 10' },
];

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
        item.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy" class="gallery__img">`;
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
    img.src = GALLERY_IMAGES[index].src;
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
