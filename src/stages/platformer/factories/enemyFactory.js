class EnemyFactory {
  static createEnemies(platformList, enemyIndexList, speedList=null) {
    if(!speedList) {
      speedList = Array(enemyIndexList.length).fill().map((_, i) => vec2(2 / 60, 0));
    }
    return enemyIndexList.map((enemyIndex, i) => {
      return new NPCCat('rat', platformList[enemyIndex].pos, vec2(2, 2), new Color(1, 0, 0), platformList[enemyIndex], speedList[i], true);
    });
  }
}
