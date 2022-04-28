// =================================================
// ============ SETTINGS

const GRID = 3;
const COLOR_PLAYER1 = getVariableCSS("color-p1");
const COLOR_PLAYER2 = getVariableCSS("color-p2");
const COLOR_DRAW = getVariableCSS("color-draw");
let _currentPlayer = rand(1, 2),
    _gameTable,  _listCases,  _lastCell;

// =================================================
// ============ MAIN

/**
 * Initialize the game and events
 **/

get("#play").addEventListener("click", createGame);
get("#reload").addEventListener("click", () => { document.location.reload(); });

/**
 * Create a new game and add event listener on each case
 **/

function createGame() {
  // Update the display
  get("#footer").innerHTML = CONTENT.footerInGame;
  get("#titleScreen").style.display = "none";
  get("#board").style.display = "flex";
  get(".buttonList")[0].style.display = "none";
  get("#play").style.display = "none";
  checkPlayer();

  // Creation of the grid
  _gameTable = new Array(GRID * GRID);
  _gameTable.fill(" ");

  // Add listeners on all cases
  _listCases = get(".case");
  _listCases.forEach((nbCase, index) => {
    nbCase.innerHTML = "";
    nbCase.addEventListener("click", () =>{ play(index) });
  });
}

/**
 * Check the played case, check the victory and update the turn
 * @param {int} cell the number of played cell
 **/

function play(cell) {
  _lastCell = cell;

  // Check if the case is empty
  if (_gameTable[_lastCell] == " ") {
    // Fulfill the board
    _gameTable[_lastCell] = _currentPlayer == 1 ? '<span class="tic">X</span>' : '<span class="tac">O</span>';
    for (let i = 0; i < GRID * GRID; i++) {
      _listCases[i].innerHTML = _gameTable[i];
    }

    // Check of the victory/draw
    checkVictory();
  }
}

/**
 * Display the actual player, and can switch of player
 * @param {bool} newPlayer true to switch player, false to not switch
 **/

function checkPlayer(newPlayer = false) {
  // Switch player
  if (newPlayer == true) {
    _currentPlayer == 1 ? _currentPlayer = 2 : _currentPlayer = 1;
  }
  
  // Get the right color and display the player
  get("#player").style.color = _currentPlayer == 1 ?  COLOR_PLAYER1 :  COLOR_PLAYER2;
  get("#player").innerHTML = CONTENT.turn_part1 + _currentPlayer + CONTENT.turn_part2;
}

/**
 * Check the victory and the draw
 **/

function checkVictory() {
  // Check victory
  let existingCombo = _gameTable[_lastCell];
  if ((_gameTable[0] == existingCombo && _gameTable[1] == existingCombo && _gameTable[2] == existingCombo) ||
      (_gameTable[3] == existingCombo && _gameTable[4] == existingCombo && _gameTable[5] == existingCombo) ||
      (_gameTable[6] == existingCombo && _gameTable[7] == existingCombo && _gameTable[8] == existingCombo) ||
      (_gameTable[0] == existingCombo && _gameTable[3] == existingCombo && _gameTable[6] == existingCombo) ||
      (_gameTable[1] == existingCombo && _gameTable[4] == existingCombo && _gameTable[7] == existingCombo) ||
      (_gameTable[2] == existingCombo && _gameTable[5] == existingCombo && _gameTable[8] == existingCombo) ||
      (_gameTable[0] == existingCombo && _gameTable[4] == existingCombo && _gameTable[8] == existingCombo) ||
      (_gameTable[2] == existingCombo && _gameTable[4] == existingCombo && _gameTable[6] == existingCombo)) {

      endGame("win");
  }

  // Check draw
  else if (_gameTable.indexOf(" ") == -1) {
    endGame("lose");
  }

  // Change player if no draw or victory
  else {
    checkPlayer(true);
  }
}

/**
 * Display the game over screen
 * @param {string} mode win or lose
 **/

function endGame(mode) {
  get("#board").style.display = "none";
  get(".buttonList")[0].style.display = "flex";
  get("#reload").style.display = "block";
  get("#gameOver").style.display = "flex";

  if (mode === "win") {
    get("#gameOver").style.color = _currentPlayer == 1 ?  COLOR_PLAYER1 : COLOR_PLAYER2;
    get("#gameOver").innerHTML = CONTENT.win_part1 + _currentPlayer + CONTENT.win_part2;
  }

  if (mode === "lose") {
    get("#gameOver").style.color = COLOR_DRAW;
    get("#gameOver").innerHTML = CONTENT.draw;
  }
}