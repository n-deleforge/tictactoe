// =================================================
// ============ SETTINGS

let gameTable; let listCases; let lastCell; let currentPlayer = rand(1, 2);
const GRID = 3;
const COLOR_PLAYER1 = getVariableCSS("color-1");
const COLOR_PLAYER2 = getVariableCSS("color-2");
const COLOR_DRAW = getVariableCSS("border");

// =================================================
// ============ MAIN

/**
 * Initialize the game and events
 **/

 get("#back").addEventListener("click", () => { navigate("../") });
get("#reload").addEventListener("click", () => { document.location.reload(); });
get("#switchLanguage").addEventListener("click", switchLanguage);
get("#play").addEventListener("click", createGame);

/**
 * Check the played case, check the victory and update the turn
 * @param {int} cell the number of played cell
 **/

function play(cell) {
  lastCell = cell;

  // Check if the case is empty
  if (gameTable[lastCell] == " ") {
    get("#writing").play();
    navigator.vibrate("50");

    gameTable[lastCell] = currentPlayer == 1 ? '<span class="tic">X</span>' : '<span class="tac">O</span>';
    for (let i = 0; i < GRID * GRID; i++) {
      listCases[i].innerHTML = gameTable[i];
    }

    // Check of the victory/draw
    checkVictory();
  }
}

/**
 * Create a new game and add event listener on each case
 **/

function createGame() {
  // Update the display
  get("#player").style.display = "flex";
  get(".buttonList")[0].style.display = "none";
  get("#play").style.display = "none";
  get("#back").style.display = "none";
  checkPlayer();

  // Creation of the grid
  gameTable = new Array(GRID * GRID);
  gameTable.fill(" ");

  // Add listeners on all cases
  listCases = get(".case");
  for (let i = 0; i < listCases.length; i++) {
    listCases[i].innerHTML = "";
    listCases[i].addEventListener("click", () => { play(i); });
  }
}

/**
 * Display the actual player, and can switch of player
 * @param {bool} newPlayer true to switch player, false to not switch
 **/

function checkPlayer(newPlayer = false) {
  if (newPlayer == true) currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1;

  get("#player").style.color = currentPlayer == 1 ?  COLOR_PLAYER1 :  COLOR_PLAYER2;
  get("#player").innerHTML = CONTENT.turn_part1 + currentPlayer + CONTENT.turn_part2;
}

/**
 * Check the victory or the draw and call the endGame function
 **/

function checkVictory() {
  // Check victory
  let existingCombo = gameTable[lastCell];
  if ((gameTable[0] == existingCombo && gameTable[1] == existingCombo && gameTable[2] == existingCombo) ||
      (gameTable[3] == existingCombo && gameTable[4] == existingCombo && gameTable[5] == existingCombo) ||
      (gameTable[6] == existingCombo && gameTable[7] == existingCombo && gameTable[8] == existingCombo) ||
      (gameTable[0] == existingCombo && gameTable[3] == existingCombo && gameTable[6] == existingCombo) ||
      (gameTable[1] == existingCombo && gameTable[4] == existingCombo && gameTable[7] == existingCombo) ||
      (gameTable[2] == existingCombo && gameTable[5] == existingCombo && gameTable[8] == existingCombo) ||
      (gameTable[0] == existingCombo && gameTable[4] == existingCombo && gameTable[8] == existingCombo) ||
      (gameTable[2] == existingCombo && gameTable[4] == existingCombo && gameTable[6] == existingCombo)) {

      endGame();
      currentPlayer == 1 ? get("#player").style.color = COLOR_PLAYER1 : get("#player").style.color = COLOR_PLAYER2;
      get("#player").innerHTML = CONTENT.win_part1 + currentPlayer + CONTENT.win_part2;
  }

  // Check draw
  else if (gameTable.indexOf(" ") == -1) {
    endGame();
    get("#player").style.color = COLOR_DRAW;
    get("#player").innerHTML = CONTENT.draw;
  }

  // Change player if no draw or victory
  else checkPlayer(true);
}

/**
 * Change the display for the results and save the number of games
 **/

function endGame() {
  get("#board").style.display = "none";
  get(".buttonList")[0].style.display = "flex";
  get("#reload").style.display = "block";
  get("#player").style.fontSize = "3em";
}

// =================================================
// ============ UNCATEGORIZED

/**
 * Switch between English and French
 **/

 function switchLanguage() {
  (getCookie("GAMZ-language") == "FR") ? setCookie("GAMZ-language", "EN") : setCookie("GAMZ-language", "FR");
  location.reload();
}