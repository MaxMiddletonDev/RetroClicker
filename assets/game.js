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
    updateText();
    currentUIPanel = null;
  };
  backgroundImage.src = "assets/images/game.png";
  setTimeout(function() {
    gameAudio.play();
  }, 200);

  cashPerSecondMultiplier();
}
