// import { drawTextScreen, CanvasTextAlign, mainCanvasSize, mouseWasPressed } from "littlejsengine";
class DiceStage extends StageBase {
    constructor(completedLevels) {
      super("dice");
  
      //Game state registers callback to invoke when level is selected
      this.levelSelectedCallback = null;
      this.backgroundColor = hsl(13.2, 1, .15)
      this.cameraOffset = vec2(0, -0.5);
      this.casinoColor = new Color(0, 153, 0, 1);
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
      drawTextScreen("Ahoy, matey!\n\nI need a SHIP (6), CAPN (5) and CREW (4)\n\nLet's play for treasure.  Arrrr", vec2(mainCanvasSize.x / 2, 40), 64);

      if (!!this.game?.player1?.rolls) {
        drawTextScreen(`Score: ${this.game.player1.score}\nNo. rolls: ${this.game.player1.rolls}`, vec2((mainCanvasSize.x / 2)+250, 450), 48);
      } else if (this.game?.player1?.score) {
        drawTextScreen(`Score: ${this.game.player1.score}`, vec2((mainCanvasSize.x / 2)+250, 450), 48);
      }
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
  