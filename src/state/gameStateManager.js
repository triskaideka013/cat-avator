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
    var hasQuit =
      this.gameState.isContinueScreen() &&
      this.gameState.getCurrentStage().hasFailed();

    return this.gameState.getLivesLeft() == 0 || hasQuit;
  }

  /**
   * Check whether the current level was failed
   * @returns
   */
  levelWasFailed() {
    return this.getCurrentStage().hasFailed();
  }

  levelWasWon()
  {
    return this.getCurrentStage().hasWon();
  }

  /**
   * check if game state is on elevator stage
   * @returns true if elevator stage is active, false otherwise
   */
  isElevatorStage() {
    return this.gameState.isElevator();
  }

  isContinueScreen()
  {
    return this.gameState.isContinueScreen();
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

  startNewLevel(newLevel) {
    this.gameState.goToLevel(newLevel);
  }

  goToContinueScreen() {
    if (!this.isGameOver()) {
      this.gameState.goToContinueScreen();
    } 
  }

  goToGameOverScreen()
  {
    this.CAN_PLAY = false;
    var gameOver = new GameOverStage();

    this.gameState.goToLevel(gameOver);
  }

  /**
   * mark current 
   * level as succeeded, to unlock next elevator button
   */
  markLevelComplete()
  {
    this.gameState.markCurrentLevelComplete();
  }
}
