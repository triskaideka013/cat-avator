// uncomment this line to reference LittleJS types -->
// import { Color, vec2 } from "littlejsengine"

class RectObject extends EngineObject {
  /**
   *
   * @param {vec2} position
   * @param {vec2} size
   * @param {Color} color
   */
  constructor(position, size, color) {
    super(position, size);
    this.color = color;
  }

  render() {
    drawRect(this.pos, this.size, this.color);
  }

  getBoundingRect() {
    return {
      x: this.pos.x,
      y: this.pos.y,
      width: this.size.x,
      height: this.size.y,
      left: this.pos.x - this.size.x / 2,
      right: this.pos.x + this.size.x / 2,
      bottom: this.pos.y - this.size.y / 2,
      top: this.pos.y + this.size.y / 2
    }
  }
}
