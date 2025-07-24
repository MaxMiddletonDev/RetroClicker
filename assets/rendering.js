window.addEventListener("resize", resizeCanvas);

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

// STATS PANEL FUNCTION
function drawStatsPanel() {
  drawImage(statsPanel);
  var panelX = statsPanel.x + 160;
  var panelY = statsPanel.y + 65;
  ctx.fillStyle = "#c6baac";
  ctx.font = "60px arcadeclassicregular";
  ctx.fillText(cashAmount, panelX, panelY + 99);
  ctx.fillText(cashPerClick, panelX, panelY + 147);
  ctx.fillText(cashPerSecond, panelX, panelY + 195);
}

// UPDATE CASH TEXT FUNCTION
function updateText() {
  var textX = cashTally.x + cashTally.width - 325; 
  var textY = cashTally.y + 65; 
  ctx.fillStyle = "#1e1c32";
  ctx.fillRect(textX, textY - 20, 300, 20);
  ctx.font = "30px arcadeclassicregular";
  ctx.fillStyle = "#c6baac";
  ctx.fillText(cashAmount, textX, textY);

  if (currentUIPanel === "stats") {
    drawStatsPanel();
  }
}

// IMAGE OBJECTS
const playButton = {
  x: (gameWidth - 560) / 2,
  y: (gameHeight - 120) / 2,
  width: 560,
  height: 120,
  image: new Image()
};
playButton.image.src = "assets/images/play.png";

const clicker = {
  x: (gameWidth - 480) / 8,
  y: (gameHeight - 244) / 3.5,
  width: 384,
  height: 384,
  image: new Image(),
}
clicker.image.src = "assets/images/frog.png";

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

const statsPanel = {
  x: (gameWidth - 505),
  y: (gameHeight - 640),
  width: 424,
  height: 480,
  image: new Image(),
}
statsPanel.image.src = "assets/images/statspanel.png";

const prestigeButton = {
  x: (gameWidth - 96) / 2,
  y: (gameHeight - 96) / 1.5,
  width: 96,
  height: 96,
  image: new Image(),
}
prestigeButton.image.src = "assets/icons/prestige.png";
