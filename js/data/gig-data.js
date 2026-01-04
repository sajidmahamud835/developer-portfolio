/**
 * Gig Data - Fiverr-Style Service Definitions
 * Each gig has SEO-focused copy, interactive pricing, and feature selection.
 */

export const gigCategories = [
    { id: 'web', name: 'Web Development', icon: '🌐' },
    { id: 'trading', name: 'Trading & Finance', icon: '📈' },
    { id: 'ai', name: 'AI & Automation', icon: '🤖' },
    { id: 'maintenance', name: 'Support & Fixes', icon: '🔧' }
];

export const gigs = [
    // ===== WEB DEVELOPMENT =====
    {
        id: 'custom-website',
        category: 'web',
        title: 'I will build a custom responsive website for your business',
        shortTitle: 'Custom Website',
        banner: 'images/gig-website.svg',
        description: `Get a **professional, mobile-friendly website** that converts visitors into customers. Built with clean code and optimized for search engines.`,
        keywords: ['custom website', 'responsive design', 'business website', 'web developer'],
        basePrice: 199,
        deliveryDays: 7,
        features: [
            {
                id: 'pages', name: 'Number of Pages', options: [
                    { label: '1-3 Pages', price: 0 },
                    { label: '4-7 Pages', price: 100 },
                    { label: '8-12 Pages', price: 200 }
                ]
            },
            {
                id: 'cms', name: 'Content Management System', options: [
                    { label: 'No CMS (Static)', price: 0 },
                    { label: 'WordPress CMS', price: 75 },
                    { label: 'Headless CMS (Sanity/Strapi)', price: 150 }
                ]
            },
            { id: 'seo', name: 'SEO Optimization', price: 50, isAddon: true },
            { id: 'analytics', name: 'Google Analytics Setup', price: 25, isAddon: true }
        ]
    },
    {
        id: 'landing-page',
        category: 'web',
        title: 'I will design a high-converting landing page',
        shortTitle: 'Landing Page',
        banner: 'images/gig-landing.svg',
        description: `Boost your conversions with a **stunning landing page** designed for lead generation and sales. Optimized for speed and mobile devices.`,
        keywords: ['landing page', 'conversion', 'lead generation', 'sales page'],
        basePrice: 149,
        deliveryDays: 5,
        features: [
            {
                id: 'design', name: 'Design Complexity', options: [
                    { label: 'Simple (1 Section)', price: 0 },
                    { label: 'Standard (3-5 Sections)', price: 50 },
                    { label: 'Premium (6+ Sections)', price: 100 }
                ]
            },
            { id: 'animations', name: 'Scroll Animations', price: 40, isAddon: true },
            { id: 'form', name: 'Contact Form Integration', price: 30, isAddon: true },
            { id: 'ab', name: 'A/B Test Variant', price: 75, isAddon: true }
        ]
    },
    {
        id: 'ecommerce',
        category: 'web',
        title: 'I will create a complete e-commerce store',
        shortTitle: 'E-Commerce Store',
        banner: 'images/gig-ecommerce.svg',
        description: `Launch your online business with a **fully functional e-commerce store**. Secure payments, inventory management, and beautiful product pages.`,
        keywords: ['e-commerce', 'online store', 'shopify', 'woocommerce', 'next.js shop'],
        basePrice: 299,
        deliveryDays: 14,
        features: [
            {
                id: 'products', name: 'Number of Products', options: [
                    { label: 'Up to 25 Products', price: 0 },
                    { label: 'Up to 100 Products', price: 100 },
                    { label: 'Unlimited Products', price: 200 }
                ]
            },
            {
                id: 'payment', name: 'Payment Gateway', options: [
                    { label: 'Stripe Only', price: 0 },
                    { label: 'Stripe + PayPal', price: 50 },
                    { label: 'Multiple Gateways', price: 100 }
                ]
            },
            { id: 'inventory', name: 'Inventory Management', price: 75, isAddon: true },
            { id: 'email', name: 'Email Notifications', price: 40, isAddon: true }
        ]
    },

    // ===== TRADING & FINANCE =====
    {
        id: 'trading-bot',
        category: 'trading',
        title: 'I will develop a custom MT4/MT5 Expert Advisor',
        shortTitle: 'Trading Bot (EA)',
        banner: 'images/gig-trading.svg',
        description: `Automate your trading strategy with a **custom Expert Advisor**. Backtested, optimized, and ready for live trading on MetaTrader.`,
        keywords: ['MT4 EA', 'MT5 Expert Advisor', 'forex bot', 'trading algorithm', 'MQL5'],
        basePrice: 249,
        deliveryDays: 10,
        features: [
            {
                id: 'strategy', name: 'Strategy Complexity', options: [
                    { label: 'Simple (1 Indicator)', price: 0 },
                    { label: 'Medium (2-3 Indicators)', price: 100 },
                    { label: 'Advanced (Grid/Martingale)', price: 200 }
                ]
            },
            { id: 'backtest', name: 'Backtest Report', price: 50, isAddon: true },
            { id: 'optimization', name: 'Parameter Optimization', price: 75, isAddon: true },
            { id: 'dashboard', name: 'Visual Dashboard', price: 100, isAddon: true }
        ]
    },
    {
        id: 'api-backend',
        category: 'web',
        title: 'I will build a REST API or backend service',
        shortTitle: 'API & Backend',
        banner: 'images/gig-api.svg',
        description: `Power your app with a **scalable REST API**. Built with Node.js/Express, documented with Swagger, and ready for production.`,
        keywords: ['REST API', 'Node.js', 'Express', 'backend development', 'API integration'],
        basePrice: 199,
        deliveryDays: 7,
        features: [
            {
                id: 'endpoints', name: 'API Endpoints', options: [
                    { label: '1-5 Endpoints', price: 0 },
                    { label: '6-15 Endpoints', price: 75 },
                    { label: '16+ Endpoints', price: 150 }
                ]
            },
            {
                id: 'auth', name: 'Authentication', options: [
                    { label: 'No Auth', price: 0 },
                    { label: 'JWT Auth', price: 50 },
                    { label: 'OAuth 2.0', price: 100 }
                ]
            },
            { id: 'docs', name: 'Swagger Documentation', price: 40, isAddon: true },
            { id: 'tests', name: 'Unit Tests', price: 60, isAddon: true }
        ]
    },

    // ===== AI & AUTOMATION =====
    {
        id: 'ai-integration',
        category: 'ai',
        title: 'I will integrate AI/ChatGPT into your application',
        shortTitle: 'AI Integration',
        banner: 'images/gig-ai.svg',
        description: `Add **intelligent AI features** to your app. ChatGPT integration, custom prompts, and automated workflows.`,
        keywords: ['ChatGPT', 'OpenAI API', 'AI integration', 'LLM', 'automation'],
        basePrice: 199,
        deliveryDays: 5,
        features: [
            {
                id: 'type', name: 'Integration Type', options: [
                    { label: 'Simple Chat (GPT-3.5)', price: 0 },
                    { label: 'Advanced Chat (GPT-4)', price: 75 },
                    { label: 'Multi-Model (GPT + Claude)', price: 150 }
                ]
            },
            { id: 'prompts', name: 'Custom Prompt Engineering', price: 50, isAddon: true },
            { id: 'rag', name: 'RAG (Document Q&A)', price: 100, isAddon: true },
            { id: 'streaming', name: 'Streaming Responses', price: 40, isAddon: true }
        ]
    },

    // ===== SUPPORT & FIXES =====
    {
        id: 'performance',
        category: 'maintenance',
        title: 'I will optimize your website speed and SEO',
        shortTitle: 'Speed & SEO Fix',
        banner: 'images/gig-speed.svg',
        description: `Boost your **Core Web Vitals** and search rankings. Speed optimization, image compression, and technical SEO fixes.`,
        keywords: ['website speed', 'page speed', 'Core Web Vitals', 'SEO optimization', 'performance'],
        basePrice: 99,
        deliveryDays: 3,
        features: [
            {
                id: 'scope', name: 'Optimization Scope', options: [
                    { label: 'Single Page', price: 0 },
                    { label: 'Up to 5 Pages', price: 50 },
                    { label: 'Full Website', price: 100 }
                ]
            },
            { id: 'images', name: 'Image Optimization', price: 25, isAddon: true },
            { id: 'caching', name: 'Caching Setup', price: 35, isAddon: true },
            { id: 'seo-audit', name: 'SEO Audit Report', price: 50, isAddon: true }
        ]
    },
    {
        id: 'bug-fix',
        category: 'maintenance',
        title: 'I will fix bugs and errors in your code',
        shortTitle: 'Bug Fixing',
        banner: 'images/gig-debug.svg',
        description: `Get your code **working again**. Quick bug fixes, error resolution, and code review for JavaScript, React, Node.js, and more.`,
        keywords: ['bug fix', 'code review', 'debugging', 'error fix', 'JavaScript help'],
        basePrice: 49,
        deliveryDays: 2,
        features: [
            {
                id: 'hours', name: 'Debugging Time', options: [
                    { label: '1 Hour', price: 0 },
                    { label: '3 Hours', price: 50 },
                    { label: '6 Hours', price: 100 }
                ]
            },
            { id: 'priority', name: 'Priority Support', price: 30, isAddon: true },
            { id: 'review', name: 'Code Review Report', price: 40, isAddon: true }
        ]
    }
];

/**
 * Get gig by ID
 * @param {string} gigId 
 * @returns {object|undefined}
 */
export function getGigById(gigId) {
    return gigs.find(g => g.id === gigId);
}

/**
 * Get gigs by category
 * @param {string} categoryId 
 * @returns {array}
 */
export function getGigsByCategory(categoryId) {
    return gigs.filter(g => g.category === categoryId);
}

/**
 * Get featured gigs for home page
 * @returns {array}
 */
export function getFeaturedGigs() {
    return gigs.slice(0, 4);
}
