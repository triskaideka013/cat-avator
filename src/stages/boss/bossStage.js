function getPlatCoords(left, right, bottom, top) {
  return {
    x: (left + right) / 2,
    y: (bottom + top) / 2,
    width: right - left,
    height: top - bottom,
  };
}

class BossStage extends StageBase {
  constructor(levelConfig, powerupManager) {
    super();
    this.player = null;
    this.powerupManager = powerupManager;
    this.levelConfig = levelConfig;

    // setup canvas
    canvasFixedSize = vec2(1920, 1080); // 1080p
    // adjust camera scale
    cameraScale = 4 * 12;

    // Ypos of floor
    this.minimumStageY = -10;

    this.platforms = [];
    this.yarns = [];
    this.fishies = [];
    this.enemies = [];
    this.rng = new RandomGenerator(100111);

    // generate platforms
    for (let gen of levelConfig.genPlats) {
      let count = gen.count;
      let x = gen.initX;
      let y = gen.initYTop;

      for (let i = 0; i < count; i++) {
        let coords = getPlatCoords(x, x + gen.width, y - gen.height, y);
        // make platforms
        this.platforms.push(
          new Platform(
            vec2(coords.x, coords.y),
            vec2(coords.width, coords.height),
            new Color(0.5, 0.5, 0.5)
          )
        );
        // make yarns
        if (gen.yarns && i >= gen.yarns.minIndex && i % gen.yarns.modulo == 0) {
          var yarnX = this.rng.int(x, x + gen.width);
          var yarnY = this.rng.int(y + 1, y + 4);
          this.yarns.push(new HairBall(vec2(yarnX, yarnY), 0));
        }
        // make fishies
        if(gen.fishies)
        {
          if(gen.fishies.platIndex.indexOf(i) != -1)
          {
            var fishX = this.rng.int(x, x + gen.width);
            var fishY = this.rng.int(y + 1, y + 4);
            this.fishies.push(
              new PowerUp(vec2(fishX, fishY), vec2(1, 1), new Color(1, 1, 0))
            );
          }
        }
         
        

        x += gen.driftX;
        y += gen.driftY;
      }
    }
    // explicit platforms
    for (let p of this.levelConfig.platforms) {
      this.platforms.push(
        new Platform(
          vec2(p.x, p.y),
          vec2(p.width, p.height),
          new Color(0.5, 0.5, 0.5)
        )
      );
    }
  }

  init() {
    super.init();

    this.player = new Player(vec2(10,3), {
      platforms: this.platforms,
      powerups: this.fishies,
      minimumStageY: -10,
      enemies: this.enemies,
    });

    // center camera on player
    cameraPos = this.player.pos.add(vec2(10, 0));
  }

  gameUpdate() {
    if (!this.state.isActive()) return;

    for (let i = 0; i < this.yarns.length; i++) {
      var yarn = this.yarns[i];

      if (!yarn) continue;
      //
      if (
        isOverlapping(this.player.pos, this.player.size, yarn.pos, yarn.size)
      ) {
        this.powerupManager.addYarnBalls(1);
        // remove from list.
        this.yarns.splice(i, 1);
        yarn.destroy();
      }
    }
  }

  gameRender() {}

  gameRenderPost() {
    for (let y of this.yarns) {
      y.render();
    }

    // center on player
    cameraPos = this.player.pos.add(vec2(10, 0));

    drawTextScreen(
      `🧶(yarnballs): ${this.powerupManager.getYarnBallCount()}`,
      vec2(100, 30),
      30
    );

    this.platforms.forEach((platform) => platform.render());
    this.fishies.forEach((fishy) => fishy.render());
    this.enemies.forEach((enemy) => enemy.render());
  }
}
