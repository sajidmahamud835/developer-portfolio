/**
 * Markdown Parser Utility
 * Simple parser for rendering markdown content to HTML.
 * Supports: Headers, Bold, Italic, Links, Blockquotes, Unordered Lists.
 */

export function parseMarkdown(markdown) {
    if (!markdown) return '';

    let html = markdown;

    // Headers (h1 - h3)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Unordered Lists
    html = html.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
    // Fix nested ULs (quick hack for simple lists)
    html = html.replace(/<\/ul>\n<ul>/gim, '');

    // Line breaks (paragraph)
    // Double newlines to paragraphs
    html = html.replace(/\n\n/gim, '</p><p>');

    // Wrap in initial paragraph if not starting with tag
    if (!html.trim().startsWith('<')) {
        html = '<p>' + html + '</p>';
    }

    return html;
}

/**
 * Parse Central README for Projects
 * Extracts h3 headers and descriptions
 */
export function parseProjects(markdown) {
    if (!markdown) return [];

    // Simple regex to find "### [Name](link) - Description" or similar patterns
    // This is a naive implementation to support the demo.
    // In a real scenario, use a proper AST parser.
    // Assuming format: ### [Title](url) \n Description

    const projects = [];
    const lines = markdown.split('\n');

    let currentProject = null;

    lines.forEach(line => {
        const headerMatch = line.match(/^###\s+\[(.*?)\]\((.*?)\)/);
        if (headerMatch) {
            if (currentProject) projects.push(currentProject);
            currentProject = {
                name: headerMatch[1],
                url: headerMatch[2],
                description: '',
                language: 'Unknown'
            };
        } else if (currentProject && line.trim()) {
            if (!currentProject.description) {
                currentProject.description = line.trim();
            }
        }
    });

    if (currentProject) projects.push(currentProject);
    return projects;
}

/**
 * Parse Project Details (Features, Tech Stack) from generic markdown
 */
export function parseProjectDetails(markdown) {
    // Return empty map for now as fallback
    return {};
}
