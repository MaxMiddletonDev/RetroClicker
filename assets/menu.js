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