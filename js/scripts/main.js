// Abrir e fechar modal dos cards de pokemon

const cardPokemon = document.querySelectorAll('.js-open-pokemon-card');
const closeModal = document.querySelectorAll('.js-close-modal');

function openModalPokemon() {
    document.documentElement.classList.add('open-modal')
}

function closeModalPokemon() {
    document.documentElement.classList.remove('open-modal')
}

cardPokemon.forEach(card => {
    card.addEventListener('click', openModalPokemon);
})

if(closeModal) {
    closeModal.forEach(card => {
        card.addEventListener('click', closeModalPokemon);
    })
}


// Script Slide Hero

var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
    pagination: {
        el: ".s-hero .slide-hero .swiper-slide .main-area .explore-area .swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    },
    loop: true,
})

// Select custon

const btnDropdownSelect = document.querySelector('.js-open-select');

btnDropdownSelect.addEventListener('click', () => {
    btnDropdownSelect.parentElement.classList.toggle('active')
})

