// uncomment this line to reference LittleJS types -->
// import { Color, vec2, drawTextScreen, mousePos, mouseWasPressed } from "littlejsengine"

// color constants
const color = {
  red: [1, 0, 0],
  yellow: [1, 1, 0],
  green: [0, 1, 0],
  aqua: [0, 1, 1],
  fuchsia: [1, 0, 1],
  black: [0, 0, 0]
};

// Level Config now defined in src/stages/stageLoader.js

class PlatformerStage extends StageBase {
  constructor(levelConfig) {
    super("platformer");
    this.platforms = [];
    this.powerups = [];
    this.enemies = [];
    this.player = null;
    this.levelConfig = levelConfig;
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
    this.enemies = EnemyFactory.createEnemies(this.platforms, this.levelConfig.enemies);

    // find pos.y of the lowest platform in level
    this.minimumStageY = 0;
    this.platforms.forEach((p) => {
      if (p.pos.y < this.minimumStageY) this.minimumStageY = p.pos.y;
    });
    // initialize player
    this.player = new Player(
      vec2(10, 4),
      {
        platforms: this.platforms,
        powerups: this.powerups,
        minimumStageY: this.minimumStageY,
        enemies: this.enemies
      }
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

    if (mouseWasPressed(0)) {
      // if (!this.player.hasDied) {
        new HairBall(this.player.pos, pointsToAngle(this.player.pos, mousePos));
      // }
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
