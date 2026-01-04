/**
 * Gig Detail View - Interactive Pricing Calculator
 * Displays individual gig with feature selection and live pricing
 */

import { getGigById, gigCategories, getGigsByCategory } from '../data/gig-data.js';
import { parseMarkdown } from '../utils/markdown.js';

let currentGig = null;
let selectedOptions = {};
let selectedAddons = {};

export async function render(gigId) {
    currentGig = getGigById(gigId);

    if (!currentGig) {
        return `
            <section class="error-page container">
                <h1>Service Not Found</h1>
                <p>The requested service doesn't exist.</p>
                <a href="?route=services" onclick="route(event)" class="anchor-button button-bg-primary">View All Services</a>
            </section>
        `;
    }

    const category = gigCategories.find(c => c.id === currentGig.category);
    let htmlContent = '<p>Loading details...</p>';

    // Fetch Markdown Content
    if (currentGig.contentPath) {
        try {
            const res = await fetch(currentGig.contentPath);
            if (res.ok) {
                const md = await res.text();
                htmlContent = parseMarkdown(md);
            } else {
                htmlContent = `<p>${currentGig.description || 'Details unavailable.'}</p>`;
            }
        } catch (e) {
            console.error('Failed to load gig content', e);
            htmlContent = `<p>${currentGig.description || 'Details unavailable.'}</p>`;
        }
    } else {
        // Fallback for legacy data without contentPath
        htmlContent = `<p>${currentGig.description || ''}</p>`;
    }

    // Ensure styles are available
    // import('../utils/markdown.js'); // side-effect import not needed if we rely on global styles

    return `
        <section class="gig-detail-page">
            <div class="container">
                <!-- Breadcrumb -->
                <div class="breadcrumb">
                    <a href="?" onclick="route(event)">Home</a> / 
                    <a href="?route=services" onclick="route(event)">Services</a> / 
                    <span>${currentGig.shortTitle}</span>
                </div>

                <!-- Header -->
                <div class="gig-detail-header">
                    <div class="gig-detail-banner">
                        <img src="${currentGig.banner}" alt="${currentGig.title}" loading="lazy">
                    </div>
                    <div class="gig-header-content">
                        <span class="gig-category">${category?.icon || '💼'} ${category?.name || 'Service'}</span>
                        <h1 class="gig-detail-title">${currentGig.title}</h1>
                        <div class="gig-detail-meta">
                            <span>🚀 Delivery: ${currentGig.deliveryDays} days</span>
                            <span>⭐ Top Rated Service</span>
                        </div>
                    </div>
                </div>

                <!-- Main Grid -->
                <div class="gig-detail-grid">
                    <!-- Left: Info -->
                    <div class="gig-info">
                        <div class="markdown-body">
                            ${htmlContent}
                        </div>
                        
                        <h3 style="margin-top: 30px;">Keywords</h3>
                        <div class="gig-keywords">
                            ${currentGig.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
                        </div>
                    </div>

                    <!-- Right: Calculator -->
                    <div class="gig-calculator">

                        <div class="calculator-header">
                            <h3>Configure Your Order</h3>
                            <div class="live-price" id="live-price">$${currentGig.basePrice}</div>
                        </div>

                        <form id="gig-form">
                            ${renderFeatures(currentGig.features)}
                            
                            <div class="order-summary" id="order-summary">
                                <div class="summary-row">
                                    <span>Base Price</span>
                                    <span>$${currentGig.basePrice}</span>
                                </div>
                            </div>

                            <button type="button" class="order-btn" onclick="openOrderForm()">
                                Continue ($<span id="total-btn-price">${currentGig.basePrice}</span>)
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Order Form Overlay -->
        <div class="order-form-overlay" id="order-form-overlay">
            <div class="order-form">
                <h3>Complete Your Order</h3>
                <form id="submit-order-form" action="https://formspree.io/f/mrebodkz" method="POST">
                    <input type="hidden" name="service" value="${currentGig.shortTitle}">
                    <input type="hidden" name="total" id="form-total" value="$${currentGig.basePrice}">
                    <input type="hidden" name="configuration" id="form-config" value="">
                    
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="details">Project Details</label>
                        <textarea id="details" name="details" placeholder="Describe your project requirements..." required></textarea>
                    </div>
                    
                    <div class="summary-total">
                        <span>Total</span>
                        <span class="total-price" id="modal-total">$${currentGig.basePrice}</span>
                    </div>
                    
                    <button type="submit" class="order-btn">Submit Order Request</button>
                    <button type="button" class="anchor-button" style="width:100%;margin-top:12px;text-align:center;" onclick="closeOrderForm()">Cancel</button>
                </form>
            </div>
        </div>

        <!-- Similar Gigs Section -->
        <section class="similar-gigs-section container">
            <h2 class="section-title">Similar Services</h2>
            <div class="gig-grid">
                ${renderSimilarGigs(currentGig)}
            </div>
        </section>
    `;
}

function renderFeatures(features) {
    return features.map(feature => {
        if (feature.isAddon) {
            // Checkbox addon
            return `
                <div class="addon-item" onclick="toggleAddon('${feature.id}', ${feature.price})">
                    <input type="checkbox" id="addon-${feature.id}" data-price="${feature.price}">
                    <span class="option-text">${feature.name}</span>
                    <span class="option-price">+$${feature.price}</span>
                </div>
            `;
        } else {
            // Radio options
            return `
                <div class="feature-group">
                    <div class="feature-label">${feature.name}</div>
                    <div class="feature-options">
                        ${feature.options.map((opt, i) => `
                            <label class="feature-option ${i === 0 ? 'selected' : ''}" onclick="selectOption('${feature.id}', ${opt.price}, this)">
                                <input type="radio" name="${feature.id}" value="${opt.price}" ${i === 0 ? 'checked' : ''}>
                                <span class="option-text">${opt.label}</span>
                                <span class="option-price">${opt.price > 0 ? '+$' + opt.price : 'Included'}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }).join('');
}

function calculateTotal() {
    if (!currentGig) return 0;

    let total = currentGig.basePrice;

    // Add selected options
    Object.values(selectedOptions).forEach(price => {
        total += price;
    });

    // Add selected addons
    Object.values(selectedAddons).forEach(price => {
        total += price;
    });

    return total;
}

function updateUI() {
    const total = calculateTotal();

    // Update live price
    const livePrice = document.getElementById('live-price');
    if (livePrice) livePrice.textContent = '$' + total;

    // Update button price
    const btnPrice = document.getElementById('total-btn-price');
    if (btnPrice) btnPrice.textContent = total;

    // Update modal total
    const modalTotal = document.getElementById('modal-total');
    if (modalTotal) modalTotal.textContent = '$' + total;

    // Update hidden form fields
    const formTotal = document.getElementById('form-total');
    if (formTotal) formTotal.value = '$' + total;

    const formConfig = document.getElementById('form-config');
    if (formConfig) {
        formConfig.value = JSON.stringify({ options: selectedOptions, addons: selectedAddons });
    }
}

export function init() {
    // Initialize selected options with first option of each feature
    if (currentGig) {
        currentGig.features.forEach(feature => {
            if (!feature.isAddon && feature.options) {
                selectedOptions[feature.id] = feature.options[0].price;
            }
        });
    }

    // Make functions global for onclick handlers
    window.selectOption = function (featureId, price, element) {
        selectedOptions[featureId] = price;

        // Update UI classes
        const parent = element.closest('.feature-options');
        parent.querySelectorAll('.feature-option').forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');

        updateUI();
    };

    window.toggleAddon = function (addonId, price) {
        const checkbox = document.getElementById('addon-' + addonId);
        const item = checkbox.closest('.addon-item');

        if (selectedAddons[addonId]) {
            delete selectedAddons[addonId];
            checkbox.checked = false;
            item.classList.remove('checked');
        } else {
            selectedAddons[addonId] = price;
            checkbox.checked = true;
            item.classList.add('checked');
        }

        updateUI();
    };

    window.openOrderForm = function () {
        document.getElementById('order-form-overlay').classList.add('active');
    };

    window.closeOrderForm = function () {
        document.getElementById('order-form-overlay').classList.remove('active');
    };

    updateUI();

    // Import animations
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });
}

function renderSimilarGigs(currentGig) {
    const similar = getGigsByCategory(currentGig.category)
        .filter(g => g.id !== currentGig.id)
        .slice(0, 3); // Show max 3

    if (similar.length === 0) return '<p class="text-center">No similar services found.</p>';

    return similar.map(gig => {
        // Mini card render
        const category = gigCategories.find(c => c.id === gig.category);
        return `
        <article class="gig-card" data-category="${gig.category}">
            <div class="gig-banner">
                <img src="${gig.banner}" alt="${gig.title}" class="gig-banner-img" loading="lazy">
            </div>
            <div class="gig-content">
                <span class="gig-category">${category?.name || 'Service'}</span>
                <h3 class="gig-title">${gig.shortTitle}</h3>
                <p class="gig-description">${gig.description.substring(0, 60)}...</p>
                <div class="gig-footer">
                    <div class="gig-price">
                        <span class="price-label">From</span>
                        <span class="price-value">$${gig.basePrice}</span>
                    </div>
                    <a href="?route=gig&gig=${gig.id}" onclick="route(event)" class="gig-cta">View</a>
                </div>
            </div>
        </article>
        `;
    }).join('');
}
