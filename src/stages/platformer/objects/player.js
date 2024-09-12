// uncomment this line to reference LittleJS types -->
// import { tile, drawTile, Color, vec2, keyWasPressed, keyIsDown, isOverlapping, update, drawText, RectObject } from "littlejsengine"

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
const MAX_FRAME_PLAYER = 13;

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
    this.color = new Color(0,0,0,0); // set background transparent

    this.direction = RIGHT;
    this.angle = 0;
    this.velocity = vec2(0, 0);
    this.isOnGround = false;
    this.gravity = -0.5 / 60;
    this.playerVelocity = 10 / 60;
    this.jumpVelocity = 15 / 60;

    this.jumpCount = 0;
    this.powerupCounter = 0;
    this.frame = 0;
    this.failed = false;
    this.succeeded = false;

    this.speedDownLooper = 0;

    window.addEventListener('enemy-destroyed', this.enemyCleanup.bind(this));
  }

  enemyCleanup(event) {
    this.enemies = this.enemies.filter(e => e !== event.detail);
  }



  render() {
    super.render();

    drawTile(this.pos, this.size, tile(this.frame, vec2(18,14), 0), new Color(0,0,0,1), this.angle, this.mirror);
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

      this.speedDownLooper++;
      if (this.speedDownLooper % 2 === 0) {
        this.frame++; // animate the walking!
        if (this.frame === MAX_FRAME_PLAYER) {
          this.frame = 0;
        }
      }
      if (60 === this.speedDownLooper) {
        this.speedDownLooper = 0
      }
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

        // vertical collision handling
        // from the top
        if (
          this.velocity.y < 0
          && this.collidesTop(platform)
        ) {
          this.setPlayerBottom(platform.top);
          this.velocity.y = 0;
          this.isOnGround = true;
          this.jumpCount = 0;
        // from the bottom
        } else if (
          this.velocity.y > 0
          && this.collidesBottom(platform)
        ) {
          this.setPlayerTop(platform.bottom);
          this.velocity.y *= -1;
        }

        // horizontal collision handling
        // from the left
        if (
          this.velocity.x > 0
          && this.collidesLeft(platform)
        ) {
          this.setPlayerRight(platform.left);
          this.velocity.x = 0;
        // from the right
        } else if (
          this.velocity.x < 0
          && this.collidesRight(platform)
        ) {
          this.setPlayerLeft(platform.right);
          this.velocity.x = 0;
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

    if (this.pos.y < this.minimumStageY) {
      this.failed = true;
    }

    if (this.powerups.length === 0) {
      this.succeeded = true;
    }
  }

  setPlayerBottom(y) {
    this.pos.y = y + this.size.y / 2;
  }

  setPlayerTop(y) {
    this.pos.y = y - this.size.y / 2;
  }

  setPlayerLeft(x) {
    this.pos.x = x + this.size.x / 2;
  }

  setPlayerRight(x) {
    this.pos.x = x - this.size.x / 2;
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
