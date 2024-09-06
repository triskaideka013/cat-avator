class IntroStage extends StageBase {


  
    
    constructor() {
      super("intro");
      this.timer = 0;
    }
  
    init() {
      super.init();
    }
  
    gameUpdate() {
      if (!this.state.isActive()) return;
  
      this.timer += 5;
  
      if (this.timer > 200) {
        this.complete();
      }
    }
  
    gameRender() {
      super.gameRender();
      // draw to overlay canvas for hud rendering
      drawTextScreen("Cat-avator... of Doom?", vec2(mainCanvasSize.x / 2, 70), 80);
      var time = this.timer;
      drawTextScreen(
        `Mock Loading ${Math.round(time)}%`,
        vec2(mainCanvasSize.x / 2, 150),
        80
      );
    }
  
    gameRenderPost() {}

   
  }
  