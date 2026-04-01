'use client';

import { useEffect, useState } from 'react';
import styles from './nav-dots.module.css';

const SECTIONS = [
    { id: 'hero-couple', label: 'Trang chủ' },
    { id: 'gallery', label: 'Ảnh cưới' },
    { id: 'countdown', label: 'Đếm ngược' },
    { id: 'event-map', label: 'Sự kiện' },
    { id: 'wishes', label: 'Lời nhắn' },
    { id: 'rsvp', label: 'Xác nhận' },
];

export function NavDots() {
    const [activeSection, setActiveSection] = useState('hero-couple');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.4 });

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={styles.navDots} aria-label="Điều hướng trang">
            {SECTIONS.map(({ id, label }) => (
                <button
                    key={id}
                    className={[styles.dot, activeSection === id ? styles.dotActive : ''].join(' ')}
                    onClick={() => scrollTo(id)}
                    aria-label={label}
                    title={label}
                >
                    <span className={styles.indicator} />
                </button>
            ))}
        </nav>
    );
}
