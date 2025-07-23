// CANVAS SETUP
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var gameWidth = canvas.width;
var gameHeight = canvas.height;

// GAME STATE
var cashAmount = 0; 
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
canvas.addEventListener("mousemove", handleMouseMove);

// SOUNDS AND MUSIC
var gameAudio = new Audio("assets/music/gamemusic.mp3");
gameAudio.loop = true;
gameAudio.volume = 0.25; 

var clickSound = new Audio("assets/music/button.mp3");
clickSound.volume = 0.5; 

// MOUSE COORDINATES
function updateMouseCoordinates(event) {
  var rect = canvas.getBoundingClientRect(); 
  var x = (event.clientX - rect.left) * (gameWidth / rect.width);
  var y = (event.clientY - rect.top) * (gameHeight / rect.height);
  return { x: x, y: y };
}

// CLICK HANDLER
function handleClick(event) {
  var { x, y } = updateMouseCoordinates(event);
  
  if (currentState === "startMenu" && isPointInButton(x, y, playButton)) {
    currentState = "playing";
    clickSound.play();
    startGame();
  }

  if (currentState === "playing") {
    if (isPointInButton(x, y, clicker)) {
      cashAmount++; 
      updateCashText(); 
    }
  }
}

// MOUSE MOVE HANDLER
function handleMouseMove(event) {
  var { x, y } = updateMouseCoordinates(event);
  var isOverClickable = false;
  
  if (currentState === "startMenu" && isPointInButton(x, y, playButton)) {
    isOverClickable = true;
  } else if (currentState === "playing" && isPointInButton(x, y, clicker)) {
    isOverClickable = true;
  }
  
  canvas.style.cursor = isOverClickable ? "pointer" : "default";
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

// DRAWING FUNCTION
function drawImage(imageObject) {
  ctx.drawImage(imageObject.image, imageObject.x, imageObject.y, imageObject.width, imageObject.height);
}

// START MENU 
function startMenu() {
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);
    drawImage(playButton);
  };
  backgroundImage.src = "assets/images/startmenu.png";
}

const playButton = {
  x: (gameWidth - 560) / 2,
  y: (gameHeight - 120) / 2,
  width: 560,
  height: 120,
  image: new Image()
};
playButton.image.src = "assets/images/play.png";

// GAME START
function startGame() {
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);
    drawImage(cashTally);
    drawImage(clicker);
    updateCashText();
  };
  backgroundImage.src = "assets/images/game.png";
  setTimeout(function() {
    gameAudio.play();
  }, 200);
}

function updateCashText() {
  var textX = cashTally.x + cashTally.width - 325; 
  var textY = cashTally.y + 65; 
  ctx.fillStyle = "#1e1c32";
  ctx.fillRect(textX, textY - 20, 300, 20);
  ctx.font = "30px arcadeclassicregular";
  ctx.fillStyle = "#c6baac";
  ctx.fillText(cashAmount, textX, textY);
}

const clicker = {
  x: (gameWidth - 96) / 4.8,
  y: (gameHeight - 244) / 2,
  width: 96,
  height: 96,
  image: new Image(),
}
clicker.image.src = "assets/icons/click.png";

const cashTally = {
  x: (gameWidth - 460) / 12,
  y: (gameHeight - 110),
  width: 460,
  height: 92,
  image: new Image(),
}
cashTally.image.src = "assets/images/cashtally.png";