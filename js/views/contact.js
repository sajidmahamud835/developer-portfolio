/**
 * Contact View
 * Two columns: Calendly + Links | Form below
 */

export function render() {
    return `
        <section id="contact">
            <div class="container">
                <h1 class="section-title slide-up">Get In Touch</h1>
                <p class="section-subtitle">Book a call or send me a message!</p>
                
                <!-- Two Column Layout: Calendly + Links -->
                <div class="contact-top flex animate-on-scroll">
                    <!-- Calendly Column -->
                    <div class="contact-column half-width">
                        <h3>📅 Schedule a Meeting</h3>
                        <p>Pick a time that works for you:</p>
                        <iframe 
                            src="https://calendly.com/sajidmahamud835/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=333333&primary_color=ff6347"
                            width="100%" 
                            height="600" 
                            frameborder="0"
                            style="border-radius: 12px; min-height: 600px;">
                        </iframe>
                    </div>

                    <!-- Links Column -->
                    <div class="contact-column half-width">
                        <h3>🔗 Connect With Me</h3>
                        <p>Find me on these platforms:</p>
                        
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

                <!-- Contact Form Below -->
                <div class="contact-form-section animate-on-scroll">
                    <h3>✉️ Send a Message</h3>
                    <form id="contact-form" class="contact-form" action="https://formspree.io/f/mrebodkz" method="POST">
                        <div class="form-row flex">
                            <div class="form-group half-width">
                                <label for="name">Your Name</label>
                                <input type="text" id="name" name="name" required placeholder="John Doe">
                            </div>
                            <div class="form-group half-width">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" required placeholder="john@example.com">
                            </div>
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
                </div>
            </div>
        </section>
    `;
}

export function init() {
    import('../utils/animations.js').then(module => {
        module.observeElements();
    });
}
