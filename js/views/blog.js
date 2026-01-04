/**
 * Blog View - Article Listings
 */

import { blogPosts, blogCategories } from '../data/blog-data.js';

export function render() {
    return `
        <section id="blog" class="blog-page">
            <div class="container">
                <h1 class="section-title slide-up">Latest Insights</h1>
                <p class="section-subtitle">Thoughts on tech, development, and digital growth</p>
                
                <!-- Category Filters -->
                <div class="category-filters animate-on-scroll">
                    ${blogCategories.map(cat => `
                        <button class="category-btn ${cat.id === 'all' ? 'active' : ''}" 
                                data-category="${cat.id}">
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Blog Grid -->
                <div class="blog-grid gig-grid">
                    ${blogPosts.map(post => renderBlogCard(post)).join('')}
                </div>
            </div>
        </section>
    `;
}

function renderBlogCard(post) {
    return `
        <article class="gig-card animate-on-scroll" data-category="${post.category}">
            <div class="gig-banner">
                <img src="${post.image}" alt="${post.title}" class="gig-banner-img" loading="lazy">
            </div>
            <div class="gig-content">
                <div class="gig-meta-top" style="display:flex; justify-content:space-between; font-size:0.8rem; opacity:0.7; margin-bottom:8px;">
                    <span>${post.date}</span>
                    <span>${post.readTime} read</span>
                </div>
                <h3 class="gig-title" style="font-size:1.1rem;">${post.title}</h3>
                <p class="gig-description">${post.excerpt}</p>
                
                <div class="gig-tags" style="margin: 10px 0;">
                    ${post.tags.slice(0, 2).map(tag => `<span class="badge" style="background:var(--bg-secondary); padding:2px 8px; border-radius:10px; font-size:10px;">${tag}</span>`).join(' ')}
                </div>

                <div class="gig-footer">
                    <a href="?route=blog-post&id=${post.id}" onclick="route(event)" class="gig-cta" style="width:100%; text-align:center;">
                        Read Article →
                    </a>
                </div>
            </div>
        </article>
    `;
}

export function init() {
    // Import animations
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });

    // Filter Logic
    const filterBtns = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.gig-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
