/**
 * Theme Manager
 * Handles Dark/Light mode toggling and persistence
 */

const ThemeManager = {
    // Keys
    STORAGE_KEY: 'theme',
    DARK: 'dark',
    LIGHT: 'light',

    init() {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let initialTheme = this.DARK; // Default to dark as per requirements

        if (savedTheme) {
            initialTheme = savedTheme;
        }

        // Apply initial theme
        this.applyTheme(initialTheme);

        // Return current theme for UI sync
        return initialTheme;
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || this.DARK;
        const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;

        this.applyTheme(newTheme);
        return newTheme;
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);

        // Dispatch event for other components if needed
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    },

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || this.DARK;
    }
};

export default ThemeManager;
