class DiceState
{
    constructor(enabled)
    {
        this.enabled = enabled
    }

    isEnabled()
    {
        return this.enabled
    }

    enable()
    {
        this.enabled = true
    }

    disable()
    {
        this.enabled = false
    }
}