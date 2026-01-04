/**
 * Apps View
 * Mobile-friendly navigation hub / app drawer
 */

export function render() {
    const navApps = [
        { label: 'About Me', icon: '👤', href: '?route=about', desc: 'Learn about my journey' },
        { label: 'Services', icon: '💼', href: '?route=services', desc: 'What I can do for you' },
        { label: 'Portfolio', icon: '📁', href: '?route=portfolio', desc: 'My projects & work' },
        { label: 'Blog / Feed', icon: '📝', href: '?route=blog', desc: 'Articles & updates' },
        { label: 'Contact', icon: '✉️', href: '?route=contact', desc: 'Get in touch' }
    ];

    const externalApps = [
        { label: 'GitHub', icon: '🐙', href: 'https://github.com/sajidmahamud835', desc: 'My open source work' },
        { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/sajidmahamud835', desc: 'Professional network' },
        { label: 'Calendly', icon: '📅', href: 'https://calendly.com/sajidmahamud835', desc: 'Book a call' }
    ];

    return `
        <section class="apps-page">
            <!-- Background Elements (from home page) -->
            <div class="apps-bg-blob blob-1"></div>
            <div class="apps-bg-blob blob-2"></div>
            <div class="apps-bg-blob blob-3"></div>

            <div class="apps-container">
                <!-- Greeting -->
                <div class="apps-greeting">
                    <span class="apps-wave">👋</span>
                    <h1>Hello, I'm <span class="text-orange">Sajid</span></h1>
                    <p>Explore my portfolio & connect with me</p>
                </div>

                <!-- Navigation Apps -->
                <div class="apps-section">
                    <h2 class="apps-section-title">Navigation</h2>
                    <div class="apps-list">
                        ${navApps.map(app => renderAppItem(app, false)).join('')}
                    </div>
                </div>

                <!-- External Links -->
                <div class="apps-section">
                    <h2 class="apps-section-title">Connect</h2>
                    <div class="apps-list">
                        ${externalApps.map(app => renderAppItem(app, true)).join('')}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="apps-quick-actions">
                    <button onclick="openContactPopup()" class="quick-action-btn">
                        <span>✉️</span> Quick Message
                    </button>
                    <a href="assets/resume.pdf" target="_blank" class="quick-action-btn">
                        <span>📄</span> Download Resume
                    </a>
                </div>
            </div>
        </section>
    `;
}

function renderAppItem(app, isExternal) {
    const target = isExternal ? 'target="_blank" rel="noopener"' : 'onclick="route(event)"';
    return `
        <a href="${app.href}" ${target} class="app-item">
            <div class="app-item-icon">${app.icon}</div>
            <div class="app-item-info">
                <span class="app-item-label">${app.label}</span>
                <span class="app-item-desc">${app.desc}</span>
            </div>
            <span class="app-item-arrow">→</span>
        </a>
    `;
}

export function init() {
    // Add wave animation on scroll
    const wave = document.querySelector('.apps-wave');
    if (wave) {
        wave.style.animation = 'wave 2s ease-in-out infinite';
    }
}
