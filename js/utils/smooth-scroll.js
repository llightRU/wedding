/**
 * Smooth scroll to a target element by selector.
 * @param {string} selector - CSS selector of target element
 */
export function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
