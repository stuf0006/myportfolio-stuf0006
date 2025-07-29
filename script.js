document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = navLinks.querySelectorAll("a");
    const form = document.getElementById("contact-form");
    const projectCards = document.querySelectorAll(".project-card");

    // Hamburger menu toggle with accessibility
    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle("show");
        hamburger.setAttribute("aria-expanded", isOpen);
        hamburger.textContent = isOpen ? "✕" : "☰";
        if (isOpen) {
            navItems[0].focus();
        }
    };

    // Toggle menu on hamburger click
    hamburger.addEventListener("click", toggleMenu);

    // Toggle menu on Enter/Space key for accessibility
    hamburger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.textContent = "☰";
        }
    });

    // Smooth scrolling for navigation links
    navItems.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                if (navLinks.classList.contains("show")) {
                    navLinks.classList.remove("show");
                    hamburger.setAttribute("aria-expanded", "false");
                    hamburger.textContent = "☰";
                }
            }
        });
    });

    // Contact form submission with validation
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const message = document.getElementById("message").value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!name || !email || !message) {
                    alert("Please fill out all fields.");
                    return;
                }

                if (!emailRegex.test(email)) {
                    alert("Please enter a valid email address.");
                    document.getElementById("email").focus();
                    return;
                }

                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                form.reset();
                document.getElementById("name").focus();
            } catch (error) {
                console.error("Form submission error:", error);
                alert("An error occurred. Please try again later.");
            }
        });
    }

    // Lazy load videos when they come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target.querySelector("video");
                if (video) {
                    video.load();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});