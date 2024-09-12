class SimpleButton {
  constructor(
    position = vec2(0),
    size = vec2(0),
    buttonColor = new Color(0.5, 0.5, 0.5, 1)
  ) {
    this.position = position;
    this.buttonSize = size;
    this.buttonColor = buttonColor;

    this.buttonText = "";
    this.textSize = 1;
    this.textColor = new Color(0, 0, 0, 1);

    this.data = null;
  }

  setText(text, textSize, color) {
    this.buttonText = text;
    this.textSize = textSize;
    this.textColor = color;
  }

  setData(data)
  {
    this.data = data;
  }

  render()
  {
    drawText(this.buttonText, this.position, this.textSize, this.textColor);
    drawRect(this.position, this.buttonSize, this.buttonColor);
  }

  wasClicked()
  {
    if (!mouseWasPressed(0)) return false;
    
    const mouseTilePos = mousePos.floor();
   
    const buttonW = this.buttonSize.x / 2;
    const buttonH = this.buttonSize.y / 2;

    const minX = this.position.x - buttonW;
    const maxX = this.position.x + buttonW;

    const minY = this.position.y - buttonH;
    const maxY = this.position.y + buttonH;

    // within X bounds
    var inboundX = (mouseTilePos.x >= minX && mouseTilePos.x <= maxX);
    var inboundY = (mouseTilePos.y >= minY && mouseTilePos.y <= maxY);

    return inboundX && inboundY;
  }
}
