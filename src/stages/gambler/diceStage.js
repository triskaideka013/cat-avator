// import { drawTextScreen, CanvasTextAlign, mouseWasPressed } from "littlejsengine";
class DiceStage extends StageBase {
    constructor(completedLevels) {
      super("dice");
  
      //Game state registers callback to invoke when level is selected
      this.levelSelectedCallback = null;
  
      // buttons
      this.disabledButtonColor = rgb(0.3, 0.3, 0.3);
      this.enabledButtonColor = rgb(0.3, 0.8, 0.3);
      this.buttonPanelOffsetX = 4.5;
      this.buttonPanelOffsetY = 2.5;
      this.completeColor = rgb(0, 1, 0, 1);
      this.cameraOffset = vec2(0, -0.5);
      this.backgroundColor = hsl(0, 0, 0.2);
      this.levelSize = vec2(2, 6);
    }
  
    init() {
      super.init();
      // setup canvas
      canvasFixedSize = vec2(1920, 1080); // 1080p
      mainCanvas.style.background = this.backgroundColor;
      // setup game
      cameraPos = this.levelSize.scale(4);
      // adjust camera scale
      cameraScale = 8;
      // init dice game!
      this.game = new ShipCapnCrew();

      new PirateMouse(vec2(6,30));

      window["ship_capn_crew"] = {
        "game": this.game,
        "roll": () => {this.game.rollDice()},
        "reset": () => {this.game.resetGame()},
      }
    }
  
    gameUpdate() {
      if (!this.state.isActive()) return;
  
      if (mouseWasPressed(0)) this.game.rollDice()
    }
  
    gameRenderPost() {
      if (!this.state.isActive()) return;

      // draw to overlay canvas for hud rendering
      drawTextScreen("Ahoy, matey!\n\nI seek a SHIP, CAPN and CREW\nLet's gamble!  Arrrr", vec2(mainCanvasSize.x / 2, 40), 64);
    }
  
    tryGetDicePressd() {
      if (!mouseWasPressed(0)) return false;
  
      //raw mousePos
      const mouseTilePos = mousePos.floor();
      // account for render position of the panel buttons
      const renderOffset = vec2(
        Math.floor(this.buttonPanelOffsetX),
        Math.floor(this.buttonPanelOffsetY)
      );
  
      const adjustedMousePos = mouseTilePos.subtract(renderOffset);
  
      // check for corresponding button
      var dice = this.diceMap.getDice(adjustedMousePos);
  
      return dice ?? false;
    }
  }
  