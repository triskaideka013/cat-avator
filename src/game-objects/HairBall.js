// uncomment this line to reference LittleJS types -->
// import { EngineObject, Vector2, vec2, Sound, mainCanvas, collideWithObject } from "littlejsengine";

const MAX_BALL_COLLISIONS = 2 
class HairBall extends EngineObject
{
  
  /**
   * 
   * @param {Vector2} pos 
   * @param {number} angle
   */
  constructor(pos, angle=45)
  {
    super(pos, vec2(0.01, 0.01)) // set position, size=very smol
    
    this.velocity = degreesToVector2(angle) // set motion to

    this.powerup = new Sound([,,219,,,.11,1,,,.1,150,-0.01,.01,.1,-1,-0.2,,1.1,,.01,1])
    this.powerup.play()

    this.setCollision()
    
    this.elasticity = 1 // make it bouncey
    this.collisions = 0
  }

  update() {
    super.update()
    drawText("🧶", this.pos, 1)
    if (this.pos.x > mainCanvasSize.x || this.pos.y > mainCanvasSize.y) {
      this.destroy()
    }
  }

  collideWithObject(o) {
    if (this.collisions === MAX_BALL_COLLISIONS)
      this.destroy()
    else 
      this.collisions++
    return true
  }

}
