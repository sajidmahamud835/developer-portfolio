/**
 * Home View
 * Hero section with animated text and CTAs
 */

export function render() {
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
                        <a href="/developer-portfolio/contact" onclick="route(event)" class="anchor-button button-bg-primary hover-lift">
                            Contact Me
                        </a>
                        <a href="/developer-portfolio/portfolio" onclick="route(event)" class="anchor-button button-bg-secondary hover-lift">
                            View Portfolio
                        </a>
                    </div>
                </div>
                <div class="hero-image half-width slide-in-right">
                    <img src="images/sajid-photo.png" alt="Web Developer Sajid" loading="lazy">
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
                    <a href="/developer-portfolio/services" onclick="route(event)" class="anchor-button button-bg-primary hover-lift">
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
