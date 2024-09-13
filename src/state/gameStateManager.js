/**
 * Contains state management logic for controlling game flow
 */

class GameStateManager {
  ///////////////////////////////////////////////////////////////////////////////
  // Ctor
  ///////////////////////////////////////////////////////////////////////////////
  constructor() {
    // Global game state
    this.gameState = new GameState();
    this.CAN_PLAY = true;
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
   * Check whether player has failed the stage
   * @returns true if the current level has been failed, false otherwise
   */
  isGameOver() {

    if (this.getCurrentStage().isImmediateGameOver())
    {
      return true;
    }

    var hasGivenUp =
      this.gameState.isContinueScreen() &&
      this.gameState.getCurrentStage().hasFailed();

    return this.gameState.livesLeft == 0 || hasGivenUp;
  }

  /**
   * Check whether the current level was failed
   * @returns
   */
  levelWasFailed() {
    return this.getCurrentStage().hasFailed();
  }

  levelWasWon() {
    return this.getCurrentStage().hasWon();
  }

  levelWasQuit()
  {
    return this.getCurrentStage().hasQuit();
  }

  /**
   * check if game state is on elevator stage
   * @returns true if elevator stage is active, false otherwise
   */
  isElevatorStage() {
    return this.gameState.isElevator();
  }

  isContinueScreen() {
    return this.gameState.isContinueScreen();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Manage Game State
  ///////////////////////////////////////////////////////////////////////////////

  // Show the intro stage
  initIntro() {
    this.gameState.initIntro();
  }

  // Show the elevator stage
  returnToElevator(levelWon = true) {
    this.gameState.goToElevator(levelWon);
  }

  // Show the provided level
  startNewLevel(newLevel) {
    this.gameState.goToLevel(newLevel);
  }

  // Show the continue stage
  goToContinueScreen() {
    if (!this.isGameOver()) {
      this.gameState.goToContinueScreen();
    }
  }

  // Show the game over screen
  goToGameOverScreen() {
    this.CAN_PLAY = false;
    var gameOver = new GameOverStage();

    this.gameState.goToLevel(gameOver);
  }

  /**
   * If level was playable stage, mark as successfully completed.
   * this will unlock the next elevator button
   */
  markLevelComplete() {
    this.gameState.markCurrentLevelComplete();
  }

  /**
   * retrieve the result object of the current active stage
   * @returns the stage's state.result object
   */
  getCurrentStageResult() {
    return this.gameState.getCurrentStageResult();
  }

  hasBeatenGame()
  {
    return this.getCurrentStage().getResult()?.gameComplete;
  }
}
