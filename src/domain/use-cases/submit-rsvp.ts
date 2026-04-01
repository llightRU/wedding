/**
 * Submit RSVP through repository (dependency injection).
 */
export interface SubmitResult {
    success: boolean;
    message: string;
}

export interface RsvpRepository {
    submit(data: object): Promise<SubmitResult>;
}

export async function submitRsvp(rsvpData: object, repository: RsvpRepository): Promise<SubmitResult> {
    try {
        const result = await repository.submit(rsvpData);
        return result;
    } catch {
        return {
            success: false,
            message: 'Không thể gửi xác nhận. Vui lòng thử lại sau.',
        };
    }
}
