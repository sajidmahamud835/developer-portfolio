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

/**
 * Parses detailed project information from README sections
 * Extracts features list and tech stack
 * 
 * @param {string} markdown - Raw markdown content
 * @returns {Object} - Map of project name to details
 */
export function parseProjectDetails(markdown) {
    const details = {};

    // Match sections like: ### 1. EasyCom ... **Features:** - item1 - item2 ... **Tech:** ...
    const sectionRegex = /###\s*\d+\.\s*([^\n]+)\n([\s\S]*?)(?=###\s*\d+\.|## |---|\n\n\n|$)/g;

    let match;
    while ((match = sectionRegex.exec(markdown)) !== null) {
        const name = match[1].trim();
        const content = match[2];

        // Extract features
        const features = [];
        const featureRegex = /-\s*\*\*([^*]+)\*\*:\s*([^\n]+)/g;
        let featureMatch;
        while ((featureMatch = featureRegex.exec(content)) !== null) {
            features.push(`${featureMatch[1]}: ${featureMatch[2].trim()}`);
        }

        // Extract tech stack
        let tech = '';
        const techMatch = content.match(/\*\*Tech:\*\*\s*([^\n|]+)/);
        if (techMatch) {
            tech = techMatch[1].trim();
        }

        // Extract GitHub URL
        let github = '';
        const githubMatch = content.match(/GitHub:\s*\[[^\]]+\]\(([^)]+)\)/);
        if (githubMatch) {
            github = githubMatch[1].trim();
        }

        // Extract description (text after emoji title)
        let description = '';
        const descMatch = content.match(/\*GitHub:[^\n]+\n\n([^\n]+)/);
        if (descMatch) {
            description = descMatch[1].trim();
        }

        details[name] = { features, tech, github, description };
    }

    return details;
}
