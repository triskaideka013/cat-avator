/**
 * base class for self-contained stages.  
 * Extend to create a custom stage
 */
class StageBase extends EngineObject {
    constructor() {
      super();
  
      this.state = new StageState();
    }
  
    /**
     * Main update method.  
     * your stage must implement this method.
     * 
     * Don't forget to check whether your stage
     * is active before executing update logic.  
     * 
     * Failure to do so may cause your stage to continue 
     * executing its update logic when in an inactive|complete|failed
     * state.
     */
    gameUpdate() {

      if (!this.state.isActive()) return;
    }
  
    /**
     * Initialization routine.  
     * If your stage implements this method
     * it must call 
     * 
     * super.init() 
     */
    init() {
      this.state.begin();
    }
  
    /**
     * Optional rendering method.
     * Your may safely skip implementing this method if 
     * your stage does not require it
     */
    gameRender() {}
  
    /**
     * Optional rendering method.
     * Your may safely skip implementing this method if 
     * your stage does not require it
     */
    gameRenderPost() {}
  
    /**
     * retrieve the current StageStage object.  
     * Do not override.
     * @returns 
     */
    getState() {
      /**
       *  @type {StageState}
       *  @memberof StageBase
       */
      return this.state;
    }
  
    /**
     * Mark your stage as complete.
     * Do not override.
     */
    complete() {
      this.state.complete();
    }

    /**
     * Check whether the stage has completed
     * Do not override.
     */
    hasCompleted()
    {
      return this.state.hasCompleted();
    }
  
    /**
     * Mark your stage as failed.
     * Do not override.
     */
    fail() {
      this.state.fail();
    }

    /**
     * Check whether the stage has failed
     * Do not override.
     */
    hasFailed()
    {
      this.state.hasFailed();
    }
  }
  