/**
 * @typedef {Class} PlayerDice
 * @property {number} face
 * @property {number} value
 * @property {boolean} held
 */

const DICE_SIDES = 6

// TODO: remove debug drudgery
class ShipCapnCrew {

    constructor(ante=[]) {        
        this.resetGame()
        this.player1.ante = ante
        this.gameoverFn = function() {} // keep gameover function cached
    }

    ///  SETUP ///

    resetGame() {
        this.player1 = this.setupPlayer()
        this.player2// = this.setupPlayer() // computer player, might not be required for sake of reducing complexity
        this.player1turn = true
        this.setupDice()
        this.debug = true
        this.gameover = false
    }

    /**
     * 
     * @returns {Object}
     */
    setupPlayer() {
        return {
            diceArray: [],
            shipCapnCrew: false,
            hasLost: false,
            ship: false,
            capn: false,
            crew: false,
            rolls: 3,
            score: 0
        }
    }

    setupDice() {
        let players = [
            this.player1
            // , this.player2
        ]
        players.forEach(p => {
            // create 5 dice
            do {
                p.diceArray.push(new PlayerDice())
            } while (p.diceArray.length < 5)
            
        })
    }

    ///  PLAY GAME ///

    /**
     * roll available player dice and decrement no. rolls
     */
    rollDice() {
        this.player1turn && this.rollAvailable(this.player1)
        !this.player1turn && this.rollAvailable(this.player2)
    }

    rollAvailable(player) {
        if (player.rolls <= 0) return

        player.rolls = player.rolls - 1

        player.diceArray.forEach(d => {
            if (!d.held) d.roll()
        })
        
        this.evalDice(player.diceArray)
    }

    evalDice(diceArray) {
        let player = this.getPlayer()
        let didCollect = false
        let rolledValues = [], rolledIndices = []
        let heldDiceValue = 0 // if they keep some cargo when re-rolling for higher score
        
        let i = 0
        let collectedDice = []
        diceArray.forEach(d => {
            if (!d.held) {
                // create parallel arrays with values of dice and their indices
                rolledValues.push(d.getValue())
                rolledIndices.push(i)
            } else if (d.held) {
                if (d.getValue() < 4 || // if dice value is not 6, 5, 4
                    collectedDice.indexOf(d.getValue()) !== -1) { // -- or we have already counted them
                    heldDiceValue += d.getValue()
                } else {
                    collectedDice.push(d.getValue()) // 6, 5, 4
                }
                
            }
            i+=1
            if (this.debug) console.log(d)
        })

        // find ship, capn, crew

        let iShip = rolledValues.indexOf(6)
        let iCapn = rolledValues.indexOf(5)
        let iCrew = rolledValues.indexOf(4)

        this.debug && console.log(rolledValues, 'rolled-before')
        if (!player.ship && iShip !== -1) {
            // ship!  collect dice
            player.ship = true 
            diceArray[rolledIndices[iShip]].held = true
            didCollect = true
            this.debug && console.log('collect ship')
        }
        
        if (!player.capn && iCapn !== -1 && player.ship) { // player must have ship to colect capn
            // capn!  collect dice
            player.capn = true
            diceArray[rolledIndices[iCapn]].held = true
            didCollect = true
            this.debug && console.log('collect capn')
        }

        if (!player.crew && iCrew !== -1 && player.capn) { // player must have capn to colect crew
            // crew!  collect dice
            player.crew = true
            diceArray[rolledIndices[iCrew]].held = true
            didCollect = true
            this.debug && console.log('collect crew')
        }
        rolledValues = diceArray.filter(function(d){ return !d.held }).map(function(d){ return d.value })
        this.debug && console.log(rolledValues, 'rolled-after')

        // win condition (you can still roll for more points if you win)
        player.shipCapnCrew = (player.ship && player.capn && player.crew)
        
        // lose condition
        if (player.rolls <= 0 && !player.shipCapnCrew)
            player.hasLost = true

        // score = value of "crew" dice
        if (!player.hasLost && player.shipCapnCrew && (rolledValues.length > 0 || heldDiceValue > 0)) {
            player.score = 0
            // from the current roll
            rolledValues?.forEach(val => player.score += val)
            // held from previous rolls
            player.score += heldDiceValue
        }
        let scoreMsg = `your score is ${player.score}`

        this.debug && console.log({
            "rolls": player.rolls,
            "score": player.score,
            "collect": didCollect, 
            "loser": player.hasLost,
            "ship-capn-crew": player.shipCapnCrew,
        }) 
        this.debug && console.log(rolledValues, "rolled")
        this.debug && console.log(heldDiceValue, "held")

        // winning, losing or re-rolling
        if (player.hasLost) {

            this.loseGame()

        } else if (player.shipCapnCrew && player.rolls >=1) {
            
            let rollAgain = confirm(`${scoreMsg}...risk it?`)

            if (rollAgain) {
                let hasShip = false, hasCapn = false, hasCrew = false
                diceArray.forEach(function(d){
                    // allow re-roll of all dice that are not part of the ship-capn-crew set
                    d.held = false
                    if (d.value === 6 && !hasShip) d.held = true;
                    if (d.value === 5 && !hasCapn) d.held = true;
                    if (d.value === 4 && !hasCrew) d.held = true;
                })
                diceArray.forEach(function(d){
                    // what are we holding?
                    if (!d.held) {
                        let held = confirm(`hold ${d.getValue()}?`);
                        d.held = held
                    }
                })
                return this.rollDice()
            }
        }

        if (player.shipCapnCrew) {

            let riskItAll = false
            if (player.score === 12)
                riskItAll = confirm(`risk it all? just don't roll a 1!`)
            
            if (riskItAll) {
                
                let d6 = new PlayerDice()
                d6.roll()
                if (d6.getValue() === 1) {
                    player.hasLost = true
                } else {
                    player.score = 26
                }
                
            } else {
                this.winGame()
            }

            if (player.hasLost) {
                this.loseGame()     
            } else {
                this.winGame()
            }
            
        } else {
            // this.takeTurns()
        }

        if (this.gameover) this.gameoverFn()
    }

    loseGame() {
        this.debug && console.log('loser!')
        this.gameover = true
    }

    winGame() {
        this.debug && console.log(`winner! score is ${this.getPlayer().score}`)
        this.gameover = true
    }

    /// HELPERS ///

    /**
     * 
     * @returns {Object}
     */
    getPlayer() {
        return this.player1turn ? this.player1 : this.player2
    }

    takeTurns() {
        this.player1turn = !this.player1turn
    }
}

class PlayerDice {
    constructor() {
        this.held = false
    }

    roll(index) {
        this.face = Math.floor(Math.random() * DICE_SIDES) // 0-5
        this.value = this.face + 1 // number on dice
    }

    getValue() {
        return this.value
    }

    getValueString() {
        let str
        if (!!this.value) {
            str =  this.value.toString()
        } else str = '?'
    }
}