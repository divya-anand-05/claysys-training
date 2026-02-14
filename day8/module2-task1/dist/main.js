"use strict";
// enum for store fixed values
var Operator;
(function (Operator) {
    Operator["Add"] = "+";
    Operator["Subtract"] = "-";
    Operator["Multiply"] = "*";
    Operator["Divide"] = "/";
})(Operator || (Operator = {}));
// state variable (memory of calculator)
let currentValue = "";
let previousValue = null;
let currentOperator = null;
// dom Element using type assertion
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.innerText;
        // number handling
        if (!isNaN(Number(value)) || value === ".") {
            appendNumber(value);
        }
        else if (value === "C") {
            clearDisplay();
        }
        else if (value === "=") {
            calculate();
        }
        else {
            setOperator(value);
        }
    });
});
// adding digits
function appendNumber(num) {
    currentValue += num;
    if (previousValue !== null && currentOperator !== null) {
        display.value = previousValue + " " + currentOperator + " " + currentValue;
    }
    else {
        display.value = currentValue;
    }
}
// store operator
function setOperator(op) {
    if (currentValue === "")
        return;
    previousValue = Number(currentValue);
    currentOperator = op;
    display.value = previousValue + " " + op;
    currentValue = "";
}
function calculate() {
    if (previousValue === null || currentOperator === null)
        return;
    const current = Number(currentValue);
    let result;
    switch (currentOperator) {
        case Operator.Add:
            result = previousValue + current;
            break;
        case Operator.Subtract:
            result = previousValue - current;
            break;
        case Operator.Multiply:
            result = previousValue * current;
            break;
        case Operator.Divide:
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = previousValue / current;
            break;
    }
    display.value = result.toString();
    currentValue = result.toString();
    previousValue = null;
    currentOperator = null;
}
function clearDisplay() {
    currentValue = "";
    previousValue = null;
    currentOperator = null;
    display.value = "0";
}
