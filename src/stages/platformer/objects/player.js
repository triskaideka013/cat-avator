// uncomment this line to reference LittleJS types -->
// import { tile, drawTile, Color, vec2, keyWasPressed, keyIsDown, isOverlapping, update, drawText } from "../../../../node_modules/littlejsengine/dist/littlejs.esm" 

// TODO: Refactor Player class.
// Move some things out of the update method.

/**
 * @typedef {Object} PlayerInit
 * @property {any[]} platforms
 * @property {any[]} powerups
 * @property {any[]} enemies
 * @property {number} minimumStageY
 */

const RIGHT = 'R', LEFT = 'L';

class Player extends RectObject {
  /**
   * @param {vec2} pos 
   * @param {PlayerInit} opts
   */
  constructor(pos, opts) {
    
    const size = vec2(2,2);
    
    super(pos, size, tile(0));

    ({
      platforms: this.platforms, 
      powerups: this.powerups,
      enemies: this.enemies,
      minimumStageY: this.minimumStageY
    } = opts);
    
    this.startPos = pos;
    this.pos = pos;
    this.size = size;

    this.direction = RIGHT;
    this.angle = 0;
    this.velocity = vec2(0, 0);
    this.isOnGround = false;
    this.gravity = -0.5 / 60;
    this.playerVelocity = 10 / 60;
    this.jumpVelocity = 15 / 60;

    this.jumpCount = 0;
    this.powerupCounter = 0;

    this.failed = false;
    this.succeeded = false;
  }

  render() {
    super.render();
    drawTile(this.pos, this.size, tile(0, vec2(18,14), 0), new Color(0,0,0,1), this.angle, this.mirror);
  }

  update() {

    // do not update if player has finished level
    if(this.failed || this.succeeded) return;

    // developer insta-win ~ press 'R' to complete the stage
    if(keyWasPressed(KeyboardKeys.KeyR))
    {
      this.succeeded = true;
      return;

    }

    // developer insta-fail ~ press 'N' to complete the stage
    if(keyWasPressed(KeyboardKeys.KeyV))
    {
      this.failed = true;
      return;
    }
    
    // determine player orientation in x-axis
    let direction = null;
    if (keyIsDown(KeyboardKeys.ArrowLeft) || keyIsDown(KeyboardKeys.ArrowRight)) {
      direction = keyIsDown(KeyboardKeys.ArrowLeft) ? LEFT : RIGHT;
      this.direction = direction;
    }
    if (direction !== null) {
      // direction changed
      this.mirror = (this.direction === LEFT) ? true : false;
    }
    

    this.velocity.x = keyIsDown(KeyboardKeys.ArrowLeft)
      ? -this.playerVelocity
      : keyIsDown(KeyboardKeys.ArrowRight)
      ? this.playerVelocity
      : 0;

    if (
      keyWasPressed(KeyboardKeys.ArrowUp) &&
      this.jumpCount < this.powerupCounter + 1
    ) {
      this.velocity.y = this.jumpVelocity;
      this.isOnGround = false;
      this.jumpCount += 1;
    }

    this.velocity.y += this.gravity;
    this.pos = this.pos.add(this.velocity);

    for (const platform of this.platforms) {
      if (isOverlapping(this.pos, this.size, platform.pos, platform.size)) {
        if (this.velocity.y <= 0) {
          this.pos.y = platform.pos.y + platform.size.y / 2 + this.size.y / 2;
          this.velocity.y = 0;
          this.isOnGround = true;
          this.jumpCount = 0;
        } else {
          this.pos.y = platform.pos.y - platform.size.y / 2 - this.size.y / 2;
          this.velocity.y *= -1;
        }
      }
    }

    for (const enemy of this.enemies) {
      if (isOverlapping(this.pos, this.size, enemy.pos, enemy.size)) {
        // kill the enemy if you're jumping on its head
        if (this.velocity.y < 0) {
          enemy.destroy();
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
          // bounce off of the enemy's head
          this.velocity.y = this.jumpVelocity;
        } else {
          // if you run into the enemy from the left or right side, you die
          this.failed = true;
        }
      }
    }

    for (const powerup of this.powerups) {
      if (isOverlapping(this.pos, this.size, powerup.pos, powerup.size)) {
        powerup.destroy();
        this.powerups.splice(this.powerups.indexOf(powerup), 1);
        this.powerupCounter += 1;
      }
    }

    if (this.pos.y < this.minimumStageY && this.powerupCounter < 6) {
      this.failed = true;
    }

    if (this.powerupCounter == 7) {
      this.succeeded = true;
    }

    // if (this.powerupCounter == 4) {
    //     drawTextScreen('You Won!', vec2(200, 100), 75, new Color(1, 1, 0));
    // }

    // if (this.powerupCounter == 5) {
    //     drawTextScreen('Just Kidding!', vec2(250, 100), 75, new Color(1, 1, 0));
    // }

    // if (this.powerupCounter == 6) {
    //     drawTextScreen('It\'s a long way down...', vec2(300, 100), 60, new Color(0, 1, 1));
    // }

    // if (this.powerupCounter == 7) {
    //     drawTextScreen('TO BE CONTINUED', vec2(300, 100), 60, new Color(1, 0, 1));
    //     GameState.gameOver = true;
    //     GameState.gameWon = true;
    // }

    // drawTextScreen(
    //   `Score: ${this.powerupCounter}`,
    //   vec2(1000, 50),
    //   50,
    //   new Color(1, 1, 1)
    // );
  }

  getScore() {
    return this.powerupCounter;
  }

  getPlayerCoords()
  {
    return this.pos;
  }

  hasDied() {
    return this.failed;
  }

  hasWon() {
    return this.succeeded;
  }
}
