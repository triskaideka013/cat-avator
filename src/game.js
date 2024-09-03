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
  console.log("initializing intro stage");
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
  console.log("stage complete. resolving next action");
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
    // sanity check for game over
  if (stateManager.isGameOver()) {
    console.log("Y'all done died, son.");
    return;
  }

  // leaving the intro?
  if(stateManager.isIntroStage())
  {
    // leave intro state
    stateManager.completeIntro();
    stateManager.goToElevator();
    return;
  }

  // has selected level?
  if(stateManager.isElevatorStage())
  {
    // create a new level
    var platformer = new PlatformerStage();
    //transition to level
    stateManager.startNewLevel(platformer);
  }
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
