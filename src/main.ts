const INITIAL_VALUE = 404
const GAME = {
  value: INITIAL_VALUE,
}

const KEYS: { [key: string]: number } = {
  ArrowUp: getRandomInt(1, 50),
  ArrowDown: getRandomInt(1, 50),
  ArrowLeft: getRandomInt(1, 50),
  ArrowRight: getRandomInt(1, 50),
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function setKeyValues() {
  for (const key in KEYS) {
    KEYS[key] = getRandomInt(1, 50)
  }
}

function handleKeyPress(key: string) {
  const keyValue = KEYS[key]

  if (GAME.value < 0) {
    GAME.value += keyValue
  } else {
    GAME.value -= keyValue
  }

  if (GAME.value === 0) {
    console.log('you win!')
    GAME.value = INITIAL_VALUE
  }

  setKeyValues()
  logState()
}

function logState() {
  console.log(GAME.value)
  for (const key in KEYS) {
    console.log(`${key} => ${KEYS[key]}`)
  }
}

window.addEventListener('keyup', ({ key }) => {
  const validKey = key in KEYS
  if (!validKey) return

  handleKeyPress(key)
})

logState()
