class ElevatorButtonState
{
    constructor()
    {
        this.enabled = false;
        this.completed = false;
    }

    isEnabled()
    {
        return this.enabled;
    }

    isCompleted()
    {
        return this.completed;
    }

    enable()
    {
        this.enabled = true;
    }

    complete()
    {
        this.completed = true;
    }
}