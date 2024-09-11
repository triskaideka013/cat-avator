class ElevatorStage extends StageBase {
  constructor(completedLevels) {
    super();

    this.isFinalFloor = completedLevels && completedLevels.length == 12;

    if (window["playerIsACheater"] == true) {
      this.isFinalFloor = true;
    }

    // buttons
    this.disabledButtonColor = new Color(.2, .2, .3);
    this.enabledButtonColor = new Color(.3, .7, .3);
    this.secondaryColor = new Color(.4, .5, .6);

    // button position
    this.buttonPanelOffsetX = 4.5;
    this.buttonPanelOffsetY = 2.55;
    this.panelRenderOffset = vec2(
      Math.floor(this.buttonPanelOffsetX),
      Math.floor(this.buttonPanelOffsetY)
    );

    // world setup
    this.cameraOffset = vec2(0, -0.5);
    this.backgroundColor = hsl(0, 0, 0);
    this.levelSize = vec2(2, 6);

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

    if(PLATFORMER_SONG_PLAYING)
    {
      PLATFORMER_SONG.stop();
    }
 
    cameraScale = 150;

    this.doors = {
      left: {
        x: -1.5,
        y: 5.25,
      },
      right: {
        x: 2,
        y: 5.25,
      },
      w: 3.5,
      h: 6.5,
      bgColor: new Color(.8, 0, .1), 
      panelColor: this.secondaryColor
    };

    this.doorAnimationInterval = null;
    this.doorAnimationComplete = false;
    this.actionAllowed = true;
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    var button = this.tryGetButtonPressed();

    if (button && this.actionAllowed) {
      var enabled = button.getState().isEnabled();

      if (enabled) {
        // pass result payload to stage state
        this.state.setResult(button);

        this.actionAllowed = false;

        this.doorAnimationInterval = setInterval(
          (stage) => {
            var increment = 0.1;

            stage.doors.w -= increment;
            stage.doors.left.x -= increment / 2;
            stage.doors.right.x += increment / 2;

            stage.doors.bgColor = stage.doors.bgColor.mutate(.1, .2);
            
            if (stage.doors.w <= 0) {
              clearInterval(stage.doorAnimationInterval);
              stage.doorAnimationComplete = true;
            }
          },
          50,
          this
        );
      }
    }

    if (this.doorAnimationComplete) {
      this.complete();
        
        if (!PLATFORMER_SONG_PLAYING) {
          PLATFORMER_SONG_PLAYING = true;
          PLATFORMER_SONG.play()
        }
    }

  }

  gameRender() {}

  gameRenderPost() {
    if (!this.state.isActive()) return;
    // button panel background
    this.renderButtonPanelBg();
    // draw the elevator buttons
    const pos = vec2();
    for (pos.x = this.levelSize.x; pos.x--; ) {
      for (pos.y = this.levelSize.y; pos.y--; ) {
        this.renderButton(pos);
      }
    }

    // draw the elevator doors
    this.renderDoors();
    
  }

  renderButton(pos) {
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

  renderDoors() {
    // background
    drawRect(
      vec2(0.25, 5.25), 
      vec2(7, 6.5), 
      this.doors.bgColor
    )
    // left
    drawRect(
      vec2(this.doors.left.x, this.doors.right.y),
      vec2(this.doors.w, this.doors.h),
      this.doors.panelColor
    );
    // right
    drawRect(
      vec2(this.doors.right.x, this.doors.right.y),
      vec2(this.doors.w, this.doors.h),
      this.doors.panelColor
    );
  }

  renderButtonPanelBg()
  {
    drawRect(
      vec2(5, 5.05), 
      vec2(2.05, 6), 
      new Color(.4, .5, .6)
    )
    
  }

  tryGetButtonPressed() {
    if (!mouseWasPressed(0)) return false;

    //raw mousePos
    const mouseTilePos = mousePos.floor();
    // account for render position of the panel buttons
    const adjustedMousePos = mouseTilePos.subtract(this.panelRenderOffset);

    // check for corresponding button
    return this.buttonMap.getButton(adjustedMousePos)?? false;
  }
}
