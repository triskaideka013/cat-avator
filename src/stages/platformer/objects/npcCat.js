// uncomment this line to reference LittleJS types -->
// import { Color, vec2, drawRect, drawTile, Vector2, RectObject } from "littlejsengine"
class NPCCat extends RectObject {
  /**
   *
   * @param {Vector2} pos
   * @param {Vector2} size
   * @param {Color} tintColor
   * @param {RectObject} platform
   * @param {vec2} speed
   */
  constructor(character='rat', pos, size, tintColor, platform, speed=vec2(2 / 60, 0), mirror=true) {
    super(pos, size);
    this.color = new Color(0,0,0,0); // transparent background
    this.tintColor = tintColor
    this.platform = platform;
    this.frame = 0;
    this.mirror = mirror
    this.speed = speed;
    this.direction = vec2(1, 1);
    this.character = character;

    const platformTop = this.platform.pos.y + this.platform.size.y / 2;
    const halfEnemyHeight = this.size.y / 2;
    // make sure the enemy is standing on top of the platform
    if ('rat' == character) {
      this.pos.y = platformTop;
      this.tileVector = vec2(16,19)
      this.imageIndex = 4
    } else if ('cat' == character) {
      this.pos.y = platformTop + halfEnemyHeight;
      this.tileVector = vec2(18,14);
      this.imageIndex = 0
    }
    this.speedDownLooper = 0;
    this.setCollision();
  }

  update() {
    if (this.speed.y != 0 && this.speed.x == 0) this.mirror = false;
    this.pos.x += this.speed.x * this.direction.x;
    this.pos.y += this.speed.y * this.direction.y;

    // when the enemy reaches the edge of a platform, it changes direction
    if (this.left < this.platform.left || this.right > this.platform.right) {
      this.direction.x *= -1;
      this.mirror = !this.mirror
    }
    if (this.pos.y > this.platform.pos.y + 2.5
      || this.pos.y < this.platform.pos.y + this.platform.size.y / 2 // + this.size.y / 2
    ) {
      this.direction.y *= - 1;
    }
    this.speedDownLooper++;
    if (this.speedDownLooper % 3 == 0) {
      this.frame++; // animate the ambling!
      if (this.frame == 2) {
        this.frame = 0;
      }
    }

    if (60 == this.speedDownLooper) {
      this.speedDownLooper = 0
    }
  }

  render() {

    drawTile(this.pos, this.size, tile(this.frame, this.tileVector, this.imageIndex), new Color(0,0,0,1), 0, this.mirror, this.tintColor)
  }

  identifySelf() {
    return 'enemy';
  }
}
