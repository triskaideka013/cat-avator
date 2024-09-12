class ElevatorStage extends StageBase {
  constructor(completedLevels) {
    super();

    this.isFinalFloor = completedLevels && completedLevels.length == 12;

    if (window["playerIsACheater"] == true) {
      this.isFinalFloor = true;
    }

    // buttons
    this.disabledButtonColor = new Color(0.2, 0.2, 0.3);
    this.enabledButtonColor = new Color(0.3, 0.7, 0.3);
    this.secondaryColor = this.isFinalFloor
      ? new Color(0.7, 0.2, 0.1, 0.5)
      : new Color(0.4, 0.5, 0.6);

    // button position
    this.buttonPanelOffsetX = 4.5;
    this.buttonPanelOffsetY = 3.5;
    
    // world setup
    this.cameraOffset = vec2(0, -0.5);
    this.backgroundColor = hsl(0, 0, 0);
    this.levelSize = vec2(2, 7);

    // register buttons positions for click detection
    this.buttonMap = new ElevatorButtonMap(
      this.levelSize.x,
      this.levelSize.y,
      completedLevels, 
      this.isFinalFloor
    );

    // initialize button data
    const position = new vec2();

    // iterate button panel columns
    for (position.x = this.levelSize.x; position.x--; ) {
      // iterate button panel rows
      for (position.y = this.levelSize.y; position.y--; ) {
        this.buttonMap.setButton(position);
      }
    }
  }

  init() {
    super.init();
    // setup canvas
    canvasFixedSize = vec2(1920, 1080); // 1080p
    mainCanvas.style.background = this.backgroundColor;
    // setup camera
    cameraPos = this.levelSize.scale(1).add(this.cameraOffset);
    cameraScale = 150;

    // rendering values
    this.doorWidth = 3.5;
    this.doorHeight = 8;
    this.doorOpeningColor = new Color(0.8, 0, 0.1);
    this.doorAdjustIncrement = 0.1;
    this.doorLeftX = -1.5;
    this.doorRightX = 2;
    this.doorY = 6;
    this.doorAnimationInterval = null;
    this.doorAnimationComplete = false;
    this.actionAllowed = true;

    if (PLATFORMER_SONG_PLAYING) {
      PLATFORMER_SONG_PLAYING = false;
      PLATFORMER_SONG.stop();
    }
  }

  gameUpdate() {
    // inactive state 
    if (!this.state.isActive()) return;

    // final animation complete. transition to level
    if (this.doorAnimationComplete) {
      this.complete();

      if (!PLATFORMER_SONG_PLAYING) {
        PLATFORMER_SONG_PLAYING = true;
        PLATFORMER_SONG.play();
      }
      return;
    }

    // animation is playing
    if(!this.actionAllowed) return;

    // check if button clicked
    var button = this.tryGetButtonPressed();
    if (!button || !button?.state?.isEnabled()) return;

    // input disabled
    this.actionAllowed = false;

    // set the stage result to be returned after animation
    this.state.setResult(button);

    // begin animation
    this.doorAnimationInterval = setInterval(
      (stage) => {
        stage.doorWidth -= stage.doorAdjustIncrement;
        stage.doorLeftX -= stage.doorAdjustIncrement / 2;
        stage.doorRightX += stage.doorAdjustIncrement / 2;
        stage.doorOpeningColor = stage.doorOpeningColor.mutate(0.1, 0.2);

        if (stage.doorWidth <= 0) {
          clearInterval(stage.doorAnimationInterval);
          stage.doorAnimationComplete = true;
        }
      },
      50,
      this
    );
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;

    // draw the elevator doors
    this.renderDoors();
    // button panel background
    drawRect(vec2(5, this.doorY), vec2(2.05, this.doorHeight), this.secondaryColor);

    // draw the elevator buttons
    const pos = vec2();
    for (pos.x = this.levelSize.x; pos.x--; ) {
      for (pos.y = this.levelSize.y; pos.y--; ) {
        this.renderButton(pos);
      }
    }
  }

  renderButton(pos) {
    const button = this.buttonMap.getButton(pos);
    // omit 14th floor
    if (button && button.index < 13) {
      // fetch the mapped index for position, use as button number
      var buttonNumber = button.index + 1;
      // adjust button placement
      const drawPos = pos.add(
        vec2(this.buttonPanelOffsetX, this.buttonPanelOffsetY)
      );
      // render button numbers;
      drawText(buttonNumber.toString(), drawPos, 0.2);
      // determine button color
      const color = button.state.isEnabled()
        ? this.enabledButtonColor
        : this.disabledButtonColor;
      // draw background
      drawRect(drawPos, vec2(0.9), color);
    }
  }

  renderDoors() {
    // background
    drawRect(vec2(0.25, this.doorY), vec2(7, 8), this.doorOpeningColor);
    // left
    drawRect(
      vec2(this.doorLeftX, this.doorY),
      vec2(this.doorWidth, this.doorHeight),
      this.secondaryColor
    );
    // right
    drawRect(
      vec2(this.doorRightX, this.doorY),
      vec2(this.doorWidth, this.doorHeight),
      this.secondaryColor
    );
  }

  tryGetButtonPressed() {
    if (!mouseWasPressed(0)) return false;
    //account for render position of the panel buttons
    const offset =  vec2(
      Math.floor(this.buttonPanelOffsetX),
      Math.floor(this.buttonPanelOffsetY)
    );
    const mouseTilePos = mousePos.floor().subtract(offset);
    return this.buttonMap.getButton(mouseTilePos) ?? false;
  }
}