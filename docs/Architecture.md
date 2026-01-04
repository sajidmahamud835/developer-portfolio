# Developer Portfolio Architecture

## Overview
The Developer Portfolio is a **zero-dependency Single Page Application (SPA)** built with Vanilla JavaScript (ES6+), HTML5, and CSS3. It emphasizes high-performance animations, seamless transitions, and dynamic content loading without the overhead of frameworks like React or Vue.

## Core Systems

### 1. The Router (`js/app.js`)
*   **Mechanism**: Uses the Browser History API (`pushState`, `popstate`) to manage navigation without page reloads.
*   **Dynamic Imports**: Views are loaded lazily using `import('./views/${viewName}.js')`, reducing initial bundle size.
*   **Lifecycle**:
    *   `fade-out`: Exiting view animates out.
    *   `render`: New view HTML is injected.
    *   `fade-in`: New view animates in.
    *   `init`: View-specific logic (listeners, observers) is executed.

### 2. Auto-Scroll Navigation (`js/utils/scroll-nav.js`)
A custom engine that turns scrolling into a primary navigation method.
*   **Scroll Boundaries**: Monitors `window.scrollY` to detect when the user hits the absolute top or bottom of a page.
*   **Debounce Logic**: Enforces a `2000ms` cooldown to prevent accidental double-skips.
*   **Wormhole Sequence**:
    1.  **Trigger**: User hits scroll limit.
    2.  **Lock**: Input disabled (`pointer-events: all` on overlay).
    3.  **Engage**: `playWormholeEnter()` spins up the accretion disk visualization.
    4.  **Route**: Background route change occurs while screen is obscured.
    5.  **Disengage**: `playWormholeExit()` collapses the vortex to reveal the new page.

### 3. Visuals & Animations
*   **CSS Architecture**:
    *   `style.css`: Core layout and typography.
    *   `animations.css`: Keyframes for standard entrance effects (`slide-in`, `fade-up`).
    *   `wormhole.css`: Specialized physics simulation for the black hole effect using `conic-gradient` and high-res assets.
*   **Intersection Observer**: `js/utils/animations.js` monitors elements with `.animate-on-scroll` and toggles visibility when they enter the viewport.

## Asset Pipeline
*   **Images**: Stored in `assets/` and `images/`.
*   **Wormhole Asset**: `assets/disk.png` (High-res accretion disk rendering).
*   **Optimization**: Native `loading="lazy"` on images; CSS `will-change` properties for GPU acceleration.

## 4. Deployment Architecture
*   **Dual-Strategy**: Configured for seamless deployment on both GitHub Pages and Vercel.
*   **GitHub Pages**:
    *   Uses `.nojekyll` to bypass Jekyll processing (allowing access to `_` prefixed directories if needed).
    *   Uses `404.html` (copy of `index.html`) to handle client-side routing. When GitHub returns 404 for a specific route (e.g., `/about`), it serves the underlying app which then hydrates the correct view based on the URL.
*   **Vercel**:
    *   Uses `vercel.json` rewrite rules to direct all traffic to `index.html`, ensuring clean URL handling without 404 hacks.

## Directory Structure
```
/
├── index.html            # SPA Shell (Overlay + Nav + Main)
├── 404.html              # SPA Routing Fallback (GitHub Pages)
├── .nojekyll             # GitHub Pages Config
├── vercel.json           # Vercel Config
├── package.json          # Project Metadata & Scripts
├── js/
│   ├── app.js            # Entry point & Router
│   ├── views/            # Individual page components (home, about, etc.)
│   └── utils/
│       ├── scroll-nav.js # Wormhole logic
│       └── ...
├── styles/
│   ├── wormhole.css      # Black hole effects
│   └── ...
└── docs/
    └── Architecture.md   # This file
```
