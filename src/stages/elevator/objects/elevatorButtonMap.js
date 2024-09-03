class ElevatorButtonMap
{
    constructor(gridX, gridY)
    {
        this.gridX = gridX;
        this.gridY = gridY;

        this.buttons = [];
    }

    setButton(vector2)
    {
        var index = this.getMappedIndex(vector2);
        var button = new ElevatorButton(vector2, index);
        this.buttons[index] = button;
    }


    getButton(vector2)
    {
        var index = this.getMappedIndex(vector2);
        return this.buttons[index];
    }

    getMappedIndex(vector2)
    {
        return vector2.x + vector2.y * this.gridX;
    }
}