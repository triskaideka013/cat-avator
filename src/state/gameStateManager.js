/**
 * Contains state management logic for controlling game flow
 */
class GameStateManager {
  ///////////////////////////////////////////////////////////////////////////////
  // Ctor
  ///////////////////////////////////////////////////////////////////////////////
  constructor() {
    // Core stages
    this.introStage = new IntroStage();
    this.elevatorStage = new ElevatorStage();

    this.gameState = new GameState(this.introStage, this.elevatorStage);

    // provide elevator stage with callback to be invoked on level selection
    this.elevatorStage.onFloorSelected(this.floorWasSelected);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Getters: Current Stage  & Game State
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * Get the current stage
   * @returns the current stage
   */
  getCurrentStage() {
    return this.gameState.getCurrentStage();
  }

  /**
   * Check whether the currently active state
   * is failed or complete
   * @returns true if the stage has failed or completed, otherwise false
   */
  currentStageIsActive() {
    return !this.getCurrentStage().getState().hasCompleted();
  }

  /**
   * Check whether the game state is on the intro stage
   * @returns true if intro stage is active, otherwise false
   */
  isIntroStage() {
    return this.gameState.isIntro();
  }

  /**
   * Check whether player has failed the stage
   * @returns true if the current level has been failed, false otherwise
   */
  isGameOver() {
    return this.getCurrentStage().hasFailed();
  }

  isElevatorStage() {
    return this.gameState.isElevator();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Manage Game State
  ///////////////////////////////////////////////////////////////////////////////
  initIntro() {
    this.gameState.initIntro();
  }

  completeIntro() {
    this.gameState.completeIntro();
  }

  goToElevator() {
    this.gameState.goToElevator();
  }

  floorWasSelected(elevatorButton) {
    console.log("game state gets selected button", elevatorButton);
    this.selectedElevatorButton = elevatorButton;
  }

  startNewLevel(newLevel) {
    this.gameState.goToLevel(newLevel);
  }
}
