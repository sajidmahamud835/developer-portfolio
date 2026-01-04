/**
 * Portfolio Data
 * Extracted from central README.md
 */

export const projects = [
    {
        id: 'easycom',
        title: 'EasyCom',
        category: 'web',
        description: 'A feature-rich, full-stack e-commerce solution bridging B2C and wholesaler needs. Built with Next.js 15 App Router, Sanity CMS, Clerk Auth, and Stripe.',
        tech: ['Next.js 15', 'TypeScript', 'Sanity', 'Stripe', 'Clerk', 'Tailwind CSS'],
        github: 'https://github.com/sajidmahamud835/easycom',
        demo: null,
        image: 'images/gig-ecommerce.svg', // Placeholder using existing asset
        features: [
            'Next.js 15 App Router & Server Actions',
            'Sanity.io for real-time content management',
            'Secure Clerk authentication',
            'Stripe payment processing',
            'Admin dashboard for inventory'
        ]
    },
    {
        id: 'antigravity-jules',
        title: 'Antigravity Jules',
        category: 'ai',
        description: 'VS Code extension for Jules AI agent integration. Standardized feature documentation and critical safety fixes.',
        tech: ['TypeScript', 'VS Code API', 'AI'],
        github: 'https://github.com/sajidmahamud835/antigravity-jules-integration',
        demo: null,
        image: 'images/gig-ai.svg',
        features: [
            'VS Code Extension',
            'AI Agent Integration',
            'Robust API Quota Management'
        ]
    },
    {
        id: 'aamago-app',
        title: 'Aamago Super App',
        category: 'mobile',
        description: 'A modular super app built with Expo and React Native, featuring E-commerce and Digital Services modules.',
        tech: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'NativeWind'],
        github: 'https://github.com/ALHarih/aamago-react-native',
        demo: null,
        image: 'images/gig-mobile.svg',
        features: [
            'E-commerce Module',
            'Digital Services Marketplace',
            'Nested Navigation',
            'Redux State Management'
        ]
    },
    {
        id: 'gridmaster-pro',
        title: 'GridMaster Pro EA',
        category: 'trading',
        description: 'MetaTrader 5 Expert Advisor implementing automated grid trading strategy. 35+ Stars on GitHub.',
        tech: ['MQL5', 'Algorithmic Trading'],
        github: 'https://github.com/sajidmahamud835/grid-master-pro-mt5-ea',
        demo: null,
        image: 'images/gig-trading.svg',
        features: [
            'Automated grid trading',
            'Server error retry mechanism',
            'Customizable risk management'
        ]
    },
    {
        id: 'whatsapp-bot',
        title: 'WhatsApp Bot',
        category: 'automation',
        description: 'Node.js-based WhatsApp automation bot with API webhook support. Multi-client support and REST API.',
        tech: ['Node.js', 'Express', 'WhatsApp Web.js', 'Puppeteer'],
        github: 'https://github.com/sajidmahamud835/whatsapp-bot',
        demo: null,
        image: 'images/gig-automation.svg',
        features: [
            'Auto-reply via API',
            'Multi-session support',
            'RESTful API for chat management'
        ]
    },
    {
        id: 'banksync',
        title: 'BankSync',
        category: 'web',
        description: 'Production-grade banking application consolidating traditional accounts and Web3 wallets.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Appwrite', 'Plaid'],
        github: 'https://github.com/sajidmahamud835/banksync',
        demo: null,
        image: 'images/gig-data.svg',
        features: [
            'Bank linking via Plaid API',
            'Transaction management',
            'Web3 wallet integration'
        ]
    },
    {
        id: 'inspecthealth',
        title: 'InspectHealth',
        category: 'web',
        description: 'A modern health care website built for patient-doctor interaction. Migrated to React 18 and Vite.',
        tech: ['React 18', 'Vite', 'Bootstrap 5', 'Firebase'],
        github: 'https://github.com/sajidmahamud835/inspecthealth',
        demo: null,
        image: 'images/gig-website.svg',
        features: [
            'Firebase Authentication',
            'Responsive UI',
            'Fast Vite Build'
        ]
    },
    {
        id: 'marketsync-ea',
        title: 'MarketSync EA',
        category: 'trading',
        description: 'Sophisticated MT5 Expert Advisor integrating machine learning and GPT-4 for dynamic strategies.',
        tech: ['MQL5', 'Python', 'OpenAI GPT-4', 'Next.js'],
        github: 'https://github.com/sajidmahamud835/MarketSync-EA',
        demo: null,
        image: 'images/gig-ai.svg',
        features: [
            'Real-time market data',
            'ML model integration',
            'GPT-4 strategy optimization'
        ]
    },
    {
        id: 'slippage-tracker',
        title: 'Slippage Tracker',
        category: 'trading',
        description: 'Dashboard for tracking slippage across MT4/MT5 trading accounts in real-time.',
        tech: ['Next.js', 'TypeScript', 'Recharts'],
        github: 'https://github.com/sajidmahamud835/slippage-tracker-client',
        demo: null,
        image: 'images/gig-data.svg',
        features: [
            'Real-time monitoring',
            'Interactive data visualization',
            'Account management'
        ]
    },
    {
        id: 'prompt-vault',
        title: 'Prompt Vault',
        category: 'ai',
        description: 'Curated collection of reusable LLM prompts for developers and researchers.',
        tech: ['Markdown', 'Prompt Engineering'],
        github: 'https://github.com/sajidmahamud835/prompt-vault',
        demo: null,
        image: 'images/blog-ai.svg',
        features: [
            'Structured prompt library',
            'Reusable templates'
        ]
    },
    {
        id: 'pingpong-calc',
        title: 'PingPong Calculator',
        category: 'web',
        description: 'Glassmorphism calculator with sound effects and a unique UI.',
        tech: ['JavaScript', 'CSS Glassmorphism'],
        github: 'https://github.com/sajidmahamud835/pingpong-calculator',
        demo: null,
        image: 'images/gig-design.svg',
        features: [
            'Glassmorphism UI',
            'Sound effects',
            'Keyboard support'
        ]
    },
    {
        id: 'aamago-backend',
        title: 'Aamago Backend',
        category: 'backend',
        description: 'Express API with MongoDB & JWT Auth for the Aamago Super App.',
        tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        github: 'https://github.com/ALHarih/aamago-backend',
        demo: null,
        image: 'images/gig-api.svg',
        features: [
            'REST API',
            'JWT Authentication',
            'MongoDB Aggregations'
        ]
    },
    {
        id: 'shopping-calc',
        title: 'Shopping Cost Calculator',
        category: 'web',
        description: 'Interactive utility for calculating shopping costs with dynamic specifications.',
        tech: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/sajidmahamud835/shopping-cost-calculator-js',
        demo: null,
        image: 'images/gig-website.svg',
        features: [
            'Real-time calculation',
            'Dynamic DOM manipulation'
        ]
    },
    {
        id: 'developer-portfolio',
        title: 'Developer Portfolio',
        category: 'web',
        description: 'Zero-dependency SPA with custom router and physics engine. You are here!',
        tech: ['Vanilla JS', 'CSS Variables', 'History API'],
        github: 'https://github.com/sajidmahamud835/sajidmahamud835.github.io',
        demo: null,
        image: 'images/sajid-photo.png',
        features: [
            'Custom SPA Router',
            'Physics-based animations',
            'Zero dependencies',
            'Markdown rendering'
        ]
    }
];

export const projectCategories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Dev' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'trading', name: 'Trading' },
    { id: 'ai', name: 'AI & Data' },
    { id: 'automation', name: 'Automation' }
];
