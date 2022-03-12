// =================================================
// ============ CORE VARIABLES

const VERSION = "1.0";
const GITHUB = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/tictactoe\">GitHub</a>";
const MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const FRENCH = {
    'footer': "Disponible sur " + GITHUB + " (v " + VERSION + ") © 2020 | <a id=\"switchLanguage\"></a>",
    'footerInGame': "Disponible sur " + GITHUB + " (v " + VERSION + ") © 2020",
    'tictactoe': "Le jeu du morpion", 'title': "Le jeu du morpion",
    'play': "Jouer",
    'reload': "Recommencer",
    'turn_part1': "C'est au tour du joueur ",
    'turn_part2': "",
    'win_part1': "Victoire du joueur ",
    'win_part2': " 😁",
    'draw': "Égalité 😱",
    'switchLanguage' : "English"
};

const ENGLISH = {
    'footer': "Available on " + GITHUB + " (v " + VERSION + ") © 2020 | <a id=\"switchLanguage\"></a>",
    'footerInGame': "Available on " + GITHUB + " (v " + VERSION + ") © 2020",
    'tictactoe': "Tic Tac Toe", 'title': "Tic Tac Toe",
    'play': "Play",
    'reload': "Restart",
    'turn_part1': "Player ",
    'turn_part2': " turn",
    'win_part1': "Player ",
    'win_part2': " won 😁",
    'draw': "Draw 😱",
    'switchLanguage' : "Français"
}

// =================================================
// ============ CORE INITIALISATION

// Language cookie
if (!getCookie("GAMZ-language")) setCookie("GAMZ-language" , "EN");

// Determine the language of the app
const CONTENT = (getCookie("GAMZ-language") == "FR") ? FRENCH : ENGLISH;
let names = Object.keys(CONTENT); 
let values = Object.values(CONTENT);

for (let i = 0; i < names.length; i++) {
    if (get("#" + names[i])) get("#" + names[i]).innerHTML = values[i];
}