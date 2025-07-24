// CANVAS SETUP
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var gameWidth = canvas.width;
var gameHeight = canvas.height;

// GAME VARIABLES
var cashAmount = 0; 
var cashPerSecond = 0; 
var cashPerClick = 1; 
var currentState = "startMenu";
var currentUIPanel = null;

// RENDERING SETTINGS
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

// UI PANEL SETTINGS
const UI_PANEL_WIDTH = 460;
const UI_PANEL_HEIGHT = 508;
const UI_PANEL_OFFSET_X = 524; 
const UI_PANEL_OFFSET_Y = 656;

// SOUNDS AND MUSIC
var gameAudio = new Audio("assets/music/gamemusic.mp3");
gameAudio.loop = true;
gameAudio.volume = 0.25; 
var clickSound = new Audio("assets/music/button.mp3");
clickSound.volume = 0.5; 