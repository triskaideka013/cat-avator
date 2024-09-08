// uncomment this line to reference LittleJS types -->
// import { EngineObject, Vector2, vec2, Sound } from "../../node_modules/littlejsengine/dist/littlejs.esm.js";

class HairBall extends EngineObject
{
  
  /**
   * 
   * @param {Vector2} pos 
   * @param {number} angle
   */
  constructor(pos, angle=45)
  {
    super(pos, vec2(0.01, 0.01)); // set position, size=very smol
    
    this.velocity = (!!angle) ? degreesToVector2(angle) : vec2(-.25, 0); // set motion to

    this.powerup = new Sound([,,219,,,.11,1,,,.1,150,-0.01,.01,.1,-1,-0.2,,1.1,,.01,1]);
    this.powerup.play()
  }

  update() {
    super.update()
    drawText("🧶", this.pos, 1);
  }

}
