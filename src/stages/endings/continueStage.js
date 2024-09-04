class ContinueStage extends StageBase {
  constructor(lifeCount) {
    super("continue");
    this.lifeCount = lifeCount;

    this.messages = [
      "The bell hath tolled for thee.",
      "Don't fear the reaper.",
      "Your strength has failed you.",
      "Oh my. That was a cat-tastrophe.",
      "What claw-ful luck you're having.",
      "Try to keep a paw-sitive cat-itude.",
      "Welp, that cat's not getting outta the bag again.",
    ];
    this.currentMessage = null;
  }

  init() {
    super.init();
    this.currentMessage = this.messages[randInt(this.messages.length - 1)];
  }

  setLivesLeft(lifeCount) {
    this.lifeCount = lifeCount;
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    if(this.lifeCount == 0)
      {
        this.fail();
        return;
      }

    if (keyWasPressed(KeyboardKeys.KeyY)) {
      this.complete();
      return;
    }

    if (keyWasPressed(KeyboardKeys.KeyN)) {
      this.fail();
      return;
    }
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;

    drawTextScreen(this.currentMessage, vec2(mainCanvasSize.x / 2, 100), 80);

    drawTextScreen(
      `Lives Left: ${this.lifeCount}`,
      vec2(mainCanvasSize.x / 2, 200),
      60
    );

    drawTextScreen(`Try again?  (y/n)`, vec2(mainCanvasSize.x / 2, 300), 60);
  }
}
