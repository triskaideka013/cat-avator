
class IntroStage extends StageBase {
  constructor() {
    super("intro");
    this.rng = new RandomGenerator(100101);
  }

  init() {
    super.init();
    // cameraScale = 1;
    this.textColor = new Color(0.7, 0.7, 0.7, 1);
    this.textSize = 40;
    this.textOffsetY = 60;
    this.textOffsetX = mainCanvasSize.x / 2;
    this.lineHeight = 50;

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

    this.buttonPos = vec2(0, -4);
    this.buttonSize = vec2(4, 2);

    this.startButton = new SimpleButton(
      this.buttonPos,
      this.buttonSize,
      new Color(0.7, 0.3, 0.3, 1)
    );
    this.startButton.setText("Start", 1, new Color(0, 0, 0, 1));

    // kitty sprite 
    this.kittyPos = this.getRandomPos();
    this.kittyAngle = this.rng.int(360);
    this.kittySize = this.getRandomSize();
    this.kittyMirror = false;

    this.kittyInterval = setInterval((intro)=>{
      intro.kittyPos = intro.getRandomPos();
      intro.kittyAngle = intro.rng.int(360);
      intro.kittySize = intro.getRandomSize();
      intro.kittyMirror = !intro.kittyMirror;
    }, 1000, this);
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    if(this.startButton.wasClicked())
    {
      clearInterval(this.kittyInterval);
      this.complete();
    }
  }

  gameRender() {
    if (!this.state.isActive()) return;
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;

    let lineCount = 0;
    for (let text of this.textMap) {
      this.renderText(text, lineCount);
      lineCount++;
    }

    this.startButton.render();

    // kitty
    drawTile(this.kittyPos, this.kittySize, tile(0, vec2(18,14), 0), new Color(0,0,0,0.3), this.kittyAngle, this.kittyMirror);
  }

  renderText(text, lineNum) {
    var offsetY = this.textOffsetY + this.lineHeight * lineNum;
    var vec = vec2(this.textOffsetX, offsetY);
    drawTextScreen(text, vec, this.textSize, this.textColor);
  }

  getRandomPos()
  {
    return vec2(this.rng.int(10, -10), this.rng.int(6, -6));
  }

  getRandomSize()
  {
    const val = this.rng.int(4, 12);
    return vec2(val, val);
  }
}
