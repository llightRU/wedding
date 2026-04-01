import { HeroCouple } from '@/presentation/components/hero-couple/hero-couple';
import { Gallery } from '@/presentation/components/gallery/gallery';
import { Countdown } from '@/presentation/components/countdown/countdown';
import { EventMap } from '@/presentation/components/event-map/event-map';
import { Wishes } from '@/presentation/components/wishes/wishes';
import { Rsvp } from '@/presentation/components/rsvp/rsvp';
import { Footer } from '@/presentation/components/footer/footer';
import { MusicPlayer } from '@/presentation/components/music-player/music-player';

import { NavDots } from '@/presentation/components/nav-dots/nav-dots';

export default function Home() {
    return (
        <>
            <section id="hero-couple" className="section section--dark" style={{ padding: 0 }}>
                <HeroCouple />
            </section>

            <section id="gallery" className="section section--light">
                <Gallery />
            </section>

            <section id="countdown" className="section section--white">
                <Countdown />
            </section>

            <section id="event-map" className="section section--dark">
                <EventMap />
            </section>

            <section id="wishes" className="section section--light" style={{ padding: 0 }}>
                <Wishes />
            </section>

            <section id="rsvp" className="section section--dark">
                <Rsvp />
            </section>

            <footer id="footer" className="section section--dark" style={{ paddingTop: 0 }}>
                <Footer />
            </footer>

            {/* Floating overlays */}
            <MusicPlayer />
            <NavDots />
        </>
    );
}
