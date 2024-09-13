/**
 * @typedef {Object} PlayerInit
 * @property {any[]} platforms
 * @property {any[]} powerups
 * @property {any[]} enemies
 * @property {number} minimumStageY
 */

const RIGHT = "R",
  LEFT = "L";
class Player extends RectObject {
  /**
   * @param {vec2} pos
   * @param {PlayerInit} opts
   */
  constructor(pos, opts) {
    const size = vec2(2, 2); 
    super(pos, vec2(2, 2), tile(0));

    this.platforms = opts.platforms;
    this.powerups = opts.powerups;
    this.enemies = opts.enemies;
    this.minimumStageY = opts.minimumStageY;
    this.yarns = opts.yarns;
    this.powerupManager = opts.powerupManager;
    this.startPos = pos;
    this.pos = pos;
    this.size = size;
    this.color = new Color(0, 0, 0, 0); // set background transparent
    this.direction = RIGHT;
    this.velocity = vec2(0, 0);
    this.isOnGround = false;
    this.jumpVelocity = 15 / 60;
    this.jumpCount = 0;
    this.powerupCounter = 0;
    this.frame = 0;
    this.failed = false;
    this.succeeded = false;
    this.speedDownLooper = 0;

    window.addEventListener("enemy-destroyed", this.enemyCleanup.bind(this));
  }

  enemyCleanup(event) {
    this.enemies = this.enemies.filter((e) => e !== event.detail);
  }

  render() {
    super.render();

    drawTile(
      this.pos,
      this.size,
      tile(this.frame, vec2(18, 14), 0),
      new Color(0, 0, 0, 1),
      0,
      this.mirror
    );
  }

  update() {
    // do not update if player has finished level
    if (this.failed || this.succeeded) return;

    // developer insta-win ~ press 'R' to complete the stage
    if (keyWasPressed(KeyboardKeys.KeyR)) {
      this.succeeded = true;
      return;
    }

    // developer insta-fail ~ press 'N' to complete the stage
    if (keyWasPressed(KeyboardKeys.KeyV)) {
      this.failed = true;
      return;
    }

    // determine player orientation in x-axis
    let direction = null;
    if (
      keyIsDown(KeyboardKeys.ArrowLeft) ||
      keyIsDown(KeyboardKeys.ArrowRight)
    ) {
      direction = keyIsDown(KeyboardKeys.ArrowLeft) ? LEFT : RIGHT;

      this.speedDownLooper++;
      if (this.speedDownLooper % 2 == 0) {
        this.frame++; // animate the walking!
        if (this.frame == 2) {
          this.frame = 0;
        }
      }
      if (60 == this.speedDownLooper) {
        this.speedDownLooper = 0;
      }
      this.direction = direction;
    }
    if (direction != null) {
      // direction changed
      this.mirror = this.direction == LEFT ? true : false;
    }

    // set lateral movement speed (standard velocity)
    this.velocity.x = keyIsDown(KeyboardKeys.ArrowLeft)
      ? -(10 / 60)
      : keyIsDown(KeyboardKeys.ArrowRight)
      ? 10 / 60
      : 0;

    if (
      keyWasPressed(KeyboardKeys.ArrowUp) &&
      this.jumpCount < this.powerupCounter + 1
    ) {
      this.velocity.y = this.jumpVelocity;
      this.isOnGround = false;
      this.jumpCount += 1;
    }

    // apply gravity
    this.velocity.y += -0.5 / 60;

    this.pos = this.pos.add(this.velocity);

    for (const platform of this.platforms) {
      if (isOverlapping(this.pos, this.size, platform.pos, platform.size)) {
        // vertical collision handling
        // from the top
        if (this.velocity.y < 0 && this.collidesTop(platform)) {
          // set player bottom
          this.pos.y = platform.top + this.size.y / 2;
          this.velocity.y = 0;
          this.isOnGround = true;
          this.jumpCount = 0;
          // from the bottom
        } else if (this.velocity.y > 0 && this.collidesBottom(platform)) {
          // set player top
          this.pos.y = platform.bottom - this.size.y / 2;

          this.velocity.y *= -1;
        }

        // horizontal collision handling
        // from the left
        if (this.velocity.x > 0 && this.collidesLeft(platform)) {
          // right align player to object
          this.pos.x = platform.left - this.size.x / 2;
          this.velocity.x = 0;
          // from the right
        } else if (this.velocity.x < 0 && this.collidesRight(platform)) {
          // left-align player to object
          this.pos.x = platform.right + this.size.x / 2;
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
          window.dispatchEvent(
            new CustomEvent("enemy-destroyed", { detail: enemy })
          );
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

    if (Symbol.iterator in Object(this.yarns)) {
      for (const yarn of this.yarns) {
        if (isOverlapping(this.pos, this.size, yarn.pos, yarn.size)) {
          this.powerupManager.addYarnBalls(1);
          // remove from list.
          this.yarns = this.yarns.filter((y) => y !== yarn);
          yarn.destroy();
        }
      }
    }

    if (this.pos.y < this.minimumStageY) {
      this.failed = true;
    }

    if (this.powerups.length == 0) {
      this.succeeded = true;
    }
  }

  hasDied() {
    return this.failed;
  }

  hasWon() {
    return this.succeeded;
  }
}
