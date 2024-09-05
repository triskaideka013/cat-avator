class PlatformerStage extends StageBase {
  constructor() {
    super("platformer");
    this.platforms = [];
    this.powerups = [];
    this.enemies = [];
    this.player = null;
  }

  init() {
    super.init();

    // setup canvas
    canvasFixedSize = vec2(1920, 1080); // 1080p

    // adjust camera scale
    cameraScale = 4 * 12;

    // initialize platforms and powerups
    this.platforms = PlatformFactory.createPlatforms();
    this.powerups = PowerupFactory.createPowerups();

    // initialize enemies
    this.enemies = EnemyFactory.createEnemies(this.platforms);

    // find pos.y of the lowest platform in level
    this.stageMinimumY = 0;
    this.platforms.forEach((p) => {
      if (p.pos.y < this.stageMinimumY) this.stageMinimumY = p.pos.y;
    });

    // initialize player
    this.player = new Player(
      vec2(10, 4),
      vec2(2, 3),
      new Color(1, 1, 1),
      this.platforms,
      this.powerups,
      this.stageMinimumY,
      this.enemies
    );

    // center camera on player
    cameraPos = this.player.pos.add(vec2(10, 0));
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    if (this.player.hasDied()) {
      this.teardown();
      this.fail();
      return;
    }

    if (this.player.hasWon()) {
      this.teardown();
      this.complete();
      return;
    }
  }

  gameRender() {
    if (!this.state.isActive()) return;
  }

  gameRenderPost() {
    if (!this.state.isActive()) return;

    drawTextScreen("The Platformer Stage", vec2(mainCanvasSize.x / 2, 100), 80);

    drawTextScreen(
      `Score: ${this.player.getScore()}`,
      vec2(1000, 50),
      50,
      new Color(1, 1, 1)
    );

    //debug
    var playerPos = this.player.getPlayerCoords();

    drawTextScreen(
      `Pos: ${Math.round(playerPos.x)}, ${Math.round(playerPos.y)}`,
      vec2(1300, 50),
      50,
      new Color(1, 1, 1)
    );

    this.platforms.forEach((platform) => platform.render());
    this.powerups.forEach((powerup) => powerup.render());
    this.enemies.forEach((enemy) => enemy.render());
    this.player.render();

    // center on player
    cameraPos = this.player.pos.add(vec2(10, 0));
  }

  // destroy game objects
  teardown()
  {
    this.player.destroy();
    this.platforms.forEach(p => p.destroy());
    this.powerups.forEach(p => p.destroy());
    this.enemies.forEach(e => e.destroy());
  }
}
