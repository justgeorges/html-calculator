let buffer = 0;
let previousOperator = "";
let previousOperationTarget;
let storedBuffer;
let initialize = false;
let cToggle = false;
const screen = document.querySelector(".result");
const copier = document.querySelector(".copier");

// render function -- displays number on screen
function rerender(buffer) {
  screen.value = buffer;
  screen.style.color = "white";
}

// sort inputs
function buttonClick(eventTarget) {
  let value = eventTarget.innerText;
  // if event's inner text is not a number, send to symbol fun
  if (isNaN(parseInt(value))) {
    handleSymbol(value, eventTarget);
  } else {
    // otherwise, send to number fun
    handleNumber(value);
  }
}

//update screen and saving number in buffer
// when a number is input, save it to the buffer
function handleNumber(number) {
  if (buffer === 0) {
    buffer = number;
    console.log(buffer);
  } else {
    buffer += number;
    buffer = parseInt(buffer);
    console.log(buffer);
  }
  rerender(buffer);
}

function toggleKeys(target) {
  if (previousOperationTarget) {
    previousOperationTarget.classList.remove("toggle");
  }
  target.classList.add("toggle");
}

function handleSymbol(value, target) {
  // operating on numbers with a single operation
  if (target.classList.contains("singleOp")) {
    switch (value) {
      case "%":
        buffer /= 100;
        break;
      case "-/+":
        buffer *= -1;
        break;
      case "C":
        // if C is pressed once, clears the buffer. if pressed 2 times, clears everything
        buffer = "0";
        if (cToggle === true) {
          storedBuffer = "0";
          intBuffer = 0;
          cToggle = false;
        }
        cToggle = true;
        break;
    }
    rerender(buffer);
    console.log("single operation occured");
  } else if (!storedBuffer) {
    toggleKeys(target);
    previousOperator = value;
    previousOperationTarget = target;
    storedBuffer = buffer;
    buffer = 0;
  } else if (storedBuffer) {
    toggleKeys(target);
    handleMath();
    previousOperator = value;
    previousOperationTarget = target;
    storedBuffer = buffer;
    buffer = 0;
  }
}

function handleMath() {
  storedBuffer = parseInt(storedBuffer);
  switch (previousOperator) {
    case "+":
      buffer += storedBuffer;
      break;
    case "-":
      buffer = storedBuffer - buffer;
      break;
    case "x":
      buffer *= storedBuffer;
      break;
    case "/":
      buffer = storedBuffer / buffer;
      break;
  }
  rerender(buffer);
}

function copyAnswer() {
  navigator.clipboard.writeText(screen.value);
  screen.style.color = "green";
}

copier.addEventListener("click", copyAnswer);

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target);
});

// define loop

// input a string of numbers

// || string of numbers is saved in a buffer and displayed

// press an operation key

// || buffer is saved in a cachedBuffer
// || buffer returns to zero but is not displayed yet
// || operation is saved in variable

// input a string of numbers
// || string of numbers is saved in a buffer and displayed

// press an operation key
// || chachedBuffer is operated against buffer
// || answer is saved as buffer and displayed
