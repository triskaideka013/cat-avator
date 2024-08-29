import { EngineObject, Vector2, vec2, Sound } from "../../node_modules/littlejsengine/dist/littlejs.esm.js";
import { degreesToVector2 } from "../util/convert.js";

export class HairBall extends EngineObject
{
  powerup;
  /**
   * 
   * @param {Vector2} pos 
   * @param {number} angle
   */
  constructor(pos, angle=45)
  {
    super(pos); // set position
    
    this.velocity = (!!angle) ? degreesToVector2(angle) : vec2(-.25, 0); // set motion to
    
    this.powerup = new Sound([,,219,,,.11,1,,,.1,150,-0.01,.01,.1,-1,-0.2,,1.1,,.01,1]);
    this.powerup.play()
  }
}
