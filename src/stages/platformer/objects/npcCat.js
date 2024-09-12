// uncomment this line to reference LittleJS types -->
// import { Color, vec2, drawRect, drawTile, Vector2, RectObject } from "littlejsengine"
const MAX_FRAME_NPC = 13;
class NPCCat extends RectObject {
  /**
   *
   * @param {Vector2} pos
   * @param {Vector2} size
   * @param {Color} tintColor
   * @param {RectObject} platform
   * @param {vec2} speed
   */
  constructor(pos, size, tintColor, platform, speed=vec2(2 / 60, 0), mirror=true) {
    super(pos, size);
    this.color = new Color(0,0,0,0); // transparent background
    // this.size = size;
    // this.pos = pos;
    this.tintColor = tintColor
    this.platform = platform;
    this.frame = 0;
    this.speed = speed;
    this.direction = vec2(1, 0);
    const platformTop = this.platform.pos.y + this.platform.size.y / 2;
    const halfEnemyHeight = this.size.y / 2;
    // make sure the enemy is standing on top of the platform
    this.pos.y = platformTop + halfEnemyHeight;

    this.speedDownLooper = 0;
  }

  update() {
    this.pos.x += this.speed.x * this.direction.x;

    const enemyLeft = this.pos.x - this.size.x / 2;
    const platformLeft = this.platform.pos.x - this.platform.size.x / 2;
    const enemyRight = this.pos.x + this.size.x / 2;
    const platformRight = this.platform.pos.x + this.platform.size.x / 2;

    // when the enemy reaches the edge of a platform, it changes direction
    if (enemyLeft < platformLeft || enemyRight > platformRight) {
      this.direction.x *= -1;
      this.mirror = !this.mirror
    }
    this.speedDownLooper++;
    if (this.speedDownLooper % 3 === 0) {
      this.frame++; // animate the ambling!
      if (this.frame === MAX_FRAME_NPC) {
        this.frame = 0;
      }
    }

    if (60 === this.speedDownLooper) {
      this.speedDownLooper = 0
    }
  }

  render() {

    drawTile(this.pos, this.size, tile(this.frame, vec2(18,14), 0), new Color(0,0,0,1), 0, this.mirror, this.tintColor)
  }
}
