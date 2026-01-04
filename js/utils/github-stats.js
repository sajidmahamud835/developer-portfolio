/**
 * GitHub Statistics Utility
 * Fetches and caches repository data from GitHub public API
 */

const CACHE_KEY_PREFIX = 'github_stats_';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function getRepoPath(repoUrl) {
    if (!repoUrl || !repoUrl.includes('github.com')) return null;
    return repoUrl.replace('https://github.com/', '').replace(/\/$/, '');
}

export async function getRepoStats(repoUrl) {
    const repoPath = getRepoPath(repoUrl);
    if (!repoPath) return null;

    try {
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
            description: data.description,
            homepage: data.homepage
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

export async function getRepoCommits(repoUrl) {
    const repoPath = getRepoPath(repoUrl);
    if (!repoPath) return [];

    try {
        const cacheKey = CACHE_KEY_PREFIX + 'commits_' + repoPath;

        // Short cache for commits (e.g., 5 mins) to keep it relatively fresh but avoid rate limits
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < 1000 * 60 * 5) { // 5 minutes
                return data;
            }
        }

        const response = await fetch(`https://api.github.com/repos/${repoPath}/commits?per_page=5`);
        if (!response.ok) return [];

        const data = await response.json();

        const commits = data.map(item => ({
            message: item.commit.message,
            date: item.commit.author.date,
            author: item.commit.author.name,
            url: item.html_url
        }));

        localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: commits
        }));

        return commits;
    } catch (error) {
        console.warn('Failed to fetch commits:', error);
        return [];
    }
}
