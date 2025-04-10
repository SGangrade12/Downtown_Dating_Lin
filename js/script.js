// DOM Elements
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const ctaBtn = document.querySelector('.cta-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const showSignupLink = document.getElementById('show-signup');
const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Testimonial slider data
const testimonials = [
    {
        image: 'img/testimonial-1.jpg',
        text: '"We matched on Downtown Dating last year and got engaged last week! Thank you for bringing us together."',
        name: 'John & Sarah'
    },
    {
        image: 'img/testimonial-2.jpg',
        text: '"After trying multiple dating apps, Downtown Dating was the only one that led to meaningful connections."',
        name: 'Michael & Jessica'
    },
    {
        image: 'img/testimonial-3.jpg',
        text: '"The local events feature is amazing! I met my partner at a Downtown Dating mixer last month."',
        name: 'David & Emma'
    }
];

let currentTestimonial = 0;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', openLoginModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeLoginModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // CTA button scrolls to signup form
    if (ctaBtn) {
        ctaBtn.addEventListener('click', scrollToSignup);
    }
    
    // Signup button also scrolls to signup form
    if (signupBtn) {
        signupBtn.addEventListener('click', scrollToSignup);
    }
    
    // Link in login modal to switch to signup form
    if (showSignupLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeLoginModal();
            scrollToSignup();
        });
    }
    
    // Handle form submissions
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Testimonial slider controls
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousTestimonial);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextTestimonial);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .testimonial-card, .download-content, .app-showcase, .form-container')
        .forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
});

// Functions
function openLoginModal() {
    if (loginModal) {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

function closeLoginModal() {
    if (loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function scrollToSignup() {
    const signupSection = document.querySelector('.signup-form');
    if (signupSection) {
        signupSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleRegistration(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const lookingFor = document.getElementById('looking-for').value;
    const password = document.getElementById('password').value;
    
    // In a real application, you would validate the data and send it to a server
    console.log('Registration data:', { name, email, gender, lookingFor, password });
    
    // For this demo, we'll just show a success message
    const form = e.target;
    form.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Registration Successful!</h3>
            <p>Thank you for joining Downtown Dating, ${name}. Check your email to verify your account.</p>
        </div>
    `;
}

function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // In a real application, you would validate credentials with a server
    console.log('Login attempt:', { email, password, rememberMe });
    
    // For this demo, we'll simulate a login
    closeLoginModal();
    
    // Show logged in state (in a real app, you'd update the UI more extensively)
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <img src="img/avatar.jpg" alt="Profile" class="user-avatar">
                <span class="user-name">Hi, User!</span>
                <i class="fas fa-chevron-down"></i>
            </div>
        `;
    }
}

function showPreviousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
}

function showNextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}

function updateTestimonial() {
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard) {
        const testimonial = testimonials[currentTestimonial];
        
        // Create the updated content
        const updatedHTML = `
            <div class="testimonial-img">
                <img src="${testimonial.image}" alt="Testimonial">
            </div>
            <div class="testimonial-content">
                <p>${testimonial.text}</p>
                <h4>${testimonial.name}</h4>
            </div>
        `;
        
        // Apply fade-out animation
        testimonialCard.classList.add('fade-out');
        
        // Update content after fade out and trigger fade in
        setTimeout(() => {
            testimonialCard.innerHTML = updatedHTML;
            testimonialCard.classList.remove('fade-out');
            testimonialCard.classList.add('fade-in');
            
            // Remove fade-in class after animation completes
            setTimeout(() => {
                testimonialCard.classList.remove('fade-in');
            }, 500);
        }, 300);
    }
}

// CSS class for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .fade-in {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .user-menu {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .success-message {
            text-align: center;
            padding: 30px 0;
        }
        
        .success-message i {
            font-size: 60px;
            color: var(--success-color);
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            color: var(--success-color);
            margin-bottom: 10px;
            font-size: 24px;
        }
    </style>
`); 