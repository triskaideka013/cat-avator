/**
 * @typedef {Class} PlayerDice
 * @property {number} face
 * @property {number} value
 * @property {boolean} held
 */

const DICE_SIDES = 6

class ShipCapnCrew {

    constructor() {        
        this.player1 = this.setupPlayer()
        this.player1.ante = []
        // this.player2 = this.setupPlayer() // computer
        // this.player1turn = true
        this.setupDice()
        this.debug = true
        this.gameover = false
        this.gameoverFn = function() {}
    }

    ///  SETUP ///

    /**
     * 
     * @returns {Object}
     */
    setupPlayer() {
        return {
            diceArray: []
            , shipCapnCrew: false
            , hasLost: false
            , ship: false
            , capn: false
            , crew: false
            , rolls: 3
            , score: 0
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
        // this.player1turn && 
        this.rollAvailable(this.player1)
        // !this.player1turn && 
        // this.rollAvailable(this.player2)
    }

    rollAvailable(player) {
        player.rolls = player.rolls - 1
        player.diceArray.forEach((d, i) => {
            if (!d.held) d.roll(i)
        })
        this.evalDice(player.diceArray)
    }

    evalDice(diceArray) {
        let player = this.getPlayer()
        let didCollect = false
        let rolledValues = [], rolledIndices = []
        let heldDiceScore = 0 // if they re-roll any "cargo" for a higher score, track the points of these dice

        diceArray.forEach((d, i) => {
            if (!d.held) {
                // create parallel arrays with values of dice and their indices
                rolledValues.push(d.value)
                rolledIndices.push(i)
            } else if (d.held && d.value < 4) {
                heldDiceScore += d.value
            }
        })

        this.debug && console.log(rolledValues,'before')
        
        // find ship, capn, crew
        
        let iShip = rolledValues.indexOf(6)
        if (!player.ship && iShip !== -1) {
            // ship!  collect dice
            player.ship = true
            diceArray[rolledIndices[iShip]].held = true
            rolledValues.splice(iShip, 1)
            didCollect = true
        }
        
        let iCapn = rolledValues.indexOf(5)
        if (!player.capn && iCapn !== -1 && player.ship) { // player must have ship to colect capn
            // capn!  collect dice
            player.capn = true
            diceArray[rolledIndices[iCapn]].held = true
            rolledValues.splice(iCapn, 1)
            didCollect = true
        }

        let iCrew = rolledValues.indexOf(4)
        if (!player.crew && iCrew !== -1 && player.capn) { // player must have capn to colect crew
            // crew!  collect dice
            player.crew = true
            diceArray[rolledIndices[iCrew]].held = true
            rolledValues.splice(iCrew, 1)
            didCollect = true
        }

        this.debug && console.log(rolledValues,'before')
        this.debug && console.log(didCollect,'did player collect ship/capn/crew?')

        player.shipCapnCrew = (player.ship && player.capn && player.crew)
        
        // losing condition
        if (player.rolls <= 0 && !player.shipCapnCrew) {
            player.hasLost = true
            this.debug && console.log('out of rolls')
        }
        this.debug && console.log('rolls left', player.rolls)
        this.debug && console.log('score', player.score)
        this.debug && console.log('held score', heldDiceScore)
        // score
        if (!player.hasLost && player.shipCapnCrew && (rolledValues.length > 0 || heldDiceScore > 0)) {
            player.score = 0
            rolledValues?.map(val => {
                player.score += val
            })
            player.score += heldDiceScore
        }
        this.debug && console.log('hasLost', player.hasLost)
        this.debug && console.log('score', player.score)
            

        // winning, losing and re-rolling
        let scoreMsg = `your score is ${player.score}`

        if (player.hasLost) {

            this.debug && console.log('loser!')
            this.gameover = true
        
        } else if (player.shipCapnCrew && player.rolls >=1) {
            
            let rollAgain = confirm(`${scoreMsg}...risk it?`)

            if (rollAgain) {
                let freeDice = []
                diceArray.forEach((d, i) => {
                    if (!d.held) d.hold = confirm(`hold ${d.value}?`)
                })
                this.rollDice()
                return
            }
        }

        if (player.shipCapnCrew) {
            this.debug && console.log('winner!')
            this.debug && console.log(scoreMsg)
            this.gameover = true
        }

        if (this.gameover) this.gameoverFn()
    }

    /// HELPERS ///

    /**
     * 
     * @returns {Object}
     */
    getPlayer() {
        return this.player1
            // this.player1turn ? 
            // this.player1 : 
            // this.player2
    }

    // takeTurns() {
    //     this.player1turn = !this.player1turn
    // }
}

class PlayerDice {
    constructor() {
        this.held = false
        // this.sprite = new Dice()
    }

    roll(index) {
        this.face = this.newFaceValue() // index in array
        this.value = this.face + 1 // number on dice
        console.log(this.value, `dice no. ${(index+1).toString()}: ${this.value}`)
    }

    newFaceValue() {
        return  Math.floor(Math.random() * DICE_SIDES) // 0-5
    }

    getFaceValue() {
        return this.value
    }

    getValueString() {
        let str
        if (!!this.value) {
            str =  this.value.toString()
        } else str = '?'
    }
}

// look ma, no semi-colons!