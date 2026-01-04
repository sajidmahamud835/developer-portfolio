/**
 * Portfolio View
 * Fetches projects from central README.md and displays as cards with modal
 */

import { parseProjects, parseProjectDetails } from '../utils/markdown.js';

// Central README URL (raw GitHub content)
const README_URL = 'https://raw.githubusercontent.com/sajidmahamud835/antigravity-projects/main/README.md';

// Store projects data globally for modal access
let projectsData = [];
let projectDetails = {};

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
            // Parse detailed info from central README
            projectDetails = parseProjectDetails(markdown);
        }
    } catch (error) {
        console.warn('Could not fetch README, using fallback projects:', error);
    }

    // Store for modal access
    projectsData = projects;

    return `
        <section id="portfolio">
            <div class="container">
                <h1 class="section-title slide-up">Portfolio</h1>
                <p class="section-subtitle">
                    ${loadedFromReadme ? 'Live projects from my GitHub portfolio' : 'Selected projects'}
                </p>
                
                <div class="portfolio-grid grid">
                    ${projects.map((project, index) => `
                        <article class="project-card hover-lift animate-on-scroll stagger-${(index % 5) + 1}" 
                                 data-project-index="${index}"
                                 onclick="openProjectModal(${index})"
                                 style="cursor: pointer;">
                            <div class="project-header">
                                <h3 class="project-title">${project.name}</h3>
                                ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
                            </div>
                            <p class="project-description">${project.description}</p>
                            <div class="project-links">
                                <span class="anchor-button button-bg-secondary">View Details →</span>
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

    // Make modal functions globally accessible
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
}

function openProjectModal(index) {
    const project = projectsData[index];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const details = projectDetails[project.name] || {};

    // Populate modal
    document.getElementById('modal-title').textContent = project.name;
    document.getElementById('modal-language').textContent = project.language || 'Various';
    document.getElementById('modal-description').textContent = details.description || project.description;

    // Features list
    const featuresEl = document.getElementById('modal-features');
    if (details.features && details.features.length > 0) {
        featuresEl.innerHTML = details.features.map(f => `<li>${f}</li>`).join('');
        featuresEl.style.display = 'block';
    } else {
        featuresEl.innerHTML = '';
        featuresEl.style.display = 'none';
    }

    // Tech stack
    const techEl = document.getElementById('modal-tech');
    if (details.tech) {
        techEl.innerHTML = `<strong>Tech Stack:</strong> ${details.tech}`;
        techEl.style.display = 'block';
    } else {
        techEl.style.display = 'none';
    }

    // GitHub link
    document.getElementById('modal-github').href = details.github || project.url;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close on backdrop click
    modal.onclick = (e) => {
        if (e.target === modal) closeProjectModal();
    };

    // Close on Escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') closeProjectModal();
}
