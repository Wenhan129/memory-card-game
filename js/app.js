/*
 * Create a list that holds all of your cards
 */
let cardList = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
  ],
  moves = 0,
  stars = 3,
  firstMatch = true,
  firstTimeClick = true,
  lastCard = null,
  lastCardType = "",
  totalCards = 16,
  totalSeconds = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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
createDeck(shuffledCardList);

// Create the deck with shuffled cards
function createDeck(cards) {
  cards.forEach(function(card) {
    cardType = '<li class="card">\n<i class="fa ' + card + '"></i>\n</li>';
    $(".deck").append(cardType);
  });
  // Reset the values
  (moves = 0), (firstMatch = true), (lastCard = null);
  lastCardType = "";
}

// Event listener for a card if clicked
$(".card").click(function() {
  // Get the card type
  currentCardType = $(this)
    .children()
    .attr("class")
    .split(" ")[1];

  // Disable the card if it is already matched
  if ($(lastCard).hasClass("match") || $(this).hasClass("match")) return;

  if (firstTimeClick) timer();
  firstTimeClick = false;

  if (firstMatch) {
    // Display the next card
    displayCard(this);
    lastCardType = currentCardType;
    firstMatch = false;
    lastCard = this;
  } else if (lastCardType !== currentCardType) {
    // Display the wrong match animation
    // When it is not matched to the last card
    displayWrongCard(this, lastCard);
    lastCardType = "";
    lastCard = null;
    firstMatch = true;
    moves++;
  } else if (this !== lastCard) {
    // Display match animation
    // When it's matched and only if not to the card itself
    displayMatchedCard(this, lastCard);
    lastCardType = "";
    lastCard = null;
    firstMatch = true;
    totalCards = totalCards - 2;
    console.log(totalCards);
    moves++;
  }

  // Update the moves after clicking
  $(".moves").text(moves);
  console.log($(".stars"));
  if (moves > 15) {
    $(".stars li")
      .children()
      .eq(0)
      .attr("class", "fa fa-star-o");
    stars = 2;
    if (moves > 20) {
      $(".stars li")
        .children()
        .eq(1)
        .attr("class", "fa fa-star-o");
      stars = 1;
      }
    }
  }
  if (totalCards === 0)
    swal({
      title: "Good job!",
      text:
        "You won the game in " +
        moves +
        " moves and got " +
        stars +
        " stars!" +
        "\nAnd you used " +
        parseInt(totalSeconds / 60) +
        ":" +
        totalSeconds % 60 +
        " minutes.",
      icon: "success",
      buttons: "Restart",
      showCancelButton: true
    }).then(function() {
      location.reload();
    });
});

$(".restart").click(function() {
  location.reload();
});

// Display the card's symbol
function displayCard(card) {
  $(card).addClass("open show animated flip");
}

function displayMatchedCard(card, lastCard) {
  $(card).addClass("open show match animated flip");
  $(lastCard).addClass("match");
}

function displayWrongCard(card, lastCard) {
  $(lastCard).removeClass("animated flip");
  $(card).addClass("open wrong show animated shake");
  $(lastCard).addClass("open wrong show animated shake");
  // Wait the shake animations finished
  setTimeout(function() {
    $(card).removeClass("open show wrong animated shake");
    $(lastCard).removeClass("open wrong show animated shake");
  }, 500);
}

// Count down timer
function timer() {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  setInterval(setTime, 1000);

  function setTime() {
    if (totalCards == 0) return;
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}
