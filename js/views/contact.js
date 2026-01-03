/**
 * Contact View
 * Contact form and social links
 */

export function render() {
    return `
        <section id="contact">
            <div class="container">
                <h1 class="section-title slide-up">Get In Touch</h1>
                <p class="section-subtitle">Have a project in mind? Let's talk!</p>
                
                <div class="contact-wrapper flex">
                    <div class="contact-form-container half-width animate-on-scroll">
                        <form id="contact-form" class="contact-form">
                            <div class="form-group">
                                <label for="name">Your Name</label>
                                <input type="text" id="name" name="name" required placeholder="John Doe">
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" required placeholder="john@example.com">
                            </div>
                            
                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input type="text" id="subject" name="subject" required placeholder="Project Inquiry">
                            </div>
                            
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" rows="5" required placeholder="Tell me about your project..."></textarea>
                            </div>
                            
                            <button type="submit" class="anchor-button button-bg-primary hover-lift">
                                Send Message
                            </button>
                        </form>
                        
                        <div id="form-status" class="form-status"></div>
                    </div>
                    
                    <div class="contact-info half-width animate-on-scroll">
                        <h3>Connect With Me</h3>
                        <p>Feel free to reach out through any of these channels:</p>
                        
                        <ul class="social-links">
                            <li class="hover-lift">
                                <a href="https://github.com/sajidmahamud835" target="_blank" rel="noopener noreferrer">
                                    <span class="social-icon">💻</span>
                                    <span>GitHub</span>
                                </a>
                            </li>
                            <li class="hover-lift">
                                <a href="https://linkedin.com/in/sajidmahamud835" target="_blank" rel="noopener noreferrer">
                                    <span class="social-icon">💼</span>
                                    <span>LinkedIn</span>
                                </a>
                            </li>
                            <li class="hover-lift">
                                <a href="https://www.mql5.com/en/users/sajidmahamud835" target="_blank" rel="noopener noreferrer">
                                    <span class="social-icon">📈</span>
                                    <span>MQL5 Market</span>
                                </a>
                            </li>
                            <li class="hover-lift">
                                <a href="mailto:contact@sajidmahamud.dev">
                                    <span class="social-icon">✉️</span>
                                    <span>Email</span>
                                </a>
                            </li>
                        </ul>
                        
                        <div class="availability-badge">
                            <span class="status-dot"></span>
                            Currently available for freelance work
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function init() {
    // Import animations
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });

    // Handle form submission
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission (replace with actual endpoint)
            status.innerHTML = '<p class="success">Thanks for your message! I\'ll get back to you soon.</p>';
            status.classList.add('fade-in');
            form.reset();

            // In production, you would send this to an API:
            // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            console.log('Form submitted:', data);
        });
    }
}
