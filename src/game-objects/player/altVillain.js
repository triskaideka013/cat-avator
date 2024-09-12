const MAX_FRAME_ALT_VILLAIN = 13;

class AltVillain extends AltPlayer {
  constructor(pos, opts) {
    const size = vec2(6, 6);

    super(pos, opts, size);

    this.actions = [];

    if (opts.canMove) this.actions.push(this.move.bind(this));
    if (opts.canJump) this.actions.push(this.jump.bind(this));

    this.canAct = false;
    // how many update cycles to wait between actions
    this.cooldown = 0;
    this.maxCooldownCycles = 400;
    this.minCooldownCycles = 50;
    this.maxMovementX = 50;
    this.maxJumps = opts?.maxJumps ?? 1;
    this.direction = RIGHT;
    this.movesLeft = 0;
    this.isMoving = false;
    this.villainVelocity = opts?.velocity ?? 10 / 80;

  }

  init() {
    this.resetActionCooldown();
  }

  update() {
    if (this.isMoving) {
      this.movesLeft--;

      if (this.movesLeft > 0) {
        this.frame++; // animate the walking!
        if (this.frame === MAX_FRAME_ALT_VILLAIN) {
          this.frame = 0;
        }

        this.velocity.x +=
          this.direction == LEFT ? -this.villainVelocity : this.villainVelocity;
      } else {
        this.isMoving = false;
        this.velocity.x = 0;
        this.movesLeft = 0;
      }
    }

    this.velocity.y += this.gravity;
    this.pos = this.pos.add(this.velocity);

    if (this.cooldown == 0) {
      var action = this.getAction();
      if (action) {
        action();
      }
      this.resetActionCooldown();
    }
    this.cooldown--;
  }

  jump() {
    if (this.jumpCount == this.maxJumps) return;
    console.log("villain jumping");
    this.velocity.y = this.jumpVelocity;
    this.isOnGround = false;
    this.jumpCount += 1;
  }

  move() {
    // choose direction if not moving
    console.log("villain moving");
    this.direction = randInt(1) == 1 ? LEFT : RIGHT;
    this.mirror = this.direction == LEFT;
    this.isMoving = true;

    this.movesLeft = this.maxMovementX;
  }

  resetActionCooldown() {
    this.cooldown = randInt(this.maxCooldownCycles, this.minCooldownCycles);
    console.log("resetting villain cooldown", this.cooldown);
  }

  getAction() {
    var actionIndex = randInt(this.actions.length);
    return this.actions[actionIndex];
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
}
