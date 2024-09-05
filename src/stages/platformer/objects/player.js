// TODO: Refactor Player class.
// Move some things out of the update method.

class Player extends RectObject {
  constructor(position, size, color, platforms, powerups, minimumStageY, enemies) {
    super(position, size, color);
    this.platforms = platforms;
    this.powerups = powerups;
    this.enemies = enemies;
    this.startPos = position;

    this.minimumStageY = minimumStageY;

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
