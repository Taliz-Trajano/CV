// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Menu mobile
    initMobileMenu();
    
    // Gestion de la photo
    initPhotoUpload();
    
    // Animations des compteurs
    initCounters();
    
    // Animations au scroll
    initScrollAnimations();
    
    // Effets électriques interactifs
    initElectricEffects();
    
    // Gestion du formulaire
    initContactForm();
    
    // Animation des barres de compétences
    initSkillBars();
});

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animation des barres du menu
            const spans = this.querySelectorAll('.menu-icon span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('.menu-icon span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Gestion de la photo
function initPhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const profilePhoto = document.getElementById('profilePhoto');
    
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePhoto.src = e.target.result;
                    profilePhoto.style.display = 'block';
                    photoPlaceholder.style.display = 'none';
                    
                    // Animation d'apparition
                    gsap.fromTo(profilePhoto, 
                        { scale: 0.8, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                    );
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Compteurs animés
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.round(current);
        }, 16);
    });
}

// Animations au scroll
function initScrollAnimations() {
    // Animation des cartes d'expertise
    gsap.utils.toArray('.expertise-card').forEach(card => {
        gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animation de la timeline
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.fromTo(item,
            { x: item.classList.contains('odd') ? 50 : -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animation des certifications
    gsap.utils.toArray('.certification-card').forEach(card => {
        gsap.fromTo(card,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

// Effets électriques
function initElectricEffects() {
    // Effet d'étincelle sur les boutons
    document.querySelectorAll('.btn-spark').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createSpark(this);
        });
        
        // Créer quelques étincelles aléatoires
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createSpark(btn), i * 300);
        }
    });
    
    // Effet sur les icônes électriques
    document.querySelectorAll('.icon-electric').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
        });
    });
    
    // Effet de pulsation sur le logo
    const logoSpark = document.querySelector('.logo-spark');
    if (logoSpark) {
        setInterval(() => {
            gsap.to(logoSpark, {
                scale: 1.2,
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        }, 3000);
    }
}

// Créer une étincelle
function createSpark(element) {
    const spark = document.createElement('div');
    spark.className = 'spark-effect';
    spark.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    spark.style.left = Math.random() * rect.width + 'px';
    spark.style.top = Math.random() * rect.height + 'px';
    
    element.appendChild(spark);
    
    gsap.to(spark, {
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        opacity: 0,
        scale: 0,
        duration: 0.5,
        onComplete: () => spark.remove()
    });
}

// Barres de compétences animées
function initSkillBars() {
    const skillBars = document.querySelectorAll('.meter-fill');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        
        ScrollTrigger.create({
            trigger: bar,
            start: "top 90%",
            onEnter: () => {
                gsap.to(bar, {
                    width: level + '%',
                    duration: 1.5,
                    ease: "power3.out",
                    onUpdate: function() {
                        const parent = bar.parentElement.parentElement;
                        const valueElement = parent.querySelector('.meter-value');
                        if (valueElement) {
                            valueElement.textContent = Math.round(this.progress() * level) + '%';
                        }
                    }
                });
            }
        });
    });
}

// Gestion du formulaire
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données
            const formData = {
                company: document.getElementById('company').value,
                name: document.getElementById('name').value,
                position: document.getElementById('position').value,
                email: document.getElementById('email').value,
                opportunity: document.getElementById('opportunity').value,
                message: document.getElementById('message').value
            };
            
            // Simulation d'envoi avec effets
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Animation de chargement
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                // Effet de succès
                gsap.to(submitBtn, {
                    backgroundColor: '#4CAF50',
                    duration: 0.3,
                    onComplete: () => {
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                        
                        // Notification
                        showNotification('Votre message a été envoyé avec succès ! Je vous répondrai dans les 24h.', 'success');
                        
                        // Réinitialiser après 3 secondes
                        setTimeout(() => {
                            contactForm.reset();
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            gsap.to(submitBtn, {
                                backgroundColor: '',
                                duration: 0.3
                            });
                        }, 3000);
                    }
                });
            }, 1500);
        });
    }
}

// Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    gsap.fromTo(notification,
        { y: -50, opacity: 0 },
        { y: 20, opacity: 1, duration: 0.5 }
    );
    
    // Disparaître après 5 secondes
    setTimeout(() => {
        gsap.to(notification, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            onComplete: () => notification.remove()
        });
    }, 5000);
}

// Effet de parallaxe sur le scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.electric-background');
    
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
    
    // Effet sur le header
    const header = document.querySelector('.premium-header');
    if (scrolled > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        header.style.backdropFilter = 'blur(10px)';
    }
});
