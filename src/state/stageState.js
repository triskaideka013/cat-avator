class StageState {
    ///////////////////////////////////////////////////////////////////////////////
    // Ctor
    ///////////////////////////////////////////////////////////////////////////////
    constructor() {
      this.isComplete = false;
      this.isFailed = false;
      this.active = false;
      this.result = null;
      this.instantGameOver = false;
      this.abortLevel = false;
    }
    
    /**
     * reset basic completion flags, set stage to active
     */
    begin() {
      
      this.isComplete = false;
      this.isFailed = false;
      this.result = null;
      this.active = true;
      this.instantGameOver = false;
      this.abortLevel = false;
    }
  
    /**
     * complete the stage with a failed state
     */
    fail() {
      this.isComplete = true;
      this.isFailed = true;
      this.active = false;
    }

    instaKill()
    {
      this.instantGameOver = true;
      this.isComplete = true;
      this.active = false;

    }

    quit()
    {
      this.abortLevel = true;
      this.isComplete = true;
      this.active = false;
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

    hasQuit()
    {
      return this.abortLevel;
    }

    isImmediateGameOver()
    {
      return this.instantGameOver;
    }
  
    /**
     * check whether the stage is in active state
     * @returns true if stage has begun, and is not yet completed or failed. otherwise false
     */
    isActive() {
      return this.active;
    }

    getResult()
    {
      return this.result;
    }

    setResult(result)
    {
      this.result = result;
    }


  }
  