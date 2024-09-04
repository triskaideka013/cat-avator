class ElevatorButtonState
{
    constructor(enabled, completed)
    {
        this.enabled = enabled;
        this.completed = completed ;
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

    disable()
    {
        this.enabled = false;
    }

    complete()
    {
        this.completed = true;
        this.disable();
    }
}