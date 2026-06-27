document.addEventListener('DOMContentLoaded', function()
/*
========================================
========================================
*/
/*     
GESTION THEME SOMBRE
*/
/*
========================================
========================================
*/
{
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    // Chargé le théme sauvegardé
    if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');
    // Changer le théme au clic
    if (themeToggle) {
        themeToggle.addEventListener('click', () =>{
            body.classList.toggle('dark-mode');
            //Sauvegarder le théme choisi
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
/*
========================================
========================================
*/
/*     
NAVBAR AU DEFILEMENT
*/
/*
========================================
========================================
*/
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        });
    }
    /*
========================================
========================================
*/
/*     
RETOUR EN BOUTON
*/
/*
========================================
========================================
*/
    let backToTop = document.getElementById('backToTop');
    // Création dynamique du button si absent 
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.innerHTML = '↥';
        backToTop.className = 'back-to-top';
        document.body.appendChild(backToTop);
    }
    //Afficher / Masquer le button au scroll
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    // Retour fluide vers le haut
    backToTop.addEventListener('click', () => {
        window.scrollTo ({top: 0, behavior: 'smooth'});
    });
    /*
========================================
========================================
*/
/*     
VALIDATION DU FORMULAIRE DE CONTACT
*/
/*
========================================
========================================
*/
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e)
        //Empeche l'envoi automatique
        {
            e.preventDefault();
            // Champs du formulaire
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            // Zones d'affichage des erreurs
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const subjectError = document.getElementById('subjectError');
            const messageError = document.getElementById('messageError');
             let isValid = true;
             // Réinitialisation des messages d'erreurs
             [nameError, emailError, subjectError, messageError].forEach(el => {if(el) el.textContent = '';});
                    /*--------
             Validation du nom
             ----------*/
             if (!name || name.value.trim() === '') { if (nameError) nameError.textContent = 'Le nom est obligatoire'; isValid = false;}
             else if(name.value.trim().length < 2) { if(nameError) nameError.textContent = 'Le nom doit avoir au moins 2 caractéres'; isValid = false;}
                     /*-----------
             Validation de l'email
             ----------*/
             const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
             if (!email || email.value.trim() === '') { if(emailError) emailError.textContent = 'L\'email est obligatoire'; isValid = false;}
             else if (!emailRegex.test(email.value)) { if(emailError) emailError.textContent = 'Format email invalide'; isValid = false;}
                    /*-----------
             Validation du sujet
             ----------*/
             if(!subject || subject.value.trim() === '') {if (subjectError) subjectError.textContent = 'Le sujet est obligatoire'; isValid = false;}
             else if (subject.value.trim().length < 5) {if(subjectError) subjectError.textContent = 'Le sujet doit avoir au moins 5 caractéres'; isValid = false;}
                    /*------------
             Validation du message
             -----------*/
             if(!message || message.value.trim() === '') { if(messageError) messageError.textContent = 'Le message est obligatoire'; isValid = false;}
             else if (message.value.trim().length < 20) {if(messageError) messageError.textContent = 'Le message doit avoir minimum 20 caractéres'; isValid = false;}
                    /*--------
             Envoi du formulaire de contact
             ----------*/
             if (isValid) {
                const success = 
                document.createElement('div');
                success.className = 
                'alert alert-success mt-3';
                success.textContent = 
                'Message envoyé avec succès !';
                contactForm.appendChild(success);
                setTimeout(()=> success.remove(), 3000);
             }
        });
    }

    /*
========================================
========================================
*/
/*     
FILTRAGE DES FREELANCES
*/
/*
========================================
========================================
*/
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const freelanceList = document.getElementById('freelance-list');

    if (searchInput && categoryFilter && levelFilter && freelanceList) {
        const cards = freelanceList.querySelectorAll('.freelance-item'); 

        function filterFreelances() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const category = categoryFilter.value;
            const level = levelFilter.value;

            cards.forEach(card => { 
                const freelanceCard = card.querySelector('.freelance-card');
                if (!freelanceCard) return;

                const name = freelanceCard.querySelector('.freelance-name')?.textContent.toLowerCase() || '';
                const title = freelanceCard.querySelector('.freelance-title')?.textContent.toLowerCase() || '';
                const cardLevel = freelanceCard.dataset.level || '';
                const cardCategory = freelanceCard.dataset.category || '';
                

                const matchSearch = !searchTerm ||name.includes(searchTerm) || title.includes(searchTerm);
                const matchCategory = category === 'categories' || cardCategory === category;
                const matchLevel = level === 'all' || cardLevel === level;

                if(matchSearch && matchCategory && matchLevel) {
                    card.classList.remove('d-none');
                    lcard.classList.remove('d-none'); 

                } else {
                    card.classList.add('d-none');
                }
            });
        }
        searchInput.addEventListener('input', filterFreelances);
        categoryFilter.addEventListener('change', filterFreelances);
        levelFilter.addEventListener('change', filterFreelances);
        filterFreelances();
        //Filtrage initial filterFreelance();
       }
       /*
========================================
========================================
*/
/*     
ANIMATION DES COMPTEURS
*/
/*
========================================
========================================
*/
        const counters = document.querySelectorAll(".stat-number");
        if (counters.length > 0)
            // Fonction d'animation des nombres
            {
            function animateValue(element, start, end, duration) {
                let startTime = null;
                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    element.textContent = Math.floor(progress * (end - start) + start).toLocaleString() + '+';
                    if (progress < 1) {
                         requestAnimationFrame(step);
                  
                    }
                }
               requestAnimationFrame(step);
            }

            // Observer pour lancer l'animation
             const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.dataset.target) ||'';
                       
                        animateValue(counter, 0, target, 2000);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.1});
            // Observer des compteurs
            counters.forEach(counter => {observer.observe(counter);
  
});
}
});
