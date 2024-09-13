class ContinueStage extends StageBase {
  constructor(lifeCount) {
    super("continue");
    this.lifeCount = lifeCount;

    this.messages = [
      "Pfft. More like none orange brain cell.",
      "can haz try again?",
      // "don't fear the reaper",
      "the reaper has been grim to ye",
      "ur strenf has failed you",
      "oh my! what a cat-tastrophe",
      "claw-ful luck you're having",
      "try to keep a paw-sitive attitude",
      // "welp, the cat's not getting outta the bag again",
      "welp, the cat's out of the bag",
      "purrrrfect, you died",
      "one fish, two fish, dead fish you fish",
    ]
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
