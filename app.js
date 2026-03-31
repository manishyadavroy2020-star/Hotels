// app.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('bg-black/80', 'backdrop-blur-md', 'shadow-lg', 'py-4');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // Open menu
            mobileMenu.classList.remove('translate-x-full');
            mobileBtn.innerHTML = '<i class="ph ph-x text-3xl"></i>';
            // Stagger animate links
            gsap.to(mobileLinks, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.2
            });
        } else {
            // Close menu
            mobileMenu.classList.add('translate-x-full');
            mobileBtn.innerHTML = '<i class="ph ph-list text-3xl"></i>';
            gsap.to(mobileLinks, {
                y: 20,
                opacity: 0,
                duration: 0.3
            });
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('translate-x-full');
            mobileBtn.innerHTML = '<i class="ph ph-list text-3xl"></i>';
            gsap.set(mobileLinks, { y: 20, opacity: 0 });
        });
    });

    // --- 3. GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Reveal Sequence
    const heroTl = gsap.timeline();
    heroTl.from(".hero-reveal", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });

    // Hero Parallax Effect
    gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Generic Scroll Reveals
    const revealLefts = document.querySelectorAll('.reveal-left');
    revealLefts.forEach(el => {
        gsap.from(el, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    const revealRights = document.querySelectorAll('.reveal-right');
    revealRights.forEach(el => {
        gsap.from(el, {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    const revealUps = document.querySelectorAll('.reveal-up');
    revealUps.forEach(el => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // --- 4. Testimonials Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testi-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('testi-active', 'opacity-100');
            slide.classList.add('opacity-0', 'pointer-events-none');
        });
        dots.forEach(dot => dot.classList.remove('testi-btn-active', 'bg-gold'));
        dots.forEach(dot => dot.classList.add('bg-white/20'));
        
        slides[n].classList.remove('opacity-0', 'pointer-events-none');
        slides[n].classList.add('testi-active', 'opacity-100');
        dots[n].classList.add('testi-btn-active', 'bg-gold');
        dots[n].classList.remove('bg-white/20');
        currentSlide = n;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto rotate
    setInterval(() => {
        let n = currentSlide + 1;
        if (n >= slides.length) n = 0;
        showSlide(n);
    }, 5000);

    // --- 5. Booking Form WhatsApp Integration ---
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capture data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const roomPref = document.getElementById('roomPref').value;
        const roomsCount = document.getElementById('rooms').value;
        
        // Format dates beautifully
        const ci = new Date(checkin).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const co = new Date(checkout).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

        // Generate WhatsApp Message String
        const message = `*Hello Kohinoor Hotel!* %0A%0AI would like to place a reservation request. Here are my details: %0A%0A*Name:* ${name} %0A*Contact:* ${phone} %0A*Email:* ${email} %0A%0A*Room Preference:* ${roomPref} %0A*No. of Rooms:* ${roomsCount} %0A*Check-in:* ${ci} %0A*Check-out:* ${co} %0A*Guests:* ${adults} Adults, ${children} Children. %0A%0APlease let me know the availability and confirm my booking.`;
        
        // Target WhatsApp Number (Provided by user)
        const waNumber = '917029194654';
        const waUrl = `https://wa.me/${waNumber}?text=${message}`;
        
        // Redirect to WhatsApp
        window.open(waUrl, '_blank');
        
        // Optional: Reset form and close modal
        window.closeModal();
    });

    // --- 6. Theme Toggle ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggle');
    
    // Check for saved user preference, if any (Default is Dark mode)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        updateThemeIcons('light');
    } else {
        document.documentElement.classList.add('dark');
        updateThemeIcons('dark');
    }
    
    function updateThemeIcons(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
        }
        if (mobileThemeToggleBtn) {
            mobileThemeToggleBtn.innerHTML = theme === 'dark' ? '<i class="ph ph-sun text-3xl"></i>' : '<i class="ph ph-moon text-3xl"></i>';
        }
    }

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            updateThemeIcons('light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcons('dark');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', () => {
             toggleTheme();
             // close menu
             isMenuOpen = false;
             mobileMenu.classList.add('translate-x-full');
             mobileBtn.innerHTML = '<i class="ph ph-list text-3xl"></i>';
             gsap.set(mobileLinks, { y: 20, opacity: 0 });
        });
    }

});

// Global Function to handle Room Card Book CTA
window.selectRoom = function(roomName) {
    const prefSelect = document.getElementById('roomPref');
    if(prefSelect) {
        prefSelect.value = roomName;
    }
    
    const modal = document.getElementById('bookingModal');
    const modalContent = document.getElementById('bookingModalContent');
    
    modal.classList.remove('pointer-events-none');
    
    // Small delay to allow display to apply before transitioning opacity
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    });
};

window.closeModal = function() {
    const modal = document.getElementById('bookingModal');
    const modalContent = document.getElementById('bookingModalContent');
    
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('pointer-events-none');
    }, 300); // matches duration-300
};

// Dynamic scaling of Adults based on Room count
window.updateAdults = function() {
    const rooms = parseInt(document.getElementById('rooms').value) || 1;
    const adultsSelect = document.getElementById('adults');
    
    // Clear current options
    adultsSelect.innerHTML = '';
    
    // Set max 4 adults per room logic
    const maxAdults = rooms * 4;
    for(let i = 1; i <= maxAdults; i++) {
        const option = document.createElement('option');
        option.value = i;
        if (i === rooms * 2) {
            option.selected = true;
            option.text = `${i} Adults (Rec. for ${rooms} room${rooms > 1 ? 's' : ''})`;
        } else {
            option.text = `${i} Adult${i > 1 ? 's' : ''}`;
        }
        adultsSelect.appendChild(option);
    }
};
