const bossStageConfig = {
  platforms: [
    // floor
  //  getPlatCoords(-10, 10, -1, 1),
  ],
  enemies: [],

  genPlats: [
    {
      initX: 7,
      width: 15,
      height: 1,
      initYTop: 3,
      count: 10,
      driftX: 1,
      driftY: 6,
      yarns: {
        minIndex: 1,
        modulo: 3,
      },
      fishies: {
        platIndex: [2],
      },
    },
    {
      initX: -5,
      width: 7,
      height: 1,
      initYTop: 6,
      count: 10,
      driftX: -1,
      driftY: 6,
      yarns: {
        minIndex: 1,
        modulo: 3,
      },
      fishies: {
        platIndex: [8],
      },
    },
  ],
};

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
    for (let gen of bossStageConfig.genPlats) {
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
    for (let p of bossStageConfig.platforms) {
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

     //this.player.update();

    // for (let platform of this.platforms) {
    //   if (this.player.overlapsObject(platform)) {
    //     this.player.collideWithPlatform(platform);
    //   }

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

    // if (this.boss.overlapsObject(platform)) {
    //   this.boss.collideWithPlatform(platform);
    // }
    // }
  }

  gameRender() {}

  gameRenderPost() {
    // this.player.render();
    // this.boss.render();
    // this.floor.render();

    // for (let p of this.platforms) {
    //   //   p.render();
    // }

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
    this.player.render();
  }

  //  renderFloor() {}
}
