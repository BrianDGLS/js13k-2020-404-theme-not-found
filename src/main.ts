/**
 * ui
 */

const $teardown = document.querySelector('.teardown') as HTMLSpanElement

const $upBtn = document.querySelector('.btn__up') as HTMLButtonElement
const $downBtn = document.querySelector('.btn__down') as HTMLButtonElement
const $leftBtn = document.querySelector('.btn__left') as HTMLButtonElement
const $rightBtn = document.querySelector('.btn__right') as HTMLButtonElement
const $divideBtn = document.querySelector('.btn__divide') as HTMLButtonElement
const $subtractBtn = document.querySelector('.btn__subtract') as HTMLButtonElement

const $sets = [...document.querySelectorAll('.upcoming-number__set')]

const $upcomingNumbers: { [key: string]: HTMLSpanElement[] } = {
  ArrowLeft: [...$sets[0].querySelectorAll('span')].reverse(),
  ArrowDown: [...$sets[1].querySelectorAll('span')].reverse(),
  ArrowUp: [...$sets[2].querySelectorAll('span')].reverse(),
  ArrowRight: [...$sets[3].querySelectorAll('span')].reverse(),
}

/**
 * game code
 */
const INITIAL_VALUE = 404
const POSSIBLE_NUMBERS: number[] = []

let IS_DIVIDE = true

const MAX_POSSIBLE = 10
const INCREMENT = 1
let acc = MAX_POSSIBLE
while (POSSIBLE_NUMBERS.length < MAX_POSSIBLE / INCREMENT) {
  POSSIBLE_NUMBERS.push(acc)
  acc -= INCREMENT
}
console.log(POSSIBLE_NUMBERS)

const GAME = {
  value: INITIAL_VALUE,
}

const KEYS: { [key: string]: [number, number, number] } = {
  ArrowUp: [0, 0, 0],
  ArrowDown: [0, 0, 0],
  ArrowLeft: [0, 0, 0],
  ArrowRight: [0, 0, 0],
  ' ': [0, 0, 0],
}

function sample<T>(arr: T[]): T {
  return arr[getRandomInt(0, arr.length)]
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function setKeyValues() {
  for (const key in KEYS) {
    if (key === ' ') continue
    const values: [number, number, number] = [
      sample(POSSIBLE_NUMBERS),
      sample(POSSIBLE_NUMBERS),
      sample(POSSIBLE_NUMBERS),
    ]
    KEYS[key] = values
    $upcomingNumbers[key].forEach(($span, i) => {
      $span.innerText = values[i].toString()
    })
  }
}

function handleKeyPress(key: string) {
  if (key === ' ') {
    IS_DIVIDE = !IS_DIVIDE
  } else {
    const keyValues = KEYS[key]
    const keyValue = keyValues[0]

    if (IS_DIVIDE) {
      GAME.value /= keyValue
    } else {
      GAME.value -= keyValue
    }

    GAME.value = Math.round(GAME.value)

    if (GAME.value === 0) {
      console.log('you win!')
      GAME.value = INITIAL_VALUE
    } else if (GAME.value < 0) {
      console.log('you lose!')
      GAME.value = INITIAL_VALUE
    }
    KEYS[key] = [keyValues[1], keyValues[2], sample(POSSIBLE_NUMBERS)]
    $upcomingNumbers[key].forEach(($span, i) => {
      $span.innerText = KEYS[key][i].toString()
    })
  }

  logState()
}

function logState() {
  console.log(GAME.value)
  $teardown.innerText = GAME.value.toString()
  console.log(`Symbol => ${IS_DIVIDE ? '/' : '-'}`)
  for (const key in KEYS) {
    if (key === ' ') continue
    console.log(`${key} => ${KEYS[key]}`)
    $upcomingNumbers[key].forEach(($span, i) => {
      $span.innerText = KEYS[key][i].toString()
    })
  }
}

window.addEventListener('keyup', ({ key }) => {
  const validKey = key in KEYS
  if (!validKey) return

  handleKeyPress(key)
})

setKeyValues()
logState()
