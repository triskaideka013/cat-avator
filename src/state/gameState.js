///////////////////////////////////////////////////////////////////////////////
// Game State Constants
///////////////////////////////////////////////////////////////////////////////
const STARTING_LIVES = 9;

class GameState {
  ///////////////////////////////////////////////////////////////////////////////
  // Ctor
  ///////////////////////////////////////////////////////////////////////////////
  constructor() {
    // track active game phase
    this.introActive = false;
    this.elevatorActive = false;
    this.continueStageActive = false;

    // Track whichever state is currently active
    this.currentStage = null;
    // track number of games succeeded
    this.completedLevels = [];
    // track elevator button selection
    this.selectedElevatorButton = null;
    // number of levels to beat before unlocking boss
    this.requiredLevelCount = 12;
    // track remaining lives
    this.livesLeft = STARTING_LIVES;
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

  isContinueScreen() {
    return this.continueStageActive;
  }

  // Has the required number of levels been met
  isBossUnlocked() {
    return this.completedLevels == this.requiredLevelCount;
  }

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

  completeIntro() {
    // close the intro stage
    this.currentStage.complete();
    this.introActive = false;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Mark Level As Complete, return to elevator
  ///////////////////////////////////////////////////////////////////////////////
  completeStage() {
    //TODO increment completed levels
    // TODO add completed level to array provided to elevator stage to enable next stage buttons
    this.goToElevator();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Return to elevator stage
  ///////////////////////////////////////////////////////////////////////////////
  goToElevator() {
    this.elevatorActive = true;
    this.continueStageActive = false;

    var elevator = new ElevatorStage(this.completedLevels);
    this.initStage(elevator);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Load a game stage (immediately following elevator stage)
  ///////////////////////////////////////////////////////////////////////////////
  goToLevel(level) {
    // get the selected floor button from the elevator
    this.selectedElevatorButton = this.getCurrentStage().getState().getResult();
    this.elevatorActive = false;
    this.initStage(level);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Player has Died.  Show lives, ask for continue
  ///////////////////////////////////////////////////////////////////////////////
  goToContinueScreen() {
    this.livesLeft--;

    this.continueStageActive = true;
    this.initStage(new ContinueStage(this.livesLeft));
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Initialize target stage, set as current stage
  ///////////////////////////////////////////////////////////////////////////////
  initStage(stage) {
    this.currentStage = stage;
    this.currentStage.init();
  }

  getLivesLeft() {
    return this.livesLeft;
  }

  markCurrentLevelComplete()
  {
    // mark level's button as complete
    this.selectedElevatorButton.state.complete();
    // add the selected level to array of completed levels
    this.completedLevels.push(this.selectedElevatorButton);
    // clear current selection
    this.selectedElevatorButton = null;
  }
}
