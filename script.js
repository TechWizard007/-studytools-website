// StudyTools Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initToolCards();
    
    console.log('StudyTools website loaded successfully!');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (mobileMenuBtn && mobileMenu) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when clicking on links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tool-card, .feature-card, .section-title');
    animatedElements.forEach(el => observer.observe(el));
}

// Tool Cards Interactive Features
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                const toolName = this.querySelector('h3').textContent;
                trackToolClick(toolName);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility Functions

// Track tool clicks for analytics
function trackToolClick(toolName) {
    console.log(`Tool clicked: ${toolName}`);
    // Add your analytics tracking code here
    // Example: gtag('event', 'tool_click', { tool_name: toolName });
}

// Show notification messages
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Add error reporting to your analytics service
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow. Consider optimizing images and scripts.');
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring(); 