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
    var stairwayPlatformLevel = this.stairwayPlatformerLevelConfig();
    var platformDefaults = this.defaultPlatformLevelConfig();

    this.levelBuilderConfig = [
      {
        index: 0,
        builder: this.platformerBuilder,
        config: simplePlatformerLevel1,
      },
      {
        index: 1,
        builder: this.puzzleBuilder,
        config: platformDefaults,
      },
      {
        index: 2,
        builder: this.platformerBuilder,
        config: stairwayPlatformLevel,
      },
      {
        index: 3,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 4,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 5,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 6,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 7,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 8,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 9,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 10,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 11,
        builder: this.platformerBuilder,
        config: platformDefaults,
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
   * Creates a closure which returns an instance of puzzle stage.
   * @param {*} config the mapped level config to provided to the stage
   * @returns an instance of SimplePuzzleStage
   */
  puzzleBuilder(config, powerupManager) {
    return () => new SimplePuzzleStage(config, powerupManager);
  }

  /**
   * default platformer configuration values
   */

  /**
   * Provide default configuration values for platform levels
   * @returns
   */
  defaultPlatformLevelConfig() {
    return {
      platforms: [
        { x: -30, y: 3, width: 10, height: 1, color: color.yellow },
        { x: 10, y: 3, width: 10, height: 1, color: color.red },
        { x: 20, y: 8, width: 10, height: 1, color: color.green },
        { x: 30, y: 14, width: 10, height: 1, color: color.aqua },
        { x: 40, y: 8, width: 10, height: 1, color: color.yellow },
        { x: 50, y: 3, width: 10, height: 1, color: color.fuchsia },
        { x: 70, y: 3, width: 5, height: 1, color: color.aqua },
        { x: 90, y: 8, width: 5, height: 1, color: color.red },
        { x: 95, y: 25, width: 5, height: 1, color: color.black },
        { x: 110, y: 2, width: 20, height: 1, color: color.green },
        { x: 140, y: 2, width: 5, height: 1, color: color.red },
        { x: 180, y: 2, width: 5, height: 1, color: color.aqua },
        { x: 240, y: 2, width: 5, height: 1, color: color.aqua },
        { x: 240, y: -50, width: 5, height: 1, color: color.aqua },
        { x: -50, y: 32, width: 300, height: 1, color: color.black },
      ],
      powerups: [
        { x: -30, y: 5 },
        { x: 6, y: 5 },
        { x: 140, y: 5 },
        { x: 180, y: 7 },
        { x: 100, y: 30 },
        { x: 240, y: 4 },
        { x: 240, y: -48 },
      ],
      enemies: [2, 5],
    };
  }

  /**
   * Another platform level configuration
   * Stairway Level
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
        { x: 8, y: 8, width: 1, height: 1 },  // 0: wall
        { x: 10, y: 3, width: 5, height: 1 },  // 1: platform
        { x: 12.5, y: 3, width: 5, height: 1 },  // 2: wall

        { x: 17.5, y: 6.5, width: 1, height: 8 },  // 3: wall
        { x: 15, y: 3, width: 5, height: 1 },  // 4: platform

        { x: 22.5, y: 7.5, width: 1, height: 10 },  // 5: wall
        { x: 25, y: 3, width: 5, height: 1 },  // 6: platform

        { x: 39.5, y: 3, width: 5, height: 1 },  // 7: platform
        { x: 42, y: 5, width: 1, height: 5 },  // 8: wall
      ],
      powerups: [
        { x: 42, y: 12 }
      ],
      enemies: [4, 6]
    };
  }

  /**
   * Helper function to create a platform object
   * @param {number} left
   * @param {number} right
   * @param {number} bottom
   * @param {number} top
   * @returns {{ x: number, y: number, width: number, height: number }}
   */
  plat(left, right, bottom, top) {
    return { x: (left + right) / 2, y: (bottom + top) / 2, width: right - left, height: top - bottom}
  }
}
