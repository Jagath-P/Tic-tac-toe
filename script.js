const container = document.querySelector(".container");
const btn = document.querySelectorAll("#btn");

const r0 = document.querySelectorAll(".b0");
const r1 = document.querySelectorAll(".b1");
const r2 = document.querySelectorAll(".b2");
const gameBoard = [r0, r1, r2];

let currentPlayer = 1;
let gameActive = true;

function check(arr) {
  for (var i = 0; i < 3; i++) {
    if (
      arr[i][0].textContent != "" &&
      arr[i][0].textContent == arr[i][1].textContent &&
      arr[i][1].textContent == arr[i][2].textContent
    ) {
      return 1;
    }
  }
  for (var i = 0; i < 3; i++) {
    if (
      arr[0][i].textContent != "" &&
      arr[0][i].textContent == arr[1][i].textContent &&
      arr[1][i].textContent == arr[2][i].textContent
    ) {
      return 1;
    }
  }
  if (
    arr[0][0].textContent != "" &&
    arr[0][0].textContent == arr[1][1].textContent &&
    arr[1][1].textContent == arr[2][2].textContent
  ) {
    return 1;
  } else if (
    arr[0][2].textContent != "" &&
    arr[0][2].textContent == arr[1][1].textContent &&
    arr[1][1].textContent == arr[2][0].textContent
  ) {
    return 1;
  }
  return null;
}
function checkTie() {
  return Array.from(btn).forEach((button) => button.textContent != "");
}

const turn = document.createElement("h2");
const h1 = document.createElement("h1");
const extra = document.createElement("button");
h1.textContent = "TIC TAC TOE";
turn.textContent = "Player 1 turn";
extra.textContent = "Restart again?";
extra.className = "restart";
function endGame(winner) {
  gameActive = false;
  if (winner) {
    turn.textContent = `Player ${currentPlayer} wins!!`;
  } else {
    turn.textContent = "IT'S A TIE!";
  }
  btn.forEach((button) => {
    button.disabled = true;
  });
}
function btnClick(btn) {
  if (!gameActive && btn.textContent != "") {
    return;
  }
  const symbol = currentPlayer === 1 ? "X" : "O";
  btn.textContent = symbol;
  const res = check(gameBoard);
  if (res) {
    endGame(res);
    return;
  }
  if (checkTie()) {
    endGame(null);
    return;
  }
  currentPlayer = currentPlayer == 1 ? 2 : 1;
  turn.textContent = `Player ${currentPlayer} turn`;
}
function reset() {
  gameActive = true;
  currentPlayer = 1;
  turn.textContent = "Player1 turn";
  extra.textContent = "Restart again?";
  btn.forEach((button) => {
    button.textContent = "";
    button.disabled = false;
  });
}
function initGame() {
  container.prepend(turn);
  container.prepend(h1);
  container.appendChild(extra);
   btn.forEach(button => {
        button.addEventListener('click', () =>btnClick(button));
    });
  extra.addEventListener("click", reset);
}

initGame();
