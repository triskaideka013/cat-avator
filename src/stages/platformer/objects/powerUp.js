// uncomment this line to reference LittleJS types -->
// import { Color, Vector2, drawText } from "../../../../node_modules/littlejsengine/dist/littlejs.esm" 

class PowerUp extends RectObject {
/**
 * 
 * @param {Vector2} pos 
 * @param {Vector2} size 
 * @param {Color} color 
 */
  constructor(pos, size, color) {
    super(pos, size, color);
    this.pos = pos;
    this.size = size;
    this.color = color;
  }

  update() {
    super.update();
    drawText("🐟", this.pos, 1, this.color);
  }
}
