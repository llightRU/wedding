/**
 * Floating music player — plays background music with toggle button.
 * Auto-plays after first user interaction (click/scroll).
 */
const MUSIC_SRC = 'assets/audio/music.mp3';

let audio = null;
let isPlaying = false;

export function initMusicPlayer() {
    audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.3;

    const btn = document.createElement('button');
    btn.className = 'music-player';
    btn.id = 'musicPlayer';
    btn.setAttribute('aria-label', 'Bật/tắt nhạc');
    btn.innerHTML = getMusicIcon(false);
    document.body.appendChild(btn);

    btn.addEventListener('click', toggleMusic);

    /* Try auto-play immediately, fallback to first interaction */
    audio.play().then(() => {
        isPlaying = true;
        updateButton();
    }).catch(() => {
        const autoPlay = () => {
            playMusic();
            updateButton();
            document.removeEventListener('click', autoPlay);
            document.removeEventListener('scroll', autoPlay);
        };
        document.addEventListener('click', autoPlay);
        document.addEventListener('scroll', autoPlay);
    });
}

function toggleMusic() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
    updateButton();
}

function playMusic() {
    audio.play().catch(() => {});
    isPlaying = true;
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
}

function updateButton() {
    const btn = document.getElementById('musicPlayer');
    if (btn) btn.innerHTML = getMusicIcon(isPlaying);
}

function getMusicIcon(playing) {
    if (playing) {
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>`;
    }
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>`;
}
