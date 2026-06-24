// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Initialize Theme
const currentTheme = localStorage.getItem('theme') || 'dark'; // Dark is now default
if (currentTheme === 'light') {
    themeIcon.classList.replace('ph-sun', 'ph-moon'); // Shows moon in light mode
} else {
    themeIcon.classList.replace('ph-moon', 'ph-sun'); // Shows sun in dark mode
}

themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle Icon with Animation
    themeIcon.style.transform = 'rotate(180deg) scale(0.5)';
    themeIcon.style.opacity = '0';
    
    setTimeout(() => {
        if (newTheme === 'dark') {
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        } else {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }
        themeIcon.style.transform = 'rotate(0deg) scale(1)';
        themeIcon.style.opacity = '1';
    }, 200);
});

// Icon transition styles
themeIcon.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        icon.classList.replace('ph-x', 'ph-list');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in & Staggered Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Look for targets that need staggered slide up animation inside this section
            const staggeredTargets = entry.target.querySelectorAll('.slide-up-anim-target');
            staggeredTargets.forEach((target, index) => {
                target.style.animationDelay = `${index * 0.15}s`;
                target.classList.add('slide-up-anim');
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
