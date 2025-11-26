export default class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
    }

    updateDisplay() {
        document.getElementById('display').textContent = this.currentValue;
        const historyText = this.previousValue + (this.operator || '');
        document.getElementById('history').textContent = historyText;
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentValue = number;
            this.shouldResetDisplay = false;
        } else {
            if (number === '.' && this.currentValue.includes('.')) return;
            this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
        }
        this.updateDisplay();
    }

    setOperator(op) {
        if (this.operator !== null && !this.shouldResetDisplay) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero');
        }
        return a / b;
    }

    powerOperation(base, exponent = 2) {
        return Math.pow(base, exponent);
    }

    sqrtOperation(number) {
        if (number < 0) {
            throw new Error('Raiz de número negativo');
        }
        return Math.sqrt(number);
    }

    calculate() {
        if (this.operator === null || this.shouldResetDisplay) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        try {
            switch (this.operator) {
                case '+':
                    result = this.add(prev, current);
                    break;
                case '-':
                    result = this.subtract(prev, current);
                    break;
                case '*':
                    result = this.multiply(prev, current);
                    break;
                case '/':
                    result = this.divide(prev, current);
                    break;
                default:
                    return;
            }

            this.currentValue = result.toString();
            this.operator = null;
            this.previousValue = '';
            this.shouldResetDisplay = true;
        } catch (error) {
            this.currentValue = 'Erro';
            this.operator = null;
            this.previousValue = '';
            this.shouldResetDisplay = true;
        }

        this.updateDisplay();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    power() {
        const current = parseFloat(this.currentValue);
        try {
            this.currentValue = this.powerOperation(current, 2).toString();
            this.shouldResetDisplay = true;
            this.updateDisplay();
        } catch (error) {
            this.currentValue = 'Erro';
            this.shouldResetDisplay = true;
            this.updateDisplay();
        }
    }

    sqrt() {
        const current = parseFloat(this.currentValue);
        try {
            this.currentValue = this.sqrtOperation(current).toString();
            this.shouldResetDisplay = true;
            this.updateDisplay();
        } catch (error) {
            this.currentValue = 'Erro';
            this.shouldResetDisplay = true;
            this.updateDisplay();
        }
    }
}

// module.exports = Calculator;