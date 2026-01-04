/**
 * Vanilla SPA Router (Query-String Based)
 * Handles client-side routing using URL query parameters.
 * Routes use format: ?route=about, ?route=services, etc.
 * No external dependencies - pure ES6+ JavaScript.
 */
import ThemeManager from './utils/theme.js';

// ============================================
// ROUTE DEFINITIONS
// ============================================
const routes = {
    'home': 'home',
    'about': 'about',
    'services': 'services',
    'portfolio': 'portfolio',
    'contact': 'contact',
    'gig': 'gig-detail',
    'blog': 'blog',
    'blog-post': 'blog-detail'
};

// ============================================
// ROUTER CORE
// ============================================

/**
 * Get current route from query string
 * @returns {string} Route name (defaults to 'home')
 */
function getCurrentRoute() {
    const params = new URLSearchParams(window.location.search);
    return params.get('route') || 'home';
}

/**
 * Get gig ID from query string (for gig detail pages)
 * @returns {string|null} Gig ID or null
 */
function getGigId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('gig');
}

/**
 * Main router function - determines current route and loads appropriate view
 */
async function router() {
    const routeName = getCurrentRoute();
    const viewName = routes[routeName] || 'home';

    try {
        // Dynamically import the view module
        const module = await import(`./views/${viewName}.js`);

        const app = document.getElementById('app');

        // Trigger exit animation
        app.classList.remove('fade-in');
        app.classList.add('fade-out');

        // Wait for exit animation to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        // Render new content (pass gig ID for detail pages)
        const gigId = getGigId();
        app.innerHTML = await module.render(gigId);

        // Trigger enter animation
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // Run view-specific initialization if it exists
        if (typeof module.init === 'function') {
            module.init(gigId);
        }

        // Update active nav link
        updateActiveNav(routeName);

        // Scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Router Error:', error);
        document.getElementById('app').innerHTML = `
            <section class="error-page container">
                <h1>404</h1>
                <p>Page not found</p>
                <a href="?" onclick="route(event)" class="anchor-button button-bg-primary">Go Home</a>
            </section>
        `;
    }
}

/**
 * Navigate to a route
 * @param {string} routeName - Route to navigate to
 * @param {object} params - Additional query params (e.g., { gig: 'web-dev' })
 */
function navigateTo(routeName, params = {}) {
    const searchParams = new URLSearchParams();
    if (routeName !== 'home') {
        searchParams.set('route', routeName);
    }
    Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
    });

    const queryString = searchParams.toString();
    // Logic to enforce root path if we are on a "virtual" directory like /portfolio
    // This assumes the app is hosted at the root or a specific base.
    // We'll trust window.location.pathname unless it matches a known route key (and is not a real folder).
    // A safe bet for GitHub Pages SPA pattern is preventing 'stacking' of paths.

    // For now, simply replacing the search string without manipulating path is standard.
    // But to fix the user's "some still has the /xyz directory", we can try:

    // If the path ends with one of our route names, strip it.
    let cleanPath = window.location.pathname;
    const routeKeys = Object.keys(routes);

    // Very naive check: if path ends with a route name, remove it.
    // e.g. /developer-portfolio/portfolio -> /developer-portfolio/
    routeKeys.forEach(key => {
        if (cleanPath.endsWith(`/${key}`)) {
            cleanPath = cleanPath.substring(0, cleanPath.length - key.length);
        }
    });

    // Ensure trailing slash consistency? Not strictly necessary for query params.

    const newUrl = `${cleanPath}${queryString ? '?' + queryString : ''}`;

    window.history.pushState({}, '', newUrl);
    router();
}

/**
 * Route handler - intercepts link clicks for SPA navigation
 * @param {Event} event - Click event from anchor tag
 */
window.route = function (event) {
    event = event || window.event;
    event.preventDefault();

    const anchor = event.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Parse the href to extract route info
    if (href.startsWith('?') || href === '' || href === '?') {
        // Query-string based navigation
        const params = new URLSearchParams(href.replace('?', ''));
        const routeName = params.get('route') || 'home';
        const gigId = params.get('gig');

        navigateTo(routeName, gigId ? { gig: gigId } : {});
    }
};

/**
 * Updates the active state of navigation links
 * @param {string} currentRoute - Current route name
 */
function updateActiveNav(currentRoute) {
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const params = new URLSearchParams(href.replace('?', ''));
        const linkRoute = params.get('route') || 'home';
        link.classList.toggle('active', linkRoute === currentRoute);
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
    // Initialize Theme
    ThemeManager.init();

    // Theme Toggle Listener
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            ThemeManager.toggle();
        });
    }

    initMobileNav();
    router();

    // Initialize iOS Add to Home Screen Prompt
    import('./utils/ios-prompt.js').then(module => {
        module.initIOSInstallPrompt();
    });
});

// Export for use in views
export { router, navigateTo, getGigId };
