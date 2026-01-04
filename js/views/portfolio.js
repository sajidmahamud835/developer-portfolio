/**
 * Portfolio View
 * Displays projects from portfolio-data.js with filtering and details modal
 */

import { projects, projectCategories } from '../data/portfolio-data.js';

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
                <div class="portfolio-grid grid-3">
                    ${projects.map((project, index) => renderProjectCard(project, index)).join('')}
                </div>
                
                <div class="portfolio-cta animate-on-scroll" style="margin-top: 60px; text-align: center;">
                    <p>Check out my code on GitHub:</p>
                    <a href="https://github.com/sajidmahamud835" target="_blank" rel="noopener noreferrer" 
                       class="anchor-button button-bg-secondary hover-lift">
                        <span style="font-size: 1.2em; vertical-align: middle; margin-right: 5px;">🐙</span> GitHub Profile
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
                        <h2 id="modal-title"></h2>
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
            <div class="project-card-header">
                <div class="project-icon">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-title-row">
                    <h3>${project.title}</h3>
                </div>
            </div>
            
            <div class="project-card-body">
                <p>${project.description.substring(0, 100)}...</p>
                <div class="project-tech-pills">
                    ${techPills}
                    ${project.tech.length > 3 ? `<span class="tech-pill">+${project.tech.length - 3}</span>` : ''}
                </div>
            </div>

            <div class="project-card-footer">
                <span class="view-details">View Details →</span>
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
}

function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');

    // Populate Data
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.category.toUpperCase();
    document.getElementById('modal-description').textContent = project.description;

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
