/**
 * Central app state with pub/sub.
 * Components read/write state here; subscribers get notified on changes.
 */
const state = {
    gallery: {
        currentIndex: 0,
        lightboxOpen: false,
    },
    rsvp: {
        submitted: false,
        submitting: false,
        error: null,
    },
};

const listeners = new Set();

export function getState() {
    return state;
}

/**
 * Update a nested state value by dot-path.
 * @param {string} path - e.g. 'gallery.currentIndex'
 * @param {*} value
 */
export function updateState(path, value) {
    const keys = path.split('.');
    let target = state;

    for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
    }

    target[keys[keys.length - 1]] = value;
    listeners.forEach((fn) => fn(state, path));
}

/** @param {function} listener - called with (state, changedPath) */
export function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
