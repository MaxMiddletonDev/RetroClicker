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

// CASH PER SECOND FUNCTION 
function cashPerSecondMultiplier() {
  setInterval(function() {
    if (currentState === "playing" && cashPerSecond > 0) {
      cashAmount += cashPerSecond;
      updateCashText();
    }
  }, 1000); 
}