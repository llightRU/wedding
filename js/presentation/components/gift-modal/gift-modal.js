import { wedding } from '../../../domain/models/wedding.js';

export function initGiftModal() {
    const btn = document.createElement('button');
    btn.className = 'gift-btn';
    btn.setAttribute('aria-label', 'Mừng cưới');
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V21M3 12h18M7.5 8C7.5 8 7.5 3 12 3s4.5 5 4.5 5"/></svg>`;
    document.body.appendChild(btn);

    const modal = document.createElement('div');
    modal.className = 'gift-modal';
    modal.id = 'giftModal';
    modal.innerHTML = `
        <div class="gift-modal__backdrop"></div>
        <div class="gift-modal__content">
            <button class="gift-modal__close" id="giftClose">&times;</button>
            <h3 class="gift-modal__title">Mừng Cưới</h3>
            <p class="gift-modal__subtitle">Sự hiện diện của bạn là món quà quý giá nhất</p>
            <div class="gift-modal__choices" id="giftChoices">
                <button class="gift-modal__choice" data-person="groom">
                    <span class="gift-modal__choice-icon">🤵</span>
                    <span class="gift-modal__choice-label">Chú Rể</span>
                    <span class="gift-modal__choice-name">${wedding.groom}</span>
                </button>
                <button class="gift-modal__choice" data-person="bride">
                    <span class="gift-modal__choice-icon">👰</span>
                    <span class="gift-modal__choice-label">Cô Dâu</span>
                    <span class="gift-modal__choice-name">${wedding.bride}</span>
                </button>
            </div>
            <div class="gift-modal__qr" id="giftQr" style="display:none;">
                <button class="gift-modal__back" id="giftBack">← Quay lại</button>
                <img src="" alt="" class="gift-modal__qr-img" id="giftQrImg">
                <p class="gift-modal__name" id="giftQrName"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    btn.addEventListener('click', () => {
        resetToChoices();
        modal.classList.add('open');
    });

    modal.querySelector('.gift-modal__backdrop').addEventListener('click', closeModal);
    document.getElementById('giftClose').addEventListener('click', closeModal);
    document.getElementById('giftBack').addEventListener('click', resetToChoices);

    modal.querySelectorAll('.gift-modal__choice').forEach((choice) => {
        choice.addEventListener('click', () => {
            const isGroom = choice.dataset.person === 'groom';
            document.getElementById('giftQrImg').src = isGroom
                ? 'assets/images/qr_quang.jfif'
                : 'assets/images/qr_nhung.jfif';
            document.getElementById('giftQrName').textContent = isGroom
                ? wedding.groom
                : wedding.bride;
            document.getElementById('giftChoices').style.display = 'none';
            document.getElementById('giftQr').style.display = 'block';
        });
    });

    function closeModal() {
        modal.classList.remove('open');
    }

    function resetToChoices() {
        document.getElementById('giftChoices').style.display = 'flex';
        document.getElementById('giftQr').style.display = 'none';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
}
