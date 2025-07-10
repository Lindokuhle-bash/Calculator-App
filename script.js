// Grab elements
const display = document.getElementById("display");
const buttons  = document.querySelectorAll(".button");

let firstValue = null;
let operator   = null;
let waitingForSecond = false;

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleClick(btn));
});

function handleClick(button) {
  // 1️⃣  If it's a number
  if (button.classList.contains("number")) {
    inputNumber(button.textContent);
    return;
  }

  // 2️⃣  Clear
  if (button.dataset.action === "clear") {
    resetCalculator();
    return;
  }

  // 3️⃣  Operator
  if (button.classList.contains("operator")) {
    handleOperator(button.dataset.operator);
    return;
  }

  // 4️⃣  Equals
  if (button.id === "equals") {
    performCalculation();
  }
}

/* ---------- Helpers ---------- */

function inputNumber(num) {
  if (display.textContent === "0" || waitingForSecond) {
    display.textContent = num;
    waitingForSecond = false;
  } else {
    display.textContent += num;
  }
}

function handleOperator(nextOperator) {
  const currentValue = parseFloat(display.textContent);

  if (operator && waitingForSecond) {
    operator = nextOperator; // allow changing operator before typing second number
    return;
  }

  if (firstValue === null) {
    firstValue = currentValue;
  } else if (operator) {
    const result = calculate(firstValue, currentValue, operator);
    display.textContent = result;
    firstValue = result;
  }

  operator = nextOperator;
  waitingForSecond = true;
}

function performCalculation() {
  if (operator === null || waitingForSecond) return;

  const secondValue = parseFloat(display.textContent);
  const result = calculate(firstValue, secondValue, operator);

  display.textContent = result;
  firstValue = result;
  operator = null;
  waitingForSecond = true;
}

function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b !== 0 ? a / b : "Err";
    default:  return b;
  }
}

function resetCalculator() {
  display.textContent = "0";
  firstValue = null;
  operator = null;
  waitingForSecond = false;
}
