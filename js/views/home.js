/**
 * Home View
 * Hero section with animated text, CTAs, and featured services
 */

import { getFeaturedGigs, gigCategories } from '../data/gig-data.js';

export function render() {
    const featuredGigs = getFeaturedGigs();

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
                                <p>${gig.description.replace(/\*\*/g, '').substring(0, 80)}...</p>
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
    `;
}

export function init() {
    // Initialize scroll animations for this view
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });
}
