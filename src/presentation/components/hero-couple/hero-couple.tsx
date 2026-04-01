'use client';

import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/domain/models/wedding';
import { asset } from '@/utils/base-path';
import styles from './hero-couple.module.css';

const SLIDESHOW_IMAGES = [
    asset('/assets/images/hero_bg.webp'),
    asset('/assets/images/NLV_0046.webp'),
    asset('/assets/images/NLV_0240.webp'),
    asset('/assets/images/NLV_0546.webp'),
    asset('/assets/images/NLV_9678.webp'),
];

const SLIDE_INTERVAL = 6000;

export function HeroCouple() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const [animVisible, setAnimVisible] = useState(false);
    const [bouncing, setBouncing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    /* Entrance animation */
    useEffect(() => {
        const timer = setTimeout(() => setAnimVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    /* Bounce after entrance */
    useEffect(() => {
        if (!animVisible) return;
        const timer = setTimeout(() => setBouncing(true), 2500 + 800);
        return () => clearTimeout(timer);
    }, [animVisible]);

    /* Slideshow */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                setPrevSlide(prev);
                const next = (prev + 1) % SLIDESHOW_IMAGES.length;
                setTimeout(() => setPrevSlide(null), 1500);
                return next;
            });
        }, SLIDE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const scrollToGallery = () => {
        const next = document.getElementById('gallery');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.heroCouple}>
            {/* Slideshow */}
            <div className={styles.slideshow}>
                {SLIDESHOW_IMAGES.map((src, i) => (
                    <div
                        key={src}
                        className={[
                            styles.slide,
                            i === currentSlide ? styles.slideActive : '',
                            i === prevSlide ? styles.slideFadeOut : '',
                        ].join(' ')}
                    >
                        <div className={styles.slideInner}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt=""
                                className={styles.slideImg}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                            />
                            <div className={styles.slideOverlay} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className={styles.content} ref={contentRef}>
                <p
                    className={styles.label}
                    style={animVisible ? { opacity: 1, transform: 'translateY(0)' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s' }}
                >
                    Thiệp Mời Cưới
                </p>
                <h2
                    className={styles.name}
                    style={animVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s' }}
                >
                    {wedding.groom}
                </h2>
                <span
                    className={styles.ampersand}
                    style={animVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s' }}
                >
                    &amp;
                </span>
                <h2
                    className={styles.name}
                    style={animVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s' }}
                >
                    {wedding.bride}
                </h2>
                <p
                    className={styles.quote}
                    style={animVisible ? { opacity: 0.7, transform: 'translateY(0)', transition: 'opacity 0.8s ease 1.5s, transform 0.8s ease 1.5s' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 1.5s, transform 0.8s ease 1.5s' }}
                >
                    &ldquo;Từ hai con đường riêng, chúng mình đã tìm thấy nhau&rdquo;
                </p>
                <p
                    className={styles.date}
                    style={animVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.8s ease 1.8s, transform 0.8s ease 1.8s' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 1.8s, transform 0.8s ease 1.8s' }}
                >
                    07 · 04 · 2026
                </p>
                <p
                    className={styles.venue}
                    style={animVisible ? { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.8s ease 2.1s, transform 0.8s ease 2.1s' } : { opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 2.1s, transform 0.8s ease 2.1s' }}
                >
                    {wedding.venue}
                </p>
            </div>

            {/* Scroll indicator */}
            <button
                className={[styles.scrollIndicator, bouncing ? styles.bounce : ''].join(' ')}
                style={animVisible ? { opacity: 0.6, transition: 'opacity 0.8s ease 2.5s' } : { opacity: 0, transition: 'opacity 0.8s ease 2.5s' }}
                onClick={scrollToGallery}
                aria-label="Cuộn xuống"
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M7 10l5 5 5-5" />
                </svg>
            </button>
        </div>
    );
}
