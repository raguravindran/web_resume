// Simple direct implementation of theme toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme toggle');
    
    // Get DOM elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    
    if (!themeToggleBtn) {
        console.error('Theme toggle button not found');
        return;
    }
    
    console.log('Theme toggle button found');
    
    // Apply theme function
    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (darkIcon) darkIcon.style.display = 'none';
            if (lightIcon) lightIcon.style.display = 'inline-block';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (darkIcon) darkIcon.style.display = 'inline-block';
            if (lightIcon) lightIcon.style.display = 'none';
        }
    }
    
    // Check for saved preference
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply initial theme
    applyTheme(isDarkMode);
    console.log('Initial theme applied:', isDarkMode ? 'dark' : 'light');
    
    // Toggle theme on click
    themeToggleBtn.addEventListener('click', function() {
        console.log('Theme toggle button clicked');
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyTheme(isDarkMode);
        console.log('Theme toggled to:', isDarkMode ? 'dark' : 'light');
    });


    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll behavior
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add animation for elements when they enter the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
});
