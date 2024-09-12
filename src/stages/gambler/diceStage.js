// import { drawTextScreen, CanvasTextAlign, mainCanvasSize, mouseWasPressed, drawRectScreen } from "littlejsengine";
const anteBGColor = hsl(degreesToRadians(11),.6,.6)
const textColor = new Color(255,255,255,1);
class DiceStage extends StageBase {
    constructor(completedLevels) {
      super("dice");
  
      //Game state registers callback to invoke when level is selected
      this.levelSelectedCallback = null;
      this.backgroundColor = hsl(degreesToRadians(133), .65, .15);
      this.cameraOffset = vec2(0, -0.5);
      // this.casinoColor = new Color(0, 153, 0, 1);
      this.levelSize = vec2(2, 6);
      this.pirateText = "Ahoy, matey!\n\nI need a SHIP (6), CAPN (5) and CREW (4).\n\nLet's gamble for treasure, LANDLUBBER!";
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
      this.game = new ShipCapnCrew(true); // true = sudden death enabled

      new PirateMouse(vec2(6,30));
    }
  
    gameUpdate() {
      if (!this.state.isActive() || this.isTimedOut) return;
  
      if (mouseWasPressed(0)) {
        this.isTimedOut = true;
        this.game.rollDice();
        setTimeout(() => {

          if (this.game.gameover) {
            if (this.game.player1.shipCapnCrew) {
              this.pirateText = this.game.pirateText;
            } else {
              this.pirateText = this.game.pirateText;
            }
          }

          this.isTimedOut = false;
        }, 1000);
      }
    }
  
    gameRenderPost() {
      if (!this.state.isActive()) return;

      // draw to overlay canvas for hud rendering
      drawTextScreen(this.pirateText, vec2(mainCanvasSize.x / 2, 40), 64);

      drawRect(vec2((mainCanvasSize.x / 16) - 165 , 35), vec2(25), anteBGColor);
      
      drawTextScreen("🧶", vec2((mainCanvasSize.x / 2)-430, 450), 96);
      drawTextScreen("Player's Bet", vec2((mainCanvasSize.x / 2)-428, 585), 32);
      if (!!this.game?.player1?.rolls >= 1) {
        drawTextScreen(`Score: ${this.game.player1.score}\n\nNo. rolls: ${this.game.player1.rolls}`, vec2((mainCanvasSize.x / 2)+500, 450), 48, textColor, 0, textColor, 'right');
      } else if (this.game?.player1?.score >= 0) {
        drawTextScreen(`Score: ${this.game.player1.score}`, vec2((mainCanvasSize.x / 2)+500, 450), 48, textColor, 0, textColor, 'right');
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
  