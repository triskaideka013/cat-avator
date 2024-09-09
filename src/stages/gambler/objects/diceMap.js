/**
 * map of dice sprites
 */
class DiceMap {
    constructor(gridX, gridY) {
      this.gridX = gridX;
      this.gridY = gridY;
  
      this.dice = [];
    }

    index(vector2) {
        return this.getMappedIndex(vector2);
    }
  
    setDice(vector2) {
      var index = this.index(vector2);
      var enabled = this.getEnabledState(index);
  
      var dice = new Dice(vector2, index, enabled);
      console.log(dice);
      this.dice[index] = dice;
    }
  
    getDice(vector2) {
      return this.dice[this.index(vector2)];
    }
  
    getMappedIndex(vector2) {
      return vector2.x + vector2.y * this.gridX
    }
  
    getEnabledState(i) {
      return this.dice[i].enabledState
    }

    setEnabledStateForIndex(i, enabledState) {
        this.dice[i].enabledState = enabledState
    }
  }
  