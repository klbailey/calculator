document.addEventListener("DOMContentLoaded", function () {
    // Global variables and initialize
    let expression = "";
    let displayValue = "0";
    let lastOperator = null;
    let result = null;

    // Function to update the display
    function updateDisplay() {
        const display = document.querySelector("#display");
        display.textContent = displayValue;
    }

    // Event listeners for number and operator buttons
    const operandButtons = document.querySelectorAll(".operand");
    const operatorButtons = document.querySelectorAll(".operator");

    operandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonValue = button.getAttribute("value");
            expression += buttonValue;
            displayValue = expression;
            updateDisplay();
        });
    });

    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonValue = button.getAttribute("value");

            if (lastOperator !== null) {
                // If an operator was already pressed, calculate the result
                result = evaluateExpression(result, parseFloat(expression), lastOperator);
                expression = result.toString();
            } else {
                // If it's the first operator, store the current expression as the result
                result = parseFloat(expression);
            }

            lastOperator = buttonValue;
            expression = "";
            displayValue = result.toString();
            updateDisplay();
        });
    });

    // Event listener for equals button*****
    const equalsButton = document.querySelector(".equals");
    equalsButton.addEventListener("click", () => {
        if (lastOperator !== null) {
            const secondNumber = parseFloat(expression);

            if (lastOperator === "/" && secondNumber === 0) {
                // Division by zero error
                displayValue = ":(";
                updateDisplay();
                return;
            } else {
                // Calculate the final result
                switch (lastOperator) {
                    case "+":
                        result += secondNumber;
                        break;
                    case "-":
                        result -= secondNumber;
                        break;
                    case "*":
                        result *= secondNumber;
                        break;
                    case "/":
                        result /= secondNumber;
                        break;
                    default:
                        result = secondNumber;
                }

                // Check if the operator is division and round to two decimal points if necessary
                if (lastOperator === "/") {
                    expression = result.toFixed(2); // Round to 2 decimal points
                } else {
                    expression = result.toString();
                }
            }

            displayValue = expression;
            lastOperator = null;
            updateDisplay();
        }
    });


    // Event listener for clear button
    const clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", () => {
        expression = "";
        displayValue = "0";
        lastOperator = null;
        result = null;
        updateDisplay();
    });

    // Function to evaluate an expression with two numbers and an operator
    function evaluateExpression(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 !== 0) {
                    return num1 / num2;
                } else {
                    displayValue = "Error";
                    updateDisplay();
                    return num1; // Return the current result in case of division by zero
                }
            default:
                return num2; // Return the current number if no valid operator is provided
        }
    }

    // Ensure initial display update
    updateDisplay();
});
