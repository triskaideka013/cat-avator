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
}
