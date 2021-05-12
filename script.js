"use strict";

//Selecting elements
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

//Initial values;

let scores, currentScore, activePlayer, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true; //state variable
  scores = [0, 0]; // Initialising the Total scores value.
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  //Generate a number on dice
  if (playing) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    //Display Dice roll
    dice.classList.remove("hidden");
    dice.setAttribute("src", `dice-${randomNumber}.png`);

    //Is it a 1
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold Score

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add Current Score to Total Score;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.If( total >=100)
    //Finish the game.
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      document.querySelector(".dice").classList.add("hidden");
    } else {
      //3.Change the player or Switch the player
      switchPlayer();
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", init);
