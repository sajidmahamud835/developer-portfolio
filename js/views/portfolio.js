/**
 * Portfolio View
 * Fetches projects from central README.md and displays as cards
 */

import { parseProjects } from '../utils/markdown.js';

// Central README URL (raw GitHub content)
const README_URL = 'https://raw.githubusercontent.com/sajidmahamud835/antigravity-projects/main/README.md';

// Fallback projects in case fetch fails
const FALLBACK_PROJECTS = [
    { name: 'EasyCom', url: 'https://github.com/sajidmahamud835/easycom', description: 'Next.js 15 E-commerce Platform', language: 'TypeScript' },
    { name: 'WhatsApp Bot', url: 'https://github.com/sajidmahamud835/whatsapp-bot', description: 'Automation bot with API', language: 'JavaScript' },
    { name: 'GridMaster Pro', url: 'https://github.com/sajidmahamud835/grid-master-pro-mt5-ea', description: 'MetaTrader 5 trading EA', language: 'MQL5' },
    { name: 'BankSync', url: 'https://github.com/sajidmahamud835/banksync', description: 'Banking app with Plaid', language: 'TypeScript' }
];

export async function render() {
    let projects = FALLBACK_PROJECTS;
    let loadedFromReadme = false;

    try {
        const response = await fetch(README_URL);
        if (response.ok) {
            const markdown = await response.text();
            const parsed = parseProjects(markdown);
            if (parsed.length > 0) {
                projects = parsed;
                loadedFromReadme = true;
            }
        }
    } catch (error) {
        console.warn('Could not fetch README, using fallback projects:', error);
    }

    return `
        <section id="portfolio">
            <div class="container">
                <h1 class="section-title slide-up">Portfolio</h1>
                <p class="section-subtitle">
                    ${loadedFromReadme ? 'Live projects from my GitHub portfolio' : 'Selected projects'}
                </p>
                
                <div class="portfolio-grid grid">
                    ${projects.map((project, index) => `
                        <article class="project-card hover-lift animate-on-scroll stagger-${(index % 5) + 1}">
                            <div class="project-header">
                                <h3 class="project-title">${project.name}</h3>
                                ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
                            </div>
                            <p class="project-description">${project.description}</p>
                            <div class="project-links">
                                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="anchor-button button-bg-primary">
                                    View on GitHub
                                </a>
                            </div>
                        </article>
                    `).join('')}
                </div>
                
                <div class="portfolio-cta animate-on-scroll">
                    <p>Want to see more? Check out my full GitHub profile:</p>
                    <a href="https://github.com/sajidmahamud835" target="_blank" rel="noopener noreferrer" 
                       class="anchor-button button-bg-secondary hover-lift">
                        View All Projects
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
