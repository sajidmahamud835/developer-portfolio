/**
 * Markdown Parser Utilities
 * Parses project data from the central README.md file
 */

/**
 * Parses the project overview table from the README markdown
 * Extracts project name, URL, language, and description from table rows
 * 
 * @param {string} markdown - Raw markdown content
 * @returns {Array<{name: string, url: string, language: string, description: string}>}
 */
export function parseProjects(markdown) {
    const projects = [];

    // Match table rows that contain project links
    // Format: | **[Name](url)** <br> ... | Stars | Forks | Language | Description |
    const tableRowRegex = /\|\s*\*\*\[([^\]]+)\]\(([^)]+)\)\*\*[^|]*\|[^|]*\|[^|]*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g;

    let match;
    while ((match = tableRowRegex.exec(markdown)) !== null) {
        const name = match[1].trim();
        const url = match[2].trim();
        const language = match[3].trim();
        const description = cleanDescription(match[4].trim());

        // Skip header row
        if (name === 'Project' || language === 'Language') continue;

        projects.push({ name, url, language, description });
    }

    // If table parsing fails, try alternative format
    if (projects.length === 0) {
        return parseAlternativeFormat(markdown);
    }

    return projects;
}

/**
 * Alternative parser for different README formats
 * Looks for linked project headings
 * 
 * @param {string} markdown - Raw markdown content
 * @returns {Array}
 */
function parseAlternativeFormat(markdown) {
    const projects = [];

    // Match headers like: ### 1. EasyCom or **[Project Name](url)**
    const headerRegex = /###\s*\d+\.\s*([^\n]+)\n\*\*[^*]*\*\*\n\*GitHub:\s*\[([^\]]+)\]\(([^)]+)\)\*/g;

    let match;
    while ((match = headerRegex.exec(markdown)) !== null) {
        projects.push({
            name: match[1].trim(),
            url: match[3].trim(),
            language: 'Various',
            description: match[2].trim()
        });
    }

    return projects;
}

/**
 * Cleans up description text
 * Removes markdown formatting and HTML entities
 * 
 * @param {string} text - Raw description text
 * @returns {string} - Clean description
 */
function cleanDescription(text) {
    return text
        .replace(/\*\*/g, '')           // Remove bold markers
        .replace(/`[^`]+`/g, '')        // Remove inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
        .replace(/&amp;/g, '&')         // Decode HTML entities
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/<br\s*\/?>/g, ' ')    // Replace <br> with space
        .trim();
}

/**
 * Fetches README content from a URL
 * 
 * @param {string} url - Raw GitHub URL
 * @returns {Promise<string>} - README content
 */
export async function fetchReadme(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch README: ${response.status}`);
    }
    return response.text();
}
