
class PowerupManager
{

    constructor()
    {
        this.yarnBallCount =  10;
    }

    getYarnBallCount()
    {
        return this.yarnBallCount;
    }

    addYarnBalls(count)
    {
        this.yarnBallCount += count;
    }

    removeYarnBall()
    {
        this.yarnBallCount--;
    }

    setYarnBalls(count)
    {
        this.yarnBallCount = count;
    }
}