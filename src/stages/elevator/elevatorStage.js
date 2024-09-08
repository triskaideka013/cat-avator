let levelSong;
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

    this.songPlaying = false;

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

        // musical
        if (!!levelSong) {
          levelSong.stop()

        } else {

        
   levelSong = new Music(
    [
      [
        [,0,22,,.07,.07,2,0,,,.5,.01],
        [2,0,426,.01,.2,.48,,44,,,200,,,.1],
        [2,0,426,,.02,.2,,44,,,200,,,.1],
        [,0,84,,,,,.7,,,,.5,,6.7,1,.05],
        [2,0,4e3,,,.03,2,1.25,,,,,.02,6.8,-.3,,.5],
        [,0,209,,.02,.25,3],
        [,0,655,,,.09,3,1.65,,,,,.02,3.8,-.1,,.2]
      ],
      [
        [
          [,-1,22,,,,22,,,,22,,17,,20,,22,,,,22,,20,,,,22,,20,,17,,22,,20,,,,20,,,,20,,17,,20,,20,,,,20,,17,,,,20,,17,,20,,22,,]
        ],
        [
          [,-1,15,,,,15,,,,15,,15,,15,,15,,,,15,,15,,,,15,,15,,17,,20,,22,,,,22,,,,22,,17,,20,,22,,,,,,,,,,,,17,,20,,17,,]
        ],
        [
          [,-1,22,,,,22,,,,22,,17,,20,,22,,,,22,,20,,,,22,,20,,17,,22,,20,,,,20,,,,20,,17,,20,,20,,,,20,,17,,,,20,,17,,20,,22,,],
          [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
          [2,1,,,,,,,,,,,34.5,,,,,,34,,,,,,34.5,,,,,,34.5,,34,,,,,,,,,,,,34.5,,,,,,34,,,,,,34.5,,,,,,34.5,,34,,]
        ],
        [
          [,-1,15,,,,15,,,,15,,15,,15,,15,,,,15,,15,,,,15,,15,,17,,20,,22,,,,22,,,,22,,17,,20,,22,,,,,,,,,,,,17,,20,,17,,],
          [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
          [2,1,,,,,,,,,,,34.5,,,,,,34,,,,,,34.5,,,,,,34.5,,34,,,,,,,,,,,,34.5,,,,,,34,,,,,,34.5,,,,,,34.5,,34.5,,]
        ],
        [
          [,-1,22,,,,22,,,,22,,17,,20,,22,,,,22,,20,,,,22,,20,,17,,22,,20,,,,20,,,,20,,17,,20,,20,,,,20,,17,,,,20,,17,,20,,22,,],
          [3,-1,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,],
          [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
          [4,-1,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,],
          [6,-1,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,],
          [2,1,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,]
        ],
          [
            [,-1,15,,,,15,,,,15,,15,,15,,15,,,,15,,15,,,,15,,15,,17,,20,,22,,,,22,,,,22,,17,,20,,22,,,,,,,,,,,,17,,20,,17,,],
            [3,-1,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,],
            [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
            [4,-1,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,],
            [6,-1,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,],
            [2,1,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,]
          ],
            [
              [,-1,22,,,,22,,,,22,,17,,20,,22,,,,22,,20,,,,22,,20,,17,,22,,20,,,,20,,,,20,,17,,20,,20,,,,20,,17,,,,20,,17,,20,,22,,],
              [5,1,22.5,,,,22.5,,,,22.5,,22.5,,,,22.5,,,,22.5,,,,22.5,,22.5,,,,22.5,,22.5,,20.5,,,,20.5,,,,20.5,,20.5,,,,20.5,,,,20.5,,,,20.5,,20.5,,,,20.5,,20.5,,],
              [3,-1,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,],
              [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
              [4,-1,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,],
              [6,-1,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,],
              [2,1,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,]
            ],
            [
              [,-1,15,,,,15,,,,15,,15,,15,,15,,,,15,,15,,,,15,,15,,17,,20,,22,,,,22,,,,22,,17,,20,,22,,,,,,,,,,,,17,,20,,17,,],
              [5,1,27.5,,,,27.5,,,,27.5,,27.5,,,,27.5,,,,27.5,,,,27.5,,27.5,,,,27.5,,27.5,,22.5,,,,22.5,,,,22.5,,22.5,,,,22.5,,,,22.5,,,,22.5,,22.5,,,,22.5,,22.5,,],
              [3,-1,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,],
              [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
              [4,-1,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,],
              [6,-1,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,],
              [2,1,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,]
            ],
            [
              [,-1,22,,,,22,,,,22,,17,,20,,22,,,,22,,20,,,,22,,20,,17,,22,,20,,,,20,,,,20,,17,,20,,20,,,,20,,17,,,,20,,17,,20,,22,,],
              [5,1,10,,13,,,,15,,17,,,,20,,22,,,,20,,,,17,,22,,22,,17,,20,,,,,,,,,,,,,,,,,,,,,,20,,17,,20,,22,,25,,27,,],
              [3,-1,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,],
              [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
              [4,-1,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,],
              [6,-1,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,],
              [2,1,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,]
            ],
            [
              [,-1,15.26,,,,15.26,,,,15.26,,15.26,,15.26,,15.26,,,,15.26,,15.26,,,,15.26,,15.26,,17.26,,20.26,,22.26,,,,22.26,,,,22.26,,17.26,,20.26,,22.26,,,,,,,,,,,,17.26,,20.26,,17.26,,],
              [3,-1,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,25,,,,,,25,,,,,,25,,,,,,,,25,,,,,,,,,,,,],
              [1,1,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34.5,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,],
              [5,1,,,27,,25,,,,27,,,,25,,27,,,,25,,22,,20,,22,,,,18,,20,,22,,,,22,,,,22,,,,22,,,,25,,22,,,,25,,,,22,,25,,22,,],
              [4,-1,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,,,32,,32,,,,,,32,,,,32,,32,,32,,,,32,,,,32,,32,,32,,],
              [6,-1,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,25,,,,,,,,],
              [2,1,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,,,,,,,,,,,34.5,,,,,,34.5,,,,,,34.5,,,,,,34.5,,34.5,,]
            ]
          ],
        [0,1,2,3,4,5,4,5,6,7,6,7,8,9,8,9,6,7,6,7,0,8,9,8,9,6,7,6,7],
      187.5
    ]);

  }
    
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    var button = this.tryGetButtonPressd();

    if (button && button.getState().isEnabled()) {
      // pass result payload to stage state 
      this.state.setResult(button);
      this.complete();

      // start a funky beat
      if (mouseWasPressed(0)) {
        
        if (!this.songPlaying) {
          this.songPlaying = true;
          levelSong.play()
        }

      }

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
