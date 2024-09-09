function add(a ,b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "SHUT UP";

    return (a / b);
}

function operate(operator, a, b) {
    let ans = 0;
    
    switch (operator) {
        case "add":
            ans = add(a,b);
            break;
        case "subtract":
            ans = subtract(a,b);
            break;
        case "multiply":
            ans = multiply(a,b);
            break;
        case "divide":
            ans = divide(a,b);
            break;
    }

    if (ans > 9999999 || ans < 0.000001) {
        return ans.toExponential(2);
    } else {
        return ans;
    }
}

let operator = "";
let prevNum = "";
let currentNum = "";
let equated = false;

const display = document.querySelector('#display');

// number buttons logic
const numButtons = document.querySelectorAll('button.number');
numButtons.forEach((button) => button.addEventListener('click', () =>{
    if (equated) {
        prevNum  = "";
        currentNum = "";
        operator = "";
        equated = false;
    }
    
    currentNum += button.value;
    display.textContent = `${currentNum}`;
}));

document.querySelector('#clear').addEventListener('click', ()=>{
    display.textContent = "";
    prevNum  = "";
    currentNum = "";
    operator = "";
});

// operator button logic
const operatorButtons = document.querySelectorAll('button.operator');
operatorButtons.forEach((button) => button.addEventListener('click',()=>{
    
    // so that we don't operate immediately if just equated before this
    if (equated) {
        equated = false;
        currentNum = "";
    }
    else if (operator && prevNum && currentNum) {
        // if there is already an operator entered and 2 numbers, then operate
        prevNum = String(
            operate(operator, parseFloat(prevNum), parseFloat(currentNum)));
        
        prevNum = prevNum.slice(0, Math.min(9, prevNum.length));

        display.textContent = prevNum;
        currentNum = "";
    } else if (!prevNum) {
        // if there isn't a stored number already, store current number
        prevNum = currentNum;
        currentNum = "";
    }

    operator = `${button.value}`;
}));

// equals button logic
document.querySelector('#equals').addEventListener('click', ()=>{
    if (!currentNum) {
        currentNum = prevNum;
    }
    
    if (operator && prevNum && currentNum) {
        // if there is already an operator entered and 2 numbers, then operate
        prevNum = String(
            operate(operator, parseFloat(prevNum), parseFloat(currentNum)));
        
        prevNum = prevNum.slice(0, Math.min(9, prevNum.length));

        display.textContent = prevNum;        
        
    }

    // Boolean flag referred by other button event listners
    // after this, any number button will reset prev and curr num. 
    // but still can operate, retaining prevNum
    equated = true;
});