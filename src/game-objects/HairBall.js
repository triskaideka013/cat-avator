// TODO:  add jsdoc, refer to github.com/KilledByAPixel/LittleJS src code for examples
class HairBall extends EngineObject
{
  // TODO:  accept dir[ection] param so we can aim the hairball
  constructor(pos)
  {
    super(pos); // set position

    this.velocity = vec2(-.25, 0); // set motion
  }
}
