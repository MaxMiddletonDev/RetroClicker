window.addEventListener("load", startMenu);

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