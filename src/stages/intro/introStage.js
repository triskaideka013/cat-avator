class IntroStage extends StageBase {
  constructor() {
    super("intro");
    this.rng = new RandomGenerator(100101);
  }

  init() {
    super.init();
    this.textOffsetX = mainCanvasSize.x / 2;
    this.helpActive = false;
    this.helpBtnText = "Help";
    this.textMap = [
      "The story begins when our weary traveling hero",
      "seeks shelter for the evening at a Totally Normal Hotel™️", 
      "",
      "It turns out this hotel is anything BUT normal, and our hero finds",
      "themselves trapped by the nefarious treiskaídeka-ites.",
      "",
      "Now, you must challenge the denizens of each floor",
      "and find a way to escape before your nine lives are up.",
    ];

    this.helpTextMap = [
      "Shoot🧶: Spacebar | Click",
      "Jump: Up Arrow | W",
      "Move: L/R Arrow | A/D",
      "Win con: collect 🐟   ",
      "Enemies: Shoot or stomp", 
      "Objective: Don't die", 
    ];

    this.activeText = this.textMap;

    this.startButton = new SimpleButton(
      vec2(-3, -5),
      vec2(4, 2),
      new Color(0.7, 0.3, 0.3, 1)
    );
    this.startButton.setText("Start", 1, new Color(0, 0, 0, 1));

    // controls overlay
    this.controlsButton = new SimpleButton(
      vec2(3, -5),
      vec2(4, 2),
      new Color(0.7, 0.3, 0.3, 1)
    );
    this.controlsButton.setText("Help", 1, new Color(0, 0, 0, 1));

    // kitty sprite
    this.kittyPos = this.getRandomPos();
    this.kittyAngle = this.rng.int(360);
    this.kittySize = this.getRandomSize();
    this.kittyMirror = false;

    this.kittyInterval = setInterval(
      (intro) => {
        intro.kittyPos = intro.getRandomPos();
        intro.kittyAngle = intro.rng.int(360);
        intro.kittySize = intro.getRandomSize();
        intro.kittyMirror = !intro.kittyMirror;
      },
      1000,
      this
    );
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    if (this.startButton.wasClicked()) {
      clearInterval(this.kittyInterval);
      this.complete();
    }

    if (this.controlsButton.wasClicked()) {
        if(this.helpActive)
        {
          this.activeText = this.textMap;
          this.controlsButton.setText("Help", 1, new Color(0, 0, 0, 1));
        }
        else 
        {
          this.activeText = this.helpTextMap;
          this.controlsButton.setText("Story", 1, new Color(0, 0, 0, 1));
        }
        this.helpActive =  !this.helpActive;
    }
  }

  gameRender() {
    if (!this.state.isActive()) return;
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;

    // kitty
    drawTile(
      this.kittyPos,
      this.kittySize,
      tile(0, vec2(18, 14), 0),
      new Color(0, 0, 0, 0.3),
      this.kittyAngle,
      this.kittyMirror
    );

  
      let lineCount = 0;
      for (let text of this.activeText) {
        this.renderText(text, lineCount);
        lineCount++;
      }

      this.startButton.render();
      this.controlsButton.render();
    
  }

  renderText(text, lineNum) {
    var offsetY = 60 + (50 * lineNum);
    var offsetX = mainCanvasSize.x / 2;
    drawTextScreen(text, vec2(offsetX, offsetY), 40, new Color(0.7, 0.7, 0.7, 1));
  }

  getRandomPos() {
    return vec2(this.rng.int(10, -10), this.rng.int(6, -6));
  }

  getRandomSize() {
    const val = this.rng.int(4, 12);
    return vec2(val, val);
  }
}
