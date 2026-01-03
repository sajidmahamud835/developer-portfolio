/**
 * Animation Utilities
 * Intersection Observer for scroll-triggered animations
 */

/**
 * Observes elements with '.animate-on-scroll' class and triggers
 * the 'visible' class when they enter the viewport.
 */
export function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,      // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly before entering viewport
    });

    // Find all elements to animate
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return observer;
}

/**
 * Cleans up observers to prevent memory leaks
 * Call this before route changes
 * @param {IntersectionObserver} observer - The observer to disconnect
 */
export function cleanupObserver(observer) {
    if (observer) {
        observer.disconnect();
    }
}

/**
 * Adds staggered animation delays to a list of elements
 * @param {string} selector - CSS selector for elements
 * @param {number} baseDelay - Base delay in ms
 * @param {number} increment - Delay increment per element
 */
export function staggerElements(selector, baseDelay = 100, increment = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.animationDelay = `${baseDelay + (index * increment)}ms`;
    });
}
