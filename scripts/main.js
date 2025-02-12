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

// PDF Generation
async function generatePDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        
        // Profile Section
        await addProfileSection(doc, pageWidth);
        
        // About Section
        addAboutSection(doc);
        
        // Education Section
        addEducationSection(doc);
        
        // Skills Section
        addSkillsSection(doc);

        doc.save('saugat-panta-portfolio.pdf');
    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert('Error generating PDF. Please try again.');
    }
}

async function addProfileSection(doc, pageWidth) {
    // Profile Image
    const img = document.querySelector('.profile-img');
    if (img?.src) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        doc.addImage(imgData, 'JPEG', (pageWidth-50)/2, 20, 50, 50);
    }

    // Name & Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(document.querySelector('.title-gradient')?.textContent || 'Saugat Panta', 
             pageWidth/2, 90, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.text(document.querySelector('.subtitle')?.textContent || 'Full Stack Developer', 
             pageWidth/2, 100, { align: 'center' });
}

function addAboutSection(doc) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor('#7c3aed');
    doc.text('About Me', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor('#0f172a');
    const aboutText = document.querySelector('.about-text')?.textContent || 
        'Passionate Full Stack Developer with expertise in modern web technologies.';
    doc.splitTextToSize(aboutText, 170).forEach((line, index) => {
        doc.text(line, 20, 30 + (index * 7));
    });
}

function addEducationSection(doc) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor('#7c3aed');
    doc.text('Education', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor('#0f172a');
    const educationItems = Array.from(document.querySelectorAll('.timeline-content'));
    educationItems.forEach((item, index) => {
        const yPos = 30 + (index * 30);
        doc.text(item.querySelector('h3')?.textContent || 'Education Item', 20, yPos);
        doc.text(item.querySelector('p')?.textContent || '', 20, yPos + 7);
        doc.text(item.querySelector('span')?.textContent || '', 20, yPos + 14);
    });
}

function addSkillsSection(doc) {
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor('#7c3aed');
    doc.text('Technical Skills', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor('#0f172a');
    const skills = Array.from(document.querySelectorAll('.skill-card'));
    skills.forEach((skill, index) => {
        const yPos = 30 + (index * 20);
        doc.text(`• ${skill.querySelector('h3')?.textContent || 'Skill'}`, 20, yPos);
        doc.text(skill.querySelector('p')?.textContent || '', 25, yPos + 7);
    });
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