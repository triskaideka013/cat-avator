class RectObject extends EngineObject {
  constructor(position, size, color) {
    super(position, size);
    this.color = color;
  }

  render() {
    drawRect(this.pos, this.size, this.color);
  }
}
