let display = document.getElementById('display')
const operators = ['+', '-', 'x', '/']

function appendValue(value) {
  if (display.value === 'Error') {
    display.value = ''
    saveToStorage()
  }

  const lastChar = display.value.slice(-1)

  if (operators.includes(value)) {
    if (display.value === '') return

    if (operators.includes(lastChar)) return
  }

  display.value += value
  saveToStorage()
}

function clearDisplay() {
  display.value = ''
  saveToStorage()
}

function calculateResult() {
  try {
    let expression = display.value.replace(/x/g, '*')
    display.value = eval(expression)
  } catch (e) {
    display.value = 'Error'
    saveToStorage()
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1)
  saveToStorage()
}

//Сохранение значения в localStorage
function saveToStorage() {
  localStorage.setItem('calculatorValue', display.value)
}
window.addEventListener('load', () => {
  const savedValue = localStorage.getItem('calculatorValue')
  if (savedValue !== null) {
    display.value = savedValue
  }
})
