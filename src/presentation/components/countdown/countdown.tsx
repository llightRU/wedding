'use client';

import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/domain/models/wedding';
import { useCountdown } from '@/presentation/hooks/use-countdown';
import styles from './countdown.module.css';

const LABELS = ['Ngày', 'Giờ', 'Phút', 'Giây'] as const;
const KEYS = ['days', 'hours', 'minutes', 'seconds'] as const;

export function Countdown() {
    const countdown = useCountdown(wedding.date);
    const [visibleBoxes, setVisibleBoxes] = useState(false);
    const boxesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = boxesRef.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                setVisibleBoxes(true);
                observer.disconnect();
            });
        }, { threshold: 0.3 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="container">
            <h2 className="section-title">Đếm Ngược Ngày Hạnh Phúc</h2>
            <p className={styles.date}>Thứ Ba, 07 tháng 04 năm 2026 · 17h00</p>
            <div className={styles.boxes} ref={boxesRef}>
                {countdown.expired ? (
                    <p className={styles.expired}>Đã Diễn Ra!</p>
                ) : (
                    KEYS.map((key, i) => (
                        <div
                            key={key}
                            className={[styles.box, visibleBoxes ? styles.boxVisible : ''].join(' ')}
                            style={{ transitionDelay: visibleBoxes ? `${i * 150}ms` : '0ms' }}
                        >
                            <span className={styles.number}>
                                {String(countdown[key]).padStart(2, '0')}
                            </span>
                            <span className={styles.label}>{LABELS[i]}</span>
                        </div>
                    ))
                )}
            </div>
            <p className={styles.quote}>
                &ldquo;Hạnh phúc là khi ta tìm được người cùng đếm ngược từng khoảnh khắc bên nhau&rdquo;
            </p>
        </div>
    );
}
