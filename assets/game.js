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
