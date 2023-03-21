const cardPokemon = document.querySelectorAll('.js-open-pokemon-card');
const closeModal = document.querySelectorAll('.js-close-modal');

cardPokemon.forEach(card => {
    card.addEventListener('click', openModalPokemon);
})

if (closeModal) {
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
    card.setAttribute('code-pokemon', code)
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
    document.documentElement.classList.add('open-modal');

    let codePokemon = this.getAttribute('code-pokemon');
    let imagePokemon = this.querySelector('.thumb-img');
    let iconTypePokemon = this.querySelector('.info .icon img');
    let namePokemon = this.querySelector('.info h3').textContent;
    let idPokemon = this.querySelector('.info span').textContent;

    const modalDetails = document.getElementById('js-modal-details')
    const imgPokemonModal = document.getElementById('js-image-pokemon-modal');
    const iconTypePokemonModal = document.getElementById('js-image-type-modal');
    const namePokemonModal = document.getElementById('js-name-pokemon-modal');
    const idPokemonModal = document.getElementById('js-id-pokemon-modal');

    const areaTypeModal = document.getElementById('js-pokemons-types');
    const pokemonWeight = document.getElementById('js-pokemon-weight');
    const pokemonHeight = document.getElementById('js-pokemon-height');
    const pokemonAbilities = document.getElementById('js-pokemon-abilities');

    const areaWeak = document.getElementById('js-area-weak')

    imgPokemonModal.setAttribute('src', imagePokemon.getAttribute('src'))
    modalDetails.setAttribute('type-pokemon-modal', this.classList[2])
    iconTypePokemonModal.setAttribute('src', iconTypePokemon.getAttribute('src'))
    namePokemonModal.textContent = namePokemon
    idPokemonModal.textContent = idPokemon


    axios({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
    }) 
    .then(response => {
        let data = response.data;

        //listando todas as informações vindas da api necessarias para preencher o modal
        let infoPokemon = {
            mainAbilities: primeiraLetraMaiuscula(data.abilities[0].ability.name),
            types: data.types,
            weight: data.weight,
            height: data.height,
            abilities: data.abilities,
            stats: data.stats,
            urlType: data.types[0].type.url
        }

        console.log(infoPokemon.stats);

        function listingTypesPokemon() {
            areaTypeModal.innerHTML = "";

            let arrayTypes = infoPokemon.types;

            arrayTypes.forEach(itemType => {
                let itemList = document.createElement('li');
                areaTypeModal.appendChild(itemList);

                let spanList = document.createElement('span');
                spanList.classList = `tag-type ${itemType.type.name}`;
                spanList.textContent = primeiraLetraMaiuscula(itemType.type.name);

                itemList.appendChild(spanList);
            })
        }

        function listingWeaknessesPokemon() {
            areaWeak.innerHTML = "";

            axios({
                method: 'GET',
                url: `${infoPokemon.urlType}`
            })
            .then(response  => {
                let weaknesses = response.data.damage_relations.double_damage_from;

                weaknesses.forEach(itemType => {
                    let itemListWeak = document.createElement('li');
                    areaWeak.appendChild(itemListWeak);
    
                    let spanList = document.createElement('span');
                    spanList.classList = `tag-type ${itemType.name}`;
                    spanList.textContent = primeiraLetraMaiuscula(itemType.name);
    
                    itemListWeak.appendChild(spanList);
                })
            })
        }

        pokemonHeight.textContent = `${infoPokemon.height/10}m`;
        pokemonWeight.textContent = `${infoPokemon.weight/10}kg`;
        pokemonAbilities.textContent = infoPokemon.mainAbilities;

        const statsHP = document.getElementById('js-stats-hp');
        const statsAttack = document.getElementById('js-stats-attack');
        const statsDefese = document.getElementById('js-stats-defese');
        const statsSpAttack = document.getElementById('js-stats-spattack');
        const statsSpDefese = document.getElementById('js-stats-spdefese');
        const statsSpeed = document.getElementById('js-stats-speed');

        console.log(statsHP)
        console.log(infoPokemon.stats[0].base_stats)

        statsHP.style.width = `${infoPokemon.stats[0].base_stat}%`
        statsAttack.style.width = `${infoPokemon.stats[1].base_stat}%`
        statsDefese.style.width = `${infoPokemon.stats[2].base_stat}%`
        statsSpAttack.style.width = `${infoPokemon.stats[3].base_stat}%`
        statsSpDefese.style.width = `${infoPokemon.stats[4].base_stat}%`
        statsSpeed.style.width = `${infoPokemon.stats[5].base_stat}%`

        // 

        listingTypesPokemon();
        listingWeaknessesPokemon()
    })
}

function closeModalPokemon() {
    document.documentElement.classList.remove('open-modal')
}


// Lista os tipos de pokemon

const areaType = document.getElementById('js-type-area');
const areaTypeMobile = document.querySelector('.dropdown-select');

axios({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/type'
})
    .then(response => {
        const { results } = response.data;

        results.forEach((type, index) => {
            if (index < 18) {
                let itemType = document.createElement('li');
                areaType.appendChild(itemType);

                let buttonType = document.createElement('button')
                buttonType.classList = `type-filter ${type.name}`;
                buttonType.setAttribute('code-type', index + 1);
                itemType.appendChild(buttonType);

                let iconType = document.createElement('div')
                iconType.classList = 'icon';
                buttonType.appendChild(iconType);

                let typeImage = document.createElement('img')
                typeImage.setAttribute('src', `assets/icon-types/${type.name}.svg`);
                iconType.appendChild(typeImage);

                let nameType = document.createElement('span');
                nameType.textContent = type.name;
                buttonType.appendChild(nameType);

                //preenchimento do select mobile

                let itemTypeMobile = document.createElement('li');
                areaTypeMobile.appendChild(itemTypeMobile);

                let buttonTypeMobile = document.createElement('button')
                buttonTypeMobile.classList = `type-filter ${type.name}`;
                buttonTypeMobile.setAttribute('code-type', index + 1);
                itemTypeMobile.appendChild(buttonTypeMobile);

                let iconTypeMobile = document.createElement('div')
                iconTypeMobile.classList = 'icon';
                buttonTypeMobile.appendChild(iconTypeMobile);

                let typeImageMobile = document.createElement('img')
                typeImageMobile.setAttribute('src', `assets/icon-types/${type.name}.svg`);
                iconTypeMobile.appendChild(typeImageMobile);

                let nameTypeMobile = document.createElement('span');
                nameTypeMobile.textContent = type.name;
                buttonTypeMobile.appendChild(nameTypeMobile);

                const allTypes = document.querySelectorAll('.type-filter')

                allTypes.forEach(btn => {
                    btn.addEventListener('click', filterByTypes)
                })
            }
        })
    })

// Funcionalidade de load more

const btnLoadMore = document.getElementById('js-load-more');

let countPokemons = 9;

function showMorePokemon() {
    listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPokemons}`)

    countPokemons = countPokemons + 9
}

btnLoadMore.addEventListener('click', showMorePokemon)

// filtrar pokemons por tipo

function filterByTypes() {
    // console.log(this.getAttribute('code-type'));

    let idPokemon = this.getAttribute('code-type');

    const areaPokemons = document.getElementById('js-list-pokemon');
    const btnLoadMore = document.getElementById('js-load-more');
    const allTypes = document.querySelectorAll('.type-filter');
    const countPokemons = document.getElementById('js-count-pokemons');

    areaPokemons.innerHTML = "";
    btnLoadMore.style.display = "none";

    const sectionPokemons = document.querySelector('.s-pokemons-list');
    const topSection = sectionPokemons.offsetTop;

    window.scrollTo({
        top: topSection + 288,
        behavior: 'smooth'
    })

    allTypes.forEach(type => {
        type.classList.remove('active')
    })


    this.classList.add('active')

    if (idPokemon) {
        axios({
            method: 'GET',
            url: `https://pokeapi.co/api/v2/type/${idPokemon}`
        })
            .then(response => {
                const { pokemon } = response.data

                countPokemons.textContent = pokemon.length;

                pokemon.forEach(pokemons => {
                    const { url } = pokemons.pokemon;

                    axios({
                        method: 'GET',
                        url: `${url}`
                    })
                        .then(response => {
                            const { name, id, sprites, types } = response.data

                            const infoCard = {
                                name: name,
                                code: id,
                                imagePokemon: sprites.other.dream_world.front_default,
                                type: types[0].type.name
                            }

                            if (infoCard.imagePokemon) {
                                createCardPokemon(infoCard.code, infoCard.type, infoCard.name, infoCard.imagePokemon);
                            }


                            const cardPokemon = document.querySelectorAll('.js-open-pokemon-card');

                            cardPokemon.forEach(card => {
                                card.addEventListener('click', openModalPokemon)
                            })
                        })
                })
            })
    } else {
        areaPokemons.innerHTML = "";

        listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');

        btnLoadMore.style.display = "block";
    }
}

// pesquisar pokemon atraves do nome e id

const btnSearch = document.getElementById('js-btn-search');
const inputSearch = document.getElementById('js-input-search');

btnSearch.addEventListener('click', searchPokemon);
inputSearch.addEventListener('keyup', (event) => {
    if (event.code === 'Enter') {
        searchPokemon();
    }
})

const rightContainer = document.getElementById('js-right-container')

function searchPokemon() {
    let valueInput = inputSearch.value.toLowerCase();
    const typeFilter = document.querySelectorAll('.type-filter');

    typeFilter.forEach(type => {
        type.classList.remove('active')
    })

    axios({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`
    })
        .then(response => {
            const countPokemons = document.getElementById('js-count-pokemons');
            areaPokemon.innerHTML = "";
            btnLoadMore.style.display = "none";
            countPokemons.textContent = 1;

            const { name, id, sprites, types } = response.data

            const infoCard = {
                name: name,
                code: id,
                imagePokemon: sprites.other.dream_world.front_default,
                type: types[0].type.name
            }

            if (infoCard.imagePokemon) {
                createCardPokemon(infoCard.code, infoCard.type, infoCard.name, infoCard.imagePokemon);
            }


            const cardPokemon = document.querySelectorAll('.js-open-pokemon-card');

            cardPokemon.forEach(card => {
                card.addEventListener('click', openModalPokemon)
            })
        })
        .catch((error) => {
            if (error.response) {
                const countPokemons = document.getElementById('js-count-pokemons');

                areaPokemon.innerHTML = "";
                btnLoadMore.style.display = "none";
                countPokemons.textContent = 0;
                // alert('Não foi encontrado nehum resultado como a pesquisa');

                let notFound = document.createElement('div');
                notFound.classList.add('not-found-container');
                rightContainer.appendChild(notFound);

                let sorryTitle = document.createElement('h3');
                sorryTitle.classList.add('sorry-title');
                sorryTitle.textContent = "SORRY";
                notFound.appendChild(sorryTitle);

                let image = document.createElement('img');
                image.setAttribute('src', 'assets/pokemon-not-found.svg');
                notFound.appendChild(image);

                let sorryText = document.createElement('p');
                sorryText.classList.add('sorry-text');
                sorryText.textContent = "Pokemon not found";
                notFound.appendChild(sorryText);
            }
        })
}



