var Calculator = /** @class */ (function () {
    function Calculator(currentOperandTextElement) {
        this.calculationHistory = [];
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    //지울 때
    Calculator.prototype.clear = function () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };
    Calculator.prototype.delete = function () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    Calculator.prototype.appendNumber = function (number) {
        if (number === '.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };
    Object.defineProperty(Calculator.prototype, "operator", {
        set: function (value) {
            //현재값이 없는 경우
            if (this.currentOperand === '')
                return;
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = value;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        },
        enumerable: false,
        configurable: true
    });
    //계산을 위한 메소드
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        // 이전값과 현재값 중 하나가 숫자가 아닌 경우 return
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.calculationHistory.push(computation);
        this.operation = undefined;
        this.previousOperand = '';
    };
    //화면 업데이트하는 display
    Calculator.prototype.updateDisplay = function () {
        var operation = '';
        if (this.operation == undefined)
            this.currentOperandTextElement.innerText = this.currentOperand;
        else
            this.currentOperandTextElement.innerText = this.previousOperand + this.operation + this.currentOperand;
    };
    return Calculator;
}());
var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');
var calculator = new Calculator(currentOperandTextElement);
numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.operator = button.innerText;
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click', function (button) {
    calculator.compute();
    console.log(calculator.calculationHistory);
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', function (button) {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', function (button) {
    calculator.delete();
    calculator.updateDisplay();
});
//# sourceMappingURL=Calculator.js.map