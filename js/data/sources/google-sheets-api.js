/**
 * Google Sheets data source — POST RSVP data to Google Apps Script web app.
 * Uses hidden form + iframe to avoid CORS issues.
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw3TxbMZGDpc32XXR_mEyC-IJwZ1OAKtMAym0TEd6QYztLHyBVanwgTbVxOukiO5GNe/exec';

/**
 * @param {object} data - { name, phone, guests, dietary, attending, timestamp }
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function postToGoogleSheets(data) {
    if (!APPS_SCRIPT_URL) {
        return { success: false, message: 'Hệ thống chưa sẵn sàng. Vui lòng thử lại sau.' };
    }

    return new Promise((resolve) => {
        try {
            /* Create hidden iframe as form target */
            const iframe = document.createElement('iframe');
            iframe.name = 'rsvp-frame';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            /* Create hidden form */
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = APPS_SCRIPT_URL;
            form.target = 'rsvp-frame';
            form.style.display = 'none';

            /* Add form fields */
            const locationMap = { groom: 'Nhà trai', bride: 'Nhà gái', both: 'Cả hai' };
            const fields = {
                name: data.name,
                phone: data.phone,
                attending: data.attending ? 'Có' : 'Không',
                location: locationMap[data.location] || '',
                guests: data.guests,
                dietary: data.dietary || '',
            };

            Object.entries(fields).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();

            /* Clean up after submit */
            setTimeout(() => {
                form.remove();
                iframe.remove();
            }, 3000);

            resolve({ success: true, message: 'Cảm ơn bạn đã xác nhận tham dự!' });
        } catch (error) {
            resolve({ success: false, message: 'Không thể gửi. Vui lòng thử lại.' });
        }
    });
}
