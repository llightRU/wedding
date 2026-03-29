import { wedding } from '../../../domain/models/wedding.js';
import { calculateCountdown } from '../../../domain/use-cases/calculate-countdown.js';

const LABELS = ['Ngày', 'Giờ', 'Phút', 'Giây'];
const KEYS = ['days', 'hours', 'minutes', 'seconds'];

export function initCountdown() {
    const section = document.getElementById('countdown');
    if (!section) return;

    section.innerHTML = `
        <div class="container">
            <h2 class="section-title">Đếm Ngược Ngày Hạnh Phúc</h2>
            <p class="countdown__date">Thứ Ba, 07 tháng 04 năm 2026 · 17h00</p>
            <div class="countdown__boxes" id="countdownBoxes">
                ${KEYS.map((key, i) => `
                    <div class="countdown__box">
                        <span class="countdown__number" id="cd-${key}">00</span>
                        <span class="countdown__label">${LABELS[i]}</span>
                    </div>
                `).join('')}
            </div>
            <p class="countdown__quote">"Hạnh phúc là khi ta tìm được người cùng đếm ngược từng khoảnh khắc bên nhau"</p>
        </div>
    `;

    update();
    setInterval(update, 1000);

    /* Scroll reveal */
    const boxes = document.getElementById('countdownBoxes');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const items = boxes.querySelectorAll('.countdown__box');
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, i * 150);
            });
            observer.disconnect();
        });
    }, { threshold: 0.3 });

    boxes.querySelectorAll('.countdown__box').forEach((box) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    observer.observe(boxes);
}

function update() {
    const countdown = calculateCountdown(wedding.date);

    KEYS.forEach((key) => {
        const el = document.getElementById(`cd-${key}`);
        if (el) el.textContent = String(countdown[key]).padStart(2, '0');
    });

    if (countdown.expired) {
        const boxes = document.getElementById('countdownBoxes');
        if (boxes) boxes.innerHTML = '<p class="countdown__expired">Đã Diễn Ra!</p>';
    }
}
