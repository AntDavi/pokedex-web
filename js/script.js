"use strict";var cardPokemon=document.querySelectorAll(".js-open-pokemon-card"),closeModal=document.querySelectorAll(".js-close-modal");function openModalPokemon(){document.documentElement.classList.add("open-modal")}function closeModalPokemon(){document.documentElement.classList.remove("open-modal")}cardPokemon.forEach(function(e){e.addEventListener("click",openModalPokemon)}),closeModal.forEach(function(e){e.addEventListener("click",closeModalPokemon)});var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:""}});