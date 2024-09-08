/**
 * Manage the loading of playable levels, provide level configuration
 * for any stage instance, and inject the powerup manager into each stage  
 */
class StageLoader {
  constructor() {
    this.levelMap = new Map();

    /**
     * Defines the level to be loaded for each elevator floor.
     * Corresponding configuration object will be provided
     * to the level's constructor when the builder method is invoked.
     */
    this.levelBuilderConfig = [
      {
        index: 0,
        builder: this.platformerBuilder,
        config: {
          level: 1,
        },
      },
      {
        index: 1,
        builder: this.puzzleBuilder,
        config: {
          level: 2,
        },
      },
      {
        index: 2,
        builder: this.platformerBuilder,
        config: {
          level: 3,
        },
      },
      {
        index: 3,
        builder: this.platformerBuilder,
        config: {
          level: 4,
        },
      },
      {
        index: 4,
        builder: this.platformerBuilder,
        config: {
          level: 5,
        },
      },
      {
        index: 5,
        builder: this.platformerBuilder,
        config: {
          level: 6,
        },
      },
      {
        index: 6,
        builder: this.platformerBuilder,
        config: {
          level: 7,
        },
      },
      {
        index: 7,
        builder: this.platformerBuilder,
        config: {
          level: 8,
        },
      },
      {
        index: 8,
        builder: this.platformerBuilder,
        config: {
          level: 9,
        },
      },
      {
        index: 9,
        builder: this.platformerBuilder,
        config: {
          level: 10,
        },
      },
      {
        index: 10,
        builder: this.platformerBuilder,
        config: {
          level: 11,
        },
      },
      {
        index: 11,
        builder: this.platformerBuilder,
        config: {
          level: 12,
        },
      },
    ];

    // register each level's builder method with the 
    // corresponding elevator button index
    for (let level of this.levelBuilderConfig) {
      this.levelMap.set(level.index, level.builder(level.config));
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
   * @returns an instance of PlatformerStage
   */
  platformerBuilder(config) {
    return () => new PlatformerStage(config);
  }

  /**
   * Creates a closure which returns an instance of puzzle stage.
   * @param {*} config the mapped level config to provided to the stage
   * @returns an instance of SimplePuzzleStage
   */
  puzzleBuilder(config) {
    return () => new SimplePuzzleStage(config);
  }
}
