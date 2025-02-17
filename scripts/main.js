// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    activateSection('home');
    initScrollAnimations();
    setupEventListeners();
    initMobileMenu();
}

// Section Management
function activateSection(sectionId) {
    document.querySelectorAll('.section, .nav-item').forEach(el => {
        el.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);

    if (targetSection && targetNavItem) {
        targetSection.classList.add('active');
        targetNavItem.classList.add('active');
    }
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.dataset.section;
            handleNavigation(targetSection);
        });
    });

    // Contact Modal
    document.querySelector('.hire-btn')?.addEventListener('click', showContactModal);
    document.querySelector('.close-btn')?.addEventListener('click', hideContactModal);
    
    // Window Events
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleOutsideClick);
}

function handleNavigation(sectionId) {
    activateSection(sectionId);
    smoothScrollToSection(sectionId);
}

// Smooth Scroll
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact Modal
function showContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal Handlers
function handleEscapeKey(e) {
    if (e.key === 'Escape') hideContactModal();
}

function handleOutsideClick(e) {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) hideContactModal();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .timeline-item, .achievement-card')
        .forEach(el => observer.observe(el));
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.bottom-nav').classList.toggle('active');
        });
    }
}
