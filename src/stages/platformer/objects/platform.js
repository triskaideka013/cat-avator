// uncomment this line to reference LittleJS types -->
// import { Color, vec2, Vector2, drawTile, tile } from "littlejsengine"

class Platform extends RectObject {
  /**
   *
   * @param {Vector2} position
   * @param {Vector2} size
   * @param {Color} color
   */
  constructor(pos, size, color) {
    super(pos, size, color)

    this.pos = pos;
    this.size = size;
    this.color = color;
    this.imageIndex = 2
    this.setCollision()
    this.mass = 0 // don't get blown away by projectiles
  }

  render() {
    drawTile(this.pos, this.size, tile(0, vec2(1,16), this.imageIndex), this.color) // 3 -> burst (green by default, good for grass)
  }

  identifySelf() {
    return 'platform';
  }
}
