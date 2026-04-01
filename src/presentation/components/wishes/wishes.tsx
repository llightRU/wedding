'use client';

import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/domain/models/wedding';
import styles from './wishes.module.css';

const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const START_DAY = 2; // Wednesday = index 2 (Mon-based)
const TOTAL_DAYS = 30;
const WEDDING_DAY = 7;

function buildCalendarCells() {
    const cells: { key: string; day: number | null; isWedding: boolean; isEmpty: boolean }[] = [];

    for (let i = 0; i < START_DAY; i++) {
        cells.push({ key: `empty-${i}`, day: null, isWedding: false, isEmpty: true });
    }

    for (let d = 1; d <= TOTAL_DAYS; d++) {
        cells.push({ key: `day-${d}`, day: d, isWedding: d === WEDDING_DAY, isEmpty: false });
    }

    return cells;
}

const CALENDAR_CELLS = buildCalendarCells();

export function Wishes() {
    const [visible, setVisible] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                setVisible(true);
                observer.disconnect();
            });
        }, { threshold: 0.3 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.section}>
            <div className={styles.inner}>
                <h2 className="section-title">Lời Nhắn Gửi</h2>
                <div
                    ref={contentRef}
                    className={[styles.content, visible ? styles.contentVisible : ''].join(' ')}
                >
                    <p className={styles.message}>{wedding.wishesMessage}</p>
                    <div className={styles.signature}>
                        <span className={styles.line} />
                        <span className={styles.names}>{wedding.groom} &amp; {wedding.bride}</span>
                        <span className={styles.line} />
                    </div>
                </div>
                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>Tháng 04 - 2026</div>
                    <div className={styles.calendarDays}>
                        {DAY_LABELS.map((d) => <span key={d}>{d}</span>)}
                    </div>
                    <div className={styles.calendarGrid}>
                        {CALENDAR_CELLS.map((cell) => (
                            <span
                                key={cell.key}
                                className={[
                                    styles.cell,
                                    cell.isEmpty ? styles.cellEmpty : '',
                                    cell.isWedding ? styles.weddingDay : '',
                                ].join(' ')}
                            >
                                {cell.isWedding ? (
                                    <span className={styles.heart}>&#9829;</span>
                                ) : cell.day}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
