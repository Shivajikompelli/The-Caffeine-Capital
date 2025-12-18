// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
        
        // Toggle body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navigation
const nav = document.querySelector('.main-nav');
const hero = document.querySelector('.hero');

if (nav && hero) {
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight * 0.5) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'var(--white)';
            nav.style.backdropFilter = 'none';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-card');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

const lightboxImg = document.createElement('img');
lightboxImg.className = 'lightbox-img';
lightbox.appendChild(lightboxImg);

const lightboxClose = document.createElement('button');
lightboxClose.className = 'lightbox-close';
lightboxClose.innerHTML = '&times;';
lightbox.appendChild(lightboxClose);

if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const bgImage = img.style.backgroundImage;
            const imageUrl = bgImage.replace('url("', '').replace('")', '').replace("url('", '').replace("')", '');
            lightboxImg.src = imageUrl;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form Validation for Contact Page
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Set current year in footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .gallery-item, .menu-item').forEach(el => {
    observer.observe(el);
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease';
    });
    
    // Set initial opacity to 0 for fade-in effect
    if (!img.complete) {
        img.style.opacity = '0';
    }
});