/**
 * Services View
 * Service offerings with animated cards
 */

export function render() {
    const services = [
        {
            icon: '🌐',
            title: 'Web Development',
            description: 'Full-stack web applications using React, Next.js, and Node.js. From landing pages to complex e-commerce platforms.',
            features: ['Responsive Design', 'SEO Optimization', 'Performance Tuned']
        },
        {
            icon: '📱',
            title: 'Mobile Development',
            description: 'Cross-platform mobile apps using React Native and Expo. Native feel with shared codebase.',
            features: ['iOS & Android', 'Push Notifications', 'Offline Support']
        },
        {
            icon: '🛒',
            title: 'E-Commerce Solutions',
            description: 'Custom online stores with secure payment integration. Shopify, WooCommerce, or custom solutions.',
            features: ['Payment Integration', 'Inventory Management', 'Analytics Dashboard']
        },
        {
            icon: '🤖',
            title: 'AI Integration',
            description: 'Integrate AI capabilities into your applications. Chatbots, automation, and intelligent features.',
            features: ['OpenAI Integration', 'Custom Chatbots', 'Process Automation']
        },
        {
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Modern, user-centered designs that convert. Wireframes to polished interfaces.',
            features: ['Figma/Sketch', 'Prototyping', 'Design Systems']
        },
        {
            icon: '⚡',
            title: 'Performance Optimization',
            description: 'Speed up your existing applications. Core Web Vitals optimization and code audits.',
            features: ['Lighthouse Audits', 'Code Splitting', 'CDN Setup']
        }
    ];

    return `
        <section id="services">
            <div class="container">
                <h1 class="section-title slide-up">Services</h1>
                <p class="section-subtitle">What I can build for you</p>
                
                <div class="services-grid grid">
                    ${services.map((service, index) => `
                        <div class="service-card hover-lift animate-on-scroll stagger-${(index % 5) + 1}">
                            <div class="service-icon">${service.icon}</div>
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                            <ul class="service-features">
                                ${service.features.map(f => `<li>✓ ${f}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div class="services-cta animate-on-scroll">
                    <h3>Ready to start your project?</h3>
                    <a href="/contact" onclick="route(event)" class="anchor-button button-bg-primary hover-lift">
                        Get In Touch
                    </a>
                </div>
            </div>
        </section>
    `;
}

export function init() {
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });
}
