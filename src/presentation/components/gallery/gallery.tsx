'use client';

import { useEffect, useRef, useState } from 'react';
import { useGallery } from '@/presentation/hooks/use-gallery';
import styles from './gallery.module.css';

const GALLERY_IMAGES = [
    'NLV_0046', 'NLV_0098', 'NLV_0123', 'NLV_0213', 'NLV_0240',
    'NLV_0404', 'NLV_0546', 'NLV_0557', 'NLV_0672', 'NLV_0842',
    'NLV_0939', 'NLV_1062', 'NLV_1584', 'NLV_1630', 'NLV_1969',
    'NLV_2304', 'NLV_2351', 'NLV_9678', 'NLV_9709',
].map((name, i) => ({
    thumb: `/assets/images/thumbs/${name}.webp`,
    full: `/assets/images/${name}.webp`,
    alt: `Ảnh cưới ${i + 1}`,
}));

export function Gallery() {
    const { currentIndex, lightboxOpen, openLightbox, closeLightbox, navigate } = useGallery(GALLERY_IMAGES.length);
    const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(GALLERY_IMAGES.length).fill(false));
    const gridRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);

    /* Stagger reveal on scroll */
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                GALLERY_IMAGES.forEach((_, i) => {
                    setTimeout(() => {
                        setVisibleItems((prev) => {
                            const next = [...prev];
                            next[i] = true;
                            return next;
                        });
                    }, i * 100);
                });
                observer.disconnect();
            });
        }, { threshold: 0.1 });

        observer.observe(grid);
        return () => observer.disconnect();
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) navigate(diff > 0 ? -1 : 1);
    };

    return (
        <>
            <div className="container">
                <h2 className="section-title">Khoảnh Khắc Của Chúng Tôi</h2>
                <p className={styles.quote}>&ldquo;Mỗi bức ảnh là một câu chuyện, mỗi khoảnh khắc là một kỷ niệm&rdquo;</p>
                <div className={styles.grid} ref={gridRef}>
                    {GALLERY_IMAGES.map((image, i) => (
                        <div
                            key={image.full}
                            className={[styles.item, visibleItems[i] ? styles.itemVisible : ''].join(' ')}
                            onClick={() => openLightbox(i)}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.thumb}
                                alt={image.alt}
                                className={styles.img}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <div
                className={[styles.lightbox, lightboxOpen ? styles.lightboxOpen : ''].join(' ')}
                onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Đóng">&times;</button>
                <button className={styles.lightboxPrev} onClick={() => navigate(-1)} aria-label="Ảnh trước">&#8249;</button>
                <button className={styles.lightboxNext} onClick={() => navigate(1)} aria-label="Ảnh sau">&#8250;</button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {lightboxOpen && (
                    <img
                        className={styles.lightboxImg}
                        src={GALLERY_IMAGES[currentIndex].full}
                        alt={GALLERY_IMAGES[currentIndex].alt}
                    />
                )}
                <div className={styles.lightboxCounter}>
                    {currentIndex + 1} / {GALLERY_IMAGES.length}
                </div>
            </div>
        </>
    );
}
