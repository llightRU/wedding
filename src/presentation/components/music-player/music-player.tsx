'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/utils/base-path';
import styles from './music-player.module.css';

const MUSIC_SRC = asset('/assets/audio/music.mp3');

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(MUSIC_SRC);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        audio.play().then(() => {
            setIsPlaying(true);
        }).catch(() => {
            const autoPlay = () => {
                audio.play().then(() => setIsPlaying(true)).catch(() => {});
                document.removeEventListener('click', autoPlay);
                document.removeEventListener('scroll', autoPlay);
            };
            document.addEventListener('click', autoPlay);
            document.addEventListener('scroll', autoPlay);
        });

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    return (
        <button className={styles.musicPlayer} onClick={toggle} aria-label="Bật/tắt nhạc">
            {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
            )}
        </button>
    );
}
