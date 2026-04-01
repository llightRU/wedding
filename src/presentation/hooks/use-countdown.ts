'use client';

import { useState, useEffect } from 'react';
import { calculateCountdown, CountdownResult } from '@/domain/use-cases/calculate-countdown';

const INITIAL: CountdownResult = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false };

export function useCountdown(targetDate: string): CountdownResult {
    const [countdown, setCountdown] = useState<CountdownResult>(INITIAL);

    useEffect(() => {
        setCountdown(calculateCountdown(targetDate));
        const timer = setInterval(() => {
            setCountdown(calculateCountdown(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return countdown;
}
