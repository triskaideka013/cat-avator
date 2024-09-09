
class IntroStage extends StageBase {
  constructor() {
    super("intro");
    this.timer = 0;
  }

  init() {
    super.init();
    console.log(textureInfos);
    this.bgTextureInfo = textureInfos[1];
    this.btnDefault = textureInfos[2];
    this.btnPressed = textureInfos[2];

    console.log(this.bgTextureInfo)
    this.levelSize = vec2(1,2);
    cameraScale = 1;

    this.currentButton = this.btnDefault;
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    this.timer += 5;

    // if (this.timer > 200) {
    //   this.complete();
    // }
  }

  gameRender() {
    if (!this.state.isActive()) return;
    super.gameRender();
    
    // draw to overlay canvas for hud rendering
    // drawTextScreen(
    //   "Cat-avator... of Doom?",
    //   vec2(mainCanvasSize.x / 2, 70),
    //   80
    // );
    var time = this.timer;
    // drawTextScreen(
    //   `Mock Loading ${Math.round(time)}%`,
    //   vec2(mainCanvasSize.x / 2, 150),
    //   80
    // );
  }

  gameRenderPost() {
    //drawRect(vec2(0,0), vec2(1,2), this.textureInfo);
    drawTile(vec2(0), vec2(mainCanvasSize.x, mainCanvasSize.y), tile(vec2(0), this.bgTextureInfo.size, 1), new Color(0,0,0,.6), 0, false);
    //hsl(0, 0, 0.2);

    drawTextScreen(
      `The story begins...`,
      vec2(mainCanvasSize.x / 2, 80),
      60,
      new Color(0.7,0.7,0.7,1)
    );

    drawTextScreen(
      `In a seemingly innocent hotel, which was in fact,`,
      vec2(mainCanvasSize.x / 2, 180),
      40, 
      new Color(0.7,0.7,0.7,1)
    );
    drawTextScreen(
      `not so innocent after all.`,
      vec2(mainCanvasSize.x / 2, 240),
      40, 
      new Color(0.7,0.7,0.7,1)
    );

    drawTextScreen(
      `Trapped by the nefarious treiskaídeka-ites,`,
      vec2(mainCanvasSize.x / 2, 340),
      40,
      new Color(0.7,0.7,0.7,1)
    );

    drawTextScreen(
      `our hero must challenge the denizens of each floor`,
      vec2(mainCanvasSize.x / 2, 400),
      40, 
      new Color(0.7,0.7,0.7,1)
    );

    drawTextScreen(
      `and find a way to escape.`,
      vec2(mainCanvasSize.x / 2, 460),
      40, 
      new Color(0.7,0.7,0.7,1)
    );

    drawRect(vec2(0), vec2(100,100), new Color(0.7,0.7,0.7,1));
  }
}
