import { wedding } from '../../../domain/models/wedding.js';

export function initFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container footer">
            <div class="footer__ornament">❦</div>
            <img src="assets/images/thankyou.png" alt="Thank you" class="footer__thankyou-img">
            <p class="footer__date">07 . 04 . 2026</p>
            <p class="footer__thanks">Cảm ơn bạn đã đến chung vui cùng chúng tôi</p>
            <p class="footer__credit">Made with ♥</p>
        </div>
    `;
}
