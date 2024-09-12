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
    
    complete()
    {
        this.completed = true;
    }
}