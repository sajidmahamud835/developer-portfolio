/**
 * Services View - Fiverr-Style Gig Listings
 * Displays service categories and interactive gig cards
 */

import { gigs, gigCategories } from '../data/gig-data.js';

export function render() {
    return `
        <section id="services" class="services-page">
            <div class="container">
                <h1 class="section-title slide-up">My Services</h1>
                <p class="section-subtitle">Professional development services with transparent pricing</p>

                <!-- Category Filters -->
                <div class="category-filters animate-on-scroll">
                    <button class="category-btn active" data-category="all">All Services</button>
                    ${gigCategories.map(cat => `
                        <button class="category-btn" data-category="${cat.id}">
                            <span>${cat.icon}</span> ${cat.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Gig Grid -->
                <div class="gig-grid">

                </div>

                <!-- Load More -->
                <div class="load-more-container" style="text-align: center; margin-bottom: 60px;">
                    <button id="load-more-btn" class="anchor-button button-bg-secondary" style="display: none;">
                        Load More
                    </button>
                </div>

                <!-- CTA Section -->
                <div class="services-cta animate-on-scroll">
                    <h3>Need something custom?</h3>
                    <p>Let's discuss your project requirements</p>
                    <a href="?route=contact" onclick="route(event)" class="anchor-button button-bg-primary">
                        Get a Free Quote
                    </a>
                </div>
            </div>
        </section>
    `;
}

function renderGigCard(gig) {
    const category = gigCategories.find(c => c.id === gig.category);
    return `
        <article class="gig-card animate-on-scroll" data-category="${gig.category}">
            <div class="gig-banner">
                <img src="${gig.banner}" alt="${gig.title}" class="gig-banner-img" loading="lazy">
            </div>
            <div class="gig-content">
                <span class="gig-category">${category?.name || 'Service'}</span>
                <h3 class="gig-title">${gig.shortTitle}</h3>
                <p class="gig-description">${gig.description.replace(/\*\*/g, '')}</p>
                <div class="gig-meta">
                    <span class="gig-delivery">🚀 ${gig.deliveryDays} days</span>
                </div>
                <div class="gig-footer">
                    <div class="gig-price">
                        <span class="price-label">Starting at</span>
                        <span class="price-value">$${gig.basePrice}</span>
                    </div>
                    <a href="?route=gig&gig=${gig.id}" onclick="route(event)" class="gig-cta">
                        View Details →
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

    // Category filter functionality
    const filterBtns = document.querySelectorAll('.category-btn');
    const gigGrid = document.querySelector('.gig-grid');
    const allGigs = gigs; // Store reference
    let currentCategory = 'all';
    let visibleCount = 6;
    const BATCH_SIZE = 6;

    // Initial Render
    renderBatch(allGigs, currentCategory, visibleCount);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Reset pagination
            currentCategory = btn.dataset.category;
            visibleCount = BATCH_SIZE;

            // Re-render
            renderBatch(allGigs, currentCategory, visibleCount);
        });
    });

    // Load More Button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += BATCH_SIZE;
            renderBatch(allGigs, currentCategory, visibleCount);
        });
    }
}

function renderBatch(allGigs, category, limit) {
    const gigGrid = document.querySelector('.gig-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // Filter
    const filtered = allGigs.filter(g => category === 'all' || g.category === category);

    // Slice
    const toShow = filtered.slice(0, limit);

    // Render
    gigGrid.innerHTML = toShow.map(gig => renderGigCard(gig)).join('');

    // Animate new items
    const cards = gigGrid.querySelectorAll('.gig-card');
    cards.forEach(card => card.classList.add('fade-in'));

    // Handle Load More Button Visibility
    if (loadMoreBtn) {
        if (filtered.length > limit) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.innerHTML = `Load More (${filtered.length - limit} remaining)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}
