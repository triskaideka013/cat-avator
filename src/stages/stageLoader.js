/**
 * Manage the loading of playable levels, provide level configuration
 * for any stage instance, and inject the powerup manager into each stage
 */
class StageLoader {
  constructor(powerupManager) {
    this.levelMap = new Map();
    this.powerupManager = powerupManager;

    /**
     * Defines the level to be loaded for each elevator floor.
     * Corresponding configuration object will be provided
     * to the level's constructor when the builder method is invoked.
     */
    var simplePlatformerLevel1 = this.simplePlatformerLevel1Config();
    var simplePlatformerLevel2 = this.simplePlatformerLevel2Config();
    var stairwayPlatformerLevel = this.stairwayPlatformerLevelConfig();
    var simplePlatformerLevel3 = this.simplePlatformerLevel3Config();
    var simplePlatformerLevel4 = this.simplePlatformerLevel4Config();

    this.levelBuilderConfig = [
      {
        index: 0,
        builder: this.platformerBuilder,
        config: simplePlatformerLevel1,
        config: {
          ...stairwayPlatformerLevel,
          enemySpeeds: Array(stairwayPlatformerLevel.enemies.length).fill().map((_, i) => vec2(0, 6 / 60))
        }
      },
      {
        index: 1,
        builder: this.platformerBuilder,
        config: simplePlatformerLevel2,
      },
      {
        index: 2,
        builder: this.platformerBuilder,
        config: stairwayPlatformerLevel,
      },
      {
        index: 3,
        builder: this.platformerBuilder,
        config: simplePlatformerLevel3,
      },
      {
        index: 4,
        builder: this.platformerBuilder,
        config: simplePlatformerLevel4,
      },
      {
        index: 5,
        builder: this.platformerBuilder,
        config: {
          ...simplePlatformerLevel1,
          enemySpeeds: Array(simplePlatformerLevel1.enemies.length).fill().map((_, i) => vec2(4 / 60, 0))
        }
      },
      {
        index: 6,
        builder: this.platformerBuilder,
        config: {
          ...simplePlatformerLevel2,
          enemySpeeds: Array(simplePlatformerLevel2.enemies.length).fill().map((_, i) => vec2(4 / 60, 0))
        }
      },
      {
        index: 7,
        builder: this.platformerBuilder,
        config: {
          ...stairwayPlatformerLevel,
          enemySpeeds: Array(stairwayPlatformerLevel.enemies.length).fill().map((_, i) => vec2(0, 6 / 60))
        }
      },
      {
        index: 8,
        builder: this.platformerBuilder,
        config: {
          ...simplePlatformerLevel3,
          enemySpeeds: Array(simplePlatformerLevel3.enemies.length).fill().map((_, i) => vec2(4 / 60, 0))
        }
      },
      {
        index: 9,
        builder: this.platformerBuilder,
        config: {
          ...simplePlatformerLevel4,
          enemySpeeds: Array(simplePlatformerLevel4.enemies.length).fill().map((_, i) => vec2(4 / 60, 0))
        }
      },
      {
        index: 10,
        builder: this.platformerBuilder,
        config: {
          ...simplePlatformerLevel3,
          enemySpeeds: Array(simplePlatformerLevel3.enemies.length).fill().map((_, i) => vec2(6 / 60, 4 / 60))
        }
      },
      {
        index: 11,
        builder: this.gamblerBuilder,
        // config: defaultGamblerConfig,
      },
      {
        index: 12,
        builder: this.bossBuilder,
        config: {},
      },
    ];

    // register each level's builder method with the
    // corresponding elevator button index
    for (let level of this.levelBuilderConfig) {
      this.levelMap.set(
        level.index,
        level.builder(level.config, this.powerupManager)
      );
    }
  }

  /**
   * Retrieve the closure to construct an instance of
   * a playable level for the corresponding elevator floor's index
   *
   * @param {*} index the selected elevator button's mapped index
   * @returns a closure: () => GameStage that instantates the mapped level & passes
   * the corresdponding config object
   */
  getLevelBuilderByIndex(index) {
    return this.levelMap.get(index);
  }

  /**
   * Creates a closure which returns an instance of platformer stage.
   * @param {*} config the mapped level config to provided to the stage
   * @param {PowerupManager} powerupManager pass stageLoader's powerup manager to each stage
   * @returns an instance of PlatformerStage
   */
  platformerBuilder(config, powerupManager) {
    return () => new PlatformerStage(config, powerupManager);
  }

  /**
   * Creates a closure which returns an instance of the gambler/dice stage.
   * @param {*} config the mapped level config to provided to the stage
   * @returns an instance of DiceeStage
   */
  gamblerBuilder(config, powerupManager) {
    return () => new DiceStage(config, powerupManager);
  }

  bossBuilder(config, powerupManager){
    return () => new BossStage(config, powerupManager);
  }

  /**
   * Helper function to create a platform data object
   * @param {number} left
   * @param {number} right
   * @param {number} bottom
   * @param {number} top
   * @returns {{ x: number, y: number, width: number, height: number }}
   */
  plat(left, right, bottom, top) {
    return { x: (left + right) / 2, y: (bottom + top) / 2, width: right - left, height: top - bottom}
  }

  /**
   * platformer configuration values
   */

  /**
   * Stairway Level config
   * @returns
   */
  stairwayPlatformerLevelConfig() {
    return {
      platforms: [
        // steps
        { x: 10, y: 3, width: 5, height: 1, color: color.red },
        { x: 15, y: 6, width: 5, height: 1, color: color.red },
        { x: 20, y: 9, width: 5, height: 1, color: color.red },
        { x: 25, y: 12, width: 5, height: 1, color: color.red },
        { x: 30, y: 15, width: 5, height: 1, color: color.red },
        { x: 35, y: 18, width: 5, height: 1, color: color.red },
        { x: 40, y: 21, width: 5, height: 1, color: color.red },
        { x: 45, y: 24, width: 5, height: 1, color: color.red },
        { x: 50, y: 27, width: 5, height: 1, color: color.red },
        { x: 55, y: 30, width: 5, height: 1, color: color.red },
        // left wall
        { x: 7.5, y: 20.5, width: 1, height: 36, color: color.red },
        // risers
        { x: 12.5, y: 4.5, width: 1, height: 4, color: color.red },
        { x: 17.5, y: 7.5, width: 1, height: 4, color: color.red },
        { x: 22.5, y: 10.5, width: 1, height: 4, color: color.red },
        { x: 27.5, y: 13.5, width: 1, height: 4, color: color.red },
        { x: 32.5, y: 16.5, width: 1, height: 4, color: color.red },
        { x: 37.5, y: 19.5, width: 1, height: 4, color: color.red },
        { x: 42.5, y: 22.5, width: 1, height: 4, color: color.red },
        { x: 47.5, y: 25.5, width: 1, height: 4, color: color.red },
        { x: 52.5, y: 28.5, width: 1, height: 4, color: color.red },
        { x: 57.5, y: 31.5, width: 1, height: 4, color: color.red }
      ],
      powerups: [
        { x: 55, y: 33 }
      ],
      enemies: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  }

  /**
   * A platformer level config
   * @returns
   */
  simplePlatformerLevel1Config() {
    return {
      platforms: [
        this.plat(7.5, 8.5, 7.5, 8.5),        // 0: wall
        this.plat(7.5, 12.5, 2.5, 3.5),       // 1: platform
        this.plat(10, 15, 2.5, 3.5),          // 2: wall
        this.plat(17, 18, 2.5, 10.5),         // 3: wall
        this.plat(12.5, 17.5, 2.5, 3.5),      // 4: platform

        this.plat(22, 23, 2.5, 13.5),         // 5: wall
        this.plat(22.5, 27.5, 2.5, 3.5),      // 6: platform

        this.plat(37, 42, 2.5, 3.5),          // 7: platform
        this.plat(41.5, 42.5, 2.5, 7.5)       // 8: wall
      ],
      powerups: [
        { x: 42, y: 12 }
      ],
      enemies: [4, 6]
    };
  }

  /**
   * A platformer level config
   * @returns
   */
  simplePlatformerLevel2Config() {
    return {
      platforms: [
        this.plat(9, 14, 2.5, 3.5),           // 0: platform
        this.plat(13, 14, -6.5, 2.5),         // 1: wall
        this.plat(9, 13, -6.5, -5.5),         // 2: platform
        this.plat(9, 10, -18.5, -6.5),        // 3: wall
        this.plat(10, 14, -18.5, -17.5),      // 4: platform
        this.plat(9, 11.5, -25.5, -24.5),     // 5: platform
        this.plat(11.5, 14, -25.5, -24.5),    // 6: platform
        this.plat(30, 40, -18.5, -17.5),      // 7: platform
        this.plat(30, 40, -25.5, -24.5)       // 8: platform
      ],
      powerups: [
        { x: 11.5, y: -8 },
        { x: 11.5, y: -19.5 },
        { x: 35, y: -19.5 }
      ],
      enemies: [2, 4, 5, 6, 7, 8]
    };
  }

  /**
   * A platformer level config
   * @returns
   */
  simplePlatformerLevel3Config() {

    const middlePlatform = this.plat(-30, 30, 2.5, 3.5);
    const middlePlatformEnemyRanges = Array(6).fill().map((_, i) => this.plat(-30 + 5 * i, -20 + 5 * i, 2.5, 3.5));
    const upperPlatform = this.plat(-30, 30, 15.5, 16.5);
    const upperPlatformEnemyRanges = Array(7).fill().map((_, i) => this.plat(-30 + 5 * i, -20 + 5 * i, 15.5, 16.5));
    const lowerPlatform = this.plat(-50, 50, -8.5, -7.5);
    const lowerPlatformEnemyRanges = Array(18).fill().map((_, i) => this.plat(-50 + 5 * i, -40 + 5 * i, -8.5, -7.5));

    return {
      platforms: [
        middlePlatform,                            //     0: middle platform
        ...middlePlatformEnemyRanges,              //   1-6: middle platform enemy ranges
        upperPlatform,                             //     7: upper platform
        ...upperPlatformEnemyRanges,               //  8-14: upper platform enemy ranges
        lowerPlatform,                             //    15: lower platform
        ...lowerPlatformEnemyRanges                // 16-34: lower platform enemy ranges
      ],
      powerups: [
        { x: -35, y: 6 }, { x: 35, y: 6 },         // middle platform powerups
        { x: -10, y: -4 }, { x: 0, y: -4 },        // lower platform powerups
        { x: 10, y: -4 },
        { x: 0, y: 22.5 }, { x: 0, y: 30 },        // upper platform powerups
      ],
      enemies: [
        ...Array(6).fill().map((_, i) => i + 1),   // indices of middle platform enemy ranges
        ...Array(7).fill().map((_, i) => i + 8),   // indices of upper platform enemy ranges
        ...Array(18).fill().map((_, i) => i + 16)  // indices of lower platform enemy ranges
      ]
    };
  }

  /**
   * A platformer level config
   * @returns
   */
  simplePlatformerLevel4Config() {
    return {
      platforms: [
        { x: -5, y: 3, width: 10, height: 1, color: color.yellow },    // 0
        { x: 10, y: 3, width: 10, height: 1, color: color.red },       // 1
        { x: 20, y: 8, width: 10, height: 1, color: color.green },     // 2
        { x: 30, y: 18, width: 10, height: 1, color: color.aqua },     // 3
        { x: 40, y: 8, width: 10, height: 1, color: color.yellow },    // 4
        { x: 50, y: 3, width: 10, height: 1, color: color.fuchsia },   // 5
        { x: 70, y: 3, width: 5, height: 1, color: color.aqua },       // 6
        { x: 90, y: 8, width: 5, height: 1, color: color.red },        // 7

      ],
      powerups: [
        { x: -5, y: 5 },
        { x: 90, y: 12 },
        { x: 30, y: 22}
      ],
      enemies: [0, 2, 3, 5],
    };
  }
}
