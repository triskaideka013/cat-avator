class GameOverStage extends StageBase
{

    constructor()
    {
        super();
    }

    init()
    {
        super.init();
    }

    gameUpdate()
    {

    }

    gameRenderPost()
    {
        drawTextScreen(`Your story continues... at a nice farm upstate.`, vec2(mainCanvasSize.x / 2, 200), 60);
    }
}