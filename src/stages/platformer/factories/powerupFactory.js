class PowerupFactory {
  static createPowerups(powerupList) {
    return powerupList.map(powerup => {
      return new PowerUp(vec2(powerup.x, powerup.y), vec2(1, 1), new Color(1, 1, 0));
    });
  }
}
