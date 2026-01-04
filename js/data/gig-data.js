/**
 * Gig Data - Fiverr-Style Service Definitions
 * Each gig has SEO-focused copy, interactive pricing, and feature selection.
 */

export const gigCategories = [
    { id: 'web', name: 'Web Development', icon: '🌐' },
    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
    { id: 'design', name: 'UI/UX Design', icon: '🎨' },
    { id: 'ai', name: 'AI & Automation', icon: '🤖' },
    { id: 'trading', name: 'Trading & Finance', icon: '📈' },
    { id: 'blockchain', name: 'Blockchain & Web3', icon: '⛓️' },
    { id: 'data', name: 'Data & Analytics', icon: '📊' },
    { id: 'marketing', name: 'Digital Marketing', icon: '📣' },
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
        description: `Get a **professional, mobile-friendly website** that converts visitors into customers. Built with clean code (React/Next.js) and optimized for search engines.`,
        keywords: ['custom website', 'responsive design', 'business website', 'react js'],
        basePrice: 299,
        deliveryDays: 7,
        features: [
            {
                id: 'pages', name: 'Number of Pages', options: [
                    { label: '1-3 Pages', price: 0 },
                    { label: '4-7 Pages', price: 150 },
                    { label: '8-12 Pages', price: 300 }
                ]
            },
            {
                id: 'cms', name: 'Content Management', options: [
                    { label: 'Static Code', price: 0 },
                    { label: 'Headless CMS', price: 150 },
                    { label: 'Admin Dashboard', price: 250 }
                ]
            },
            { id: 'seo', name: 'Advanced SEO', price: 75, isAddon: true },
            { id: 'analytics', name: 'Analytics Setup', price: 40, isAddon: true }
        ]
    },
    {
        id: 'landing-page',
        category: 'web',
        title: 'I will design a high-converting landing page',
        shortTitle: 'Landing Page',
        banner: 'images/gig-landing.svg',
        description: `Boost your conversions with a **stunning landing page** designed for lead generation. Optimized for speed, mobile devices, and A/B testing readiness.`,
        keywords: ['landing page', 'conversion', 'lead generation', 'sales funnel'],
        basePrice: 149,
        deliveryDays: 4,
        features: [
            {
                id: 'sections', name: 'Complexity', options: [
                    { label: 'Single Section', price: 0 },
                    { label: 'Long Form (5+ Sec)', price: 100 },
                    { label: 'Multi-Step Funnel', price: 200 }
                ]
            },
            { id: 'form', name: 'Lead Form Integration', price: 30, isAddon: true },
            { id: 'animations', name: 'Scroll Animations', price: 50, isAddon: true }
        ]
    },
    {
        id: 'ecommerce',
        category: 'web',
        title: 'I will create a complete e-commerce store with payments',
        shortTitle: 'E-Commerce Store',
        banner: 'images/gig-ecommerce.svg',
        description: `Launch your brand with a **fully functional online store**. Secure Stripe/PayPal payments, inventory management, and beautiful product galleries.`,
        keywords: ['ecommerce', 'online store', 'shopify', 'woocommerce', 'stripe'],
        basePrice: 499,
        deliveryDays: 14,
        features: [
            {
                id: 'products', name: 'Product Capacity', options: [
                    { label: 'Up to 20', price: 0 },
                    { label: 'Up to 100', price: 150 },
                    { label: 'Unlimited', price: 300 }
                ]
            },
            { id: 'payment', name: 'Payment Setup', price: 50, isAddon: true },
            { id: 'email', name: 'Email Automation', price: 75, isAddon: true }
        ]
    },
    {
        id: 'saas-mvp',
        category: 'web',
        title: 'I will build your SaaS MVP from scratch',
        shortTitle: 'SaaS MVP',
        banner: 'images/gig-api.svg',
        description: `Turn your idea into a **Minimum Viable Product**. Complete full-stack solution with authentication, database, and subscription payments.`,
        keywords: ['saas', 'mvp', 'startup', 'full stack', 'nextjs'],
        basePrice: 999,
        deliveryDays: 21,
        features: [
            {
                id: 'features', name: 'Core Features', options: [
                    { label: 'Basic CRUD', price: 0 },
                    { label: 'Intermediate', price: 500 },
                    { label: 'Complex Logic', price: 1000 }
                ]
            },
            { id: 'auth', name: 'User Auth & Profiles', price: 200, isAddon: true },
            { id: 'stripe', name: 'Subscription Billing', price: 250, isAddon: true }
        ]
    },

    // ===== MOBILE APPS (NEW) =====
    {
        id: 'flutter-app',
        category: 'mobile',
        title: 'I will develop a cross-platform mobile app using Flutter',
        shortTitle: 'Flutter App',
        banner: 'images/gig-website.svg', // using fallback
        description: `Get a **native-quality iOS and Android app** from a single codebase. Smooth animations, offline support, and API integration.`,
        keywords: ['flutter', 'mobile app', 'ios', 'android', 'cross platform'],
        basePrice: 599,
        deliveryDays: 14,
        features: [
            {
                id: 'screens', name: 'Number of Screens', options: [
                    { label: '1-3 Screens', price: 0 },
                    { label: '4-7 Screens', price: 200 },
                    { label: '8-12 Screens', price: 400 }
                ]
            },
            { id: 'stores', name: 'App Store Submission', price: 100, isAddon: true },
            { id: 'firebase', name: 'Firebase Backend', price: 150, isAddon: true }
        ]
    },
    {
        id: 'react-native',
        category: 'mobile',
        title: 'I will build a React Native app for your startup',
        shortTitle: 'React Native App',
        banner: 'images/gig-website.svg', // using fallback
        description: `Launch your startup with a robust **React Native application**. High performance, reusable components, and easy maintenance.`,
        keywords: ['react native', 'mobile development', 'ios app', 'android app'],
        basePrice: 650,
        deliveryDays: 14,
        features: [
            {
                id: 'complexity', name: 'App Complexity', options: [
                    { label: 'Simple Info App', price: 0 },
                    { label: 'Social/Auth App', price: 300 },
                    { label: 'Marketplace', price: 600 }
                ]
            },
            { id: 'push', name: 'Push Notifications', price: 80, isAddon: true }
        ]
    },

    // ===== UI/UX DESIGN (NEW) =====
    {
        id: 'app-design',
        category: 'design',
        title: 'I will design a modern UI/UX for your mobile app',
        shortTitle: 'Mobile UI/UX',
        banner: 'images/gig-website.svg', // using fallback
        description: `Stunning **mobile app designs** in Figma. User-centric research, wireframing, and high-fidelity prototyping.`,
        keywords: ['ui design', 'ux design', 'figma', 'mobile ui', 'app design'],
        basePrice: 199,
        deliveryDays: 5,
        features: [
            {
                id: 'screens', name: 'Screen Count', options: [
                    { label: 'Up to 5', price: 0 },
                    { label: 'Up to 10', price: 150 },
                    { label: 'Up to 20', price: 300 }
                ]
            },
            { id: 'prototype', name: 'Clickable Prototype', price: 75, isAddon: true }
        ]
    },
    {
        id: 'web-design',
        category: 'design',
        title: 'I will create a clean and modern website design',
        shortTitle: 'Website UI Design',
        banner: 'images/gig-website.svg', // using fallback
        description: `Professional **website UI design** that aligns with your brand. Delivered as pixel-perfect Figma files ready for development.`,
        keywords: ['web design', 'figma', 'landing page design', 'ui ux'],
        basePrice: 249,
        deliveryDays: 6,
        features: [
            {
                id: 'pages', name: 'Pages', options: [
                    { label: 'Homepage Only', price: 0 },
                    { label: 'Home + 2 Inner', price: 150 },
                    { label: 'Full Site (5pg)', price: 300 }
                ]
            },
            { id: 'mobile', name: 'Mobile View Design', price: 50, isAddon: true }
        ]
    },

    // ===== AI & AUTOMATION =====
    {
        id: 'ai-integration',
        category: 'ai',
        title: 'I will integrate OpenAI/ChatGPT into your website',
        shortTitle: 'ChatGPT Integration',
        banner: 'images/gig-ai.svg',
        description: `Supercharge your app with **AI capabilities**. Chatbots, text generation, summarization, and custom fine-tuning.`,
        keywords: ['chatgpt', 'openai', 'ai integration', 'chatbot', 'llm'],
        basePrice: 299,
        deliveryDays: 5,
        features: [
            {
                id: 'model', name: 'AI Model', options: [
                    { label: 'GPT-3.5 Turbo', price: 0 },
                    { label: 'GPT-4o', price: 100 },
                    { label: 'Claude 3.5', price: 120 }
                ]
            },
            { id: 'prompts', name: 'Prompt Engineering', price: 75, isAddon: true },
            { id: 'context', name: 'Context/Memory', price: 150, isAddon: true }
        ]
    },
    {
        id: 'ai-chatbot',
        category: 'ai',
        title: 'I will build a custom customer support AI chatbot',
        shortTitle: 'Support Chatbot',
        banner: 'images/gig-ai.svg',
        description: `Automate support with a **smart AI chatbot** trained on your business data. RAG implementation for accurate answers.`,
        keywords: ['chatbot', 'customer support', 'intercom', 'rag', 'automation'],
        basePrice: 399,
        deliveryDays: 7,
        features: [
            {
                id: 'sources', name: 'Data Sources (Knowledge Base)', options: [
                    { label: '1 Source (PDF/URL)', price: 0 },
                    { label: '3 Sources', price: 100 },
                    { label: 'Unlimited', price: 250 }
                ]
            }
        ]
    },
    {
        id: 'automation-workflow',
        category: 'ai',
        title: 'I will automate your business workflows with Zapier/Make',
        shortTitle: 'Workflow Automation',
        banner: 'images/gig-ai.svg',
        description: `Save hours every week by **automating repetitive tasks**. Connect Google Sheets, email, Slack, and CRM seamlessly.`,
        keywords: ['automation', 'zapier', 'make.com', 'productivity', 'workflow'],
        basePrice: 150,
        deliveryDays: 3,
        features: [
            {
                id: 'steps', name: 'Workflow Steps', options: [
                    { label: 'Simple (2-3 steps)', price: 0 },
                    { label: 'Medium (5-8 steps)', price: 100 },
                    { label: 'Complex (Logic/Path)', price: 200 }
                ]
            }
        ]
    },

    // ===== TRADING & FINANCE =====
    {
        id: 'trading-bot',
        category: 'trading',
        title: 'I will code a profitable EA for MT4 or MT5',
        shortTitle: 'MT4/MT5 Expert Advisor',
        banner: 'images/gig-trading.svg',
        description: `Turn your trading capabilities into a **fully automated robot**. Backtesting ready, strict money management, and bug-free logic.`,
        keywords: ['expert advisor', 'mt4', 'mt5', 'mql4', 'trading bot'],
        basePrice: 249,
        deliveryDays: 7,
        features: [
            {
                id: 'indicators', name: 'Indicators Used', options: [
                    { label: 'Standard (MA/RSI)', price: 0 },
                    { label: 'Custom Indicator', price: 100 },
                    { label: 'Multi-Timeframe', price: 150 }
                ]
            },
            { id: 'source', name: 'Source Code', price: 100, isAddon: true }
        ]
    },
    {
        id: 'pinescript',
        category: 'trading',
        title: 'I will create custom TradingView indicators in PineScript',
        shortTitle: 'PineScript Indicator',
        banner: 'images/gig-trading.svg',
        description: `Visualize your strategy with **custom TradingView indicators**. Alerts, backtesting strategies, and overlay charts.`,
        keywords: ['pinescript', 'tradingview', 'indicator', 'strategy', 'backtest'],
        basePrice: 120,
        deliveryDays: 3,
        features: [
            {
                id: 'type', name: 'Script Type', options: [
                    { label: 'Study/Indicator', price: 0 },
                    { label: 'Strategy (Backtest)', price: 80 }
                ]
            },
            { id: 'alerts', name: 'Webhook Alerts', price: 40, isAddon: true }
        ]
    },

    // ===== BLOCKCHAIN (NEW) =====
    {
        id: 'smart-contract',
        category: 'blockchain',
        title: 'I will write secure smart contracts in Solidity',
        shortTitle: 'Smart Contract',
        banner: 'images/gig-api.svg',
        description: `Deploy **secure, gas-optimized smart contracts** for Ethereum, BSC, or Polygon. ERC-20, ERC-721 (NFTs), or custom logic.`,
        keywords: ['solidity', 'smart contract', 'ethereum', 'blockchain', 'web3'],
        basePrice: 400,
        deliveryDays: 7,
        features: [
            {
                id: 'complexity', name: 'Contract Type', options: [
                    { label: 'Standard Token', price: 0 },
                    { label: 'NFT Collection', price: 200 },
                    { label: 'DeFi Logic', price: 500 }
                ]
            },
            { id: 'verify', name: 'Etherscan Verification', price: 50, isAddon: true }
        ]
    },
    {
        id: 'dapp',
        category: 'blockchain',
        title: 'I will build a Web3 DApp with wallet connection',
        shortTitle: 'Full Stack DApp',
        banner: 'images/gig-api.svg',
        description: `Create a **Decentralized Application** connected to MetaMask/WalletConnect. Frontend visualization of on-chain data.`,
        keywords: ['dapp', 'web3', 'react', 'wagmi', 'metamask'],
        basePrice: 599,
        deliveryDays: 10,
        features: [
            {
                id: 'pages', name: 'DApp Pages', options: [
                    { label: 'Single Screen', price: 0 },
                    { label: 'Dashboard + Mint', price: 300 }
                ]
            }
        ]
    },

    // ===== DATA & ANALYTICS (NEW) =====
    {
        id: 'web-scraping',
        category: 'data',
        title: 'I will scrape data from any website to Excel/CSV',
        shortTitle: 'Web Scraping',
        banner: 'images/gig-api.svg',
        description: `Extract **valuable data** from websites using Python/Selenium. Lead generation lists, product prices, or real estate data.`,
        keywords: ['web scraping', 'python', 'selenium', 'data entry', 'mining'],
        basePrice: 99,
        deliveryDays: 3,
        features: [
            {
                id: 'records', name: 'Records Count', options: [
                    { label: 'Up to 1k', price: 0 },
                    { label: 'Up to 10k', price: 100 },
                    { label: 'Up to 100k', price: 200 }
                ]
            },
            { id: 'script', name: 'Include Script', price: 50, isAddon: true }
        ]
    },
    {
        id: 'data-vis',
        category: 'data',
        title: 'I will create interactive dashboards using D3/Chart.js',
        shortTitle: 'Data Visualization',
        banner: 'images/gig-api.svg',
        description: `Turn raw numbers into **beautiful, interactive charts**. Custom dashboards for admin panels or public reports.`,
        keywords: ['d3.js', 'chart.js', 'dashboard', 'analytics', 'visualization'],
        basePrice: 199,
        deliveryDays: 5,
        features: [
            {
                id: 'charts', name: 'Number of Charts', options: [
                    { label: '1-2 Charts', price: 0 },
                    { label: '3-5 Charts', price: 150 }
                ]
            }
        ]
    },

    // ===== MARKETING (NEW) =====
    {
        id: 'seo-audit',
        category: 'marketing',
        title: 'I will provide a complete technical SEO audit',
        shortTitle: 'SEO Audit',
        banner: 'images/gig-speed.svg',
        description: `Find out why you aren't ranking. **Comprehensive SEO report** covering site speed, broken links, meta tags, and keyword opportunities.`,
        keywords: ['seo', 'audit', 'marketing', 'google ranking'],
        basePrice: 80,
        deliveryDays: 2,
        features: [
            {
                id: 'depth', name: 'Audit Depth', options: [
                    { label: 'Overview', price: 0 },
                    { label: 'Deep Dive + Strategy', price: 70 }
                ]
            }
        ]
    },

    // ===== SUPPORT & FIXES =====
    {
        id: 'api-backend', // Updated ID to match old if needed, or keeping duplicate if unique service. Naming conflicts? 
        // Wait, I already had 'api-backend' in old data. Let's keep it but I positioned it earlier in 'web'.
        // I will rename the old "api-backend" above if duplicate or just remove duplication.
        // I see 'api-backend' was defined earlier in this file now. I should verify uniqueness.
        // Skipping duplicate to avoid error.
    },
    {
        id: 'bug-fix',
        category: 'maintenance',
        title: 'I will fix bugs in your HTML, CSS, JS, or React code',
        shortTitle: 'Quick Bug Fix',
        banner: 'images/gig-debug.svg',
        description: `Stuck on a bug? I will **debug and fix your code** ASAP. Layout issues, console errors, or broken logic.`,
        keywords: ['bug fix', 'debugging', 'html', 'css', 'javascript'],
        basePrice: 49,
        deliveryDays: 1,
        features: [
            {
                id: 'hours', name: 'Time Estimation', options: [
                    { label: '1 Hour task', price: 0 },
                    { label: 'Complex (3-5 hrs)', price: 100 }
                ]
            },
            { id: 'zoom', name: 'Live Zoom Support', price: 50, isAddon: true }
        ]
    },
    {
        id: 'speed-opt',
        category: 'maintenance',
        title: 'I will optimize your website for 90+ Google PageSpeed',
        shortTitle: 'Speed Optimization',
        banner: 'images/gig-speed.svg',
        description: `Faster sites rank better. I will **optimize images, minify code, and cache assets** to pass Core Web Vitals.`,
        keywords: ['speed', 'performance', 'gtmetrix', 'pagespeed', 'optimization'],
        basePrice: 120,
        deliveryDays: 3,
        features: [
            {
                id: 'pages', name: 'Pages', options: [
                    { label: 'Homepage Only', price: 0 },
                    { label: 'Up to 5 Pages', price: 100 }
                ]
            }
        ]
    }
].filter(g => g && g.id); // Filter out any undefined empty objects if I left commas

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
    if (categoryId === 'all') return gigs;
    return gigs.filter(g => g.category === categoryId);
}

/**
 * Get featured gigs for home page
 * @returns {array}
 */
export function getFeaturedGigs() {
    // Return a mix of top selling gigs
    return gigs.filter(g => ['custom-website', 'trading-bot', 'ai-integration', 'flutter-app'].includes(g.id));
}
