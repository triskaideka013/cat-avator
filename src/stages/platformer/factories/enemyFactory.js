class EnemyFactory {
  static createEnemies(platforms) {
    const enemies = [];
    platforms.forEach(platform => {
      enemies.push(new Enemy(platform.pos, vec2(2, 2), new Color(1, 0, 0), platform));
    });
    return enemies;
  }
}
