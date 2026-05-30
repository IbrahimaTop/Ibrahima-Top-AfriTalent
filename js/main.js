document.addEventListener('DOMContentLoaded',() => {
    const themeToggle = document.getElementById('theme-toggle');
    const body =document.body;

    if(localStorage.getItem('theme') === 'dark'){
        body.classList.add('dark-mode');
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () =>{
        if (window.scrollY > 50){
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    const backToTop = document.createElement('button');
    backToTop.innerHTML = '⇑';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if(window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else{
            backToTop.style.display = 'none';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const subjectError = document.getElementById('subjectError');
            const messageError = document.getElementById('messageError');

            let isValid = true;

            [nameError, emailError, subjectError, messageError].forEach(el => {
                if(el) el.textContent = '';
            });

            if(name.value.trim() === '') {
                nameError.textContent = 'Le nom est obligatoire';
                isValid = false;
            } else if(name.value.trim().length < 3) {
                        nameError.textContent = 'Le nom doit avoir au moins 3 caractéres';
                        isValid = false;
            }
        

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(email.value.trim() === '') {
                emailError.textContent = 'L\'email est obligatoire';
                isValid = false;
            } else if(!emailRegex.test(email.value)) {
                emailError.textContent = 'Format email invalide';
                isValid = false;
            }
            if(subject.value.trim() === '') {
                subjectError.textContent = 'Le sujet est obligatoire';
                isValid = false;
            } else if(subject.value.trim().length < 5) {
                subjectError.textContent = 'Le sujet doit avoir au moins 5 caractéres';
                isValid = false;

            }

            if(message.value.trim() === '') {
                messageError.textContent = 'Le message est obligatoire';
                isValid = false;
            } else if (message.value.trim().length < 20) {
                messageError.textContent = 'Le message doit avoir au moins 20 caractéres';
              isValid = false;
                
            }
             if(isValid){
                alert('Message envoyé avec succés !');
                contactForm.reset();
             }
        });
    }
 });

 document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const freelanceList = document.getElementById('freelance-list');

    function filterFreelances() {
        if(!freelanceList) return;

        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim():'';
        const category = categoryFilter ? categoryFilter.value : 'categories';
        const level = levelFilter ? levelFilter.value : 'all';
        const cards = freelanceList.querySelectorAll('.freelance-card');

        cards.forEach(card => {
            const name = card.querySelector('.freelance-name')?.textContent.toLowerCase() || '';
            const title = card.querySelector('.freelance-title')?.textContent.toLowerCase() || '';
            const cardLevel = card.dataset.level || '';
            const cardCategory = card.dataset.category || '';
           
            const matchSearch =  !searchTerm || name.includes(searchTerm) || title.includes(searchTerm);
            const matchCategory = category === 'categories' || cardCategory === category;
           const matchLevel = level === 'all' || cardLevel === level;

           card.style.display = matchSearch && matchCategory && matchLevel ? 'block' : 'none';

        });
    }
    if(searchInput) searchInput.addEventListener('input', filterFreelances);
    if (categoryFilter) categoryFilter.addEventListener('change', filterFreelances);
    if(levelFilter) levelFilter.addEventListener('change', filterFreelances);

    filterFreelances();
});

