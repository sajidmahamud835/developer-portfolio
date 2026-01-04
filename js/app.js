/**
 * Vanilla SPA Router
 * Handles client-side routing without page reloads using the History API.
 * No external dependencies - pure ES6+ JavaScript.
 */

// ============================================
// ROUTE DEFINITIONS
// ============================================
const routes = {
    '/': 'home',
    '/about': 'about',
    '/services': 'services',
    '/portfolio': 'portfolio',
    '/contact': 'contact'
};

// ============================================
// ROUTER CORE
// ============================================

/**
 * Main router function - determines current path and loads appropriate view
 */
async function router() {
    // Get path - handle both root and GitHub Pages subdirectory
    let path = window.location.pathname;

    // Remove base path for GitHub Pages (if deployed there)
    const basePath = '/developer-portfolio';
    if (path.startsWith(basePath)) {
        path = path.slice(basePath.length) || '/';
    }

    // Default to home if path not found
    const viewName = routes[path] || 'home';

    try {
        // Dynamically import the view module
        const module = await import(`./views/${viewName}.js`);

        const app = document.getElementById('app');

        // Trigger exit animation
        app.classList.remove('fade-in');
        app.classList.add('fade-out');

        // Wait for exit animation to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        // Render new content
        app.innerHTML = await module.render();

        // Trigger enter animation
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // Run view-specific initialization if it exists
        if (typeof module.init === 'function') {
            module.init();
        }

        // Update active nav link
        updateActiveNav(path);

        // Scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Router Error:', error);
        document.getElementById('app').innerHTML = `
            <section class="error-page container">
                <h1>404</h1>
                <p>Page not found</p>
                <a href="/" onclick="route(event)" class="anchor-button button-bg-primary">Go Home</a>
            </section>
        `;
    }
}

/**
 * Route handler - intercepts link clicks for SPA navigation
 * @param {Event} event - Click event from anchor tag
 */
window.route = function (event) {
    event = event || window.event;
    event.preventDefault();

    const href = event.target.closest('a')?.href;
    if (!href) return;

    // Only handle internal links
    if (new URL(href).origin === window.location.origin) {
        window.history.pushState({}, '', href);
        router();
    }
};

/**
 * Updates the active state of navigation links
 * @param {string} currentPath - Current route path
 */
function updateActiveNav(currentPath) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = new URL(link.href).pathname.replace('/developer-portfolio', '') || '/';
        link.classList.toggle('active', linkPath === currentPath);
    });
}

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            toggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                toggle.classList.remove('active');
            });
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Handle browser back/forward buttons
window.addEventListener('popstate', router);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    router();

    // Initialize Auto-Scroll Navigation
    import('./utils/scroll-nav.js').then(module => {
        new module.ScrollNavigator();
    });

    // Initialize iOS Add to Home Screen Prompt
    import('./utils/ios-prompt.js').then(module => {
        module.initIOSInstallPrompt();
    });
});

// Export for use in views
export { router };
