class EnemyFactory {
  static createEnemies(platformList, enemyIndexList, speedList=null) {
    const enemies = [];
    if(!speedList) {
      speedList = Array(enemyIndexList.length).fill().map((_, i) => vec2(2 / 60, 0));
    }
    enemyIndexList.forEach((enemyIndex, i) => {
      enemies.push(new NPCCat(platformList[enemyIndex].pos, vec2(2, 2), new Color(1, 0, 0), platformList[enemyIndex], speedList[i]));
    });
    return enemies;
  }
}
