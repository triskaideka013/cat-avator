class ElevatorButton
{
    constructor(vector2, index)
    {
        this.x = vector2.x;
        this.y = vector2.y;
        this.index = index;
        this.state = new ElevatorButtonState();

        if(this.index == 0)
        {
            this.state.enable();
        }
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