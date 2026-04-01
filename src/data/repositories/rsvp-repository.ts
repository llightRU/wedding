/**
 * RSVP repository — interface for submitting RSVP data.
 * Delegates to the configured data source.
 */
import { postToGoogleSheets } from '../sources/google-sheets-api';

export const rsvpRepository = {
    async submit(rsvpData: object): Promise<{ success: boolean; message: string }> {
        return postToGoogleSheets(rsvpData as Parameters<typeof postToGoogleSheets>[0]);
    },
};
