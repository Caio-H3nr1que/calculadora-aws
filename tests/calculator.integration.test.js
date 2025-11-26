import Calculator from './calculator.js';

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