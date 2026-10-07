// SPA Page Content
const pages = {
    "/": `
        <section class="page">
            <div class="hero">
                <h1>Welcome to MySPA</h1>
                <p>A simple Single Page Application built with HTML, CSS and JavaScript.</p>
                <a href="/services" data-link class="btn">Explore Services</a>
            </div>
        </section>
    `,

    "/about": `
        <section class="page">
            <h1>About Us</h1>
            <p>
                This project demonstrates how a Single Page Application
                can dynamically change content without refreshing the browser.
            </p>

            <div class="cards">
                <article class="card">
                    <h2>⚡ Fast</h2>
                    <p>Content changes instantly without full page reloads.</p>
                </article>

                <article class="card">
                    <h2>🔗 Routing</h2>
                    <p>Browser URLs are updated using the History API.</p>
                </article>

                <article class="card">
                    <h2>📱 Responsive</h2>
                    <p>The interface works on desktop, tablet and mobile.</p>
                </article>
            </div>
        </section>
    `,

    "/services": `
        <section class="page">
            <h1>Our Services</h1>
            <p>Explore the services provided by our SPA.</p>

            <div class="cards">
                <article class="card">
                    <h2>🌐 Web Design</h2>
                    <p>Modern and responsive website interfaces.</p>
                    <button class="btn service-btn">Learn More</button>
                </article>

                <article class="card">
                    <h2>💻 Development</h2>
                    <p>Interactive applications using JavaScript.</p>
                    <button class="btn service-btn">Learn More</button>
                </article>

                <article class="card">
                    <h2>🚀 Performance</h2>
                    <p>Fast and efficient web experiences.</p>
                    <button class="btn service-btn">Learn More</button>
                </article>
            </div>
        </section>
    `,

    "/contact": `
        <section class="page">
            <h1>Contact Us</h1>
            <p>Send us a message using the form below.</p>

            <form class="contact-form" id="contactForm">

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        required
                    ></textarea>
                </div>

                <button type="submit" class="btn">
                    Send Message
                </button>

                <p id="formMessage" class="message"></p>

            </form>
        </section>
    `
};


// Load page content
function loadPage(path) {

    // Check whether requested route exists
    if (!pages[path]) {
        document.getElementById("app").innerHTML = `
            <section class="page">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <a href="/" data-link class="btn">Go Home</a>
            </section>
        `;

        updateActiveLink("");
        return;
    }

    // Dynamically insert content
    document.getElementById("app").innerHTML = pages[path];

    // Update active navigation
    updateActiveLink(path);

    // Contact form functionality
    setupContactForm();

    // Service button functionality
    setupServiceButtons();
}


// Handle navigation
document.addEventListener("click", function(event) {

    const link = event.target.closest("[data-link]");

    if (!link) {
        return;
    }

    event.preventDefault();

    const path = link.getAttribute("href");

    // Change browser URL without page reload
    history.pushState({}, "", path);

    // Load new content
    loadPage(path);
});


// Browser Back / Forward buttons
window.addEventListener("popstate", function() {

    const path = window.location.pathname;

    loadPage(path);

});


// Highlight active navigation link
function updateActiveLink(path) {

    document.querySelectorAll(".nav-links a").forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === path) {
            link.classList.add("active");
        }

    });
}


// Contact form
function setupContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");

        if (name === "" || email === "" || message === "") {

            formMessage.textContent =
                "Please fill in all fields.";

            return;
        }

        formMessage.textContent =
            "Thank you! Your message has been submitted successfully.";

        form.reset();
    });
}


// Service buttons
function setupServiceButtons() {

    const buttons = document.querySelectorAll(".service-btn");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            button.textContent = "Added ✓";

            setTimeout(function() {
                button.textContent = "Learn More";
            }, 1500);

        });

    });
}


// Dark mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }

});


// Dynamic year
document.getElementById("year").textContent =
    new Date().getFullYear();


// Load initial page
loadPage(window.location.pathname);