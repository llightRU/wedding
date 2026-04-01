/** Returns the base path prefix for asset URLs (empty string for local dev, '/Quang-Nhoong-Wedding' for GitHub Pages) */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prepend base path to an asset URL */
export function asset(path: string): string {
    return `${basePath}${path}`;
}
