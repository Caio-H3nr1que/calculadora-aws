describe('Calculator - Testes de Integração', () => {
    let calculator;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator">
                <div class="display">
                    <div class="display-history" id="history"></div>
                    <div class="display-value" id="display">0</div>
                </div>
            </div>
        `;
        calculator = new Calculator();
        calculator.updateDisplay();
    });

    describe('Interface com Usuário', () => {
        test('deve atualizar o display ao adicionar números', () => {
            calculator.appendNumber('5');
            const display = document.getElementById('display');
            expect(display.textContent).toBe('5');
        });

        test('deve mostrar histórico de operações', () => {
            calculator.appendNumber('5');
            calculator.setOperator('+');
            const history = document.getElementById('history');
            expect(history.textContent).toBe('5+');
        });

        test('deve limpar display e histórico ao usar clear', () => {
            calculator.appendNumber('5');
            calculator.setOperator('+');
            calculator.appendNumber('3');
            calculator.clear();

            const display = document.getElementById('display');
            const history = document.getElementById('history');

            expect(display.textContent).toBe('0');
            expect(history.textContent).toBe('');
        });
    });

    describe('Fluxo de Operações Completo', () => {
        test('deve realizar soma completa com interface', () => {
            calculator.appendNumber('5');
            calculator.setOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('8');
        });

        test('deve realizar subtração completa com interface', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('0');
            calculator.setOperator('-');
            calculator.appendNumber('3');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('7');
        });

        test('deve realizar multiplicação completa com interface', () => {
            calculator.appendNumber('6');
            calculator.setOperator('*');
            calculator.appendNumber('7');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('42');
        });

        test('deve realizar divisão completa com interface', () => {
            calculator.appendNumber('2');
            calculator.appendNumber('0');
            calculator.setOperator('/');
            calculator.appendNumber('4');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('5');
        });

        test('deve mostrar erro ao dividir por zero', () => {
            calculator.appendNumber('5');
            calculator.setOperator('/');
            calculator.appendNumber('0');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('Erro');
        });
    });

    describe('Operações Especiais com Interface', () => {
        test('deve calcular potência e atualizar display', () => {
            calculator.appendNumber('5');
            calculator.power();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('25');
        });

        test('deve calcular raiz quadrada e atualizar display', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('6');
            calculator.sqrt();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('4');
        });

        test('deve mostrar erro ao calcular raiz de número negativo', () => {
            calculator.currentValue = '-4';
            calculator.sqrt();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('Erro');
        });
    });

    describe('Operações Encadeadas com Interface', () => {
        test('deve realizar múltiplas operações em sequência', () => {
            calculator.appendNumber('5');
            calculator.setOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();

            calculator.setOperator('*');
            calculator.appendNumber('2');
            calculator.calculate();

            calculator.setOperator('-');
            calculator.appendNumber('6');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('10');
        });

        test('deve lidar com números decimais em operações', () => {
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            calculator.setOperator('+');
            calculator.appendNumber('2');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            calculator.calculate();

            const display = document.getElementById('display');
            expect(display.textContent).toBe('8');
        });
    });

    describe('Comportamento do Display', () => {
        test('deve resetar display após calcular resultado', () => {
            calculator.appendNumber('5');
            calculator.setOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            
            calculator.appendNumber('7');
            const display = document.getElementById('display');
            expect(display.textContent).toBe('7');
        });

        test('não deve adicionar múltiplos pontos decimais', () => {
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('3');
            calculator.appendNumber('.');
            calculator.appendNumber('2');

            const display = document.getElementById('display');
            expect(display.textContent).toBe('5.32');
        });
    });
});

// Classe Calculator completa com updateDisplay
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
    }

    updateDisplay() {
        const displayElement = document.getElementById('display');
        const historyElement = document.getElementById('history');
        
        if (displayElement) {
            displayElement.textContent = this.currentValue;
        }
        
        if (historyElement) {
            const historyText = this.previousValue + (this.operator || '');
            historyElement.textContent = historyText;
        }
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

    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    
    divide(a, b) {
        if (b === 0) throw new Error('Divisão por zero');
        return a / b;
    }

    powerOperation(base, exponent = 2) {
        return Math.pow(base, exponent);
    }

    sqrtOperation(number) {
        if (number < 0) throw new Error('Raiz de número negativo');
        return Math.sqrt(number);
    }

    calculate() {
        if (this.operator === null || this.shouldResetDisplay) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;

        try {
            switch (this.operator) {
                case '+': result = this.add(prev, current); break;
                case '-': result = this.subtract(prev, current); break;
                case '*': result = this.multiply(prev, current); break;
                case '/': result = this.divide(prev, current); break;
                default: return;
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

module.exports = Calculator;