import { createRsvp } from '../../../domain/models/rsvp.js';
import { validateRsvp } from '../../../domain/use-cases/validate-rsvp.js';
import { submitRsvp } from '../../../domain/use-cases/submit-rsvp.js';
import { rsvpRepository } from '../../../data/repositories/rsvp-repository.js';
import { getState, updateState } from '../../state/app-state.js';

export function initRsvp() {
    const section = document.getElementById('rsvp');
    if (!section) return;

    section.innerHTML = `
        <div class="container">
            <h2 class="section-title">Xác Nhận Tham Dự</h2>
            <p class="section-subtitle">Xin hãy xác nhận sự hiện diện của bạn</p>
            <div class="rsvp" id="rsvpContainer">
                <form class="rsvp__form" id="rsvpForm" novalidate>
                    <div class="rsvp__row">
                        <div class="rsvp__field">
                            <label class="rsvp__label" for="rsvpName">Họ và tên *</label>
                            <input class="rsvp__input" type="text" id="rsvpName" required>
                            <span class="rsvp__error" id="errorName"></span>
                        </div>
                        <div class="rsvp__field">
                            <label class="rsvp__label" for="rsvpPhone">Số điện thoại *</label>
                            <input class="rsvp__input" type="tel" id="rsvpPhone" required>
                            <span class="rsvp__error" id="errorPhone"></span>
                        </div>
                    </div>
                    <div class="rsvp__row rsvp__row--attendance">
                        <div class="rsvp__field rsvp__field--full">
                            <label class="rsvp__label">Bạn sẽ tham dự chứ?</label>
                            <div class="rsvp__toggle">
                                <label class="rsvp__radio">
                                    <input type="radio" name="attendance" value="yes" checked>
                                    <span class="rsvp__radio-label">Có, tôi sẽ tham dự</span>
                                </label>
                                <label class="rsvp__radio">
                                    <input type="radio" name="attendance" value="no">
                                    <span class="rsvp__radio-label">Tôi bận, rất tiếc không thể tham dự</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="rsvp__row">
                        <div class="rsvp__field" id="guestsField">
                            <label class="rsvp__label" for="rsvpGuests">Số khách</label>
                            <select class="rsvp__input rsvp__select" id="rsvpGuests">
                                ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}">${n}</option>`).join('')}
                            </select>
                            <span class="rsvp__error" id="errorGuests"></span>
                        </div>
                        <div class="rsvp__field">
                            <label class="rsvp__label" for="rsvpDietary">Ghi chú</label>
                            <input class="rsvp__input" type="text" id="rsvpDietary" placeholder="Dị ứng, ăn chay...">
                        </div>
                    </div>
                    <button class="rsvp__submit" type="submit" id="rsvpSubmit">
                        Xác Nhận Tham Dự
                    </button>
                </form>
                <div class="rsvp__success" id="rsvpSuccess" style="display:none;">
                    <div class="rsvp__success-icon">✓</div>
                    <h3 class="rsvp__success-title">Cảm ơn bạn!</h3>
                    <p class="rsvp__success-text">Chúng tôi đã nhận được xác nhận của bạn.</p>
                </div>
            </div>
        </div>
    `;

    bindForm();
    bindAttendanceToggle();
}

function bindAttendanceToggle() {
    document.querySelectorAll('input[name="attendance"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            const attending = radio.value === 'yes';
            document.getElementById('guestsField').style.display = attending ? '' : 'none';
        });
    });
}

function bindForm() {
    const form = document.getElementById('rsvpForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const attending = document.querySelector('input[name="attendance"]:checked').value === 'yes';
        const data = {
            name: document.getElementById('rsvpName').value,
            phone: document.getElementById('rsvpPhone').value,
            guests: attending ? parseInt(document.getElementById('rsvpGuests').value) : 0,
            dietary: document.getElementById('rsvpDietary').value,
            attending,
        };

        const { valid, errors } = validateRsvp(data);
        if (!valid) {
            showErrors(errors);
            return;
        }

        const btn = document.getElementById('rsvpSubmit');
        btn.disabled = true;
        btn.textContent = 'Đang gửi...';

        const rsvpData = createRsvp(data);
        const result = await submitRsvp(rsvpData, rsvpRepository);

        if (result.success) {
            updateState('rsvp.submitted', true);
            document.getElementById('rsvpForm').style.display = 'none';
            document.getElementById('rsvpSuccess').style.display = 'flex';
        } else {
            btn.disabled = false;
            btn.textContent = 'Xác Nhận Tham Dự';
            showErrors({ form: result.message });
        }
    });
}

function showErrors(errors) {
    Object.entries(errors).forEach(([key, msg]) => {
        const el = document.getElementById(`error${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (el) el.textContent = msg;
    });
}

function clearErrors() {
    document.querySelectorAll('.rsvp__error').forEach((el) => { el.textContent = ''; });
}
