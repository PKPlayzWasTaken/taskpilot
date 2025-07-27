// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Get Started Button
const getStartedBtn = document.getElementById('get-started-btn');
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const descriptionSection = document.getElementById('description');
        if (descriptionSection) {
            descriptionSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Expandable Feature Card
const expandBtn = document.getElementById('expand-btn');
const expandableFeature = document.getElementById('expandable-feature');
const expandedContent = document.getElementById('expanded-content');
const expandText = document.querySelector('.expand-text');

if (expandBtn && expandableFeature && expandedContent && expandText) {
    expandBtn.addEventListener('click', () => {
        const isExpanded = expandableFeature.classList.contains('expanded');
        
        if (isExpanded) {
            expandableFeature.classList.remove('expanded');
            expandText.textContent = 'Learn More';
        } else {
            expandableFeature.classList.add('expanded');
            expandText.textContent = 'Show Less';
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.querySelector('.form-submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        if (submitBtn && btnText && btnLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate API call (replace with actual API endpoint)
        try {
            await simulateFormSubmission(formObject);
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            if (submitBtn && btnText && btnLoading) {
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        }
    });
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form submitted with data:', data);
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

// Form Validation
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#d1d5db';
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    return isValid;
}

// Real-time form validation
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', validateForm);
    field.addEventListener('input', () => {
        if (field.value.trim()) {
            field.style.borderColor = '#d1d5db';
        }
    });
});

// Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .feature-card-detailed, .stat-item, .faq-item, .contact-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth reveal for stats on home page
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Enhanced hover effects for feature cards
document.querySelectorAll('.feature-card, .feature-card-detailed').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Collapse expanded feature if open
        if (expandableFeature && expandableFeature.classList.contains('expanded')) {
            expandableFeature.classList.remove('expanded');
            expandText.textContent = 'Learn More';
        }
    }
});

// Page load performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
    
    // Add loading states
    document.body.classList.add('loaded');
});

// Accessibility improvements
document.querySelectorAll('button, .cta-button, .secondary-button').forEach(button => {
    button.addEventListener('focus', () => {
        button.style.outline = '3px solid #3b82f6';
        button.style.outlineOffset = '2px';
    });
    
    button.addEventListener('blur', () => {
        button.style.outline = 'none';
    });
});

// Error handling for missing elements
function safelyExecute(callback) {
    try {
        callback();
    } catch (error) {
        console.warn('Non-critical error:', error.message);
    }
}

// Initialize page-specific functionality
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

safelyExecute(() => {
    switch (currentPage) {
        case 'index.html':
        case '':
            console.log('Home page loaded');
            break;
        case 'features.html':
            console.log('Features page loaded');
            break;
        case 'contact.html':
            console.log('Contact page loaded');
            break;
        default:
            console.log('Page loaded:', currentPage);
    }
});