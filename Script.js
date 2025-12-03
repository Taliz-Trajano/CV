// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulation d'envoi (à remplacer par un vrai traitement backend)
            console.log('Données du formulaire:', formData);
            
            // Affichage d'un message de confirmation
            alert('Merci pour votre message, ' + formData.name + '! Je vous répondrai dans les plus brefs délais à l\'adresse ' + formData.email + '.');
            
            // Réinitialisation du formulaire
            contactForm.reset();
            
            // Dans une version réelle, vous enverriez les données à un serveur
            // fetch('votre-endpoint', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Message envoyé avec succès!');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     alert('Une erreur est survenue. Veuillez réessayer.');
            // });
        });
    }
    
    // Animation des éléments au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.competence-card, .timeline-item, .formation-item, .certification-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialisation des styles d'animation
    const animatedElements = document.querySelectorAll('.competence-card, .timeline-item, .formation-item, .certification-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialisation au chargement
    animateOnScroll();
    
    // Mise en évidence de l'élément de navigation actif
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Ajout de la classe active pour le lien actif
    navItems.forEach(item => {
        if (item.getAttribute('href') === '#accueil') {
            item.classList.add('active');
        }
    });
});
