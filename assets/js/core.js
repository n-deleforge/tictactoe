// =================================================
// ============ CORE VARIABLES

const VERSION = "1.0";
const GITHUB = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/tictactoe\">GitHub</a>";
const FOOTER = "V. " + VERSION + " | © 2020-22 | " + GITHUB + " | <a id=\"switchLanguage\"></a>";
const FOOTER_INGAME = "V. " + VERSION + " | © 2020-22 | " + GITHUB;
const COOKIE_LANG = "GAMZ-language";

const FRENCH = {
    'footer': FOOTER,
    'footerInGame': FOOTER_INGAME,
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
    'footer': FOOTER,
    'footerInGame': FOOTER_INGAME,
    'tictactoe': "Tic Tac Toe", 'title': "Tic Tac Toe",
    'play': "Play",
    'reload': "Restart",
    'turn_part1': "Player ",
    'turn_part2': " turn",
    'win_part1': "Player ",
    'win_part2': " won 😁",
    'draw': "Draw 😱",
    'switchLanguage' : "French"
}

// =================================================
// ============ CORE INITIALISATION

// Setup language data
if (!getCookie(COOKIE_LANG)) setCookie(COOKIE_LANG , "EN");
const CONTENT = (getCookie(COOKIE_LANG) == "FR") ? FRENCH : ENGLISH;
let _names = Object.keys(CONTENT);
let _values = Object.values(CONTENT);

for (let i = 0; i < _names.length; i++) {
    if (get("#" + _names[i])) {
        get("#" + _names[i]).innerHTML = _values[i];
    }
}

// Able to switch language between French and English
if (get("#switchLanguage")) {
    get("#switchLanguage").addEventListener("click", () => {
        (getCookie(COOKIE_LANG) == "FR") ? setCookie(COOKIE_LANG, "EN") : setCookie(COOKIE_LANG, "FR");
        location.reload();
    });
}