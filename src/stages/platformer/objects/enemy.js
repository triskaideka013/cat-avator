// uncomment this line to reference LittleJS types -->
// import { Color, vec2, drawRect } from "littlejsengine" 

class Enemy extends RectObject {
  /**
   * 
   * @param {vec2} position 
   * @param {vec2} size 
   * @param {Color} color 
   * @param {any} platform 
   */
  constructor(position, size, color, platform) {
    super(position, size, color);
    this.platform = platform;
    this.speed = vec2(2 / 60, 0);
    this.direction = vec2(1, 0);
    const platformTop = this.platform.pos.y + this.platform.size.y / 2;
    const halfEnemyHeight = this.size.y / 2;
    // make sure the enemy is standing on top of the platform
    this.pos.y = platformTop + halfEnemyHeight;
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
    }
  }

  render() {
    drawRect(this.pos, this.size, this.color);
  }
}
