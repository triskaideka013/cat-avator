"use strict";
glEnable = false;

///////////////////////////////////////////////////////////////////////////////
// State Management
///////////////////////////////////////////////////////////////////////////////

// Tracks game state
const stateManager = new GameStateManager();
// Handles loading playable levels
const stageLoader = new StageLoader();

///////////////////////////////////////////////////////////////////////////////
// Initial Game Setup
///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  stateManager.initIntro();
}

///////////////////////////////////////////////////////////////////////////////
// Main Update Loop
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
// Logic Updates
function gameUpdate() {
  // update the active stage
  stateManager.getCurrentStage().gameUpdate();

  // don't interrupt the current level
  if (stateManager.currentStageIsActive()) return;

  //stage is complete, decide what to do next
  resolveNextStage();
}

function gameUpdatePost() {

  var currentStage = stateManager.getCurrentStage();

  if (currentStage.gameUpdatePost) {
    currentStage.gameUpdatePost();
  }
}

/////////////////////////////////////////////
// Rendering updates
function gameRender() {
  var currentStage = stateManager.getCurrentStage();

  if (currentStage.gameRender) {
    currentStage.gameRender();
  }
}

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

  ////////////////////////////////////
  // Game Over
  if (stateManager.isGameOver()) {
    stateManager.goToGameOverScreen();
    return;
  }

  ////////////////////////////////////
  // Elevator -> Playable Level
  if (stateManager.isElevatorStage()) {
    loadPlayableLevel();
    return;
  }

  ////////////////////////////////////
  // Playable Level -> Continue Screen
  if (stateManager.levelWasFailed()) {
    stateManager.goToContinueScreen();
    return;
  }

  ////////////////////////////////////
  // Intro -> Elevator 
  // OR
  // Continue -> Elevator
  // OR
  // Playable Level -> Elevator
  if (stateManager.levelWasWon()) {
    stateManager.returnToElevator();
    return;
  }
}

///////////////////////////////////////////////////////////////////////////////
// Resolve & load playable level
function loadPlayableLevel()
{
// get the currently selected level index
var elevatorResult = stateManager.getCurrentStageResult();
// retrieve the level builder function ()=> GameStage 
var levelBuilder = stageLoader.getLevelBuilderByIndex(elevatorResult.index);
// instantiate the level
var level = levelBuilder();

if (level != null) {
  //transition to level
  stateManager.startNewLevel(level);
}
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, [
  "tiles.png",
]);
