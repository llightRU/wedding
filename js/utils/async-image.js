/**
 * Async image loader with shimmer placeholder (like SubAsyncImage on Android).
 * Shows a shimmer animation while the image loads, then fades in.
 */

/**
 * Create an image element wrapped with shimmer placeholder.
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} imgClass - CSS class for the <img>
 * @param {object} [options]
 * @param {boolean} [options.dark] - Use dark shimmer variant
 * @param {string} [options.loading] - 'lazy' | 'eager'
 * @returns {HTMLElement} wrapper element
 */
export function createAsyncImage(src, alt, imgClass, options = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'async-img';
    wrapper.classList.add(options.dark ? 'shimmer--dark' : 'shimmer');

    const img = document.createElement('img');
    img.alt = alt;
    img.className = imgClass;
    img.loading = options.loading || 'lazy';
    img.decoding = 'async';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    img.onload = () => {
        img.style.opacity = '1';
        wrapper.classList.remove('shimmer', 'shimmer--dark');
    };

    img.onerror = () => {
        wrapper.classList.remove('shimmer', 'shimmer--dark');
    };

    // Set src after attaching handlers
    img.src = src;

    wrapper.appendChild(img);
    return wrapper;
}
