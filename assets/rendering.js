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