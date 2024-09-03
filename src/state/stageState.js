class StageState {
    ///////////////////////////////////////////////////////////////////////////////
    // Ctor
    ///////////////////////////////////////////////////////////////////////////////
    constructor() {
      this.isComplete = false;
      this.isFailed = false;
      this.active = false;
    }
    
  
    /**
     * reset basic completion flags, set stage to active
     */
    begin() {
      this.isComplete = false;
      this.isFailed = false;
      this.active = true;
    }
  
    /**
     * complete the stage with a failed state
     */
    fail() {
      this.isComplete = true;
      this.isFailed = true;
      this.isActive = false;
    }
  
    /**
     * complete the stage in a non-failed state
     */
    complete() {
      this.isComplete = true;
      this.isFailed = false;
      this.active = false;
    }
  
    /**
     * check whether the stage has completed in a failed state
     * @returns true if stage is complete and has been failed, otherwise false
     */
    hasFailed() {
      return this.isComplete && this.isFailed;
    }
  
    /**
     * check whether the stage has completed in a non-failed state
     * @returns true if stage is complete and is not failed, otherwise false
     */
    hasSucceeded() {
      return this.isComplete && !this.isFailed;
    }
  
    /**
     * check whether the stage has completed in any state
     * @returns true if the stage is complete, otherwise false
     */
    hasCompleted() {
      return this.isComplete;
    }
  
    /**
     * check whether the stage is in active state
     * @returns true if stage has begun, and is not yet completed or failed. otherwise false
     */
    isActive() {
      return this.active;
    }
  }
  