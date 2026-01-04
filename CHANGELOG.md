# Changelog

All notable changes to the **Developer Portfolio** project will be documented in this file.

## [Unreleased]

## [1.2.0] - 2026-01-05
### Added
- **Services Page**: A new "Services" view inspired by modern freelance platforms (Fiverr-like), featuring a 3-column grid layout, detailed service cards (`gig-card`), and modal previews.
- **Blog Integration**:
  - **Homepage Section**: "Latest Updates" section on the homepage displaying recent blog posts.
  - **Blog Detail View**: Full Markdown support for rendering blog posts dynamically.
  - **Tag & Category System**: Support for filtering content by tags and categories.
- **Project Structure**:
  - `js/data/gig-data.js`: Centralized data store for service gigs.
  - `js/data/portfolio-data.js`: Centralized data store for portfolio projects (extracted from README).
  - `js/data/blog-data.js`: Centralized data store for blog metadata.

### Changed
- **Portfolio Overhaul**:
  - Completely redesigned the portfolio grid to match the visual style of the Services page.
  - Switched to a responsive **2-column grid** (desktop) / 1-column (mobile) for better visual impact.
  - Implemented "Project Cards" with dedicated banner areas, tech stack pills, and "View Details" interactions.
- **Data Architecture**:
  - **Refactor**: Moved away from fetching raw `README.md` content for the portfolio.
  - **Local Modules**: Now using native ES6 modules (`import/export`) for instant data loading and zero network latency for content.
- **Navigation**:
  - Updated `scroll-nav.js` to handle the new routes (`/services`, `/blog`).
  - Improved mobile navigation reactivity.

### Fixed
- **Performance**: Eliminated the layout shift caused by asynchronous Markdown fetching for the main portfolio grid.
- **UI Consistency**: Standardized button styles, gradients, and card shadows across "Home", "Portfolio", and "Services".

## [1.1.0] - 2024-12-28
### Added
- **Wormhole Transition**: Physics-based black hole transition effect using `conic-gradient` and CSS transforms.
- **Auto-Scroll Navigation**: Gesture-based routing that triggers transitions when scrolling past page boundaries.

### Changed
- **Router Logic**: Enhanced `app.js` to support transition lifecycles (`fade-out` -> `wormhole` -> `render` -> `fade-in`).

## [1.0.0] - 2024-01-01
### Initial Release
- Basic SPA skeleton with History API.
- Zero-dependency architecture.
- Core pages: Home, About, Contact.
