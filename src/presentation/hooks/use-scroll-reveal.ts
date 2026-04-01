'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    el.classList.add('revealed');
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2, ...options });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
