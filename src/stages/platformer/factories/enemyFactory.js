class EnemyFactory {
  static createEnemies(platforms) {
    const enemies = [];
    enemies.push(new Enemy(vec2(20, 8), vec2(2, 2), new Color(1, 0, 0), platforms[2]));
    enemies.push(new Enemy(vec2(50, 3), vec2(2, 2), new Color(0, 0, 1), platforms[5]));
    return enemies;
  }
}
