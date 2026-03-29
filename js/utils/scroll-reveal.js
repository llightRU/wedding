/**
 * Scroll reveal — uses IntersectionObserver to animate elements into view.
 * Add class "reveal" to any element that should animate on scroll.
 */
export function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-children');

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
}
