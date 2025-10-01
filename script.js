let leftOperand = "";
let selectedOperator = "";
let rightOperand = "";

function add(n1, n2) {
    return n1 + n2
}

function subtract(n1, n2) {
    return n1 - n2
}

function multiply(n1, n2) {
    return n1 * n2
}

function divide(n1, n2) {
    return n1 / n2
}

function operate(operator, n1, n2) {
    return operator(Number(n1), Number(n2))
}

function clearDisplay() {
    leftOperand = "";
    selectedOperator = "";
    rightOperand = "";
    document.querySelector(".display").textContent = ""
}

const digits = document.querySelectorAll(".digit")
digits.forEach(digit => {
    digit.addEventListener("click", () => {
        const display = document.querySelector(".display")
        if(leftOperand === "") {
            leftOperand += digit.textContent
            display.textContent += digit.textContent
        } else {
            if(selectedOperator === "÷" && digit.textContent === "0") {
                alert("Trying to divide by 0, huh? Nice try.")
            } else {
                if(selectedOperator === "") {
                    leftOperand = digit.textContent
                    display.textContent = digit.textContent
                } else {
                    rightOperand += digit.textContent
                    display.textContent += digit.textContent
                }
            }
        }
    });
});

const operators = document.querySelectorAll(".operator")
operators.forEach(operator => {
    operator.addEventListener("click", event => {
        if(leftOperand === "") {
            alert(`You need to select a number to calculate!`)
            return
        }
        const display = document.querySelector(".display")
        if(selectedOperator === "") {
            selectedOperator = operator.textContent
            display.textContent += selectedOperator
        } else {
            if(rightOperand === "") {
                selectedOperator = operator.textContent
                display.textContent = `${leftOperand}${selectedOperator}`
            } else {
                if(selectedOperator === "+") {
                    leftOperand = operate(add, leftOperand, rightOperand)
                } else if(selectedOperator === "-") {
                    leftOperand = operate(subtract, leftOperand, rightOperand)
                } else if(selectedOperator === "×") {
                    leftOperand = operate(multiply, leftOperand, rightOperand)
                } else {
                    leftOperand = operate(divide, leftOperand, rightOperand)
                }
                selectedOperator = operator.textContent
                rightOperand = ""
                display.textContent = leftOperand + selectedOperator
            }
        }
    });
});

const equals = document.querySelector(".equals")
equals.addEventListener("click", event => {
    if(leftOperand === "" || rightOperand === "" || selectedOperator == "") {
        alert(`You need to select two numbers and an operator!`)
    } else {
        if(selectedOperator === "+") {
            leftOperand = operate(add, leftOperand, rightOperand)
        } else if(selectedOperator === "-") {
            leftOperand = operate(subtract, leftOperand, rightOperand)
        } else if(selectedOperator === "×") {
            leftOperand = operate(multiply, leftOperand, rightOperand)
        } else {
            leftOperand = operate(divide, leftOperand, rightOperand)
        }
        document.querySelector(".display").textContent = leftOperand
        selectedOperator = ""
        rightOperand = ""
    }
})

const clear = document.querySelector(".clear")
clear.addEventListener("click", event => clearDisplay())
