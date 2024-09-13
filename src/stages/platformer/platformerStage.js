// uncomment this line to reference LittleJS types -->
// import { Color, vec2, drawTextScreen, mousePos, mouseWasPressed } from "littlejsengine"

// Level Config now defined in src/stages/stageLoader.js

class PlatformerStage extends StageBase {
  constructor(levelConfig, powerupManager) {
    super("platformer");
    this.platforms = [];
    this.powerups = [];
    this.enemies = [];
    this.player = null;
    this.levelConfig = levelConfig;
    this.powerupManager = powerupManager;
    debugger;
  }

  init() {
    super.init();

    // setup canvas
    canvasFixedSize = vec2(1920, 1080); // 1080p

    // adjust camera scale
    cameraScale = 4 * 12;

    // initialize platforms and powerups
    this.platforms = PlatformFactory.createPlatforms(this.levelConfig.platforms);
    this.powerups = PowerupFactory.createPowerups(this.levelConfig.powerups);

    // initialize enemies
    this.enemies = EnemyFactory.createEnemies(this.platforms, this.levelConfig.enemies, this.levelConfig.enemySpeeds);

    window.addEventListener('enemy-destroyed', this.enemyCleanup.bind(this));

    // find pos.y of the lowest platform in level
    this.minimumStageY = 0;
    this.platforms.forEach((p) => {
      if (p.pos.y < this.minimumStageY) this.minimumStageY = p.pos.y;
    });
    // initialize player
    this.player = new Player(
      vec2(10, 4),
      {...this}
    );

    // center camera on player
    cameraPos = this.player.pos.add(vec2(10, 0));
  }

  enemyCleanup(event) {
    this.enemies = this.enemies.filter(e => e !== event.detail);
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    if (this.player.hasDied()) {
      this.teardown();
      this.fail();
      return;
    }

    if (mouseWasPressed(0) && this.powerupManager.getYarnBallCount() > 0) {
        new HairBall(this.player.pos, pointsToAngle(this.player.pos, mousePos));
        this.powerupManager.removeYarnBall();
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

    drawTextScreen(`🧶(yarnballs): ${this.powerupManager.getYarnBallCount()}` , vec2(100, 30), 30);

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

    [this.platforms, this.powerups, this.enemies, [this.player]].forEach(lst => lst.forEach(el => el.render()));

    // center on player
    cameraPos = this.player.pos.add(vec2(10, 0));
  }

  // destroy game objects
  teardown()
  {
    [[this.player], this.platforms, this.powerups, this.enemies].forEach(lst => lst.forEach(el => el.destroy()));
  }
}
