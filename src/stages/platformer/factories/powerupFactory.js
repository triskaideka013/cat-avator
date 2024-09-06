class PowerupFactory {
  static createPowerups() {
    const powerups = [];
    powerups.push(new PowerUp(vec2(-30, 5), vec2(1, 1), new Color(1, 1, 0)));
    powerups.push(new PowerUp(vec2(6, 5), vec2(1, 1), new Color(1, 1, 0)));
    powerups.push(new PowerUp(vec2(140, 5), vec2(1, 1), new Color(1, 1, 0)));
    powerups.push(new PowerUp(vec2(180, 7), vec2(3, 3), new Color(1, 0, 1)));
    powerups.push(new PowerUp(vec2(100, 30), vec2(1, 1), new Color(1, 1, 0)));
    powerups.push(new PowerUp(vec2(240, 4), vec2(1, 1), new Color(1, 0, 0)));
    powerups.push(new PowerUp(vec2(240, -48), vec2(1, 1), new Color(1, 0, 0)));
    return powerups;
  }
}
