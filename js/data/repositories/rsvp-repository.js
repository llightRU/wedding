/**
 * RSVP repository — interface for submitting RSVP data.
 * Delegates to the configured data source.
 */
import { postToGoogleSheets } from '../sources/google-sheets-api.js';

export const rsvpRepository = {
    /** @param {object} rsvpData @returns {Promise<{success: boolean, message: string}>} */
    async submit(rsvpData) {
        return postToGoogleSheets(rsvpData);
    },
};
