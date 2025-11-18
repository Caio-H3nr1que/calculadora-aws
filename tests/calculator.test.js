// calculator.test.js - Testes Unitários
// Para executar: npm test

describe('Calculator - Testes Unitários', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Operações Básicas', () => {
        test('deve somar dois números corretamente', () => {
            expect(calculator.add(5, 3)).toBe(8);
            expect(calculator.add(-5, 3)).toBe(-2);
            expect(calculator.add(0, 0)).toBe(0);
            expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
        });

        test('deve subtrair dois números corretamente', () => {
            expect(calculator.subtract(10, 5)).toBe(5);
            expect(calculator.subtract(5, 10)).toBe(-5);
            expect(calculator.subtract(0, 0)).toBe(0);
            expect(calculator.subtract(-5, -3)).toBe(-2);
        });

        test('deve multiplicar dois números corretamente', () => {
            expect(calculator.multiply(5, 3)).toBe(15);
            expect(calculator.multiply(-5, 3)).toBe(-15);
            expect(calculator.multiply(0, 5)).toBe(0);
            expect(calculator.multiply(0.5, 0.2)).toBeCloseTo(0.1);
        });

        test('deve dividir dois números corretamente', () => {
            expect(calculator.divide(10, 2)).toBe(5);
            expect(calculator.divide(15, 3)).toBe(5);
            expect(calculator.divide(-10, 2)).toBe(-5);
            expect(calculator.divide(1, 3)).toBeCloseTo(0.333333);
        });

        test('deve lançar erro ao dividir por zero', () => {
            expect(() => calculator.divide(10, 0)).toThrow('Divisão por zero');
            expect(() => calculator.divide(0, 0)).toThrow('Divisão por zero');
        });
    });

    describe('Operações Especiais', () => {
        test('deve calcular potência corretamente', () => {
            expect(calculator.powerOperation(2, 2)).toBe(4);
            expect(calculator.powerOperation(5, 2)).toBe(25);
            expect(calculator.powerOperation(10, 2)).toBe(100);
            expect(calculator.powerOperation(-3, 2)).toBe(9);
            expect(calculator.powerOperation(0, 2)).toBe(0);
        });

        test('deve calcular raiz quadrada corretamente', () => {
            expect(calculator.sqrtOperation(4)).toBe(2);
            expect(calculator.sqrtOperation(9)).toBe(3);
            expect(calculator.sqrtOperation(16)).toBe(4);
            expect(calculator.sqrtOperation(25)).toBe(5);
            expect(calculator.sqrtOperation(0)).toBe(0);
            expect(calculator.sqrtOperation(2)).toBeCloseTo(1.414213);
        });

        test('deve lançar erro ao calcular raiz de número negativo', () => {
            expect(() => calculator.sqrtOperation(-1)).toThrow('Raiz de número negativo');
            expect(() => calculator.sqrtOperation(-9)).toThrow('Raiz de número negativo');
        });
    });

    describe('Estado da Calculadora', () => {
        test('deve inicializar com valores corretos', () => {
            expect(calculator.currentValue).toBe('0');
            expect(calculator.previousValue).toBe('');
            expect(calculator.operator).toBeNull();
            expect(calculator.shouldResetDisplay).toBe(false);
        });

        test('deve limpar todos os valores', () => {
            calculator.currentValue = '123';
            calculator.previousValue = '456';
            calculator.operator = '+';
            calculator.shouldResetDisplay = true;

            calculator.clear();

            expect(calculator.currentValue).toBe('0');
            expect(calculator.previousValue).toBe('');
            expect(calculator.operator).toBeNull();
            expect(calculator.shouldResetDisplay).toBe(false);
        });

        test('deve adicionar números corretamente', () => {
            calculator.appendNumber('5');
            expect(calculator.currentValue).toBe('5');

            calculator.appendNumber('3');
            expect(calculator.currentValue).toBe('53');
        });

        test('não deve adicionar múltiplos pontos decimais', () => {
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('3');
            calculator.appendNumber('.');
            expect(calculator.currentValue).toBe('5.3');
        });
    });

    describe('Operações Encadeadas', () => {
        test('deve realizar operações encadeadas corretamente', () => {
            calculator.currentValue = '5';
            calculator.setOperator('+');
            calculator.currentValue = '3';
            calculator.calculate();
            expect(calculator.currentValue).toBe('8');

            calculator.setOperator('*');
            calculator.currentValue = '2';
            calculator.calculate();
            expect(calculator.currentValue).toBe('16');
        });
    });
});

// Classe Calculator para testes (normalmente estaria em arquivo separado)
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
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

    power(base, exponent = 2) {
        return Math.pow(base, exponent);
    }

    sqrt(number) {
        if (number < 0) {
            throw new Error('Raiz de número negativo');
        }
        return Math.sqrt(number);
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentValue = number;
            this.shouldResetDisplay = false;
        } else {
            if (number === '.' && this.currentValue.includes('.')) return;
            this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
        }
    }

    setOperator(op) {
        if (this.operator !== null && !this.shouldResetDisplay) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;
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
    }
}

module.exports = Calculator;