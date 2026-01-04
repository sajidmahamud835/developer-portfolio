/**
 * GitHub Statistics Utility
 * Fetches and caches repository data from GitHub public API
 */

const CACHE_KEY_PREFIX = 'github_stats_';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getRepoStats(repoUrl) {
    if (!repoUrl || !repoUrl.includes('github.com')) return null;

    try {
        const repoPath = repoUrl.replace('https://github.com/', '').replace(/\/$/, '');
        const cacheKey = CACHE_KEY_PREFIX + repoPath;

        // Check cache
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }

        // Fetch fresh data
        const response = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (!response.ok) throw new Error('GitHub API Error');

        const data = await response.json();
        const stats = {
            stars: data.stargazers_count,
            forks: data.forks_count,
            language: data.language,
            description: data.description // handy if we want to fallback
        };

        // Cache it
        localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: stats
        }));

        return stats;

    } catch (error) {
        console.warn('Failed to fetch GitHub stats:', error);
        return null;
    }
}
