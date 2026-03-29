/**
 * Vertical dot navigation — shows current section, click to scroll.
 */
const SECTIONS = [
    { id: 'hero-couple', label: 'Trang chủ' },
    { id: 'gallery', label: 'Ảnh cưới' },
    { id: 'countdown', label: 'Đếm ngược' },
    { id: 'event-map', label: 'Sự kiện' },
    { id: 'wishes', label: 'Lời nhắn' },
    { id: 'rsvp', label: 'Xác nhận' },
];

export function initNavDots() {
    const nav = document.createElement('nav');
    nav.className = 'nav-dots';
    nav.setAttribute('aria-label', 'Điều hướng trang');

    nav.innerHTML = SECTIONS.map((s) =>
        `<button class="nav-dots__dot" data-section="${s.id}" aria-label="${s.label}" title="${s.label}">
            <span class="nav-dots__indicator"></span>
        </button>`
    ).join('');

    document.body.appendChild(nav);

    /* Click to scroll */
    nav.querySelectorAll('.nav-dots__dot').forEach((dot) => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(dot.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* Track active section */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                nav.querySelectorAll('.nav-dots__dot').forEach(d => d.classList.remove('active'));
                const active = nav.querySelector(`[data-section="${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
    });
}
