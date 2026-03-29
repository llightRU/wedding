/**
 * RSVP entity — represents a guest's attendance confirmation.
 */
export function createRsvp({ name, phone, guests = 1, dietary = '' }) {
    return Object.freeze({
        name: name.trim(),
        phone: phone.trim(),
        guests: Number(guests),
        dietary: dietary.trim(),
        timestamp: Date.now(),
    });
}
