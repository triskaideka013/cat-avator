import { EngineObject, vec2, Vector2 } from "littlejsengine";
import { degreesToVector2 } from "../util/convert";

class HairBall extends EngineObject
{
  /**
   * 
   * @param {Vector2} pos 
   * @param {number} angle
   */
  constructor(pos, angle)
  {
    super(pos); // set position
    
    this.velocity = (!!angle) ? degreesToVector2(angle) : vec2(-.25, 0); // set motion to
  }
}
