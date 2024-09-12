// import { Color, drawRect, drawTile } from "littlejsengine"
/**
 * @typedef {Class} PlayerDice
 * @property {number} frame
 * @property {number} value
 * @property {boolean} held
 */

// TODO: remove debug drudgery
class ShipCapnCrew {

    constructor(ante=[]) {        
        this.resetGame()
        this.player1.ante = ante
        this.gameoverFn = function() {} // keep gameover function cached
        this.pirateText = "Let's Gamble, LANDLUBBER!"
    }

    ///  SETUP ///

    resetGame() {
        this.player1 = this.setupPlayer();
        this.setupDice()
        this.gameover = false
        this.isTimedOut = false
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
        // create 5 dice
        let i = 0
        let offsetX = -36;
        do {
            this.player1.diceArray.push(new PlayerDice(vec2(offsetX + (22 * i), 0), vec2(16)))
            i++
        } while (this.player1.diceArray.length < 5)
    }

    ///  PLAY GAME ///

    /**
     * roll available player dice and decrement no. rolls
     */
    rollDice() {
        if (this.isTimedOut) return // no input if timed out awaiting confirmation

        if (this.player1.rolls > 0) {
            
            this.rollAvailable(this.player1)
        }    
    }

    rollAvailable(player) {
        if (player.hasLost || this.gameover || player.rolls <= 0) return

        player.rolls = player.rolls - 1;

        player.diceArray.forEach(d => {
            if (!d.held) d.roll()
        })
        
        this.evalDice(player.diceArray)
    }

    evalDice(diceArray) {
        let player = this.player1
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
        })

        // find ship, capn, crew

        let iShip = rolledValues.indexOf(6)
        let iCapn = rolledValues.indexOf(5)
        let iCrew = rolledValues.indexOf(4)

        if (!player.ship && iShip !== -1) {
            // ship!  collect dice
            player.ship = true 
            diceArray[rolledIndices[iShip]].held = true
            didCollect = true
        } 
        if (!player.capn && iCapn !== -1 && player.ship) { // player must have ship to colect capn
            // capn!  collect dice
            player.capn = true
            diceArray[rolledIndices[iCapn]].held = true
            didCollect = true
        }
        if (!player.crew && iCrew !== -1 && player.capn) { // player must have capn to colect crew
            // crew!  collect dice
            player.crew = true
            diceArray[rolledIndices[iCrew]].held = true
            didCollect = true
        }
        rolledValues = diceArray.filter(function(d){ return !d.held }).map(function(d){ return d.value })

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

        console.log({
            "score": player.score,
            "collect": didCollect, 
            "loser": player.hasLost,
            "ship-capn-crew": player.shipCapnCrew,
        }) 
        console.log(rolledValues, "rolled-after-collecting")
        console.log(heldDiceValue, "held")

        // winning, losing or re-rolling
        if (player.hasLost) {

            this.gameover = true
            this.endGame(player)

        } else if (player.shipCapnCrew) {
        
            if (player.rolls >= 1  // re-roll for higher score
                && player.score != 12) {  // unless they have the maximum already)
                
                this.isTimedOut = true; // set a flag so we can ignore user input until confirmation
                setTimeout(()=> {
                    this.isTimedOut = false
                    let rollAgain = confirm(`${scoreMsg}...risk it?`)

                    if (rollAgain) {

                        let hasShip = false, hasCapn = false, hasCrew = false
                        diceArray.forEach(function(d){
                            // allow re-roll of all dice that are not part of the ship-capn-crew set
                            d.held = false
                            if (d.value == 6 && !hasShip) {d.held = true; hasShip = true};
                            if (d.value == 5 && !hasCapn) {d.held = true; hasCapn = true};
                            if (d.value == 4 && !hasCrew) {d.held = true; hasCrew = true};
                        })
                        diceArray.forEach(function(d){
                            // what are we holding?
                            if (!d.held) {
                                let held
                                if (d.getValue() == 6) {
                                    held = true // hold the 6 for the player
                                } else {
                                    held = confirm(`hold ${d.getValue()}?`);
                                }
                                d.held = held
                            }
                        })
                        return this.rollDice();
                    }

                    this.endGame(player)

                }, 1000)

                } else {
                    this.endGame(player) // they have won and don't have any more rolls
                }

        }

    }

    endGame(player) {
        
        if (player.shipCapnCrew) {

            let riskItAll = false
            if (player.score == 12)
                riskItAll = confirm(`risk it all? just don't roll a 1!`)
            
            if (riskItAll) {
        
                let d6 = new PlayerDice(0,vec2(16))
                let roll = d6.roll().getValue()
                
                if (roll == 1) {
                    this.pirateText = `ARRR! 6 + 6 + ${roll} is 13...to davy jones's locker with ye!`
                    player.hasLost = true
                } else {
                    this.pirateText = `YO-HO-HO! 6 + 6 + ${roll} does not 13 make...${roll} times the treasure!`
                    player.score *= roll
                }
                console.log(this.pirateText)
            } 
            
            this.gameover = true    
        }

        if (this.gameover) {

            this.pirateText = (player.shipCapnCrew) ? `win! score is ${player.score}` : 'lose!'
            
            console.log(this.pirateText)
            
            this.gameoverFn()
        } 
    }

    /// HELPERS ///

    hasLost() {
        return this.gameover && this.player1.hasLost
    }

    hasWon() {
        return this.gameover && this.player1.shipCapnCrew && !this.hasLost()
    }
}

class PlayerDice extends EngineObject {

    constructor(pos, size) {

        super(pos, size)

        this.pos = pos
        this.size = size

        this.held = false
        this.value = 0
        this.frame = null
        this.angle = degreesToRadians(Math.floor(Math.random()*4)*90)
    }

    /**
     * 
     * @returns {PlayerDice} this, so method is chainable
     */
    roll() {
        this.frame = Math.floor(Math.random() * 6) // 0-5
        this.value = this.frame + 1 // number on dice
        return this
    }

    getValue() {
        return this.value
    }

    getValueString() {
        let str
        if (this.value !== null) {
            str =  this.value.toString()
        } else str = '?'
    }

    // littlejs
    render() {
        
        if (this.value > 0) {
            drawTile(this.pos, this.size, tile(this.frame, vec2(16,16), 4), new Color(0,0,0,1), this.angle)
        } else {
            drawRect(this.pos, this.size);
        }
    }
}

class PirateMouse extends EngineObject {

    constructor(pos, size=vec2(13,15)) {

        super(pos, size)

        this.pos = pos
        this.size = size
    }

    // littlejs
    render() {
        drawTile(this.pos, this.size, tile(0, vec2(13,15), 5), new Color(0,0,0,1))
    }
}