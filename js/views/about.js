/**
 * About View
 * Experience timeline and skills showcase
 */

export function render() {
    return `
        <section id="about" class="about-hero">
            <div class="container">
                <h1 class="section-title slide-up">About Me</h1>
                <p class="section-subtitle">Full Stack Developer with a passion for creating beautiful, functional web experiences.</p>
            </div>
        </section>

        <section id="experience" class="animate-on-scroll">
            <div class="container">
                <h2>Experience</h2>
                <div class="timeline">
                    <div class="timeline-item border-style-1 hover-lift stagger-1">
                        <h3>Full Stack Web Developer</h3>
                        <span class="timeline-date text-orange">2020 - Present</span>
                        <p>
                            Mastered the MERN Stack (MongoDB, Express, React, Node.js). 
                            Specializing in responsive frontends and scalable backends.
                            Experienced with Vue.js, deployment, and security best practices.
                        </p>
                    </div>
                    
                    <div class="timeline-item border-style-2 hover-lift stagger-2">
                        <h3>Freelance Web Developer</h3>
                        <span class="timeline-date text-orange">2019 - 2020</span>
                        <p>
                            Built complete websites for clients using HTML, CSS, Bootstrap, 
                            JavaScript, PHP, and MySQL. Specialized in Laravel projects.
                            Grew a team to deliver higher quality service.
                        </p>
                    </div>
                    
                    <div class="timeline-item border-style-3 hover-lift stagger-3">
                        <h3>WordPress Theme Developer</h3>
                        <span class="timeline-date text-orange">2015 - 2019</span>
                        <p>
                            Self-taught HTML and CSS for theme customization. Extended to PHP
                            for custom plugins. Specialized in e-commerce websites with WooCommerce.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="skills" class="animate-on-scroll">
            <div class="container">
                <h2>Skills & Technologies</h2>
                <div class="skills-grid grid">
                    <div class="skill-card hover-lift">
                        <div class="skill-icon">🎨</div>
                        <h4>Frontend</h4>
                        <p>React, Vue, HTML5, CSS3, Tailwind</p>
                    </div>
                    <div class="skill-card hover-lift">
                        <div class="skill-icon">⚙️</div>
                        <h4>Backend</h4>
                        <p>Node.js, Express, PHP, Laravel</p>
                    </div>
                    <div class="skill-card hover-lift">
                        <div class="skill-icon">🗄️</div>
                        <h4>Database</h4>
                        <p>MongoDB, MySQL, PostgreSQL</p>
                    </div>
                    <div class="skill-card hover-lift">
                        <div class="skill-icon">🚀</div>
                        <h4>DevOps</h4>
                        <p>Git, Docker, Vercel, AWS</p>
                    </div>
                    <div class="skill-card hover-lift">
                        <div class="skill-icon">📱</div>
                        <h4>Mobile</h4>
                        <p>React Native, Expo</p>
                    </div>
                    <div class="skill-card hover-lift">
                        <div class="skill-icon">🤖</div>
                        <h4>AI/ML</h4>
                        <p>OpenAI API, LangChain</p>
                    </div>
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
