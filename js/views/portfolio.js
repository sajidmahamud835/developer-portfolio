/**
 * Portfolio View
 * Displays projects from portfolio-data.js with filtering and details modal
 */

import { projects, projectCategories } from '../data/portfolio-data.js';
import { projects, projectCategories } from '../data/portfolio-data.js';
import { getRepoStats, getRepoCommits } from '../utils/github-stats.js';

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
                
                <div class="modal-header">
                    <div class="modal-header-top">
                        <span id="modal-category" class="badge"></span>
                        <div id="modal-updated" style="font-size:0.8rem; color:var(--text-secondary); margin-left:auto;"></div>
                    </div>
                    
                    <h2 id="modal-title" class="modal-title"></h2>
                    
                    <div id="modal-stats" class="modal-stats-row"></div>
                </div>

                <div class="modal-body">
                    <div class="modal-tech-stack" id="modal-tech"></div>
                    
                    <p id="modal-description" class="modal-desc"></p>
                    
                    <div class="modal-features-section">
                        <h4>Key Features</h4>
                        <ul id="modal-features"></ul>
                    </div>

                    <div id="modal-commits" class="commits-section" style="display:none;">
                        <h5>⚡ Recent Activity</h5>
                        <div id="modal-commits-list"></div>
                    </div>

                    <div class="modal-actions">
                        <a id="modal-github" href="#" target="_blank" class="anchor-button button-bg-primary">
                            View on GitHub
                        </a>
                        <!-- Demo link optional -->
                        <a id="modal-demo" href="#" target="_blank" class="anchor-button button-bg-secondary" style="display:none">
                            Live Demo
                        </a>
                        
                        <button class="share-btn" onclick="shareProject()" title="Share Project">
                            🔗
                        </button>
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

    // Initialize stats & Sort
    const statPromises = projects.map(async (p) => {
        if (!p.github) return { id: p.id, score: 0 };
        const stats = await getRepoStats(p.github);
        // update UI for this card
        if (stats) {
            const statsEl = document.getElementById(`stats-${p.id}`);
            if (statsEl) {
                statsEl.innerHTML = `
                <span title="Stars"><span style="margin-right:4px">⭐</span>${stats.stars}</span>
                <span title="Forks"><span style="margin-right:4px">🍴</span>${stats.forks}</span>
            `;
            }
            return { id: p.id, score: (stats.stars || 0) + (stats.forks || 0) };
        }
        return { id: p.id, score: 0 };
    });

    Promise.all(statPromises).then(scores => {
        sortProjectsByStats(scores);

        // Check for deep link params after sorting/rendering
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');
        if (projectId) {
            openProjectModal(projectId);
        }
    });
}

function sortProjectsByStats(scores) {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    // Create a map for fast lookup
    const scoreMap = {};
    scores.forEach(s => scoreMap[s.id] = s.score);

    // Get all cards
    const cards = Array.from(grid.children);

    // Sort cards based on score
    cards.sort((a, b) => {
        // Extract ID from onclick attribute or we can add data-id to card
        // Current card HTML: onclick="openProjectModal('id')"
        const getId = (el) => {
            const onClick = el.getAttribute('onclick');
            // parse 'openProjectModal('id')'
            const match = onClick.match(/'([^']+)'/);
            return match ? match[1] : '';
        };

        const idA = getId(a);
        const idB = getId(b);
        const scoreA = scoreMap[idA] || 0;
        const scoreB = scoreMap[idB] || 0;

        return scoreB - scoreA; // Descending
    });

    // Re-append in new order
    cards.forEach(card => grid.appendChild(card));
}

function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');

    // Basic Data
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.category.toUpperCase();

    // Initial Description (Fallback)
    document.getElementById('modal-description').textContent = project.description;

    // Tech Stack (Local)
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    // stats container
    const statsContainer = document.getElementById('modal-stats');
    statsContainer.innerHTML = '<div class="stat-item">Loading stats...</div>';

    // Fetch Real-time Data
    getRepoStats(project.github).then(stats => {
        if (stats) {
            // Update Stats
            statsContainer.innerHTML = `
                <div class="stat-item" title="Stars">
                    <span style="color:#e3b341">⭐</span> 
                    <strong>${stats.stars}</strong> Stars
                </div>
                <div class="stat-item" title="Forks">
                    <span>🍴</span> 
                    <strong>${stats.forks}</strong> Forks
                </div>
                <div class="stat-item" title="Language">
                    <span>💻</span> 
                    <strong>${stats.language || 'Code'}</strong>
                </div>
            `;

            // If we have a longer description from GitHub, maybe append it or replace?
            // User requested "real time data". Let's use the GH description if it's substantial.
            if (stats.description && stats.description.length > project.description.length) {
                document.getElementById('modal-description').textContent = stats.description;
            }
        } else {
            // Fallback for no stats
            statsContainer.innerHTML = `
                <div class="stat-item">
                     GitHub Info Unavailable
                </div>
            `;
        }
    });

    // Features
    const featuresList = document.getElementById('modal-features');
    if (project.features && project.features.length) {
        featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
        featuresList.parentElement.style.display = 'block';
    } else {
        featuresList.parentElement.style.display = 'none';
    }

    // Commits
    const commitsSection = document.getElementById('modal-commits');
    const commitsList = document.getElementById('modal-commits-list');

    // Reset
    commitsSection.style.display = 'none';
    commitsList.innerHTML = '';

    getRepoCommits(project.github).then(commits => {
        if (commits && commits.length > 0) {
            commitsSection.style.display = 'block';
            commitsList.innerHTML = commits.map(c => `
                <div class="commit-item">
                    <a href="${c.url}" target="_blank" class="commit-msg" title="${c.message}">${c.message}</a>
                    <span class="commit-date">${new Date(c.date).toLocaleDateString()}</span>
                </div>
            `).join('');
        }
    });

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

    // Store ID for share function
    window.currentProjectId = project.id;

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

        // Remove 'project' query param on close if desired, 
        // to keep URL clean, but some users prefer history state.
        // We'll leave it for now or replace state
        const url = new URL(window.location);
        url.searchParams.delete('project');
        window.history.replaceState({}, '', url);
    }
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') closeProjectModal();
}

// Global Share Function
window.shareProject = function () {
    if (!window.currentProjectId) return;

    const url = new URL(window.location);
    url.searchParams.set('route', 'portfolio');
    url.searchParams.set('project', window.currentProjectId);

    // Copy to clipboard
    navigator.clipboard.writeText(url.toString()).then(() => {
        const btn = document.querySelector('.share-btn');
        const original = btn.innerHTML;
        btn.innerHTML = '✅';
        setTimeout(() => btn.innerHTML = original, 2000);
    }).catch(err => {
        console.error('Failed to copy', err);
        alert('Link: ' + url.toString());
    });
};
