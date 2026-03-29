import { wedding } from '../../../domain/models/wedding.js';

const MAP_QUERY = encodeURIComponent('Golden Palace Mipec Long Biên, Hà Nội');
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

const EVENT_ITEMS = [
    { icon: 'calendar', label: 'Ngày', value: 'Thứ Ba, 07/04/2026' },
    { icon: 'clock', label: 'Thời gian', value: '17:00' },
    { icon: 'pin', label: 'Địa điểm', value: wedding.venue },
    { icon: 'shirt', label: 'Trang phục', value: '__dresscode__' },
];

const ICONS = {
    calendar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    pin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    shirt: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 001 .84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.14a1 1 0 001-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>',
};

export function initEventMap() {
    const section = document.getElementById('event-map');
    if (!section) return;

    section.innerHTML = `
        <div class="container">
            <h2 class="section-title">Thông Tin Lễ Cưới</h2>
            <div class="event-map__grid">
                <div class="event-map__details" id="eventDetails">
                    ${EVENT_ITEMS.map((item) => `
                        <div class="event-map__item">
                            <div class="event-map__icon">${ICONS[item.icon]}</div>
                            <div class="event-map__text">
                                <span class="event-map__label">${item.label}</span>
                                <span class="event-map__value">${item.value === '__dresscode__'
                                    ? '<span class="event-map__colors"><span class="event-map__color-dot event-map__color-dot--white"></span><span class="event-map__color-dot event-map__color-dot--black"></span></span>'
                                    : item.value}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="event-map__map-wrapper">
                    <iframe
                        class="event-map__map"
                        src="${MAP_EMBED_URL}"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        allowfullscreen
                    ></iframe>
                    <a href="${MAP_DIRECTIONS_URL}" target="_blank" rel="noopener" class="event-map__directions-btn">
                        Chỉ Đường →
                    </a>
                </div>
            </div>
        </div>
    `;

    animateOnScroll();
}

function animateOnScroll() {
    const items = document.querySelectorAll('.event-map__item');
    items.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, i * 120);
            });
            observer.disconnect();
        });
    }, { threshold: 0.2 });

    const details = document.getElementById('eventDetails');
    if (details) observer.observe(details);
}
