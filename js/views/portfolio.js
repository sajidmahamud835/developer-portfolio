/**
 * Portfolio View
 * Displays projects from portfolio-data.js with filtering and details modal
 */

import { projects, projectCategories } from '../data/portfolio-data.js';
import { getRepoStats } from '../utils/github-stats.js';

export function render() {
    return `
        <section id="portfolio" class="portfolio-page">
            <div class="container">
                <h1 class="section-title slide-up">My Portfolio</h1>
                <p class="section-subtitle">A collection of my best work across Web, Mobile, AI, and Trading.</p>

                <!-- Category Filters -->
                <div class="category-filters animate-on-scroll">
                    <button class="category-btn active" data-category="all">All</button>
                    ${projectCategories.filter(c => c.id !== 'all').map(cat => `
                        <button class="category-btn" data-category="${cat.id}">${cat.name}</button>
                    `).join('')}
                </div>
                
                <!-- Project Grid -->
                <div class="portfolio-grid grid-2">
                    ${projects.map((project, index) => renderProjectCard(project, index)).join('')}
                </div>
                
                <div class="portfolio-cta animate-on-scroll" style="margin-top: 60px; text-align: center;">
                    <a href="https://github.com/sajidmahamud835" target="_blank" rel="noopener noreferrer" 
                       class="anchor-button button-bg-secondary hover-lift">
                        <span style="font-size: 1.2em; vertical-align: middle; margin-right: 5px;">🐙</span> View More Projects on GitHub
                    </a>
                </div>
            </div>
        </section>

        <!-- Project Detail Modal -->
        <div id="project-modal" class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close" onclick="closeProjectModal()">×</button>
                <div class="modal-body">
                    <div class="modal-header">
                        <span id="modal-category" class="badge"></span>
                        <div style="display: flex; gap: 15px; align-items: center; margin-top: 5px;">
                            <h2 id="modal-title" style="margin:0;"></h2>
                            <div id="modal-stats" style="font-size:0.9em; color:var(--text-secondary); display:flex; gap:10px;"></div>
                        </div>
                    </div>
                    
                    <div class="modal-tech-stack" id="modal-tech"></div>
                    
                    <p id="modal-description" class="modal-desc"></p>
                    
                    <div class="modal-features-section">
                        <h4>Key Features</h4>
                        <ul id="modal-features"></ul>
                    </div>

                    <div class="modal-actions">
                        <a id="modal-github" href="#" target="_blank" class="anchor-button button-bg-primary">
                            View on GitHub
                        </a>
                        <!-- Demo link optional -->
                        <a id="modal-demo" href="#" target="_blank" class="anchor-button button-bg-secondary" style="display:none">
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectCard(project, index) {
    // Generate pill tags for first 3 tech items
    const techPills = project.tech.slice(0, 3).map(t =>
        `<span class="tech-pill">${t}</span>`
    ).join('');

    return `
        <article class="project-card hover-lift animate-on-scroll" 
                 data-category="${project.category}"
                 onclick="openProjectModal('${project.id}')">
            <!-- Banner Image Section (Like Services) -->
            <div class="project-banner" style="background: var(--bg-hover); padding: 20px; border-radius: 8px; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; height: 160px;">
                <img src="${project.image}" alt="${project.title}" style="height: 100%; width: auto; max-width: 100%; object-fit: contain;">
            </div>
            
            <div class="project-card-body" style="flex-grow: 1; display: flex; flex-direction: column;">
                <div class="project-title-row" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="margin: 0; font-size: 1.2rem;">${project.title}</h3>
                </div>

                <!-- Live Stats Placeholder -->
                <div class="project-stats" id="stats-${project.id}" style="display: flex; gap: 12px; font-size: 0.8em; color: var(--text-secondary); margin-bottom: 8px; min-height: 20px;">
                    <!-- Populated by JS -->
                </div>
                
                <p class="project-description" style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 15px; flex-grow: 1;">
                    ${project.description.substring(0, 100)}...
                </p>

                <div class="project-card-footer" style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
                    <div class="project-tech-pills">
                        ${techPills}
                    </div>
                    <span class="view-details" style="color: var(--accent); font-weight: 500; font-size: 0.9rem;">View →</span>
                </div>
            </div>
        </article>
    `;
}

// Helper to update card stats asynchronously
async function updateCardStats(project) {
    if (!project.github) return;
    const stats = await getRepoStats(project.github);
    if (stats) {
        const statsEl = document.getElementById(`stats-${project.id}`);
        if (statsEl) {
            statsEl.innerHTML = `
                <span title="Stars"><span style="margin-right:4px">⭐</span>${stats.stars}</span>
                <span title="Forks"><span style="margin-right:4px">🍴</span>${stats.forks}</span>
            `;
        }
    } // Close updateCardStats

    export function init() {
        import('../utils/animations.js').then(module => {
            module.observeElements();
        });

        // Expose modal functions
        window.openProjectModal = openProjectModal;
        window.closeProjectModal = closeProjectModal;

        // Filter Logic
        const filterBtns = document.querySelectorAll('.category-btn');
        const cards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                cards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'flex';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });

        // Initialize stats
        projects.forEach(p => updateCardStats(p));
    }

    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('project-modal');

        // Populate Data
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-category').textContent = project.category.toUpperCase();
        document.getElementById('modal-description').textContent = project.description;

        // Live Stats in Modal
        const statsContainer = document.getElementById('modal-stats');
        if (statsContainer) {
            statsContainer.innerHTML = '<span style="opacity:0.6">Loading...</span>';
            getRepoStats(project.github).then(stats => {
                if (stats) {
                    statsContainer.innerHTML = `
                        <span title="Stars" style="display:flex; align-items:center; color:#e3b341">⭐ ${stats.stars}</span>
                        <span title="Forks" style="display:flex; align-items:center; margin-left:10px;">🍴 ${stats.forks}</span>
                    `;
                } else {
                    statsContainer.innerHTML = '';
                }
            });
        }

        // Tech Stack
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Features
        const featuresList = document.getElementById('modal-features');
        if (project.features && project.features.length) {
            featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
            featuresList.parentElement.style.display = 'block';
        } else {
            featuresList.parentElement.style.display = 'none';
        }

        // Links
        const githubBtn = document.getElementById('modal-github');
        githubBtn.href = project.github;

        const demoBtn = document.getElementById('modal-demo');
        if (project.demo) {
            demoBtn.href = project.demo;
            demoBtn.style.display = 'inline-block';
        } else {
            demoBtn.style.display = 'none';
        }

        // Show
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Close handlers
        modal.onclick = (e) => {
            if (e.target === modal) closeProjectModal();
        };

        document.addEventListener('keydown', handleEscapeKey);
    }

    function closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        document.removeEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') closeProjectModal();
    }
