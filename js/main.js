document.addEventListener('DOMContentLoaded',() => {
    const themeToggle = document.getElementById('theme-toggle');
    const body =document.body;

    if(localStorage.getItem('theme') === 'dark'){
        body.classList.add('dark-mode');
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains(dark-mode) ? 'dark' : 'light');
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
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else{
            backToTop.style.display = 'none';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    });
});