/**
 * Blog Detail View - Markdown Rendering
 */

import { blogPosts } from '../data/blog-data.js';
import { parseMarkdown } from '../utils/markdown.js';

export async function render(postId) {
    // Extract ID from URL if not passed (router handling varies)
    if (!postId) {
        const params = new URLSearchParams(window.location.search);
        postId = params.get('id');
    }

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return `
            <div class="container" style="text-align:center; padding: 100px 0;">
                <h1>Article Not Found</h1>
                <a href="?route=blog" onclick="route(event)" class="anchor-button button-bg-primary">Back to Blog</a>
            </div>
        `;
    }

    let htmlContent = '';
    try {
        const response = await fetch(post.contentPath);
        if (response.ok) {
            const markdown = await response.text();
            htmlContent = parseMarkdown(markdown);
        } else {
            console.error('Failed to load markdown content');
            htmlContent = '<p>Error loading article content.</p>';
        }
    } catch (error) {
        console.error('Error fetching markdown:', error);
        htmlContent = '<p>Error loading article content.</p>';
    }

    return `
        <article class="blog-post-page">
            <!-- Hero -->
            <div class="blog-hero" style="background: linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary)); padding: 60px 0 40px;">
                <div class="container text-center">
                    <span class="badge" style="background:var(--accent-primary); color:white; padding:4px 12px; border-radius:20px;">${post.tags[0]}</span>
                    <h1 style="margin: 20px 0; font-size: 2.5rem; line-height: 1.2;">${post.title}</h1>
                    <div class="meta" style="opacity:0.8;">
                        <span>📅 ${post.date}</span> • <span>⏱️ ${post.readTime} read</span>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="container" style="max-width: 800px; margin-top: 40px;">
                <div class="blog-content markdown-body">
                    <img src="${post.image}" alt="${post.title}" style="width:100%; height:300px; object-fit:cover; border-radius:12px; margin-bottom:40px;">
                    ${htmlContent}
                </div>

                <!-- Footer / Share -->
                <div class="blog-footer" style="padding: 40px 0; border-top: 1px solid var(--border-light); margin-top: 60px; text-align:center;">
                    <h3>Enjoyed this article?</h3>
                    <p style="margin-bottom:20px;">Check out my services to see how I can help you implement this.</p>
                    <a href="?route=services" onclick="route(event)" class="anchor-button button-bg-primary">View Services</a>
                    <a href="?route=blog" onclick="route(event)" class="anchor-button button-bg-secondary">Back to Blog</a>
                </div>
            </div>
        </article>
    `;
}

export function init() {
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });
}
