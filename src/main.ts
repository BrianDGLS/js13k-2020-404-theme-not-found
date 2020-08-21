const $up = document.getElementById('up')
const $down = document.getElementById('down')
const $left = document.getElementById('left')
const $right = document.getElementById('right')

const $upNumbers = document.getElementById('up-numbers') as HTMLElement
const $downNumbers = document.getElementById('down-numbers') as HTMLElement
const $leftNumbers = document.getElementById('left-numbers') as HTMLElement
const $rightNumbers = document.getElementById('right-numbers') as HTMLElement

const $divide = document.getElementById('divide')
const $subtract = document.getElementById('subtract')

const $mode = document.getElementById('mode') as HTMLSpanElement
const $score = document.getElementById('score') as HTMLSpanElement

const $symbol = document.getElementById('symbol') as HTMLSpanElement
const $value = document.getElementById('value') as HTMLSpanElement

const $buttons = document.querySelectorAll('[data-key]')

enum Symbols {
  SUBTRACT,
  DIVIDE,
}

class Game {
  initialValue = 404
  currentValue = this.initialValue
  score = 0
  mode: 'sprint' | 'marathon' = 'sprint'
  numbers: { [key: string]: number[] } = {
    up: [],
    down: [],
    left: [],
    right: [],
  }

  symbol: Symbols = Symbols.DIVIDE

  update() {
    this.updateValue()
    this.updateScore()
  }

  randomNumber() {
    return Math.floor(Math.random() * 9) + 1
  }

  generateNumbers() {
    for (const key in this.numbers) {
      while (this.numbers[key].length < 3) {
        this.numbers[key].push(this.randomNumber())
      }
      switch (key) {
        case 'up':
          $upNumbers.innerHTML = `${this.numbers[key].map((n) => `<span>${n}</span>`).join('')}`
          break
        case 'down':
          $downNumbers.innerHTML = `${this.numbers[key].map((n) => `<span>${n}</span>`).join('')}`
          break
        case 'left':
          $leftNumbers.innerHTML = `${this.numbers[key].map((n) => `<span>${n}</span>`).join('')}`
          break
        case 'right':
          $rightNumbers.innerHTML = `${this.numbers[key].map((n) => `<span>${n}</span>`).join('')}`
          break
      }
    }
  }

  init() {
    this.currentValue = this.initialValue
    this.symbol = Symbols.DIVIDE
    this.updateSymbol()
    this.generateNumbers()
  }

  updateValue() {
    $value.innerText = this.currentValue.toString()
  }

  updateScore() {
    $score.innerText = this.score.toString()
  }

  updateMode() {
    $mode.innerText = this.mode.toString()
  }

  updateSymbol() {
    if (this.symbol === Symbols.DIVIDE) {
      $symbol.innerText = '/'
      $divide?.classList.add('active')
      $subtract?.classList.remove('active')
    } else {
      $symbol.innerText = '-'
      $subtract?.classList.add('active')
      $divide?.classList.remove('active')
    }
  }

  switchSymbol() {
    if (this.symbol === Symbols.DIVIDE) {
      this.symbol = Symbols.SUBTRACT
    } else {
      this.symbol = Symbols.DIVIDE
    }

    this.updateSymbol()
  }

  selectLeft() {
    const leftValue = this.numbers.left.pop() as number
    this.numbers.left.unshift(this.randomNumber())
    if (this.symbol === Symbols.DIVIDE) {
      this.currentValue = Math.round(this.currentValue / leftValue)
    } else {
      this.currentValue = Math.round(this.currentValue - leftValue)
    }

    $leftNumbers.innerHTML = `${this.numbers.left.map((n) => `<span>${n}</span>`).join('')}`

    this.update()
  }
}

const game = new Game()

window.addEventListener('DOMContentLoaded', () => {
  game.init()
})

for (const $button of $buttons) {
  $button.addEventListener('pointerup', () => {
    const key = $button.getAttribute('data-key')
    if (key === ' ') {
      return game.switchSymbol()
    }

    if (key === 'ArrowLeft') game.selectLeft()

    $button?.classList.remove('active')
  })

  $button.addEventListener('pointerdown', () => {
    $button?.classList.add('active')
  })
}

window.addEventListener('keyup', (e) => {
  if (e.key === ' ') {
    return game.switchSymbol()
  }

  for (const $button of $buttons) {
    const key = $button.getAttribute('data-key')
    if (key && e.key === key) {
      if (key === 'ArrowLeft') game.selectLeft()

      $button?.classList.remove('active')
    }
  }
})

window.addEventListener('keydown', (e) => {
  if (e.key === ' ') return

  for (const $button of $buttons) {
    const key = $button.getAttribute('data-key')
    if (key && e.key === key) {
      $button?.classList.add('active')
    }
  }
})

function debounce(fn: (...args: any[]) => any, ms = 0) {
  let timeoutId: number
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
