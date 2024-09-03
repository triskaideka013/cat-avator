class PlatformerStage extends StageBase {
  constructor() {
    super();
  }

  init() {
    super.init();
  }

  gameUpdate() {
    if (!this.state.isActive()) return;
  }

  gameRender() {
    if (!this.state.isActive()) return;
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;

    drawTextScreen("The Platformer Stage", vec2(mainCanvasSize.x / 2, 70), 80);
  }
}
