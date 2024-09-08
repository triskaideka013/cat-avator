// uncomment this line to reference LittleJS types -->
// import { engineInit } from "../node_modules/littlejsengine/dist/littlejs.esm"

"use strict";
glEnable = false;

///////////////////////////////////////////////////////////////////////////////
// State Management
///////////////////////////////////////////////////////////////////////////////

/**
 * @type {GameStageManager}
 */
const stateManager = new GameStateManager();

///////////////////////////////////////////////////////////////////////////////
// Initial Game Setup
///////////////////////////////////////////////////////////////////////////////

function gameInit() {
  stateManager.initIntro();
}

///////////////////////////////////////////////////////////////////////////////
// Main Update Loop
///////////////////////////////////////////////////////////////////////////////

function gameUpdate() {
  // update the active stage
  stateManager.getCurrentStage().gameUpdate();

  // don't interrupt the current level
  if (stateManager.currentStageIsActive()) return;

  //stage is complete, decide what to do next
  resolveNextStage();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
  var currentStage = stateManager.getCurrentStage();

  if (currentStage.gameUpdatePost) {
    currentStage.gameUpdatePost();
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
  var currentStage = stateManager.getCurrentStage();

  if (currentStage.gameRender) {
    currentStage.gameRender();
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  var currentStage = stateManager.getCurrentStage();

  if (currentStage.gameRenderPost) {
    currentStage.gameRenderPost();
  }
}

///////////////////////////////////////////////////////////////////////////////
// State Helpers
///////////////////////////////////////////////////////////////////////////////

/**
 * Determine the next stage to be loaded
 * and initialize it
 */
function resolveNextStage() {
  if (!stateManager.CAN_PLAY) return;

  // is game over?
  if (stateManager.isGameOver()) {
    stateManager.goToGameOverScreen();
    return;
  }

  // leaving the intro?
  if (stateManager.isIntroStage()) {
    // leave intro state
    stateManager.completeIntro();
    stateManager.goToElevator();
    return;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Determine the next playable level to load here.
  // Player has selected a level from the elevator.
  ///////////////////////////////////////////////////////////////////////////////
  if (stateManager.isElevatorStage()) {
    // create a new level
    var platformer = new PlatformerStage();
    //transition to level
    stateManager.startNewLevel(platformer);
    let scc = new ShipCapnCrew();
    window["ship_capn_crew"] = {
      "game": scc,
      "roll": () => {scc.rollDice()},
    }
  }

  // Playable level was Failed?
  if (stateManager.levelWasFailed()) {
    stateManager.goToContinueScreen();
    return;
  }

  // Coming from continue screen?
  if (stateManager.isContinueScreen()) {
    // Return to elevator
    stateManager.goToElevator();
    return;
  }

  // Playable level was won?
  if (stateManager.levelWasWon()) {
    stateManager.markLevelComplete();
    stateManager.goToElevator();
    return;
  }
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);
