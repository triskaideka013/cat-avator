class AltPlayer extends RectObject {
  constructor(pos, opts, size = vec2(2, 2), sprite = tile(0)) {
    super(pos, size, sprite);

    this.startPos = pos;
    this.pos = pos;
    this.size = size;
    this.color = new Color(0, 0, 0, 0); // set background transparent

    this.direction = RIGHT;
    this.angle = 0;
    this.velocity = vec2(0, 0);
    this.isOnGround = false;
    this.gravity = opts?.gravity ?? -0.5 / 60;
    this.playerVelocity = opts?.velocity ?? 10 / 60;
    this.jumpVelocity = 15 / 60;
    this.powerupCounter = 0;
    this.jumpCount = 0;
    this.maxJumps = 0;
    this.frame = 0;

    this.canAct = true;
  }

  render() {
    super.render();
    drawTile(
      this.pos,
      this.size,
      tile(this.frame, vec2(18, 14), 0),
      new Color(0, 0, 0, 1),
      this.angle,
      this.mirror
    );
  }

  update() {
    // do not update if player has finished level
    if (!this.canAct) return;

    // determine player orientation in x-axis
    let direction = null;
    if (
      keyIsDown(KeyboardKeys.ArrowLeft) ||
      keyIsDown(KeyboardKeys.ArrowRight)
    ) {
      direction = keyIsDown(KeyboardKeys.ArrowLeft) ? LEFT : RIGHT;
      this.frame++; // animate the walking!
      if (this.frame === MAX_FRAME) {
        this.frame = 0;
      }
      this.direction = direction;
    }
    if (direction !== null) {
      // direction changed
      this.mirror = this.direction === LEFT ? true : false;
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
  }

  overlapsObject(objPos, objSize) {
    return isOverlapping(this.pos, this.size, objPos, objSize);
  }

  collideWithPlatform(pos, size) {
    debugger;
    if (this.velocity.y <= 0) {
      this.pos.y = pos.y + size.y / 2 + this.size.y / 2;
      this.velocity.y = 0;
      this.isOnGround = true;
      this.jumpCount = 0;
    } else {
      this.pos.y = pos.y - size.y / 2 - this.size.y / 2;
      this.velocity.y *= -1;
    }
  }

  collideWithEnemy() {}

  disable() {
    this.canAct = false;
  }
}