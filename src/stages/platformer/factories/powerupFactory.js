class PowerupFactory {
  static createPowerups(powerupList) {
    const powerups = [];
    powerupList.forEach(powerup => {
      powerups.push(new PowerUp(vec2(powerup.x, powerup.y), vec2(1, 1), new Color(1, 1, 0)));
    });
    return powerups;
  }
}
