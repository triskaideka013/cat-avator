class ElevatorStage extends StageBase {
  constructor(completedLevels) {
    super("elevator");

    //Game state registers callback to invoke when level is selected
    this.levelSelectedCallback = null;

    // buttons
    this.disabledButtonColor = rgb(0.3, 0.3, 0.3);
    this.enabledButtonColor = rgb(0.3, 0.8, 0.3);
    this.buttonPanelOffsetX = 4.5;
    this.buttonPanelOffsetY = 2.5;
    this.completeColor = rgb(0, 1, 0, 1);
    this.cameraOffset = vec2(0, -0.5);
    this.backgroundColor = hsl(0, 0, 0.2);
    this.levelSize = vec2(2, 6);

    this.buttonMap = new ElevatorButtonMap(this.levelSize.x, this.levelSize.y, completedLevels);

    // initialize button data
    const position = new vec2();

    // iterate button panel columns
    for (position.x = this.levelSize.x; position.x--; ) {
      // adjust coordinate set for camera offset
      let adjustedX = position.x + this.buttonPanelOffsetX;

      // iterate button panel rows
      for (position.y = this.levelSize.y; position.y--; ) {
        // adjust coordinate set for camera offset
        let adjustedY = position.y + this.buttonPanelOffsetY;

        // create the button coordinate entry
        let absolutePosition = vec2(adjustedX, adjustedY);
        this.buttonMap.setButton(position);
      }
    }
  }

  init() {
    super.init();
    // setup canvas
    canvasFixedSize = vec2(1920, 1080); // 1080p
    mainCanvas.style.background = this.backgroundColor;
    // setup game
    cameraPos = this.levelSize.scale(1).add(this.cameraOffset);
    cameraScale = 900 / this.levelSize.y;
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    var button = this.tryGetButtonPressd();

    if (button && button.getState().isEnabled()) {
      // pass result payload to stage state 
      this.state.setResult(button);
      this.complete();

    }
  }

  gameRender() {
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;
    // draw to overlay canvas for hud rendering
    drawTextScreen("The Elevator Stage", vec2(mainCanvasSize.x / 2, 70), 80);

    // draw the blocks
    const pos = vec2();

    for (pos.x = this.levelSize.x; pos.x--; ) {
      for (pos.y = this.levelSize.y; pos.y--; ) {
        // adjust button position

        const drawPos = pos.add(
          vec2(this.buttonPanelOffsetX, this.buttonPanelOffsetY)
        );

        const button = this.buttonMap.getButton(pos);

        if (button) {
          // fetch the mapped index for position, use as button number
          var buttonNumber = button.getIndex() + 1;

          // render button numbers;
          drawText(buttonNumber.toString(), drawPos, 0.2);

          // determine button color
          const isEnabled = button.getState().isEnabled();

          const color = isEnabled
            ? this.enabledButtonColor
            : this.disabledButtonColor;

          // draw background
          drawRect(drawPos, vec2(0.9), color);
        }
      }
    }
  }

  tryGetButtonPressd() {
    if (!mouseWasPressed(0)) return false;

    //raw mousePos
    const mouseTilePos = mousePos.floor();
    // account for render position of the panel buttons
    const renderOffset = vec2(
      Math.floor(this.buttonPanelOffsetX),
      Math.floor(this.buttonPanelOffsetY)
    );

    const adjustedMousePos = mouseTilePos.subtract(renderOffset);

    // check for corresponding button
    var button = this.buttonMap.getButton(adjustedMousePos);

    return button ?? false;
  }
}
