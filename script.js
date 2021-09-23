"use strict";

// Selecionando Elementos
const btnOpenModal = document.querySelector(".modal-open");
const btnCloseModal = document.querySelector(".modal-close");
const btnReset = document.querySelector(".reset");
const btnCheck = document.querySelector(".check");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const number = document.querySelector(".number");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");
const initScore = document.querySelector(".score");

// Condições iniciais
let playing, secretNumber, score;
let highscore = 0;

const init = function () {
  playing = true;
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  score = 10;

  body.style.backgroundColor = "#B34F11";
  number.textContent = "?";
  number.style.width = "15rem";
  guess.value = "";
  message.textContent = "Dê um chute...";
  initScore.textContent = score;
};
init();

// FUNCIONALIDADES
// Função check - checa o número chutado
const check = function () {
  const guess = Number(document.querySelector(".guess").value);
  // Invalid Input
  if (!guess || guess > 100 || guess < 1) {
    message.textContent = "🚫 Escolha um número válido!";

    //Player WINS
  } else if (guess === secretNumber && playing) {
    message.textContent = "✨ ACERTÔ, mizeravi ✨";
    body.style.backgroundColor = "#60b347";
    number.textContent = secretNumber;
    number.style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    playing = false;

    //Player Guessing
  } else if (guess !== secretNumber && playing) {
    if (score > 1) {
      message.textContent = guess > secretNumber ? "Abaixo!" : "Acima!";
      score--;
      initScore.textContent = score;

      //Player LOSES
    } else {
      playing = false;
      message.textContent = "🤯 PERDEU! Tente de Novo 🤯";
      initScore.textContent = 0;
      body.style.backgroundColor = "rgb(236, 38, 38)";
      number.textContent = secretNumber;
      number.style.width = "30rem";
    }
  }
};

// BOTÕES
// Botão conferir
btnCheck.addEventListener("click", check); // Click
document.addEventListener("keydown", function (e) {
  // Teclado (Enter)
  console.log(e);
  if (e.key === "Enter") check();
});

// Botão Reset
btnReset.addEventListener("click", init);

// Botão info
// Abre Modal Info
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// Fecha Modal Info
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal); // Botão info
btnCloseModal.addEventListener("click", closeModal); // Botão close
overlay.addEventListener("click", closeModal); // Overlay close

document.addEventListener("keydown", function (e) {
  // 'Esc' close
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
