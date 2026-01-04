/**
 * Home View
 * Hero section with animated text, CTAs, and featured services
 */

import { getFeaturedGigs, gigCategories } from '../data/gig-data.js';
import { blogPosts } from '../data/blog-data.js';

export function render() {
    const featuredGigs = getFeaturedGigs();
    const latestPosts = blogPosts.slice(0, 3); // Get first 3 posts

    return `
        <section id="home" class="hero">
            <div class="container flex vartical-center">
                <div class="hero-content half-width slide-in-left">
                    <h1 class="hero-title">
                        Welcome To
                        <span class="text-orange typewriter">Web Developer Sajid</span><small class="text-red">'s</small>
                        Portfolio!
                    </h1>
                    <h3 class="hero-subtitle">Freelancer | Full Stack Developer</h3>
                    <p class="hero-description">
                        Looking for a web developer? I'm dedicated to creating 
                        <strong>user-friendly, responsive experiences</strong> across all devices.
                        I specialize in modern JavaScript, React, and Node.js — but I'm always 
                        learning new technologies to deliver the best solutions.
                    </p>
                    <div class="hero-cta">
                        <a href="?route=contact" onclick="route(event)" class="anchor-button button-bg-primary hover-lift">
                            Contact Me
                        </a>
                        <a href="?route=portfolio" onclick="route(event)" class="anchor-button button-bg-secondary hover-lift">
                            View Portfolio
                        </a>
                    </div>
                </div>
                <div class="hero-image half-width slide-in-right">
                    <img src="images/sajid-photo.png" alt="Web Developer Sajid" loading="lazy">
                </div>
            </div>
        </section>

        <!-- Featured Services -->
        <section id="featured-services" class="featured-services animate-on-scroll">
            <div class="container">
                <h2 class="section-title">Popular Services</h2>
                <p class="section-subtitle">Professional development with transparent pricing</p>
                
                <div class="featured-gig-grid">
                    ${featuredGigs.map(gig => {
        const category = gigCategories.find(c => c.id === gig.category);
        return `
                            <a href="?route=gig&gig=${gig.id}" onclick="route(event)" class="featured-gig-card">
                                <div class="featured-gig-icon">${category?.icon || '💼'}</div>
                                <h3>${gig.shortTitle}</h3>
                                <p>${gig.description.substring(0, 80)}...</p>
                                <div class="featured-gig-price">
                                    <span>From</span>
                                    <strong>$${gig.basePrice}</strong>
                                </div>
                            </a>
                        `;
    }).join('')}
                </div>

                <div class="featured-cta">
                    <a href="?route=services" onclick="route(event)" class="anchor-button button-bg-primary">
                        View All Services →
                    </a>
                </div>
            </div>
        </section>

        <section id="dream-big" class="animate-on-scroll">
            <div class="flex container">
                <div class="half-width">
                    <img src="images/sajid-photo-thumbs-up.png" alt="Sajid giving thumbs up" loading="lazy">
                </div>
                <div class="half-width">
                    <h2>Dream Big</h2>
                    <h3>Not Just a Web Developer</h3>
                    <p>
                        I'm dedicated to creating <strong>user-friendly, responsive frontends</strong> 
                        that work seamlessly on all devices. My goal is to build experiences where 
                        users don't feel like they've switched devices.
                    </p>
                    <a href="?route=services" onclick="route(event)" class="anchor-button button-bg-primary hover-lift">
                        My Services
                    </a>
                </div>
            </div>
        </section>

        <!-- Latest Updates (Blog) -->
        <section id="latest-blog" class="animate-on-scroll" style="padding: 60px 0;">
            <div class="container">
                <h2 class="section-title">Latest Updates</h2>
                <p class="section-subtitle">Insights on Tech, AI, and Development</p>

                <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px;">
                    ${latestPosts.map(post => `
                        <article class="blog-card" style="background: var(--bg-card); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                            <div class="blog-card-image" style="height: 200px; overflow: hidden;">
                                <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                            </div>
                            <div class="blog-card-content" style="padding: 20px;">
                                <div class="blog-meta" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
                                    <span style="background: var(--bg-hover); padding: 2px 8px; border-radius: 4px;">${post.category}</span>
                                    <span style="margin-left: 10px;">${post.date}</span>
                                </div>
                                <h3 style="margin-bottom: 10px; font-size: 1.2rem;">
                                    <a href="?route=post&id=${post.id}" onclick="route(event)" style="text-decoration: none; color: inherit;">${post.title}</a>
                                </h3>
                                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">
                                    ${post.excerpt.substring(0, 100)}...
                                </p>
                                <a href="?route=post&id=${post.id}" onclick="route(event)" style="color: var(--accent-primary); font-weight: 500; text-decoration: none;">
                                    Read Article →
                                </a>
                            </div>
                        </article>
                    `).join('')}
                </div>

                <div class="featured-cta" style="margin-top: 50px;">
                    <a href="?route=blog" onclick="route(event)" class="anchor-button button-bg-secondary">
                        View All Articles
                    </a>
                </div>
            </div>
        </section>
    `;
}

export function init() {
    // Initialize scroll animations for this view
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });
}
