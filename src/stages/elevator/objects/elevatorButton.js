class ElevatorButton
{
    constructor(vector2, index, enabled, completed)
    {
        this.x = vector2.x;
        this.y = vector2.y;
        this.index = index;
        this.state = new ElevatorButtonState(enabled, completed);
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