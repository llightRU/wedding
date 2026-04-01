'use client';

import { useEffect, useState } from 'react';
import { wedding } from '@/domain/models/wedding';
import styles from './gift-modal.module.css';

type Person = 'groom' | 'bride' | null;

export function GiftModal() {
    const [open, setOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person>(null);

    useEffect(() => {
        if (!open) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open]);

    const openModal = () => {
        setSelectedPerson(null);
        setOpen(true);
    };

    return (
        <>
            <button className={styles.giftBtn} onClick={openModal} aria-label="Mừng cưới">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="8" width="18" height="13" rx="2"/>
                    <path d="M12 8V21M3 12h18M7.5 8C7.5 8 7.5 3 12 3s4.5 5 4.5 5"/>
                </svg>
            </button>

            <div className={[styles.modal, open ? styles.modalOpen : ''].join(' ')}>
                <div className={styles.backdrop} onClick={() => setOpen(false)} />
                <div className={styles.content}>
                    <button className={styles.closeBtn} onClick={() => setOpen(false)}>&times;</button>
                    <h3 className={styles.title}>Mừng Cưới</h3>
                    <p className={styles.subtitle}>Sự hiện diện của bạn là món quà quý giá nhất</p>

                    {selectedPerson === null ? (
                        <div className={styles.choices}>
                            <button className={styles.choice} onClick={() => setSelectedPerson('groom')}>
                                <span className={styles.choiceIcon}>🤵</span>
                                <span className={styles.choiceLabel}>Chú Rể</span>
                                <span className={styles.choiceName}>{wedding.groom}</span>
                            </button>
                            <button className={styles.choice} onClick={() => setSelectedPerson('bride')}>
                                <span className={styles.choiceIcon}>👰</span>
                                <span className={styles.choiceLabel}>Cô Dâu</span>
                                <span className={styles.choiceName}>{wedding.bride}</span>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button className={styles.backBtn} onClick={() => setSelectedPerson(null)}>
                                ← Quay lại
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedPerson === 'groom' ? '/assets/images/qr_quang.jfif' : '/assets/images/qr_nhung.jfif'}
                                alt={selectedPerson === 'groom' ? wedding.groom : wedding.bride}
                                className={styles.qrImg}
                            />
                            <p className={styles.qrName}>
                                {selectedPerson === 'groom' ? wedding.groom : wedding.bride}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
