// CANVAS SETUP
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var gameWidth = canvas.width;
var gameHeight = canvas.height;

// GAME STATE
var currentState = "startMenu";

// RENDERING SETTINGS
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

// EVENT LISTENERS
window.addEventListener("load", startMenu);
window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("click", handleClick);

// SOUNDS AND MUSIC
var gameAudio = new Audio("assets/music/gamemusic.mp3");
var clickSound = new Audio("assets/music/button.mp3");

// CLICK HANDLER
function handleClick(event) {
  var rect = canvas.getBoundingClientRect();
  var x = (event.clientX - rect.left) * (gameWidth / rect.width);
  var y = (event.clientY - rect.top) * (gameHeight / rect.height);
  
  if (currentState === "startMenu" && isPointInButton(x, y, playButton)) {
    currentState = "playing";
    clickSound.play();
    startGame();
  }
}

function isPointInButton(x, y, button) {
  return x >= button.x && 
         x <= button.x + button.width && 
         y >= button.y && 
         y <= button.y + button.height;
}

// CANVAS RESIZE FUNCTION
function resizeCanvas() {
  var aspectRatio = 1280 / 720;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  var newWidth, newHeight;
  
  if (windowWidth / windowHeight > aspectRatio) {
    newHeight = windowHeight * 0.9; 
    newWidth = newHeight * aspectRatio;
  } else {
    newWidth = windowWidth * 0.9; 
    newHeight = newWidth / aspectRatio;
  }
  
  canvas.style.width = newWidth + 'px';
  canvas.style.height = newHeight + 'px';
}

// BUTTON DRAWING FUNCTION
function drawButton(button) {
  ctx.drawImage(button.buttonImage, button.x, button.y, button.width, button.height);
}

// START MENU 
const playButton = {
  x: (gameWidth - 560) / 2,
  y: (gameHeight - 120) / 2,
  width: 560,
  height: 120,
  buttonImage: new Image()
};
playButton.buttonImage.src = "assets/images/play.png";

function startMenu() {
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);
    drawButton(playButton);
  };
  backgroundImage.src = "assets/images/startmenu.png";
}

// GAME START
function startGame() {
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);
  };
  backgroundImage.src = "assets/images/game.png";
  setTimeout(function() {
    gameAudio.loop = true;
    gameAudio.play();
  }, 200);
}