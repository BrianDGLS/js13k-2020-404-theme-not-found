export enum GAME_MODE {
  SPRINT,
  MARATHON,
}

export enum SYMBOLS {
  DIVIDE,
  SUBTRACT,
}

export type NumberTriplet = [number, number, number]

export class Game {
  mode: GAME_MODE = GAME_MODE.SPRINT
  symbol: SYMBOLS = SYMBOLS.DIVIDE

  marathonLaps: number = 26
  laps: number = 0
  sprints: number = 0
  maxSprintSeconds: number = 60
  secondsSprinting: number = 0

  initialValue = 404
  currentValue = this.initialValue

  up: NumberTriplet = [0, 0, 0]
  down: NumberTriplet = [0, 0, 0]
  left: NumberTriplet = [0, 0, 0]
  right: NumberTriplet = [0, 0, 0]

  checkState() {
    if (this.currentValue === 0) {
      this.registerWin()
    } else if (this.currentValue < 0) {
      this.registerLoss()
    }

    if (this.mode === GAME_MODE.MARATHON && this.laps === this.marathonLaps) {
      // end marathon
    } else if (this.secondsSprinting === this.maxSprintSeconds) {
      // end sprint
    }
  }

  resetState() {
    this.resetCurrentValue()
    this.setNumberTriplets()
  }

  registerWin() {
    if (this.mode === GAME_MODE.SPRINT) {
      this.sprints += 1
    } else {
      this.laps += 1
    }
    this.resetState()
  }

  registerLoss() {
    if (this.mode === GAME_MODE.SPRINT) {
      this.sprints -= 1
    } else {
      this.laps -= 1
    }
    this.resetState()
  }

  resetCurrentValue() {
    this.currentValue = this.initialValue
  }

  updateCurrentValue(n: number) {
    if (this.symbol === SYMBOLS.DIVIDE) {
      this.currentValue = Math.round(this.currentValue / n)
    } else {
      this.currentValue = Math.round(this.currentValue - n)
    }
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1
  }

  getNumberTriplet(): NumberTriplet {
    return [this.getRandomNumber(), this.getRandomNumber(), this.getRandomNumber()]
  }

  switchSymbol() {
    if (this.symbol === SYMBOLS.DIVIDE) {
      this.symbol = SYMBOLS.SUBTRACT
    } else {
      this.symbol = SYMBOLS.DIVIDE
    }
  }

  startMarathon() {
    this.mode = GAME_MODE.MARATHON
    this.laps = 0
    this.resetState()
  }

  startSprint() {
    this.mode = GAME_MODE.SPRINT
    this.sprints = 0
    this.resetState()
  }

  setNumberTriplets() {
    this.up = this.getNumberTriplet()
    this.down = this.getNumberTriplet()
    this.left = this.getNumberTriplet()
    this.right = this.getNumberTriplet()
  }

  selectUp() {
    this.updateCurrentValue(this.up.shift() as number)
    this.up.push(this.getRandomNumber())
    this.checkState()
  }

  selectDown() {
    this.updateCurrentValue(this.down.shift() as number)
    this.down.push(this.getRandomNumber())
    this.checkState()
  }

  selectLeft() {
    this.updateCurrentValue(this.left.shift() as number)
    this.left.push(this.getRandomNumber())
    this.checkState()
  }

  selectRight() {
    this.updateCurrentValue(this.right.shift() as number)
    this.right.push(this.getRandomNumber())
    this.checkState()
  }
}
