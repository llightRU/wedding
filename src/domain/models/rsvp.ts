/**
 * RSVP entity — represents a guest's attendance confirmation.
 */
export interface RsvpData {
    name: string;
    phone: string;
    guests?: number;
    dietary?: string;
    attending?: boolean;
    location?: string;
}

export interface RsvpEntity {
    name: string;
    phone: string;
    guests: number;
    dietary: string;
    attending: boolean;
    location: string;
    timestamp: number;
}

export function createRsvp({ name, phone, guests = 1, dietary = '', attending = true, location = '' }: RsvpData): RsvpEntity {
    return Object.freeze({
        name: name.trim(),
        phone: phone.trim(),
        guests: Number(guests),
        dietary: dietary.trim(),
        attending,
        location,
        timestamp: Date.now(),
    });
}
