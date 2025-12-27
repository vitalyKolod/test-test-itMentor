const display = document.getElementById('display')

const operators = ['+', '-', 'x', '/']
const MAX_LENGTH = 20

// Добавление значения
function appendValue(value) {
  if (display.value === 'Error') {
    display.value = ''
  }

  // Ограничение длины
  if (display.value.length >= MAX_LENGTH) return

  const lastChar = display.value.slice(-1)

  // Запрет нескольких операторов подряд
  if (operators.includes(value)) {
    if (display.value === '') return
    if (operators.includes(lastChar)) return
  }

  // Запрет нескольких точек в одном числе
  if (value === '.') {
    const parts = display.value.split(/[\+\-\x\/]/)
    const lastNumber = parts[parts.length - 1]
    if (lastNumber.includes('.')) return
  }

  display.value += value
  saveToStorage()
}

// Очистка дисплея
function clearDisplay() {
  display.value = ''
  saveToStorage()
}

// Удаление последнего символа
function deleteLast() {
  display.value = display.value.slice(0, -1)
  saveToStorage()
}

// Вычисление результата
function calculateResult() {
  try {
    const expression = display.value.replace(/x/g, '*')
    let result = eval(expression)

    // Деление на 0 и бесконечность
    if (!isFinite(result)) {
      display.value = 'Error'
    } else {
      // Исправление floating point (0.1 + 0.2)
      display.value = parseFloat(result.toFixed(10))
    }
  } catch (error) {
    display.value = 'Error'
  }

  saveToStorage()
}

// Сохранение значения
function saveToStorage() {
  localStorage.setItem('calculatorValue', display.value)
}

// Загрузка сохранённого значения
window.addEventListener('load', () => {
  const savedValue = localStorage.getItem('calculatorValue')
  if (savedValue !== null) {
    display.value = savedValue
  }
})
