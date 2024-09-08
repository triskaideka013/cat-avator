
class PowerupManager
{
    constructor()
    {
        this.powerups = [];
    }

    getPowerups()
    {
        return this.powerups;
    }

    addPowerup(powerup)
    {
        this.powerups.push(powerup);
    }

    removePowerupByIndex(index)
    {
        this.powerups.splice(index, 1);
    }
}