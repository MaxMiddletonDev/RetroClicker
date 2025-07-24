canvas.addEventListener("click", handleClick);
canvas.addEventListener("mousemove", handleMouseMove);

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
      updateText(); 
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
        updateText();
      }
    }
    // PLUS TWO ON CLICK BUTTON
    if (currentUIPanel === "shop" && isPointInButton(x, y, plusTwoOnClick)) {
      if (cashAmount >= 25) {
        cashAmount -= 25;
        cashPerClick += 1; 
        updateText();
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
      drawStatsPanel();
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

  var clickableElements = [
    { button: playButton, condition: currentState === "startMenu" },
    { button: clicker, condition: currentState === "playing" },
    { button: shopButton, condition: currentState === "playing" },
    { button: onePerSecond, condition: currentState === "playing" && currentUIPanel === "shop" },
    { button: plusTwoOnClick, condition: currentState === "playing" && currentUIPanel === "shop" },
    { button: trophyButton, condition: currentState === "playing" },
    { button: statsButton, condition: currentState === "playing" },
    { button: prestigeButton, condition: currentState === "playing" }
  ];

  for (var i = 0; i < clickableElements.length; i++) {
    var element = clickableElements[i];
    if (element.condition && isPointInButton(x, y, element.button)) {
      isOverClickable = true;
      break;
    }
  }
  
  canvas.style.cursor = isOverClickable ? "pointer" : "default";
}

function isPointInButton(x, y, button) {
  return x >= button.x && 
         x <= button.x + button.width && 
         y >= button.y && 
         y <= button.y + button.height;
}

// CASH PER SECOND FUNCTION 
function cashPerSecondMultiplier() {
  setInterval(function() {
    if (currentState === "playing" && cashPerSecond > 0) {
      cashAmount += cashPerSecond;
      updateText();
    }
  }, 1000); 
}