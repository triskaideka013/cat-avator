///////////////////////////////////////////////////////////////////////////////
// Game State Constants
///////////////////////////////////////////////////////////////////////////////
const STARTING_LIVES = 9;

///////////////////////////////////////////////////////////////////////////////
// Represents the current state of the game
///////////////////////////////////////////////////////////////////////////////
class GameState {
  constructor() {
    // track active game phase
    this.introActive = false;
    this.elevatorActive = false;
    this.continueStageActive = false;

    // Track whichever state is currently active
    this.currentStage = null;
    // track number of levels that have been won
    this.completedLevels = [];
    // track elevator button selection
    this.selectedElevatorButton = null;
    // number of levels to beat before unlocking boss
    this.requiredLevelCount = 12;
    // track remaining lives
    this.livesLeft = STARTING_LIVES;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Getters

  // Is game mode set to intro
  isIntro() {
    return this.introActive;
  }

  // Is game mode set to elevator
  isElevator() {
    return this.elevatorActive;
  }

  // Is game mode set to playable level
  isLevel() {
    return !this.elevatorActive;
  }

  // Is game mode set to Continue screen
  isContinueScreen() {
    return this.continueStageActive;
  }

  // Retrieve the currently active stage
  getCurrentStage() {
    return this.currentStage;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Manage Intro State
  ///////////////////////////////////////////////////////////////////////////////
  initIntro() {
    this.initStage(new IntroStage());
    this.introActive = true;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Return to elevator stage
  ///////////////////////////////////////////////////////////////////////////////
  goToElevator(levelWon = true) {
    this.elevatorActive = true;
    this.continueStageActive = false;

    if(levelWon)
    {
      this.markCurrentLevelComplete();
    }

    var elevator = new ElevatorStage(this.completedLevels);
    this.initStage(elevator);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Load a game stage (immediately following elevator stage)
  ///////////////////////////////////////////////////////////////////////////////
  goToLevel(level) {
    // get the selected floor button from the elevator
    this.setSelectedFloor();
    // update state
    this.elevatorActive = false;
    this.continueStageActive = false;
    // load the level
    this.initStage(level);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Player has Died.  Show lives, ask for continue
  ///////////////////////////////////////////////////////////////////////////////
  goToContinueScreen() {
    // remove a life
    this.livesLeft--;
    // toggle continue screen state
    this.continueStageActive = true;
    // remove current floor selection
    this.clearSelectedFloor();
    // load continue screen
    this.initStage(new ContinueStage(this.livesLeft));
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Initialize target stage, set as current stage
  ///////////////////////////////////////////////////////////////////////////////
  initStage(stage) {
    this.currentStage = stage;
    this.currentStage.init();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * Check if current active level is represented
   * by a corresponding elevator button.
   * If so, mark the button's state as complete.
   */
  markCurrentLevelComplete() {
    if (this.selectedElevatorButton == null) return;

    // mark level's button as complete
    this.selectedElevatorButton.state.complete();
    // add the selected level to array of completed levels
    this.completedLevels.push(this.selectedElevatorButton);
    // clear current selection
    this.clearSelectedFloor();
  }

  /**
   * gets the result object of game state's current stage
   * @returns stage.state.result
   */
  getCurrentStageResult() {
    return this.getCurrentStage().getState().getResult();
  }

  /**
   * retrieve the completed elevator stage's result
   * set as selected elevator button 
   */
  setSelectedFloor() {
    this.selectedElevatorButton = this.getCurrentStageResult();
  }

  /**
   * unset selected elevator button
   */
  clearSelectedFloor() {
    this.selectedElevatorButton = null;
  }
}
