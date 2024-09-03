class GameState {
    ///////////////////////////////////////////////////////////////////////////////
    // Ctor
    ///////////////////////////////////////////////////////////////////////////////
    constructor(intro, elevator) {
      // track game 'mode'
      this.introActive = false;
      this.elevatorActive = false;
      // track number of games succeeded
      this.completedLevels = 0;
       
      // number of levels to beat before unlocking boss
      this.requiredLevelCount = 12;

      // Core stages
      this.introStage = intro;
      this.elevatorStage = elevator;

      // Track whichever state is currently active 
      this.currentStage = null;

      // Elevator stage will inform when a level has been selected
      this.selectedElevatorButton = null;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Getters: Check State
  
    // Is game mode set to intro
    isIntro() {
      return this.introActive;
    }

    // Is game mode set to elevator
    isElevator() {
      return this.elevatorActive;
    }
  
    // Is game mode set to level
    isLevel() {
      return !this.elevatorActive;
    }

    // Has the required number of levels been met    
    isBossUnlocked() {
      return this.completedLevels == this.requiredLevelCount;
    }

    getCurrentStage()
    {
        return this.currentStage;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Manage Intro State
    ///////////////////////////////////////////////////////////////////////////////

    initIntro()
    {
        this.initStage(this.introStage);
        this.introActive = true;
    }
  
    completeIntro() {
        // close the intro stage
        this.currentStage.complete();
        this.introActive = false;
    }
    
    ///////////////////////////////////////////////////////////////////////////////
    // Mark Level As Complete, return to elevator
    ///////////////////////////////////////////////////////////////////////////////
    completeStage()
    {
        this.completedLevels++;
        this.goToElevator();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Return to elevator stage
    ///////////////////////////////////////////////////////////////////////////////
    goToElevator()
    {
        this.initStage(this.elevatorStage);
        this.elevatorActive = true;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Load a game stage
    ///////////////////////////////////////////////////////////////////////////////
    goToLevel(level)
    {
        this.initStage(level);
        this.elevatorActive = false;
    }
    
    ///////////////////////////////////////////////////////////////////////////////
    // Initialize target stage, set as current stage
    ///////////////////////////////////////////////////////////////////////////////
    initStage(stage)
    {
        this.currentStage = stage;
        this.currentStage.init();
        
    }

  }
  