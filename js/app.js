/**
 * App entry point — initialize all presentation components.
 * Imports follow clean architecture: presentation depends on domain & data.
 */
import { initHeroCouple } from './presentation/components/hero-couple/hero-couple.js';
import { initGallery } from './presentation/components/gallery/gallery.js';
import { initCountdown } from './presentation/components/countdown/countdown.js';
import { initEventMap } from './presentation/components/event-map/event-map.js';
import { initWishes } from './presentation/components/wishes/wishes.js';
import { initRsvp } from './presentation/components/rsvp/rsvp.js';
import { initFooter } from './presentation/components/footer/footer.js';
import { initMusicPlayer } from './presentation/components/music-player/music-player.js';
import { initGiftModal } from './presentation/components/gift-modal/gift-modal.js';
import { initNavDots } from './presentation/components/nav-dots/nav-dots.js';
import { initScrollReveal } from './utils/scroll-reveal.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeroCouple();
    initGallery();
    initCountdown();
    initEventMap();
    initWishes();
    initRsvp();
    initFooter();
    initMusicPlayer();
    initGiftModal();
    initNavDots();
    initScrollReveal();
});
