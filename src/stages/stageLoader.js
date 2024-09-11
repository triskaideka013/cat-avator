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
    var platformDefaults = this.defaultPlatformLevelConfig();
    var defaultGamblerConfig = this.gamblerLevelConfig(false);
    var triskaedekaGamblerConfig = this.gamblerLevelConfig(true);
    this.levelBuilderConfig = [
      {
        index: 0,
        builder: this.platformerBuilder,
        config: platformDefaults,
      },
      {
        index: 1,
        builder: this.gamblerBuilder,
        config: defaultGamblerConfig,
      },
      {
        index: 2,
        builder: this.platformerBuilder,
        config: platformDefaults,
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
        builder: this.gamblerBuilder,
        config: triskaedekaGamblerConfig,
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

  /**
   * default platformer configuration values
   */

  /**
   * Provide deafult coniguration values for platform levels
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
   * default gambler configuration values
   */

  /**
   * Provide default configuration values for gambler levels
   * @param {boolean} riskItAll
   * @returns {Object}
   */
  gamblerLevelConfig(riskItAll) {
    return {
      "riskItAll": riskItAll,
    }
  }
}
