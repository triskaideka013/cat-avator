class ElevatorButtonMap {
  constructor(gridX, gridY, completedLevels, playerIsACheater) {
    this.gridX = gridX;
    this.gridY = gridY;

    this.completedLevels = completedLevels;
    this.buttons = [];
    this.isFirstAttempt = !completedLevels || completedLevels.length == 0;
    this.playerIsACheater = playerIsACheater;
  }

  setButton(vector2) {
    var index = this.getMappedIndex(vector2);
    var enabled = this.getEnabledState(index);
    var completed = this.isCompletedState(index);
    var button = new ElevatorButton(vector2, index, enabled, completed);

    this.buttons[`x${vector2.x}y${vector2.y}`] = button;
  }

  getButton(vector2) {
    let index = `x${vector2.x}y${vector2.y}`;
    return this.buttons[index];
  }

  getMappedIndex(vector2) {
    
    return vector2.x + vector2.y * this.gridX;
  }

  getEnabledState(newButtonIndex) {

    if(this.playerIsACheater && newButtonIndex == 12)
    {
      return true;
    }

    // default to first floor unlocked
    if (this.isFirstAttempt) {
      return newButtonIndex == 0;
    }

    // if level completed, allow player to replay
    if (this.isCompletedState(newButtonIndex)) return true;

    var highestCompletedIndex = 0;
    var highestCompletedLevel = null;

    // get largest index of completed levels
    this.completedLevels.forEach((b) => {
      if (b.index >= highestCompletedIndex)
      {
        highestCompletedIndex = b.index;
        highestCompletedLevel = b;
      }
    });

    // increment the enabled button if last stage was completed
    if (highestCompletedLevel && highestCompletedLevel.getState().isCompleted()) {
      // is this the level after the highest completed?
      return newButtonIndex == highestCompletedIndex + 1;
    }

    // last stage was not completed, keep same button highlighted
    return newButtonIndex == highestCompletedIndex;
  }

  isCompletedState(newButtonIndex) {
    var found = this.completedLevels.find((b) => b.index == newButtonIndex);

    if (!found?.state) return false;

    return found.state.isCompleted();
  }
}
