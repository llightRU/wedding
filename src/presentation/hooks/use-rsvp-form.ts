'use client';

import { useState } from 'react';
import { createRsvp } from '@/domain/models/rsvp';
import { validateRsvp } from '@/domain/use-cases/validate-rsvp';
import { submitRsvp } from '@/domain/use-cases/submit-rsvp';
import { rsvpRepository } from '@/data/repositories/rsvp-repository';

interface FormState {
    name: string;
    phone: string;
    guests: number;
    dietary: string;
    attending: boolean;
    location: string;
}

interface RsvpFormState {
    form: FormState;
    errors: Record<string, string>;
    submitting: boolean;
    submitted: boolean;
    updateField: (field: keyof FormState, value: string | number | boolean) => void;
    handleSubmit: () => Promise<void>;
}

export function useRsvpForm(): RsvpFormState {
    const [form, setForm] = useState<FormState>({
        name: '',
        phone: '',
        guests: 1,
        dietary: '',
        attending: true,
        location: 'groom',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field: keyof FormState, value: string | number | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async () => {
        setErrors({});

        const validation = validateRsvp({
            name: form.name,
            phone: form.phone,
            guests: form.attending ? form.guests : 1,
        });

        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }

        setSubmitting(true);

        const rsvpData = createRsvp({
            name: form.name,
            phone: form.phone,
            guests: form.attending ? form.guests : 0,
            dietary: form.dietary,
            attending: form.attending,
            location: form.attending ? form.location : '',
        });

        const result = await submitRsvp(rsvpData, rsvpRepository);

        if (result.success) {
            setSubmitted(true);
        } else {
            setErrors({ form: result.message });
        }

        setSubmitting(false);
    };

    return { form, errors, submitting, submitted, updateField, handleSubmit };
}
