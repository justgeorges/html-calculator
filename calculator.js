let buffer = "0";
let runningTotal = 0;
let previousOperator;

const screen = document.querySelector(".result");
function init() {
  document
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  rerender(buffer);
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "x":
    case "/":
    case "-/+":
    case "%":
      handleMath(symbol);
      break;
    case ".":
      console.log("dot");
      break;
  }
  rerender(buffer);
}

function handleMath(value) {
  if (buffer === "0") {
    //do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
  console.log(runningTotal);
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "/") {
    runningTotal /= intBuffer;
  }
}

function rerender(buffer) {
  screen.value = buffer;
}

init();

//revision
// 1) type a number
// 2) hit an operator
// 3) operator gets a highlight class toggle
// 4) event listener triggers on toggle, saves operator in variable
// 5) when previous operator has a value already calculate running total and display
// 6) when equals sign is selected, completes operation
