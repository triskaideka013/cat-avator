/**
 * dice sprite with enabled state for input
 */
class Dice
{
    constructor(vector2, index, enabled)
    {
        this.x = vector2.x;
        this.y = vector2.y;
        this.index = index;
        this.state = new DiceState(enabled);
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    getIndex()
    {
        return this.index;
    }

    getState()
    {
        return this.state;
    }
}