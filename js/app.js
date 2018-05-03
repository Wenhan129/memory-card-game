
/*
 * Create a list that holds all of your cards
 */
let cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"],
    moves = 0,
    firstMatch = true,
    lastCard = null;
    lastCardType = "";



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffledCardList = shuffle(cardList);
console.log(shuffledCardList);
createDeck(shuffledCardList);

// Create the deck with shuffled cards
function createDeck(cards) {
    cards.forEach(function (card) {
       cardType = "<li class=\"card\">\n<i class=\"fa " + card + "\"></i>\n</li>";
       $('.deck').append(cardType);
    })
} 

$('.card').click(function () {

    // if ($(this).children().hasClass(lastCard)){
    //     displayCard(this);
    // }
    
    // Get the card type info string from the clicked card
    currentCard = $(this).children().attr('class').split(' ')[1];

    matched = $(this).hasClass("match");
    console.log("It's already matched", matched);

    if ($(lastCard).hasClass("match")||$(this).hasClass("match"))
        return;

    console.log("lastCard", lastCard);
    console.log("currentCard", currentCard);

    if (firstMatch) {
        displayCard(this);
        lastCardType =  currentCard;
        firstMatch = false;
        lastCard = this;
    }
    else 
        if (lastCardType !== currentCard) {
            displayWrongCard(this, lastCard);
            lastCardType = "";
            lastCard = null;
            firstMatch = true;
            console.log("Hey it's wrong!");
        }
        else if (this !== lastCard) {
            displayMatchedCard(this, lastCard);
            lastCardType = "";
            lastCard = null;
            firstMatch = true;
        }
    
})

// Display the card's symbol
function displayCard(card) {
    $(card).addClass("open show animated flip");
}

function displayMatchedCard(card, lastCard) {
    
    // $(lastCard)
    $(card).addClass("open show match animated flip"); 
    $(lastCard).addClass("match");
    console.log("Hey",currentCard);
    document.getElementsByClassName(currentCard).disabled = true; 
}

function displayWrongCard(card, lastCard) {
    console.log("function:",card, lastCard);
    $(lastCard).removeClass("animated flip");
    
    $(card).addClass("open wrong show animated shake");
    $(lastCard).addClass("open wrong show animated shake");
    
    setTimeout(function () {$(card).removeClass("open show wrong animated shake");
    $(lastCard).removeClass("open wrong show animated shake");
}, 500);
}



// Add the card to a list of "open" cards
function listCard(card) {

}

// Match the 

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
