// Check for reduced motion preference
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header scroll behavior
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

if (!reduceMotion) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollY = window.scrollY;
    });
}

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', 
            mobileToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
}

// Testimonial slider
const testimonialTrack = document.querySelector('.testimonials-track');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');
let currentTestimonial = 0;

if (testimonialTrack && testimonialDots.length && prevBtn && nextBtn) {
    function showTestimonial(index) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        testimonialDots[index].classList.add('active');
        
        currentTestimonial = index;
    }

    // Navigation events
    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonialDots.length - 1;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialDots.length) newIndex = 0;
        showTestimonial(newIndex);
    });

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-advance if not reduced motion
    if (!reduceMotion) {
        setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonialDots.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 4500);
    }
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Number counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const bioStatNumbers = document.querySelectorAll('.bio-stat-number');
const counterNumber = document.querySelector('.counter-number');

if (statNumbers.length && !reduceMotion) {
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'));
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        number.textContent = '0';
        observer.observe(number);
    });
    
    // Bio stats counter
    if (bioStatNumbers.length) {
        bioStatNumbers.forEach(number => {
            number.textContent = '0';
            observer.observe(number);
        });
    }
    
    // Projects counter
    if (counterNumber) {
        counterNumber.textContent = '0';
        observer.observe(counterNumber);
    }
}

// Magnetic button effect
const buttons = document.querySelectorAll('.btn');
const socialLinks = document.querySelectorAll('.social-link');

if (!reduceMotion) {
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width / 2) / 8;
            const dy = (e.clientY - rect.top - rect.height / 2) / 8;
            btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // Social links magnetic effect
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width / 2) / 4;
            const dy = (e.clientY - rect.top - rect.height / 2) / 4;
            link.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

// Element reveal on scroll
const revealElements = document.querySelectorAll('.hero-text h1, .hero-text p, .hero-cta, .hero-stats, .hero-visual, .about-text, .about-visual, .project-filters, .project-card, .testimonial, .blog-card, .cta-content, .footer-brand, .footer-links h4, .footer-contact h4, .footer-nav li, .contact-info li, .skill-progress, .timeline-content');

if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('inview');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = `${width}%`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Cube hover effect
const cubes = document.querySelectorAll('.cube');

if (cubes.length && !reduceMotion) {
    cubes.forEach(cube => {
        cube.addEventListener('mousemove', (e) => {
            const rect = cube.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / centerX * 5;
            const rotateX = (centerY - y) / centerY * 5;
            
            cube.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.transform = '';
        });
    });
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate subject
        if (subject === '') {
            document.getElementById('subjectError').textContent = 'Subject is required';
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For this example, we'll just show a success message
            contactForm.reset();
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                contactForm.style.display = 'block';
            }, 5000);
        }
    });
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[极 0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// Initialize map
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Coordinates for Pakistan, Punjab, Phool Nagar
    const myLocation = [30.9333, 73.7667];
    
    // Create map
    const map = L.map('map').setView(myLocation, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker
    L.marker(myLocation)
        .addTo(map)
        .bindPopup('Muhammad Haroon<br>Pakistan, Punjab, Phool Nagar')
        .openPopup();
}

// Initialize map when page loads
if (document.getElementById('map')) {
    // Load Leaflet JS dynamically if not already loaded
    if (typeof L === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
        script.crossOrigin = '';
        script.onload = initMap;
        document.head.appendChild(script);
    } else {
        initMap();
    }
}