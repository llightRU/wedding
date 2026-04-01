'use client';

import { useState, useEffect, useCallback } from 'react';

export function useGallery(total: number) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const openLightbox = useCallback((index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
    }, []);

    const navigate = useCallback((direction: number) => {
        setCurrentIndex((prev) => (prev + direction + total) % total);
    }, [total]);

    useEffect(() => {
        if (!lightboxOpen) return;

        document.body.style.overflow = 'hidden';

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        };

        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [lightboxOpen, closeLightbox, navigate]);

    return { currentIndex, lightboxOpen, openLightbox, closeLightbox, navigate };
}
