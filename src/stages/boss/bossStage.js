class BossStage extends StageBase {
  constructor() {
    super();
    this.player = null;

    // setup canvas
    canvasFixedSize = vec2(1920, 1080); // 1080p
    // adjust camera scale
    cameraScale = 4 * 12;

    this.player = new AltPlayer(vec2(10, 2), {
      velocity: 1/8,
      gravity: -0.5 / 100,
    });

    this.boss = new AltVillain(vec2(18, 10), {
        velocity: 1/8,
        gravity: -0.5 / 100,
      });
      this.boss.init();

    // Ypos of floor
    this.minimumStageY = 0;
    // center camera on player
    cameraPos = this.player.pos.add(vec2(10, 0));

    this.platforms = [];
  }

  init() {
    super.init();

    this.floor = new Platform(
      vec2(10, 0),
      vec2(mainCanvasSize.x, 1),
      new Color(0.5, 0.5, 0.5)
    );

    this.platforms.push(this.floor);
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    this.player.update();
    this.boss.update();

    for (let platform of this.platforms) {
      var playerTouchPlatform = this.player.overlapsObject(
        platform.pos,
        platform.size
      );
      if (playerTouchPlatform) {
        this.player.collideWithPlatform(platform.pos, platform.size);
      }

      const villainTouchPlatform = this.boss.overlapsObject(platform.pos, platform.size);

      if(villainTouchPlatform)
        {this.boss.collideWithPlatform(platform.pos, platform.size)

        }
    }
  }

  gameRender() {}

  gameRenderPost() {
    this.player.render();
    this.boss.render();
    this.floor.render();

    // center on player
    cameraPos = this.player.pos.add(vec2(10, 0));
  }

  renderFloor() {}
}
