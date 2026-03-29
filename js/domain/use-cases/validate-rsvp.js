/**
 * Validate RSVP form data.
 * @param {{ name: string, phone: string, guests: number }} data
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateRsvp(data) {
    const errors = {};

    if (!data.name || !data.name.trim()) {
        errors.name = 'Vui lòng nhập họ và tên';
    }

    if (!data.phone || !data.phone.trim()) {
        errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^0\d{9}$/.test(data.phone.trim())) {
        errors.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    }

    if (!data.guests || data.guests < 1 || data.guests > 10) {
        errors.guests = 'Số khách từ 1 đến 10';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
