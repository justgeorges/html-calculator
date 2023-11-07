let buffer = "0";
let runningTotal = 0;
let previousOperator = "";
let previousOperationTarget;
let storedBuffer = 0;
const screen = document.querySelector(".result");
let operation;

// sort inputs
function buttonClick(eventTarget) {
  let value = eventTarget.innerText;
  if (isNaN(parseInt(value))) {
    handleSymbol(value, eventTarget);
  } else {
    handleNumber(value);
  }
}

//update screen and saving number in buffer
function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  rerender(buffer);
}

// handle symbol function
// 1) toggle on a symbol
// 2) save that toggled symbol
// 3) save buffer into a stored number
// 4) reset buffer

function handleSymbol(value, target) {
  // check if there's a previous symbol -- if so, remove the symbol and perform math
  if (/[+\-x/]/.test(previousOperator)) {
    previousOperationTarget.classList.remove("toggle");
    target.classList.remove("toggle");
    handleMath(target);
  } else if (value === "%") {
    buffer /= 100;
    rerender(buffer);
  } else if (value === "-/+") {
    buffer *= -1;
    rerender(buffer);
  } else if (value === "C") {
    buffer = "0";
    rerender(buffer);
  }
  // toggle the current symbol and save the operation in a variable
  target.classList.add("toggle");
  previousOperationTarget = target;
  previousOperator = value;
  // save the previous buffer as a number variable
  storedBuffer = parseInt(buffer);
  // reset buffer
  buffer = "0";
}

function handleMath() {
  let answer = 0;
  switch (previousOperator) {
    case "+":
      answer = storedBuffer + parseInt(buffer);
      break;
    case "-":
      answer = storedBuffer - parseInt(buffer);
      break;
    case "x":
      answer = storedBuffer * parseInt(buffer);
      break;
    case "/":
      answer = storedBuffer / parseInt(buffer);
      break;
    case "=":
      answer = eval(`${storedBuffer} ${previousOperator} ${buffer}`);
      break;
  }
  rerender(answer);
}

function rerender(buffer) {
  screen.value = buffer;
}

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target);
});
