import { Game, GAME_MODE, SYMBOLS, NumberTriplet } from './game'

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

const game = new Game()

window.addEventListener('DOMContentLoaded', () => {
  game.startMarathon()
  updateUI()
  setActiveSymbolButton()
})

function updateUI() {
  $mode.innerText = game.mode === GAME_MODE.MARATHON ? 'Marathon' : 'Sprint'
  $score.innerText = game.laps.toString()
  $value.innerText = game.currentValue.toString()

  $downNumbers.innerHTML = getNumberElements(game.down)
  $upNumbers.innerHTML = getNumberElements(game.up, true)
  $rightNumbers.innerHTML = getNumberElements(game.right)
  $leftNumbers.innerHTML = getNumberElements(game.left, true)
}

function getNumberElements(triplet: NumberTriplet, inverse: boolean = false) {
  const reducer = (acc: string, n: number) => ((acc += `<span>${n}</span>`), acc)
  return inverse ? triplet.reduceRight(reducer, '') : triplet.reduce(reducer, '')
}

function setActiveSymbolButton() {
  if (game.symbol === SYMBOLS.DIVIDE) {
    $divide?.classList.add('active')
    $subtract?.classList.remove('active')
  } else {
    $subtract?.classList.add('active')
    $divide?.classList.remove('active')
  }

  $symbol.innerText = game.symbol === SYMBOLS.DIVIDE ? '/' : '-'
}

function handleSymbolButton() {
  game.switchSymbol()
  return setActiveSymbolButton()
}

for (const $button of $buttons) {
  $button.addEventListener('pointerup', () => {
    const key = $button.getAttribute('data-key') as string
    handleButtonSelect(key)
  })

  $button.addEventListener('pointerdown', () => {
    $button?.classList.add('active')
  })
}

window.addEventListener('keyup', (e) => {
  handleButtonSelect(e.key)
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

function handleButtonSelect(key: string) {
  if (key === ' ') return handleSymbolButton()

  for (const $button of $buttons) {
    const selectedKey = $button.getAttribute('data-key')

    if (selectedKey && key === selectedKey) {
      switch (selectedKey) {
        case 'ArrowUp':
          game.selectUp()
          break
        case 'ArrowDown':
          game.selectDown()
          break
        case 'ArrowLeft':
          game.selectLeft()
          break
        case 'ArrowRight':
          game.selectRight()
          break
      }

      updateUI()
      $button?.classList.remove('active')
    }
  }
}
