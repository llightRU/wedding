/**
 * Submit RSVP through repository (dependency injection).
 * @param {object} rsvpData - RSVP entity from createRsvp()
 * @param {object} repository - { submit(data) → Promise<{success, message}> }
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitRsvp(rsvpData, repository) {
    try {
        const result = await repository.submit(rsvpData);
        return result;
    } catch (error) {
        return {
            success: false,
            message: 'Không thể gửi xác nhận. Vui lòng thử lại sau.',
        };
    }
}
