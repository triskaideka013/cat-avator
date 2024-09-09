class SimplePuzzleStage extends StageBase {
  constructor() {
    super("puzzler");
    this.timer = 5;
    this.countDownInterval = setInterval(() => {
      this.timer--;
    }, 1000);
  }

  init() {
    super.init();
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    if (this.timer <= 0) {
      clearInterval(this.countDownInterval);
      this.complete();
    }
  }

  gameRender() {
    if (!this.state.isActive()) return;
    super.gameRender();
    // draw to overlay canvas for hud rendering
    drawTextScreen(
      `Puzzle Stage exiting in ${this.timer}s`,
      vec2(mainCanvasSize.x / 2, 70),
      80
    );
    var time = this.timer;
  }

  gameRenderPost() {}
}
