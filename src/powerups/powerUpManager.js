
class PowerupManager
{

    constructor()
    {
        this.yarnBallCount =  0;
    }

    getYarnBallCount()
    {
        return this.yarnBallCount;
    }

    addYarnBalls(count)
    {
        this.yarnBallCount += count;
    }

    removeYarnball(index)
    {
        this.yarnBallCount--;
    }
}