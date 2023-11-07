let buffer = "0";
let runningTotal = 0;
let previousOperator = "";
let previousOperationTarget;
let storedBuffer = "0";
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
// when a number is input, save it to the buffer
function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  // display the buffer
  rerender(buffer);
}

// handle symbol function
// 1) toggle on a symbol
// 2) save that toggled symbol
// 3) save buffer into a stored number
// 4) reset buffer

function handleSymbol(value, target) {
  switch (value) {
    case "%":
      buffer /= 100;
      break;
    case "-/+":
      buffer *= -1;
      break;
    case "C":
      buffer = "0";
      break;
    case ".":
      buffer = buffer + 0.0;
      break;
    case "+":
    case "-":
    case "x":
    case "/":
    case "=":
      // check if there's already a operator selected, if so, deselect it
      if (previousOperationTarget) {
        previousOperationTarget.classList.remove("toggle");
      }
      // select the current operator
      target.classList.add("toggle");
      handleMath(value, target);
      previousOperationTarget = target;
      previousOperator = value;
      break;
  }
  rerender(buffer);
}

function handleMath(value) {
  // scenarios:
  // if you input a number and an operator while none previously exist, that number and operator are saved
  if (storedBuffer === "0" && previousOperator === "") {
    storedBuffer = parseInt(buffer);
    buffer = "0";
    previousOperator = value;
  } else {
    // if you input a number and an operator while a number is stored and an operator is toggled,
    // that the stored number and the buffer number are combined using that toggled operator,
    // and the result becomes the new stored number (the toggled button stays in var)
    let intBuffer = parseInt(buffer);
    switch (previousOperator) {
      case "+":
        intBuffer += storedBuffer;
        break;
      case "-":
        intBuffer -= storedBuffer;
        break;
      case "x":
        intBuffer *= storedBuffer;
        break;
      case "/":
        intBuffer = storedBuffer / intBuffer;
        break;
      case "=":
        handleMath(value);
        break;
    }
    storedBuffer = intBuffer;
    buffer = intBuffer;
  }
}

function rerender(buffer) {
  screen.value = buffer;
}

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target);
});
