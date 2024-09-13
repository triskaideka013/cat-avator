// import { Color, drawRect, drawTile } from "littlejsengine"
/**
 * @typedef {Class} PlayerDice
 * @property {number} frame
 * @property {number} value
 * @property {boolean} held
 */
let heldDiceBGColor = hsl(degreesToRadians(72),1,.65) // 80 light green
let gameDiceBGColor = hsl(degreesToRadians(115),.5,.5)

// TODO: remove debug drudgery
class ShipCapnCrew {

    constructor(suddenDeath=false) {        
        this.player1 = this.setupPlayer()
        this.gameover = false
        this.isTimedOut = false
        this.triskaideka = false
        this.suddenDeath = suddenDeath
    }

    ///  SETUP ///


    /**
     * 
     * @returns {Object}
     */
    setupPlayer() {
        let player = {
            diceArray: [],
            shipCapnCrew: false,
            hasLost: false,
            ship: false,
            capn: false,
            crew: false,
            rolls: 3,
            score: 0
        }
        // create 5 dice
        let i = 0
        let offsetX = -36;
        do {
            player.diceArray.push(new PlayerDice(vec2(offsetX + (22 * i), 0), vec2(16)))
            i++
        } while (player.diceArray.length < 5)

        return player
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

        player.diceArray.forEach((d, i) => {
            if (!d.held) d.roll()
            // if (i === 0) {d.value = 6} // <-- automatic boxcars condition for testing
            // if (i === 1) {d.value = 5}
            // if (i === 2) {d.value = 4}
            // if (i > 2) {
            //     d.value = 6;
            // } 
            // d.frame = d.value - 1
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
                rolledValues.push(d.value)
                rolledIndices.push(i)
            } else if (d.held) {
                if (d.value < 4 || // if dice value is not 6, 5, 4
                    collectedDice.indexOf(d.value) != -1) { // -- or we have already counted them
                    heldDiceValue += d.value
                } else {
                    collectedDice.push(d.value) // 6, 5, 4
                }
                
            }
            i+=1
        })

        // find ship, capn, crew

        let iShip = rolledValues.indexOf(6)
        let iCapn = rolledValues.indexOf(5)
        let iCrew = rolledValues.indexOf(4)

        if (!player.ship && iShip != -1) {
            // ship!  collect dice
            player.ship = true 
            diceArray[rolledIndices[iShip]].collect()
            didCollect = true
        } 
        if (!player.capn && iCapn != -1 && player.ship) { // player must have ship to colect capn
            // capn!  collect dice
            player.capn = true
            diceArray[rolledIndices[iCapn]].collect()
            didCollect = true
        }
        if (!player.crew && iCrew != -1 && player.capn) { // player must have capn to colect crew
            // crew!  collect dice
            player.crew = true
            diceArray[rolledIndices[iCrew]].collect()
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
                                if (d.value == 6) {
                                    held = true // hold the 6 for the player
                                } else {
                                    held = confirm(`hold ${d.value}?`);
                                }
                                d.held = held
                            }
                        })
                        return //this.rollDice();
                    }

                    this.endGame(player)

                }, 500)

                } else {
                    this.endGame(player) // they have won and don't have any more rolls
                }

        }

    }

    endGame(player) {
        
        if (player.shipCapnCrew) {

            let riskItAll = false
            
            if (player.score == 12 && this.suddenDeath) {
                
                this.isTimedOut = true

                setTimeout(()=>{

                    this.isTimedOut = false;

                    riskItAll = confirm(`risk it all? just don't roll a 1..`)

                    this.gameover = true   

                    if (riskItAll) {
        
                        let d6 = new PlayerDice(vec2(8, -22), vec2(16))
                        
                        let roll = d6.roll().value
                        d6.held = true
                        this.highlight()
                        
                        if (roll == 1) {
                            this.pirateText = `\nARRR! 6 + 6 + 1 is 13...\n\nHow UNLUCKY! Time to walk the PLANK.`
                            player.hasLost = true
                            this.triskaideka = true
                        } else {
                            this.pirateText = `\nYO-HO-HO! 6 + 6 + ${roll} does not 13 make...\n\n${roll} times the TREASURE!`
                            player.score *= roll
                        }

                    } else {

                        this.classicEnding()                
                    }

                }, 500)

            } else {
                this.gameover = true
            }
        }
        this.classicEnding()
    }

    classicEnding() {

        if (this.player1.shipCapnCrew) {
            this.highlight()
        } 
        
        this.pirateText = (this.player1.shipCapnCrew) ? "\nSQUEEEK!\n\nYou are a WINNER...take your PRIZE!!" : "\n\nYOU LOST.  I'll be taking that!"
    }

    highlight() {
        this.player1.diceArray.forEach(d => { // highlight all dice used for score
            if (!d.gameDice)
                d.held = true
        })
    }
}

class PlayerDice extends EngineObject {

    constructor(pos, size) {

        super(pos, size)

        this.pos = pos
        this.size = size

        this.held = false
        this.gameDice = false
        this.value = 0
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

    collect() {
        this.held = true
        this.gameDice = true
    }

    // reset() {
    //     this.held = false
    //     this.gameDice = false
    //     this.value = 0
    //     this.frame = null
    // }

    // littlejs
    render() {
        
        if (this.value > 0) {

            if (this.held) // rectangle behind dice to show they are held?
                drawRect(this.pos, vec2(this.size.x*1.25), this.gameDice ? gameDiceBGColor : heldDiceBGColor);
            
            drawTile(this.pos, this.size, tile(this.frame, vec2(16), 2), new Color(0,0,0,1))
        } else {
            drawRect(this.pos, this.size);
        }
    }
}

class PirateMouse extends EngineObject {

    constructor(pos, size) {

        super(pos, size)

        this.pos = pos
        this.size = size
    }

    // littlejs
    render() {
        drawTile(this.pos, this.size, tile(0, this.size, 3), new Color(0,0,0,1))
    }
}