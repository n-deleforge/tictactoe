// =================================================
// ============ SETTINGS

const GRID = 3;
const COLOR_PLAYER1 = getVariableCSS("color-p1");
const COLOR_PLAYER2 = getVariableCSS("color-p2");
const COLOR_DRAW = getVariableCSS("color-draw");
let _gameTable; let _listCases; let _lastCell; let _currentPlayer = rand(1, 2);

// =================================================
// ============ MAIN

/**
 * Initialize the game and events
 **/

get("#reload").addEventListener("click", () => { document.location.reload(); });
get("#switchLanguage").addEventListener("click", switchLanguage);
get("#play").addEventListener("click", createGame);

/**
 * Create a new game and add event listener on each case
 **/

 function createGame() {
  // Update the display
  get("#footer").innerHTML = CONTENT.footerInGame;
  get("#player").style.display = "flex";
  get(".buttonList")[0].style.display = "none";
  get("#play").style.display = "none";
  checkPlayer();

  // Creation of the grid
  _gameTable = new Array(GRID * GRID);
  _gameTable.fill(" ");

  // Add listeners on all cases
  _listCases = get(".case");
  for (let i = 0; i < _listCases.length; i++) {
    _listCases[i].innerHTML = "";
    _listCases[i].addEventListener("click", () => { play(i); });
  }
}

/**
 * Check the played case, check the victory and update the turn
 * @param {int} cell the number of played cell
 **/

function play(cell) {
  _lastCell = cell;

  // Check if the case is empty
  if (_gameTable[_lastCell] == " ") {
    get("#writing").play();
    navigator.vibrate("50");

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
  if (newPlayer == true) _currentPlayer == 1 ? _currentPlayer = 2 : _currentPlayer = 1;

  get("#player").style.color = _currentPlayer == 1 ?  COLOR_PLAYER1 :  COLOR_PLAYER2;
  get("#player").innerHTML = CONTENT.turn_part1 + _currentPlayer + CONTENT.turn_part2;
}

/**
 * Check the victory or the draw and call the endGame function
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

      endGame();
      _currentPlayer == 1 ? get("#player").style.color = COLOR_PLAYER1 : get("#player").style.color = COLOR_PLAYER2;
      get("#player").innerHTML = CONTENT.win_part1 + _currentPlayer + CONTENT.win_part2;
  }

  // Check draw
  else if (_gameTable.indexOf(" ") == -1) {
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
  get("#player").style.fontSize = "2em";
}