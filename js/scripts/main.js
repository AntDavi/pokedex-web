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


closeModal.forEach(card => {
    card.addEventListener('click', closeModalPokemon);
})

// Script Slide

var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
    pagination: {
        el: "",
    },
})