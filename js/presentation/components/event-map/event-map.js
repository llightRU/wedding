import { wedding } from '../../../domain/models/wedding.js';

/* ── Data for each side ── */
const SIDES = {
    groom: {
        label: 'Nhà Trai',
        time: '17:00',
        venue: wedding.venue,
        mapQuery: encodeURIComponent('Golden Palace Mipec Long Biên, Hà Nội'),
        directionsUrl: null, // use default google maps directions
    },
    bride: {
        label: 'Nhà Gái',
        time: '09:00',
        venue: 'Thôn 8, xã Hạ Long, Vân Đồn, Quảng Ninh',
        mapQuery: null,
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

const ICONS = {
    calendar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    pin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    shirt: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 001 .84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.14a1 1 0 001-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>',
};

let activeSide = 'groom';

export function initEventMap() {
    const section = document.getElementById('event-map');
    if (!section) return;

    render(section);
    animateOnScroll();
}

function getMapUrls(side) {
    const data = SIDES[side];
    if (side === 'bride') {
        return {
            embed: data.mapEmbed,
            directions: data.directionsUrl,
        };
    }
    const query = data.mapQuery;
    return {
        embed: `https://www.google.com/maps?q=${query}&output=embed`,
        directions: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
    };
}

function buildEventItems(side) {
    const data = SIDES[side];
    return [
        { icon: 'calendar', label: 'Ngày', value: 'Thứ Ba, 07/04/2026' },
        { icon: 'clock', label: 'Thời gian', value: data.time },
        { icon: 'pin', label: 'Địa điểm', value: data.venue },
        { icon: 'shirt', label: 'Trang phục', value: '__dresscode__' },
    ];
}

function render(section) {
    const items = buildEventItems(activeSide);
    const map = getMapUrls(activeSide);

    section.innerHTML = `
        <div class="container">
            <h2 class="section-title">Thông Tin Lễ Cưới</h2>
            <div class="event-map__tabs">
                <button class="event-map__tab${activeSide === 'groom' ? ' event-map__tab--active' : ''}" data-side="groom">
                    ${SIDES.groom.label}
                </button>
                <button class="event-map__tab${activeSide === 'bride' ? ' event-map__tab--active' : ''}" data-side="bride">
                    ${SIDES.bride.label}
                </button>
            </div>
            <div class="event-map__grid">
                <div class="event-map__details" id="eventDetails">
                    ${items.map((item) => `
                        <div class="event-map__item">
                            <div class="event-map__icon">${ICONS[item.icon]}</div>
                            <div class="event-map__text">
                                <span class="event-map__label">${item.label}</span>
                                <span class="event-map__value">${item.value === '__dresscode__'
                                    ? '<span class="event-map__colors"><span class="event-map__color-dot event-map__color-dot--white"></span><span class="event-map__color-dot event-map__color-dot--black"></span><span class="event-map__color-dot event-map__color-dot--cream"></span><span class="event-map__color-dot event-map__color-dot--pink"></span></span>'
                                    : item.value}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="event-map__timeline" id="eventTimeline">
                    <h3 class="event-map__timeline-title">Lịch Trình</h3>
                    <div class="event-map__timeline-list">
                        ${TIMELINE_ITEMS.map((item, i) => `
                            <div class="event-map__timeline-item${i === TIMELINE_ITEMS.length - 1 ? ' event-map__timeline-item--last' : ''}">
                                <div class="event-map__timeline-dot"></div>
                                <div class="event-map__timeline-content">
                                    <span class="event-map__timeline-time">${item.time}</span>
                                    <span class="event-map__timeline-name">${item.title}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="event-map__map-wrapper">
                    <iframe
                        class="event-map__map"
                        src="${map.embed}"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        allowfullscreen
                    ></iframe>
                    <a href="${map.directions}" target="_blank" rel="noopener" class="event-map__directions-btn">
                        Chỉ Đường →
                    </a>
                </div>
            </div>
        </div>
    `;

    /* Bind tab clicks */
    section.querySelectorAll('.event-map__tab').forEach((btn) => {
        btn.addEventListener('click', () => {
            const side = btn.dataset.side;
            if (side === activeSide) return;
            activeSide = side;
            render(section);
            animateOnScroll();
        });
    });
}

function animateOnScroll() {
    const animated = document.querySelectorAll('.event-map__item, .event-map__timeline-item');
    animated.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const children = entry.target.querySelectorAll('.event-map__item, .event-map__timeline-item');
            children.forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 120);
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    const details = document.getElementById('eventDetails');
    const timeline = document.getElementById('eventTimeline');
    if (details) observer.observe(details);
    if (timeline) observer.observe(timeline);
}
