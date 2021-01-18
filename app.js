/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gamePlaying;
init();
var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //What happens when someone click on the buton.
    // 1. First We need a random Number.
    // For dice we need to call a random number. We will use the Math Object that is built In javascript.
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the Result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    //Now we have to show the image according to the value of dice.
    diceDOM.src = "dice-" + dice + ".png";
    //3. Update the round score but only IF the rooled number was NOT a 1.
    if (dice !== 1) {
      roundScores += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScores;
    } else {
      //If dice value is 1, we want next player.
      nextPlayer();
    }
  }
  lastDice = dice;
});
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //First we will add current scores to Global score.
    scores[activePlayer] += roundScores;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("winner");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScores = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //we have to change the colour of active players.
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  //we will do it the better way.
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //When the player one loses it's turn we want dice to be hidden.

  document.querySelector(".dice").style.display = "none";
}
function init() {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1!";
  document.getElementById("name-1").textContent = "Player 2!";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
