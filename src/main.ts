const $up = document.getElementById('up')
const $down = document.getElementById('down')
const $left = document.getElementById('left')
const $right = document.getElementById('right')

const $divide = document.getElementById('divide')
const $subtract = document.getElementById('subtract')

const $buttons = document.querySelectorAll('[data-key]')

window.addEventListener('keyup', (e) => {
  for (const $button of $buttons) {
    const key = $button.getAttribute('data-key')
    if (key && e.key === key) {
      $button?.classList.remove('active')
    }
  }
})

window.addEventListener('keydown', (e) => {
  for (const $button of $buttons) {
    const key = $button.getAttribute('data-key')
    if (key && e.key === key) {
      $button?.classList.add('active')
    }
  }
})
