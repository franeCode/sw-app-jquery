'use strict';
//Define variables
const name = $('.name');
const height = $('.height');
const birthYear = $('.birthYear');
const hairColor = $('.hairColor')
const eyeColor = $('.eyeColor');
const died = $('.died');
const displayResult = $('#display-result');
const image = $('.display-image');
const cards = $('.cards');
//Create variable to hold json data
let characters = [];
let selectedCharacter = 0;


//Get JSON data
function loadData() {
    $.get('https://akabab.github.io/starwars-api/api/all.json', (data) => {
        characters = data;
        //Display all characters
        for (let i = 0; i < characters.length; i++) {
            let c = createCard(characters[i]);
            $(cards).append(c);
        };
    });
};
//Get all characters data
function showCharacter(data) {
    name.text(data['name']);
    height.text(data['height']);
    birthYear.text(data['born']);
    hairColor.text(data['hairColor']);
    eyeColor.text(data['eyeColor']);
    died.text(data['died']);
    image.attr('src', data['image']);
};

function createCard(cardData) {
    let cardHtml = `<div class='card'>
            <img src='${cardData.image}' alt='characterImage'> 
       <div class='card-text'>        
         <h4>${cardData.name}</h4> 
      </div> </div>`;
    let card = $(cardHtml);

    card.on('click', () => {
        cards.addClass('hide');
        showCharacter(cardData);
        displayResult.removeClass('hide');
    })
    return card;
};

$(document).ready(function () {

    displayResult.addClass('hide');

    //Close results when press x
    $('.close-result').on('click', () => {
        displayResult.addClass('hide');
        cards.removeClass('hide');
    })
    //Show random character
    $('#random-character').on('click', () => {
        selectedCharacter = Math.floor(Math.random() * characters.length);
        console.log(selectedCharacter);
        showCharacter(characters[selectedCharacter]);
    })
    //Show next character
    $('#next-character').on('click', () => {
        selectedCharacter++;
        if (selectedCharacter > characters.length - 1) {
            selectedCharacter = 0;
        }
        console.log(selectedCharacter);
        showCharacter(characters[selectedCharacter]);
    })
    //Show previous character
    $('#previous-character').on('click', () => {
        if (selectedCharacter > 0) {
            selectedCharacter--;
        } else {
            selectedCharacter = characters.length - 1;
        }
        console.log(selectedCharacter);
        showCharacter(characters[selectedCharacter]);
    });
    loadData();
});