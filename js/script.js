// Language switching functionality
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update all elements with language data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                const newText = element.getAttribute(`data-${lang}`);
                
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    const placeholderAttr = `data-${lang}-placeholder`;
                    if (element.hasAttribute(placeholderAttr)) {
                        element.placeholder = element.getAttribute(placeholderAttr);
                    }
                } else {
                    element.textContent = newText;
                }
            }
        });
        
        // Update logo text
        const logoText = document.querySelector('.logo-text');
        if (lang === 'en') {
            logoText.textContent = 'UstazTilek';
        } else if (lang === 'kk') {
            logoText.textContent = 'ҰстазТілек';
        } else if (lang === 'ru') {
            logoText.textContent = 'УстазТилек';
        }
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

// Role selection
document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Form submission
document.getElementById('join-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your interest in UstazTilek! We will contact you soon.');
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if(window.innerWidth <= 768) {
                document.querySelector('nav').style.display = 'none';
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth <= 768 && nav.style.display === 'block' && 
        !nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        nav.style.display = 'none';
    }
});
