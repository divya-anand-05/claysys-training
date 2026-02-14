// enum for store fixed values
enum Operator {
    Add = "+",
    Subtract = "-",
    Multiply = "*",
    Divide = "/"
}

// state variable (memory of calculator)
let currentValue: string = "";
let previousValue: number | null = null;
let currentOperator: Operator | null = null;

// dom Element using type assertion
const display = document.getElementById("display") as HTMLInputElement;
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.innerText;  //(7,+,=,C)

        // number handling
        if (!isNaN(Number(value)) || value === ".") {
            appendNumber(value);
        } else if (value === "C") {
            clearDisplay();
        } else if (value === "=") {
            calculate();
        } else {
            setOperator(value as Operator);  //stores selected operator
        }
    });
});

// adding digits
function appendNumber(num: string): void {    
    currentValue += num;

    if (previousValue !== null && currentOperator !== null) {
        display.value = previousValue + " " + currentOperator + " " + currentValue;
    } else {
        display.value = currentValue;
    }
}

// store operator
function setOperator(op: Operator): void {
    if (currentValue === "") return;

    previousValue = Number(currentValue);
    
    currentOperator = op;

    display.value = previousValue + " " + op;
    currentValue ="";
}

// core logic
function calculate(): void {
    if (previousValue === null || currentOperator === null) return;

    const current = Number(currentValue);
    let result: number;

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

    // final result display
    display.value = result.toString();
    currentValue = result.toString();
    previousValue = null;
    currentOperator = null;
}

// clears all value

function clearDisplay(): void {
    currentValue = "";
    previousValue = null;
    currentOperator = null;
    display.value = "0";
}
