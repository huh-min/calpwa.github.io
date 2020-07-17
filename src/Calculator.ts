class Calculator {
    calculationHistory: number[];
    currentOperandTextElement: HTMLElement;
    currentOperand: string;
    previousOperand: string;
    operation: string;

    constructor(currentOperandTextElement) {
        this.calculationHistory=[];
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    //지울 때
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    set operator(value) {
        //현재값이 없는 경우
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = value
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    //계산을 위한 메소드
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // 이전값과 현재값 중 하나가 숫자가 아닌 경우 return
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = prev % current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.calculationHistory.push(computation);
        this.operation = undefined
        this.previousOperand = ''
    }
    
    //화면 업데이트하는 display
    updateDisplay() {
        let operation='';
        if(this.operation==undefined)
            this.currentOperandTextElement.innerText = this.currentOperand
        else
            this.currentOperandTextElement.innerText = this.previousOperand+this.operation+this.currentOperand
    }
}


const numberButtons = document.querySelectorAll<HTMLElement>('[data-number]');
const operationButtons = document.querySelectorAll<HTMLElement>('[data-operation]');
const equalsButton = document.querySelector<HTMLElement>('[data-equals]');
const deleteButton = document.querySelector<HTMLElement>('[data-delete]');
const allClearButton = document.querySelector<HTMLElement>('[data-all-clear]');
const currentOperandTextElement = document.querySelector<HTMLElement>('[data-current-operand]');

const calculator = new Calculator(currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operator=button.innerText
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    console.log(calculator.calculationHistory)
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})