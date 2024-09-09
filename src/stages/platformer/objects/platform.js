// uncomment this line to reference LittleJS types -->
// import { Color, vec2 } from "littlejsengine"

class Platform extends RectObject {
  /**
   * 
   * @param {vec2} position 
   * @param {vec2} size 
   * @param {Color} color 
   */
  constructor(position, size, color) {
    super(position, size, color)

    this.setCollision()
    this.mass = 0 // don't get blown away by projectiles
  }
}
