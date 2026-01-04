# 👨‍💻 Web Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://sajidmahamud835.github.io/developer-portfolio/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsajidmahamud835%2Fdeveloper-portfolio)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Zero-Dependency Single Page Application (SPA)** demonstrating mastery of core web technologies. Features a custom-built client-side router, physics-based "wormhole" transitions, and complex scroll-driven animations—all built with **Pure HTML5, CSS3, and Vanilla JavaScript** (No Frameworks).

**🔗 Live Demo:** [GitHub Pages](https://sajidmahamud835.github.io/developer-portfolio/) | [Vercel Deployment](https://developer-portfolio-sajidmahamud835.vercel.app/)

## 🏗️ Architecture & Design

This project follows a **Zero-Dependency** philosophy, proving that modern, dynamic web applications can be built without the overhead of heavy frameworks like React or Angular.

### 🧩 Core Components
- **Custom Router**: A lightweight client-side router using the generic History API to manage navigation states without page reloads.
- **Local Data Modules**: All content (Portfolio, Services, Blog) is served instantaneously from local ES6 data modules, ensuring <50ms interaction times.
- **Physics Engine**: Custom `wormhole.css` and JavaScript logic simulating a black hole accretion disk with gravitational distortion effects.
- **Scroll Navigation**: A unique gesture-based navigation system that triggers "wormhole travel" when users scroll past page boundaries.

### 🛠️ Tools & Technologies used
| Category | Technology | Usage |
|----------|------------|-------|
| **Core** | HTML5, CSS3, ES6+ JS | Semantic structure, styling, and application logic. |
| **Data** | ES6 Modules | Local JSON-like data structures for instant content loading. |
| **Animation** | CSS Keyframes, JS Observers | High-performance 60fps animations and scroll-triggered reveals. |
| **Physics** | CSS Transforms, Conic Gradients | Simulating the black hole visual effects (`wormhole.css`). |
| **Integrations**| Formspree, Markdown Parser | Serverless form handling and dynamic content rendering. |

## ✨ Visual Features
- **Wormhole Transitions**: A dramatic, full-screen transition effect simulating interstellar travel when changing routes.
- **Glassmorphism**: Modern UI aesthetic with frosted glass backgrounds and subtle gradients.
- **Interactive Cards**: Premium, hover-responsive cards for Projects and Services with physics-based lift effects.
- **Mobile First**: Fully responsive design with a dedicated bottom navigation bar for mobile users.

## 🚀 Usage

Since this is a static site, you can simply open `index.html` in your browser or serve it with any static server.

```bash
git clone https://github.com/sajidmahamud835/developer-portfolio.git
cd developer-portfolio
# Serve with any static server (e.g., Live Server, Vercel CLI, python http.server)
vercel dev
```

## 🏷️ Repository Tags
`portfolio` `spa` `vanilla-js` `no-framework` `css-animations` `web-design` `interactive` `physics-engine` `black-hole`
