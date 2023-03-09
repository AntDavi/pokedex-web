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

// Select custom 

const btnDropdownSelect = document.querySelector('.js-open-select');

btnDropdownSelect.addEventListener('click', () => {
    btnDropdownSelect.parentElement.classList.toggle('active')
})

// Listagem de pokemons

function listingPokemons(urlApi) {
    axios({
        method: 'GET',
        url: urlApi
    })
    .then((response) => {
        const countPokemons = document.getElementById('js-count-pokemons');

        const { results, next, count } = response.data;

        countPokemons.innerText = count

        results.forEach(pokemon => {
            let urlApiDetails = pokemon.url;

            axios({
                method: 'GET',
                url: `${urlApiDetails}`
            })
            .then(response => {
                console.log(response.data)
            })
        })
    })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');