'use client';

import { useEffect, useRef, useState } from 'react';
import { wedding } from '@/domain/models/wedding';
import styles from './event-map.module.css';

type Side = 'groom' | 'bride';

const SIDES = {
    groom: {
        label: 'Nhà Trai',
        time: '17:00',
        venue: wedding.venue,
        mapQuery: encodeURIComponent('Golden Palace Mipec Long Biên, Hà Nội'),
        directionsUrl: null as string | null,
        mapEmbed: null as string | null,
    },
    bride: {
        label: 'Nhà Gái',
        time: '09:00',
        venue: 'Thôn 8, xã Hạ Long, Vân Đồn, Quảng Ninh',
        mapQuery: null as string | null,
        directionsUrl: 'https://maps.app.goo.gl/P27EKxtdcTCiTDPx9?g_st=ic',
        mapEmbed: 'https://www.google.com/maps?q=21.078639,107.440083&output=embed',
    },
};

const TIMELINE_ITEMS = [
    { time: '04:00', title: 'Đi đón dâu' },
    { time: '09:00', title: 'Bắt đầu ăn uống tại nhà gái' },
    { time: '11:00', title: 'Rước dâu lên Hà Nội' },
    { time: '15:00', title: 'Làm lễ tại nhà trai' },
    { time: '16:30', title: 'Đón khách tại Golden Palace' },
    { time: '17:00', title: 'Lễ thành hôn' },
];

function getMapUrls(side: Side) {
    const data = SIDES[side];
    if (side === 'bride') {
        return { embed: data.mapEmbed!, directions: data.directionsUrl! };
    }
    const query = data.mapQuery!;
    return {
        embed: `https://www.google.com/maps?q=${query}&output=embed`,
        directions: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
    };
}

const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
);

const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
);

const PinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
);

const ShirtIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 001 .84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.14a1 1 0 001-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
    </svg>
);

export function EventMap() {
    const [activeSide, setActiveSide] = useState<Side>('groom');
    const [visibleItems, setVisibleItems] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const map = getMapUrls(activeSide);
    const sideData = SIDES[activeSide];

    const eventItems = [
        { icon: <CalendarIcon />, label: 'Ngày', value: 'Thứ Ba, 07/04/2026' },
        { icon: <ClockIcon />, label: 'Thời gian', value: sideData.time },
        { icon: <PinIcon />, label: 'Địa điểm', value: sideData.venue },
        { icon: <ShirtIcon />, label: 'Trang phục', value: '__dresscode__' },
    ];

    useEffect(() => {
        setVisibleItems(false);
        const timer = setTimeout(() => setVisibleItems(true), 50);
        return () => clearTimeout(timer);
    }, [activeSide]);

    useEffect(() => {
        const refs = [detailsRef.current, timelineRef.current].filter(Boolean) as HTMLElement[];
        const observers: IntersectionObserver[] = [];

        refs.forEach((el) => {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setVisibleItems(true);
                    obs.disconnect();
                });
            }, { threshold: 0.2 });
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <div className="container">
            <h2 className="section-title">Thông Tin Lễ Cưới</h2>
            <div className={styles.tabs}>
                {(['groom', 'bride'] as Side[]).map((side) => (
                    <button
                        key={side}
                        className={[styles.tab, activeSide === side ? styles.tabActive : ''].join(' ')}
                        onClick={() => setActiveSide(side)}
                    >
                        {SIDES[side].label}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {/* Details */}
                <div className={styles.details} ref={detailsRef}>
                    {eventItems.map((item, i) => (
                        <div
                            key={item.label}
                            className={[styles.item, visibleItems ? styles.itemVisible : ''].join(' ')}
                            style={{ transitionDelay: visibleItems ? `${i * 120}ms` : '0ms' }}
                        >
                            <div className={styles.icon}>{item.icon}</div>
                            <div className={styles.text}>
                                <span className={styles.itemLabel}>{item.label}</span>
                                <span className={styles.itemValue}>
                                    {item.value === '__dresscode__' ? (
                                        <span className={styles.colors}>
                                            <span className={`${styles.colorDot} ${styles.colorDotWhite}`} />
                                            <span className={`${styles.colorDot} ${styles.colorDotBlack}`} />
                                            <span className={`${styles.colorDot} ${styles.colorDotCream}`} />
                                            <span className={`${styles.colorDot} ${styles.colorDotPink}`} />
                                        </span>
                                    ) : item.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className={styles.timeline} ref={timelineRef}>
                    <h3 className={styles.timelineTitle}>Lịch Trình</h3>
                    <div className={styles.timelineList}>
                        {TIMELINE_ITEMS.map((item, i) => (
                            <div
                                key={item.time}
                                className={[
                                    styles.timelineItem,
                                    visibleItems ? styles.timelineItemVisible : '',
                                    i === TIMELINE_ITEMS.length - 1 ? styles.timelineItemLast : '',
                                ].join(' ')}
                                style={{ transitionDelay: visibleItems ? `${(eventItems.length + i) * 120}ms` : '0ms' }}
                            >
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineTime}>{item.time}</span>
                                    <span className={styles.timelineName}>{item.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map */}
                <div className={styles.mapWrapper}>
                    <iframe
                        className={styles.map}
                        src={map.embed}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                    <a
                        href={map.directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.directionsBtn}
                    >
                        Chỉ Đường →
                    </a>
                </div>
            </div>
        </div>
    );
}
