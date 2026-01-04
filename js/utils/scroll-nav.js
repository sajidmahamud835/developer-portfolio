import { router } from '../app.js';

export class ScrollNavigator {
    constructor() {
        this.basePath = '/developer-portfolio';
        this.routes = [
            '/',
            '/about',
            '/services',
            '/portfolio',
            '/contact'
        ];
        this.isNavigating = false;
        this.cooldown = 2000;
        this.lastScrollTime = 0;

        // Cache Wormhole Elements
        this.wormholeOverlay = document.getElementById('wormhole-overlay');
        this.wormhole = this.wormholeOverlay ? this.wormholeOverlay.querySelector('.wormhole') : null;

        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const now = Date.now();
        if (this.isNavigating || (now - this.lastScrollTime < this.cooldown)) return;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check for Bottom of Page (Next Route) / Top (Prev)
        if (scrollTop + windowHeight >= documentHeight - 10) {
            this.navigate('next');
        } else if (scrollTop <= 0) {
            this.navigate('prev');
        }
    }

    async navigate(direction) {
        let currentPath = window.location.pathname.replace(this.basePath, '') || '/';
        if (currentPath !== '/' && currentPath.endsWith('/')) {
            currentPath = currentPath.slice(0, -1);
        }

        const currentIndex = this.routes.indexOf(currentPath);
        if (currentIndex === -1) return;

        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex >= 0 && nextIndex < this.routes.length) {
            this.isNavigating = true; // Lock
            this.lastScrollTime = Date.now();

            const nextRoute = this.basePath + (this.routes[nextIndex] === '/' ? '/' : this.routes[nextIndex]);

            // 1. Play Wormhole Enter Animation
            await this.playWormholeEnter();

            // 2. Change Route (while screen is covered)
            window.history.pushState({}, '', nextRoute);
            await router();

            // 3. Play Wormhole Exit Animation
            await this.playWormholeExit();

            this.isNavigating = false; // Unlock
        }
    }

    playWormholeEnter() {
        return new Promise(resolve => {
            if (!this.wormhole) { resolve(); return; }

            const overlay = this.wormholeOverlay;
            const wormhole = this.wormhole;

            overlay.classList.add('active');
            wormhole.classList.remove('disengage');
            wormhole.classList.add('engage');

            // Wait for 'suckIn' animation (1.5s defined in CSS)
            setTimeout(() => {
                resolve();
            }, 1400);
        });
    }

    playWormholeExit() {
        return new Promise(resolve => {
            if (!this.wormhole) { resolve(); return; }

            const overlay = this.wormholeOverlay;
            const wormhole = this.wormhole;

            wormhole.classList.remove('engage');
            wormhole.classList.add('disengage');

            // Wait for 'spitOut' animation (0.8s defined in CSS)
            setTimeout(() => {
                overlay.classList.remove('active');
                wormhole.classList.remove('disengage');
                resolve();
            }, 800);
        });
    }
}
