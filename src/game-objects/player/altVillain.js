class AltVillain extends AltPlayer {
  constructor(pos, opts) {
    const size = vec2(6, 6);

    super(pos, opts, size);

    this.actions = [this.jump.bind(this), this.move.bind(this)];
    this.canAct = false;
    // how many update cycles to wait between actions
    this.cooldown = 0;
    this.maxCooldownCycles = 1000;
    this.minCooldownCycles = 300;
    this.maxMovementX = 10;

    this.direction = RIGHT;
    this.movesLeft = 0;
    this.isMoving = false;
  }

  init() {
    this.resetActionCooldown();
  }

  update() {
    if (this.isMoving) {
      this.movesLeft --;

      if(this.movesLeft > 0)
      {
        console.log("boss moving")
        this.frame++; // animate the walking!
        if (this.frame === MAX_FRAME) {
          this.frame = 0;
        }
  
        this.velocity.x += this.direction == LEFT ? -this.playerVelocity : this.playerVelocity
      } else 
      {
        this.isMoving = false;
        this.movesLeft = 0;
        console.log("boss has stopped")
      }
      
      
    }

    this.velocity.y += this.gravity;
    this.pos = this.pos.add(this.velocity);

    if (this.canAct) {
      var action = this.getAction();
      if (action) {
        action();
      }
      this.resetActionCooldown();
    } else {
      this.cooldown--;
      if (this.cooldown == 0) {
        this.canAct = true;
      }
    }
  }

  jump() {
    console.log("boss action: Jump")
    this.velocity.y = this.jumpVelocity;
    this.isOnGround = false;
    this.jumpCount += 1;
  }

  move() {
    console.log("boss action: Move")
    this.movesLeft = randInt(this.maxMovementX);
    this.direction = randInt(1) == 1 ? LEFT : RIGHT;
    this.isMoving = true;
    this.mirror = this.direction == LEFT;
  }

  resetActionCooldown() {
    this.canAct = false;
    this.cooldown = randInt(this.maxCooldownCycles, this.minCooldownCycles);
    console.log("resetting boss cooldown", this.cooldown);
  }

  getAction() {
    if (!this.canAct) return false;

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
