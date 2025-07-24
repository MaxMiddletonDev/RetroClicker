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

const UI_PANEL_WIDTH = 460;
const UI_PANEL_HEIGHT = 508;
const UI_PANEL_OFFSET_X = 524; 
const UI_PANEL_OFFSET_Y = 656;

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

// BUTTON FUNCTIONS
function handleClick(event) {
  var { x, y } = updateMouseCoordinates(event);
  
  if (currentState === "startMenu" && isPointInButton(x, y, playButton)) {
    currentState = "playing";
    clickSound.play();
    startGame();
  }

  if (currentState === "playing") {
    // CLICKER BUTTON
    if (isPointInButton(x, y, clicker)) {
      cashAmount += cashPerClick; 
      updateCashText(); 
    }
    // SHOP BUTTONS
    // SHOP BUTTON
    if (isPointInButton(x, y, shopButton)) {
      currentUIPanel = "shop";
      ctx.fillStyle = "#c6baac";
      ctx.fillRect(gameWidth - UI_PANEL_OFFSET_X, gameHeight - UI_PANEL_OFFSET_Y, UI_PANEL_WIDTH, UI_PANEL_HEIGHT);
      drawImage(onePerSecond);
      drawImage(plusTwoOnClick);
    }
    //ONE PER SECOND BUTTON
    if (currentUIPanel === "shop" && isPointInButton(x, y, onePerSecond)) {
      if (cashAmount >= 10) {
        cashAmount -= 10;
        cashPerSecond += 1; 
        updateCashText();
      }
    }
    // PLUS TWO ON CLICK BUTTON
    if (currentUIPanel === "shop" && isPointInButton(x, y, plusTwoOnClick)) {
      if (cashAmount >= 25) {
        cashAmount -= 25;
        cashPerClick += 1; 
        updateCashText();
      }
    }
    // TROPHY BUTTON
    if (isPointInButton(x, y, trophyButton)) {
      currentUIPanel = "trophy";
      ctx.fillStyle = "#c6baac";
      ctx.fillRect(gameWidth - UI_PANEL_OFFSET_X, gameHeight - UI_PANEL_OFFSET_Y, UI_PANEL_WIDTH, UI_PANEL_HEIGHT);
    }
    // STATS BUTTON
    if (isPointInButton(x, y, statsButton)) {
      currentUIPanel = "stats";
      ctx.fillStyle = "#c6baac";
      ctx.fillRect(gameWidth - UI_PANEL_OFFSET_X, gameHeight - UI_PANEL_OFFSET_Y, UI_PANEL_WIDTH, UI_PANEL_HEIGHT);
    }
    // PRESTIGE BUTTON
    if (isPointInButton(x, y, prestigeButton)) {
      currentUIPanel = "prestige";
      ctx.fillStyle = "#c6baac";
      ctx.fillRect(gameWidth - UI_PANEL_OFFSET_X, gameHeight - UI_PANEL_OFFSET_Y, UI_PANEL_WIDTH, UI_PANEL_HEIGHT);
    }
  }
}

// MOUSE MOVE HANDLER
function handleMouseMove(event) {
  var { x, y } = updateMouseCoordinates(event);
  var isOverClickable = false;
  
  if (currentState === "startMenu" && isPointInButton(x, y, playButton)) {
    isOverClickable = true;
  } 
  if (currentState === "playing" && isPointInButton(x, y, clicker)) {
    isOverClickable = true;
  }
  if (currentState === "playing" && isPointInButton(x, y, shopButton)) {
    isOverClickable = true;
  }
  if (currentState === "playing" && currentUIPanel === "shop" && isPointInButton(x, y, onePerSecond)) {
    isOverClickable = true;
  } 
  if (currentState === "playing" && currentUIPanel === "shop" && isPointInButton(x, y, plusTwoOnClick)) {
    isOverClickable = true;
  }
  if (currentState === "playing" && isPointInButton(x, y, trophyButton)) {
    isOverClickable = true;
  }
  if (currentState === "playing" && isPointInButton(x, y, statsButton)) {
    isOverClickable = true;
  }
  if (currentState === "playing" && isPointInButton(x, y, prestigeButton)) {
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
  currentUIPanel = null; // Reset panel state
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);
    drawImage(cashTally);
    drawImage(clicker);
    drawImage(shopButton);
    drawImage(trophyButton);
    drawImage(statsButton);
    drawImage(prestigeButton);
    updateCashText();
  };
  backgroundImage.src = "assets/images/game.png";
  setTimeout(function() {
    gameAudio.play();
  }, 200);

  cashPerSecondMultiplier();
}

// CASH PER SECOND FUNCTION 
function cashPerSecondMultiplier() {
  setInterval(function() {
    if (currentState === "playing" && cashPerSecond > 0) {
      cashAmount += cashPerSecond;
      updateCashText();
    }
  }, 1000); 
}

// UPDATE CASH TEXT FUNCTION
function updateCashText() {
  var textX = cashTally.x + cashTally.width - 325; 
  var textY = cashTally.y + 65; 
  ctx.fillStyle = "#1e1c32";
  ctx.fillRect(textX, textY - 20, 300, 20);
  ctx.font = "30px arcadeclassicregular";
  ctx.fillStyle = "#c6baac";
  ctx.fillText(cashAmount, textX, textY);
}

// IMAGE OBJECTS
const clicker = {
  x: (gameWidth - 480) / 8,
  y: (gameHeight - 244) / 3.5,
  width: 384,
  height: 384,
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

const onePerSecond = {
  x: (gameWidth - 96) / 1.55,
  y: (gameHeight - 96) / 3.5,
  width: 96,
  height: 96,
  image: new Image(),
}
onePerSecond.image.src = "assets/icons/onepersecplus.png";

const plusTwoOnClick = {
  x: (gameWidth - 96) / 1.55,
  y: (gameHeight - 96) / 8,
  width: 96,
  height: 96,
  image: new Image(),
}
plusTwoOnClick.image.src = "assets/icons/plustwoonclick.png";

const shopButton = {
  x: (gameWidth - 96) / 2,
  y: (gameHeight - 96) / 5,
  width: 96,
  height: 96,
  image: new Image(),
}
shopButton.image.src = "assets/icons/shop.png";

const trophyButton = {
  x: (gameWidth - 96) / 2,
  y: (gameHeight - 96) / 2.8,
  width: 96,
  height: 96,
  image: new Image(),
}
trophyButton.image.src = "assets/icons/trophy.png";

const statsButton = {
  x: (gameWidth - 96) / 2,
  y: (gameHeight - 96) / 1.95,
  width: 96,
  height: 96,
  image: new Image(),
}
statsButton.image.src = "assets/icons/stats.png";

const prestigeButton = {
  x: (gameWidth - 96) / 2,
  y: (gameHeight - 96) / 1.5,
  width: 96,
  height: 96,
  image: new Image(),
}
prestigeButton.image.src = "assets/icons/prestige.png";
