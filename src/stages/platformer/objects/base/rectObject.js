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

  get x() {return this.pos.x;}

  get y() {return this.pos.y;}

  get width() {return this.size.x;}

  get height() {return this.size.y;}

  get left() {return this.x - this.width / 2;}

  get right() {return this.x + this.width / 2;}

  get bottom() {return this.y - this.height / 2;}

  get top() {return this.y + this.height / 2;}

  /**
   * Is this colliding with other from the top?
   * @param {RectObject} other
   * @returns {boolean}
   */
  collidesTop(other) {
    return (
      this.y > other.top - 0.1
      && this.right > other.left + 0.1
      && this.left < other.right - 0.1
    )
  }

  /**
   * Is this colliding with other from the bottom?
   * @param {RectObject} other
   * @returns {boolean}
   */
  collidesBottom(other) {
    return (
      this.y < other.bottom + 0.1
      && this.right > other.left + 0.1
      && this.left < other.right - 0.1
    )
  }

  /**
   * Is this colliding with other from the left?
   * @param {RectObject} other
   * @returns {boolean}
   */
  collidesLeft(other) {
    return (
      this.x < other.left - 0.1
      && this.bottom < other.top - 0.1
      && this.top > other.bottom + 0.1
    )
  }

  /**
   * Is this colliding with other from the right?
   * @param {RectObject} other
   * @returns {boolean}
   */
  collidesRight(other) {
    return (
      this.x > other.right + 0.1
      && this.bottom < other.top - 0.1
      && this.top > other.bottom + 0.1
    )
  }
}
