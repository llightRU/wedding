/**
 * Calculate time remaining until target date.
 * Pure function — no side effects, no dependencies.
 */
export interface CountdownResult {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
}

export function calculateCountdown(targetDate: string): CountdownResult {
    const diff = new Date(targetDate).getTime() - Date.now();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
    };
}
