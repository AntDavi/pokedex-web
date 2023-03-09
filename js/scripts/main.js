const cardPokemon = document.querySelectorAll('.js-open-pokemon-card');
const closeModal = document.querySelectorAll('.js-close-modal');

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

const areaPokemon = document.getElementById('js-list-pokemon')

function primeiraLetraMaiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Criar os cards dos pokemons

function createCardPokemon(code, type, name, imagePokemon) {
    let card = document.createElement('button');
    card.classList = `card-pokemon js-open-pokemon-card ${type}`;
    areaPokemon.appendChild(card);

    let image = document.createElement('div');
    image.classList = 'image';
    card.appendChild(image);

    let imageSrc = document.createElement('img');
    imageSrc.className = 'thumb-img'
    imageSrc.setAttribute('src', imagePokemon);
    image.appendChild(imageSrc);

    let infoCardPokemon = document.createElement('div');
    infoCardPokemon.classList = 'info';
    card.appendChild(infoCardPokemon);
    
    let infoTextPokemon = document.createElement('div');
    infoTextPokemon.classList = 'text';
    infoCardPokemon.appendChild(infoTextPokemon);

    let codePokemon = document.createElement('span');
    codePokemon.textContent = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}` : `#${code}`;
    infoTextPokemon.appendChild(codePokemon);

    let namePokemon = document.createElement('h3');
    namePokemon.textContent = primeiraLetraMaiuscula(name);
    infoTextPokemon.appendChild(namePokemon);

    let areaIcon = document.createElement('div');
    areaIcon.classList = 'icon';
    infoCardPokemon.appendChild(areaIcon);

    let imgType = document.createElement('img');
    imgType.setAttribute('src', `assets/icon-types/${type}.svg`);
    areaIcon.appendChild(imgType)
}

// Listagem de pokemons

function listingPokemons(urlApi) {
    axios({
        method: 'GET',
        url: urlApi
    })
    .then((response) => {
        const { results, next, count } = response.data;
        
        // Faz a contagem de pokemons 
        const countPokemons = document.getElementById('js-count-pokemons');
        countPokemons.innerText = count

        results.forEach(pokemon => {
            let urlApiDetails = pokemon.url;

            // Busca as informações do pokemon
            axios({
                method: 'GET',
                url: `${urlApiDetails}`
            })
            .then(response => {
                const { name, id, sprites, types } = response.data

                const infoCard = {
                    name: name,
                    code: id,
                    imagePokemon: sprites.other.dream_world.front_default,
                    type: types[0].type.name
                }


                createCardPokemon(infoCard.code, infoCard.type, infoCard.name, infoCard.imagePokemon);


                const cardPokemon = document.querySelectorAll('.js-open-pokemon-card');

                cardPokemon.forEach(card => {
                    card.addEventListener('click', openModalPokemon)
                })

            })
        })
    })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');

// Abrir e fechar modal dos cards de pokemon



function openModalPokemon() {
    document.documentElement.classList.add('open-modal')
}

function closeModalPokemon() {
    document.documentElement.classList.remove('open-modal')
}