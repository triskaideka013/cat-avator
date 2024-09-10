class EnemyFactory {
  static createEnemies(platformList, enemyIndexList) {
    const enemies = [];
    enemyIndexList.forEach(enemyIndex => {
      enemies.push(new NPCCat(platformList[enemyIndex].pos, vec2(2, 2), new Color(1, 0, 0), platformList[enemyIndex]));
    });
    return enemies;
  }
}
