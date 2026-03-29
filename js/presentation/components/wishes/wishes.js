import { wedding } from '../../../domain/models/wedding.js';

export function initWishes() {
    const section = document.getElementById('wishes');
    if (!section) return;

    section.innerHTML = `
        <div class="container wishes">
            <h2 class="section-title">Lời Nhắn Gửi</h2>
            <div class="wishes__content">
                <p class="wishes__message">${wedding.wishesMessage}</p>
                <div class="wishes__signature">
                    <span class="wishes__line"></span>
                    <span class="wishes__names">${wedding.groom} & ${wedding.bride}</span>
                    <span class="wishes__line"></span>
                </div>
            </div>
            <div class="wishes__calendar">
                <div class="wishes__calendar-header">Tháng 04 - 2026</div>
                <div class="wishes__calendar-days">
                    <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                </div>
                <div class="wishes__calendar-grid">
                    ${buildCalendar()}
                </div>
            </div>
        </div>
    `;

    animateOnScroll();
}

/** Build April 2026 calendar — April 1 is Wednesday (index 2) */
function buildCalendar() {
    const startDay = 2; // Wednesday = index 2 (Mon-based)
    const totalDays = 30;
    let cells = '';

    for (let i = 0; i < startDay; i++) {
        cells += '<span class="wishes__calendar-cell empty"></span>';
    }

    for (let d = 1; d <= totalDays; d++) {
        if (d === 7) {
            cells += `<span class="wishes__calendar-cell wedding-day">
                <span class="wishes__heart">♥</span>
            </span>`;
        } else {
            cells += `<span class="wishes__calendar-cell">${d}</span>`;
        }
    }

    return cells;
}

function animateOnScroll() {
    const content = document.querySelector('.wishes__content');
    if (!content) return;

    content.style.opacity = '0';
    content.style.transform = 'translateY(30px)';
    content.style.transition = 'opacity 1s ease, transform 1s ease';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            observer.disconnect();
        });
    }, { threshold: 0.3 });

    observer.observe(content);
}
